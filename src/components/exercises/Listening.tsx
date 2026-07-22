import { useEffect, useRef, useState } from 'react';
import type {
  ListeningDelivery,
  ListeningExercise,
  ListeningPace,
  ListeningTurn,
} from '../../types';
import { MCQ } from './MCQ';

type ListeningProps = Omit<ListeningExercise, 'kind' | 'title'> & {
  onChecked: (score: number, total: number) => void;
};

const PACE_PROFILES: Record<
  ListeningPace,
  { rate: number; sentencePauseMs: number; turnPauseMs: number; label: string }
> = {
  slow: { rate: 0.82, sentencePauseMs: 450, turnPauseMs: 800, label: 'slow pace' },
  steady: { rate: 0.9, sentencePauseMs: 350, turnPauseMs: 600, label: 'steady pace' },
  natural: { rate: 0.98, sentencePauseMs: 250, turnPauseMs: 450, label: 'natural pace' },
};

const DELIVERY_PROFILES: Record<ListeningDelivery, { pitch: number; rate: number }> = {
  neutral: { pitch: 0, rate: 0 },
  question: { pitch: 0.08, rate: -0.01 },
  enthusiastic: { pitch: 0.1, rate: 0.03 },
  hesitant: { pitch: -0.04, rate: -0.06 },
};

const FALLBACK_SPEAKER_PITCH = [0, -0.08, 0.08];
const FALLBACK_SPEAKER_RATE = [0, 0.015, -0.015];

interface SpeechSegment {
  text: string;
  speaker: string;
  speakerIndex: number;
  delivery: ListeningDelivery;
  pauseAfterMs: number;
}

function inferDelivery(text: string): ListeningDelivery {
  if (text.endsWith('?')) return 'question';
  if (text.endsWith('!')) return 'enthusiastic';
  if (text.endsWith('…')) return 'hesitant';
  return 'neutral';
}

/** Split authored turns into utterances so punctuation, pauses and speakers remain explicit. */
function buildSpeechSegments(transcript: ListeningTurn[], pace: ListeningPace): SpeechSegment[] {
  const profile = PACE_PROFILES[pace];
  const speakers = [...new Set(transcript.map((turn) => turn.speaker))];

  return transcript.flatMap((turn) => {
    const sentences = turn.text.match(/[^.!?…]+(?:[.!?…]+|$)/g) ?? [turn.text];

    return sentences
      .map((sentence) => sentence.trim())
      .filter(Boolean)
      .map((text, index, all) => {
        const punctuationDelivery = inferDelivery(text);
        return {
          text,
          speaker: turn.speaker,
          speakerIndex: speakers.indexOf(turn.speaker),
          delivery:
            punctuationDelivery === 'neutral' ? (turn.delivery ?? 'neutral') : punctuationDelivery,
          pauseAfterMs: index === all.length - 1 ? profile.turnPauseMs : profile.sentencePauseMs,
        };
      });
  });
}

function getFrenchVoices(synthesis: SpeechSynthesis): SpeechSynthesisVoice[] {
  return synthesis
    .getVoices()
    .filter((voice) => voice.lang.toLowerCase().startsWith('fr'))
    .sort((a, b) => {
      const score = (voice: SpeechSynthesisVoice) =>
        (voice.lang.toLowerCase() === 'fr-fr' ? 4 : 0) +
        (voice.default ? 2 : 0) +
        (voice.localService ? 1 : 0);
      return score(b) - score(a);
    });
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** An audio-first comprehension activity with speaker-aware playback and a review transcript. */
export function Listening({ transcript, pace, items, onChecked }: ListeningProps) {
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const pauseTimerRef = useRef<number | null>(null);
  const playbackIdRef = useRef(0);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const speechSupported =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window;

  useEffect(() => {
    if (!speechSupported) return;

    const synthesis = window.speechSynthesis;
    const loadVoices = () => {
      voicesRef.current = getFrenchVoices(synthesis);
    };

    loadVoices();
    synthesis.addEventListener('voiceschanged', loadVoices);
    return () => synthesis.removeEventListener('voiceschanged', loadVoices);
  }, [speechSupported]);

  useEffect(
    () => () => {
      playbackIdRef.current += 1;
      if (pauseTimerRef.current !== null) {
        window.clearTimeout(pauseTimerRef.current);
      }
      if (utteranceRef.current && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    },
    [],
  );

  const stop = () => {
    playbackIdRef.current += 1;
    if (pauseTimerRef.current !== null) {
      window.clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setSpeaking(false);
  };

  const play = () => {
    if (!speechSupported) return;

    const synthesis = window.speechSynthesis;
    synthesis.cancel();
    const segments = buildSpeechSegments(transcript, pace);
    const speakers = [...new Set(transcript.map((turn) => turn.speaker))];
    const frenchVoices = voicesRef.current.length ? voicesRef.current : getFrenchVoices(synthesis);
    const needsSyntheticContrast = frenchVoices.length < speakers.length;
    const voiceBySpeaker = new Map(
      speakers.map((speaker, index) => [
        speaker,
        frenchVoices.length ? frenchVoices[index % frenchVoices.length] : undefined,
      ]),
    );
    const playbackId = playbackIdRef.current + 1;
    playbackIdRef.current = playbackId;

    const finish = () => {
      if (playbackId !== playbackIdRef.current) return;
      utteranceRef.current = null;
      pauseTimerRef.current = null;
      setSpeaking(false);
    };

    const speakSegment = (index: number) => {
      if (playbackId !== playbackIdRef.current) return;
      const segment = segments[index];
      if (!segment) {
        finish();
        return;
      }

      const delivery = DELIVERY_PROFILES[segment.delivery];
      const fallbackPitch = needsSyntheticContrast
        ? FALLBACK_SPEAKER_PITCH[segment.speakerIndex % FALLBACK_SPEAKER_PITCH.length]
        : 0;
      const fallbackRate = needsSyntheticContrast
        ? FALLBACK_SPEAKER_RATE[segment.speakerIndex % FALLBACK_SPEAKER_RATE.length]
        : 0;
      const utterance = new SpeechSynthesisUtterance(segment.text);
      const voice = voiceBySpeaker.get(segment.speaker);

      utterance.lang = 'fr-FR';
      utterance.rate = clamp(PACE_PROFILES[pace].rate + delivery.rate + fallbackRate, 0.7, 1.1);
      utterance.pitch = clamp(1 + delivery.pitch + fallbackPitch, 0.75, 1.25);
      if (voice) utterance.voice = voice;
      utterance.onend = () => {
        if (playbackId !== playbackIdRef.current) return;
        if (index === segments.length - 1) {
          finish();
          return;
        }

        pauseTimerRef.current = window.setTimeout(() => {
          pauseTimerRef.current = null;
          speakSegment(index + 1);
        }, segment.pauseAfterMs);
      };
      utterance.onerror = finish;

      utteranceRef.current = utterance;
      synthesis.speak(utterance);
    };

    setSpeaking(true);
    speakSegment(0);
  };

  const speakerCount = new Set(transcript.map((turn) => turn.speaker)).size;
  const speakerLabel = speakerCount === 1 ? '1 speaker' : `${speakerCount} speakers`;

  return (
    <div className="listening">
      <p className="listening-instructions">
        Listen twice before answering. Notice who is speaking and how questions or emotions change
        the intonation. Try not to open the transcript until you have checked your answers.
      </p>
      <div className="listening-controls">
        <button
          type="button"
          className="btn listening-button"
          onClick={speaking ? stop : play}
          disabled={!speechSupported}
        >
          {speaking ? '■ Stop' : '▶ Listen to the passage'}
        </button>
        <span className="listening-speed">
          French · {speakerLabel} · {PACE_PROFILES[pace].label}
        </span>
      </div>
      {!speechSupported && (
        <p className="fb no" role="status">
          Speech playback is unavailable in this browser. Use the transcript to review the passage.
        </p>
      )}
      <details className="listening-transcript">
        <summary>Transcript — open for review</summary>
        <div lang="fr">
          {transcript.map((turn, index) => (
            <p key={`${turn.speaker}-${index}`}>
              <strong>{turn.speaker} :</strong> {turn.text}
            </p>
          ))}
        </div>
      </details>
      <MCQ items={items} onChecked={onChecked} />
    </div>
  );
}
