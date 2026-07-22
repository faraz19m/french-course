import { useEffect, useRef, useState } from 'react';
import type { ListeningExercise } from '../../types';
import { MCQ } from './MCQ';

type ListeningProps = Omit<ListeningExercise, 'kind' | 'title'> & {
  onChecked: (score: number, total: number) => void;
};

const SENTENCE_PAUSE_MS = 450;
const TURN_PAUSE_MS = 800;

interface SpeechSegment {
  text: string;
  pauseAfterMs: number;
}

/** Split authored lines into utterances so pauses do not depend on a browser's punctuation rules. */
function buildSpeechSegments(transcript: string[]): SpeechSegment[] {
  return transcript.flatMap((line) => {
    const sentences = line.match(/[^.!?…]+(?:[.!?…]+|$)/g) ?? [line];

    return sentences
      .map((sentence) => sentence.trim().replace(/^—\s*/, ''))
      .filter(Boolean)
      .map((text, index, all) => ({
        text,
        pauseAfterMs: index === all.length - 1 ? TURN_PAUSE_MS : SENTENCE_PAUSE_MS,
      }));
  });
}

/** An audio-first comprehension activity with an optional transcript for review. */
export function Listening({ transcript, items, onChecked }: ListeningProps) {
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const pauseTimerRef = useRef<number | null>(null);
  const playbackIdRef = useRef(0);
  const speechSupported =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window;

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

    window.speechSynthesis.cancel();
    const segments = buildSpeechSegments(transcript);
    const frenchVoice = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.lang.toLowerCase().startsWith('fr'));
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

      const utterance = new SpeechSynthesisUtterance(segment.text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.85;
      if (frenchVoice) utterance.voice = frenchVoice;
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
      window.speechSynthesis.speak(utterance);
    };

    setSpeaking(true);
    speakSegment(0);
  };

  return (
    <div className="listening">
      <p className="listening-instructions">
        Listen twice before answering. Try not to open the transcript until you have checked your
        answers.
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
        <span className="listening-speed">French voice · slow speed</span>
      </div>
      {!speechSupported && (
        <p className="fb no" role="status">
          Speech playback is unavailable in this browser. Use the transcript to review the passage.
        </p>
      )}
      <details className="listening-transcript">
        <summary>Transcript — open for review</summary>
        <div lang="fr">
          {transcript.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </details>
      <MCQ items={items} onChecked={onChecked} />
    </div>
  );
}
