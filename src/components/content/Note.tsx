import { Rich } from '../Rich';

/** A highlighted aside — tips, warnings, and "watch out for this" callouts. */
export function Note({ text }: { text: string }) {
  return <Rich as="div" className="note" html={text} />;
}
