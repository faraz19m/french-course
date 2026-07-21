import { Rich } from '../Rich';

/**
 * A section heading. Level 2 headings carry an optional monospace section number
 * (e.g. "1.2"); level 3 are plain sub-headings. Titles may contain inline markup.
 */
export function Heading({ level, n, text }: { level: 2 | 3; n?: string; text: string }) {
  if (level === 3) {
    return <Rich as="h3" html={text} />;
  }
  return (
    <h2>
      {n && <span className="n">{n}</span>}
      <Rich html={text} />
    </h2>
  );
}
