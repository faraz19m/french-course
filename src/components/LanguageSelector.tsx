import { useSettings } from '../hooks/SettingsContext';
import { BASE_LANGUAGES } from '../lib/languages';

/**
 * Lets the learner pick the language they already know. Translations flow
 * between French and this choice: highlight French to see it in this language,
 * or highlight this language to see the French. A native `<select>` keeps it
 * keyboard- and screen-reader-friendly with no extra dependencies.
 */
export function LanguageSelector() {
  const { baseLanguage, setBaseLanguage } = useSettings();

  return (
    <label className="lang-select">
      <span className="lang-select-label">Translate with</span>
      <select
        value={baseLanguage}
        onChange={(e) => setBaseLanguage(e.target.value)}
        aria-label="Language to translate French with"
      >
        {BASE_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </label>
  );
}
