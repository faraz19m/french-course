import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Listening } from './Listening';

const props = {
  transcript: ['Bonjour, je suis Léa.'],
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
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('speaks the original transcript with an on-device French voice', () => {
    render(<Listening {...props} onChecked={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '▶ Listen to the passage' }));

    expect(cancel).toHaveBeenCalledOnce();
    expect(speak).toHaveBeenCalledOnce();
    const utterance = speak.mock.calls[0][0] as SpeechSynthesisUtterance;
    expect(utterance.text).toBe(props.transcript[0]);
    expect(utterance.lang).toBe('fr-FR');
    expect(utterance.rate).toBe(0.85);
    expect(screen.getByRole('button', { name: '■ Stop' })).toBeInTheDocument();
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
