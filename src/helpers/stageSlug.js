/**
 * Generates a unique URL slug for a stage within a season.
 * If the date is unique → returns the date as-is ("2026-03-15").
 * If duplicate dates exist → appends suffix ("2026-03-15-1", "2026-03-15-2").
 */
export const getStageSlug = (stages, index) => {
  if (!stages || index < 0 || index >= stages.length) return "";
  const date = stages[index].date;
  const sameDate = stages.filter((s) => s.date === date);
  if (sameDate.length <= 1) return date;
  // Find which occurrence this index is among stages with the same date
  let occurrence = 0;
  for (let i = 0; i <= index; i++) {
    if (stages[i].date === date) occurrence++;
  }
  return `${date}-${occurrence}`;
};

/**
 * Resolves a URL slug back to a stage and its index.
 * Returns { stage, index } or { stage: null, index: -1 } if not found.
 */
export const findStageBySlug = (stages, slug) => {
  if (!stages || !slug) return { stage: null, index: -1 };

  // Try exact date match first (for unique dates)
  const exactMatches = stages.reduce((acc, s, i) => {
    if (s.date === slug) acc.push(i);
    return acc;
  }, []);

  if (exactMatches.length === 1) {
    return { stage: stages[exactMatches[0]], index: exactMatches[0] };
  }

  // Parse suffix: "2026-03-15-2" → date="2026-03-15", occurrence=2
  const suffixMatch = slug.match(/^(\d{4}-\d{2}-\d{2})-(\d+)$/);
  if (!suffixMatch) return { stage: null, index: -1 };

  const baseDate = suffixMatch[1];
  const occurrence = parseInt(suffixMatch[2], 10);

  // Find the Nth occurrence of this date
  let count = 0;
  for (let i = 0; i < stages.length; i++) {
    if (stages[i].date === baseDate) {
      count++;
      if (count === occurrence) {
        return { stage: stages[i], index: i };
      }
    }
  }

  return { stage: null, index: -1 };
};
