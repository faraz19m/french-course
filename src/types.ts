/**
 * Shared content model for the course.
 *
 * Lessons are authored as plain, typed data (arrays of `ContentBlock`s) rather
 * than as JSX. This keeps content separate from presentation: the same data can
 * be rendered, searched, or validated without touching React. `ContentRenderer`
 * is the single place that maps a block to a component.
 *
 * Text fields (`text`, table cells, `why`…) may contain a small set of trusted,
 * statically-authored inline HTML tags (`<b>`, `<i>`, `<br/>`). They are rendered
 * through the `<Rich>` component, which is the one intentional trusted-HTML
 * boundary in the app. No user input ever flows into these fields.
 */

export interface VocabItem {
  /** French word or phrase. */
  fr: string;
  /** Rough phonetic pronunciation. */
  pron: string;
  /** English meaning. */
  en: string;
}

export interface McqItem {
  /** Prompt (may contain inline HTML). */
  q: string;
  /** Answer options shown as buttons. */
  options: string[];
  /** The single correct option (must be one of `options`). */
  answer: string;
  /** Optional explanation shown when the learner gets it wrong. */
  why?: string;
}

export interface FillItem {
  /**
   * Prompt containing one or more `___` placeholders. Each placeholder becomes
   * an input, matched positionally against `blanks`.
   */
  q: string;
  /**
   * Accepted answers per blank. `blanks[i]` is the list of acceptable strings
   * for the i-th `___` (case- and accent-insensitive comparison is applied by
   * the component). The number of entries must equal the number of `___`.
   */
  blanks: string[][];
  /** Optional hint shown beneath the prompt. */
  hint?: string;
}

export type ListeningDelivery = 'neutral' | 'question' | 'enthusiastic' | 'hesitant';
export type ListeningPace = 'slow' | 'steady' | 'natural';

export interface ListeningTurn {
  /** Stable display label used to keep one voice assigned to the same speaker. */
  speaker: string;
  /** Original French dialogue or narration spoken by this person. */
  text: string;
  /** Optional performance hint; punctuation supplies the default intonation. */
  delivery?: ListeningDelivery;
}

export interface ListeningExercise {
  kind: 'listening';
  title: string;
  /** Speaker-aware transcript, available on demand for accessibility and review. */
  transcript: ListeningTurn[];
  /** Course-controlled speech speed; later lessons approach a natural pace. */
  pace: ListeningPace;
  items: McqItem[];
}

export type Exercise =
  | { kind: 'mcq'; title: string; items: McqItem[] }
  | { kind: 'fill'; title: string; items: FillItem[] }
  | ListeningExercise;

export type ContentBlock =
  | { type: 'hero'; title: string; goals: string[]; pills?: string[] }
  | { type: 'heading'; level: 2 | 3; n?: string; text: string }
  | { type: 'lede'; text: string }
  | { type: 'prose'; text: string }
  | { type: 'note'; text: string }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'vocab'; items: VocabItem[] }
  | { type: 'reading'; title: string; paragraphs: string[] }
  | { type: 'exercise'; exercise: Exercise };

export interface Lesson {
  /** 1-based lesson number, used for ordering and the progress spine. */
  id: number;
  /** URL-safe identifier, e.g. "bonjour" → /#/lesson/bonjour. */
  slug: string;
  /** French title, e.g. "Bonjour !". */
  fr: string;
  /** English subtitle, e.g. "Greetings & introductions". */
  en: string;
  /** One-line grammar summary shown in the course overview table. */
  grammarFocus: string;
  /** Ordered content of the lesson. */
  blocks: ContentBlock[];
}
