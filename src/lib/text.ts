/**
 * Normalises a learner's typed answer for lenient comparison: trims, lowercases,
 * collapses internal whitespace, and strips diacritics — so "chateaux" matches
 * "châteaux". Accents still matter for learning, so the fully-accented form is
 * always shown back in the feedback.
 */
export function normalizeAnswer(s: string): string {
  return (s || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}
