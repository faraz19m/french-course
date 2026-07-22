import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ListeningExercise } from '../../types';
import { Listening } from './Listening';

const props = {
  pace: 'slow',
  transcript: [
    { speaker: 'Léa', text: 'Bonjour, je suis Léa. J’habite à Lyon.' },
    { speaker: 'Léa', text: 'Enchantée !' },
  ],
  items: [
    {
      q: 'Comment s’appelle la femme ?',
      options: ['Léa', 'Emma'],
      answer: 'Léa',
    },
  ],
} satisfies Omit<ListeningExercise, 'kind' | 'title'>;

const makeVoice = (name: string, lang = 'fr-FR') =>
  ({
    default: false,
    lang,
    localService: true,
    name,
    voiceURI: name,
  }) as SpeechSynthesisVoice;

describe('Listening', () => {
  const speak = vi.fn();
  const cancel = vi.fn();
  const voiceListeners = new Set<EventListener>();
  let availableVoices: SpeechSynthesisVoice[];

  beforeEach(() => {
    vi.useFakeTimers();
    availableVoices = [
      makeVoice('English', 'en-US'),
      makeVoice('French One'),
      makeVoice('French Two'),
    ];
    voiceListeners.clear();
    vi.stubGlobal(
      'SpeechSynthesisUtterance',
      class {
        text: string;
        lang = '';
        pitch = 1;
        rate = 1;
        voice: SpeechSynthesisVoice | null = null;
        onend: (() => void) | null = null;
        onerror: (() => void) | null = null;

        constructor(text: string) {
          this.text = text;
        }
      },
    );
    vi.stubGlobal('speechSynthesis', {
      cancel,
      speak,
      getVoices: () => availableVoices,
      addEventListener: (_name: string, listener: EventListener) => voiceListeners.add(listener),
      removeEventListener: (_name: string, listener: EventListener) =>
        voiceListeners.delete(listener),
    });
  });

  afterEach(() => {
    cleanup();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('keeps a distinct French voice assigned to each speaker', () => {
    render(
      <Listening
        {...props}
        pace="steady"
        transcript={[
          { speaker: 'A', text: 'Bonjour.' },
          { speaker: 'B', text: 'Salut !' },
          { speaker: 'A', text: 'À demain.' },
        ]}
        onChecked={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '▶ Listen to the passage' }));
    const first = speak.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(first.voice?.name).toBe('French One');
    expect(first.rate).toBe(0.9);

    act(() => (first.onend as () => void)());
    act(() => vi.advanceTimersByTime(600));
    const second = speak.mock.calls[1][0] as SpeechSynthesisUtterance;
    expect(second.voice?.name).toBe('French Two');
    expect(second.pitch).toBe(1.1);

    act(() => (second.onend as () => void)());
    act(() => vi.advanceTimersByTime(600));
    expect((speak.mock.calls[2][0] as SpeechSynthesisUtterance).voice?.name).toBe('French One');
    expect(screen.getByText('French · 2 speakers · steady pace')).toBeInTheDocument();
  });

  it('creates restrained speaker contrast when only one French voice is available', () => {
    availableVoices = [makeVoice('Only French')];
    render(
      <Listening
        {...props}
        pace="steady"
        transcript={[
          { speaker: 'A', text: 'Bonjour.' },
          { speaker: 'B', text: 'Bonjour.' },
        ]}
        onChecked={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: '▶ Listen to the passage' }));
    const first = speak.mock.calls[0][0] as SpeechSynthesisUtterance;
    act(() => (first.onend as () => void)());
    act(() => vi.advanceTimersByTime(600));
    const second = speak.mock.calls[1][0] as SpeechSynthesisUtterance;

    expect(first.voice).toBe(second.voice);
    expect(first.pitch).toBe(1);
    expect(second.pitch).toBe(0.92);
    expect(second.rate).toBeCloseTo(0.915);
  });

  it('loads voices that become available after the component mounts', () => {
    availableVoices = [];
    render(<Listening {...props} onChecked={vi.fn()} />);
    availableVoices = [makeVoice('Late French')];

    act(() => voiceListeners.forEach((listener) => listener(new Event('voiceschanged'))));
    fireEvent.click(screen.getByRole('button', { name: '▶ Listen to the passage' }));

    expect((speak.mock.calls[0][0] as SpeechSynthesisUtterance).voice?.name).toBe('Late French');
  });

  it('falls back to the browser French default when no French voice is listed', () => {
    availableVoices = [makeVoice('English', 'en-US')];
    render(<Listening {...props} onChecked={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '▶ Listen to the passage' }));
    const utterance = speak.mock.calls[0][0] as SpeechSynthesisUtterance;

    expect(utterance.voice).toBeNull();
    expect(utterance.lang).toBe('fr-FR');
  });

  it('uses punctuation to add question and exclamation intonation', () => {
    render(
      <Listening
        {...props}
        transcript={[{ speaker: 'Léa', text: 'Tu viens ? C’est parfait !' }]}
        onChecked={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '▶ Listen to the passage' }));

    const question = speak.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(question.text).toBe('Tu viens ?');
    expect(question.pitch).toBe(1.08);
    expect(question.rate).toBeCloseTo(0.81);

    act(() => (question.onend as () => void)());
    act(() => vi.advanceTimersByTime(450));
    const exclamation = speak.mock.calls[1][0] as SpeechSynthesisUtterance;
    expect(exclamation.text).toBe('C’est parfait !');
    expect(exclamation.pitch).toBe(1.1);
    expect(exclamation.rate).toBe(0.85);
  });

  it('honours an authored delivery hint on neutral text', () => {
    render(
      <Listening
        {...props}
        transcript={[{ speaker: 'Léa', text: 'Je ne sais pas.', delivery: 'hesitant' }]}
        onChecked={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: '▶ Listen to the passage' }));

    const utterance = speak.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(utterance.pitch).toBe(0.96);
    expect(utterance.rate).toBe(0.76);
  });

  it('adds a short sentence pause and a longer pause between speaker turns', () => {
    render(<Listening {...props} onChecked={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: '▶ Listen to the passage' }));

    const first = speak.mock.calls[0][0] as SpeechSynthesisUtterance;
    act(() => (first.onend as () => void)());
    act(() => vi.advanceTimersByTime(449));
    expect(speak).toHaveBeenCalledTimes(1);
    act(() => vi.advanceTimersByTime(1));
    expect((speak.mock.calls[1][0] as SpeechSynthesisUtterance).text).toBe('J’habite à Lyon.');

    const second = speak.mock.calls[1][0] as SpeechSynthesisUtterance;
    act(() => (second.onend as () => void)());
    act(() => vi.advanceTimersByTime(799));
    expect(speak).toHaveBeenCalledTimes(2);
    act(() => vi.advanceTimersByTime(1));
    expect((speak.mock.calls[2][0] as SpeechSynthesisUtterance).text).toBe('Enchantée !');
  });

  it('exposes speaker labels in the optional transcript', () => {
    render(<Listening {...props} onChecked={vi.fn()} />);

    screen.getAllByText('Léa :').forEach((label) => expect(label).not.toBeVisible());
    fireEvent.click(screen.getByText('Transcript — open for review'));
    screen.getAllByText('Léa :').forEach((label) => expect(label).toBeVisible());
    expect(screen.getByText(props.transcript[0].text, { exact: false })).toBeVisible();
  });

  it('scores answers through the shared MCQ interaction', () => {
    const onChecked = vi.fn();
    render(<Listening {...props} onChecked={onChecked} />);

    fireEvent.click(screen.getByRole('button', { name: 'Léa' }));
    fireEvent.click(screen.getByRole('button', { name: 'Check answers' }));

    expect(onChecked).toHaveBeenCalledWith(1, 1);
    expect(screen.getByText(/Score : 1 \/ 1/)).toBeInTheDocument();
  });
});
