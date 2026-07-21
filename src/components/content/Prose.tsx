import { Rich } from '../Rich';

/** A body paragraph. `lede` renders the larger introductory style. */
export function Prose({ text, lede = false }: { text: string; lede?: boolean }) {
  return <Rich as="p" className={lede ? 'lede' : undefined} html={text} />;
}
