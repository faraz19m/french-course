/**
 * Normalises a learner's typed answer for lenient comparison: trims, lowercases,
 * collapses internal whitespace, unifies apostrophe styles, expands the œ/æ
 * ligatures, and strips diacritics — so "chateaux" matches "châteaux", "soeur"
 * matches "sœur", and "n'a" typed with a curly apostrophe matches "n'a". Accents
 * still matter for learning, so the fully-accented form is always shown back in
 * the feedback.
 */
export function normalizeAnswer(s: string): string {
  return (s || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    // Mobile "smart punctuation" types a curly ’ (and variants); course data uses
    // a straight '. Treat them as equal so a correct elision isn't marked wrong.
    .replace(/[‘’ʼ]/g, "'")
    // NFD leaves these ligatures intact, so expand them explicitly.
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}
