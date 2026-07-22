import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Listening } from './Listening';

const props = {
  transcript: ['Bonjour, je suis Léa. J’habite à Lyon.', 'Enchantée !'],
  items: [
    {
      q: 'Comment s’appelle la femme ?',
      options: ['Léa', 'Emma'],
      answer: 'Léa',
    },
  ],
};

describe('Listening', () => {
  const speak = vi.fn();
  const cancel = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'SpeechSynthesisUtterance',
      class {
        text: string;
        lang = '';
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
      getVoices: () => [{ lang: 'fr-FR', name: 'Test French' }],
    });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('speaks the original transcript with a browser French voice', () => {
    render(<Listening {...props} onChecked={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '▶ Listen to the passage' }));

    expect(cancel).toHaveBeenCalledOnce();
    expect(speak).toHaveBeenCalledOnce();
    const utterance = speak.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(utterance.text).toBe('Bonjour, je suis Léa.');
    expect(utterance.lang).toBe('fr-FR');
    expect(utterance.rate).toBe(0.85);
    expect(screen.getByRole('button', { name: '■ Stop' })).toBeInTheDocument();
  });

  it('adds a short sentence pause and a longer pause between transcript lines', () => {
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

    const third = speak.mock.calls[2][0] as SpeechSynthesisUtterance;
    act(() => (third.onend as () => void)());
    expect(screen.getByRole('button', { name: '▶ Listen to the passage' })).toBeInTheDocument();
  });

  it('exposes an optional transcript for accessibility and review', () => {
    render(<Listening {...props} onChecked={vi.fn()} />);

    expect(screen.getByText(props.transcript[0])).not.toBeVisible();

    fireEvent.click(screen.getByText('Transcript — open for review'));
    expect(screen.getByText(props.transcript[0])).toBeVisible();
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
