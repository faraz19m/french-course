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

const PACE_PROFILES: Record<ListeningPace, { rate: number; turnPauseMs: number; label: string }> = {
  slow: { rate: 0.88, turnPauseMs: 550, label: 'slow pace' },
  steady: { rate: 0.94, turnPauseMs: 400, label: 'steady pace' },
  natural: { rate: 1, turnPauseMs: 280, label: 'natural pace' },
};

const DELIVERY_PROFILES: Record<ListeningDelivery, { pitch: number; rate: number }> = {
  neutral: { pitch: 0, rate: 0 },
  question: { pitch: 0, rate: 0 },
  enthusiastic: { pitch: 0.02, rate: 0.01 },
  hesitant: { pitch: -0.01, rate: -0.025 },
};

const FALLBACK_SPEAKER_PITCH = [0, -0.025, 0.025];
const FALLBACK_SPEAKER_RATE = [0, 0.005, -0.005];

interface SpeechTurn {
  text: string;
  speaker: string;
  speakerIndex: number;
  delivery: ListeningDelivery;
  pauseAfterMs: number;
}

/** Keep each speaker turn continuous so the voice engine can produce natural sentence prosody. */
function buildSpeechTurns(transcript: ListeningTurn[], pace: ListeningPace): SpeechTurn[] {
  const profile = PACE_PROFILES[pace];
  const speakers = [...new Set(transcript.map((turn) => turn.speaker))];

  return transcript.reduce<SpeechTurn[]>((turns, turn) => {
    const previous = turns[turns.length - 1];
    if (previous?.speaker === turn.speaker) {
      previous.text = `${previous.text} ${turn.text}`;
      if (previous.delivery === 'neutral' && turn.delivery) {
        previous.delivery = turn.delivery;
      }
      return turns;
    }

    turns.push({
      text: turn.text,
      speaker: turn.speaker,
      speakerIndex: speakers.indexOf(turn.speaker),
      delivery: turn.delivery ?? 'neutral',
      pauseAfterMs: profile.turnPauseMs,
    });
    return turns;
  }, []);
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
    const turns = buildSpeechTurns(transcript, pace);
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

    const speakTurn = (index: number) => {
      if (playbackId !== playbackIdRef.current) return;
      const turn = turns[index];
      if (!turn) {
        finish();
        return;
      }

      const delivery = DELIVERY_PROFILES[turn.delivery];
      const fallbackPitch = needsSyntheticContrast
        ? FALLBACK_SPEAKER_PITCH[turn.speakerIndex % FALLBACK_SPEAKER_PITCH.length]
        : 0;
      const fallbackRate = needsSyntheticContrast
        ? FALLBACK_SPEAKER_RATE[turn.speakerIndex % FALLBACK_SPEAKER_RATE.length]
        : 0;
      const utterance = new SpeechSynthesisUtterance(turn.text);
      const voice = voiceBySpeaker.get(turn.speaker);

      utterance.lang = 'fr-FR';
      utterance.rate = clamp(PACE_PROFILES[pace].rate + delivery.rate + fallbackRate, 0.8, 1.05);
      utterance.pitch = clamp(1 + delivery.pitch + fallbackPitch, 0.9, 1.1);
      if (voice) utterance.voice = voice;
      utterance.onend = () => {
        if (playbackId !== playbackIdRef.current) return;
        if (index === turns.length - 1) {
          finish();
          return;
        }

        pauseTimerRef.current = window.setTimeout(() => {
          pauseTimerRef.current = null;
          speakTurn(index + 1);
        }, turn.pauseAfterMs);
      };
      utterance.onerror = finish;

      utteranceRef.current = utterance;
      synthesis.speak(utterance);
    };

    setSpeaking(true);
    speakTurn(0);
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
