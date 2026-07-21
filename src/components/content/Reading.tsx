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
          {/* split() with a single capturing group interleaves separators and
              matches, so word tokens always land at odd indices. */}
          {para.split(WORD_RE).map((token, ti) =>
            ti % 2 === 1 ? (
              <span
                key={ti}
                className="tword"
                role="button"
                tabIndex={0}
                onClick={(e) => translateAt(token, e.currentTarget.getBoundingClientRect())}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    translateAt(token, e.currentTarget.getBoundingClientRect());
                  }
                }}
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
