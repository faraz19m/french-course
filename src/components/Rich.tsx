/**
 * Renders a string that may contain a small set of trusted, statically-authored
 * inline HTML tags (`<b>`, `<i>`, `<br/>`, `<em>`). This is the single, explicit
 * trusted-HTML boundary in the app: every value passed here originates in the
 * course data under `src/data`, never from user input.
 */
export function Rich({ html, as: Tag = 'span', className }: { html: string; as?: 'span' | 'p' | 'div' | 'li'; className?: string }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
