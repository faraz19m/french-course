import { useEffect, useRef, useState } from 'react';
import type { ListeningExercise } from '../../types';
import { MCQ } from './MCQ';

type ListeningProps = Omit<ListeningExercise, 'kind' | 'title'> & {
  onChecked: (score: number, total: number) => void;
};

/** An audio-first comprehension activity with an optional transcript for review. */
export function Listening({ transcript, items, onChecked }: ListeningProps) {
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechSupported =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window;

  useEffect(
    () => () => {
      if (utteranceRef.current && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    },
    [],
  );

  const stop = () => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setSpeaking(false);
  };

  const play = () => {
    if (!speechSupported) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(transcript.join(' '));
    const frenchVoice = window.speechSynthesis
      .getVoices()
      .find((voice) => voice.lang.toLowerCase().startsWith('fr'));

    utterance.lang = 'fr-FR';
    utterance.rate = 0.85;
    if (frenchVoice) utterance.voice = frenchVoice;
    utterance.onend = () => {
      utteranceRef.current = null;
      setSpeaking(false);
    };
    utterance.onerror = () => {
      utteranceRef.current = null;
      setSpeaking(false);
    };

    utteranceRef.current = utterance;
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
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
