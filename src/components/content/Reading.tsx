import { useTranslation } from '../../hooks/TranslationContext';

// A "word" is a run of letters, allowing internal apostrophes/hyphens
// (l'école, aujourd'hui, week-end). Unicode-aware so accents are included.
const WORD_RE = /([\p{L}]+(?:['’-][\p{L}]+)*)/u;

/**
 * A reading-comprehension passage. Every word is individually clickable for a
 * translation, and selecting any phrase translates it too (handled globally by
 * the TranslationProvider). Passages are plain strings so the text tokenizes
 * cleanly into words.
 */
export function Reading({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  const { translateAt } = useTranslation();

  return (
    <div className="reading">
      <div className="reading-head">
        <span className="reading-badge">Lecture</span>
        <span className="reading-title">{title}</span>
      </div>
      <p className="reading-hint">
        Click any word for its meaning — or select a phrase to translate the whole thing.
      </p>
      {paragraphs.map((para, pi) => (
        <p className="reading-p" key={pi}>
          {para.split(WORD_RE).map((token, ti) =>
            WORD_RE.test(token) ? (
              <span
                key={ti}
                className="tword"
                onClick={(e) => translateAt(token, e.currentTarget.getBoundingClientRect())}
              >
                {token}
              </span>
            ) : (
              token
            ),
          )}
        </p>
      ))}
    </div>
  );
}
