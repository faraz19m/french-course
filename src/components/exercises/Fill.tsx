import { Fragment, useState } from 'react';
import type { FillItem } from '../../types';
import { normalizeAnswer } from '../../lib/text';

interface FillProps {
  items: FillItem[];
  onChecked: (score: number, total: number) => void;
}

/** Fill-in-the-blank exercise. Each question may contain multiple `___` blanks. */
export function Fill({ items, onChecked }: FillProps) {
  // Keyed by "<questionIndex>:<blankIndex>".
  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const blankOk = (qi: number, bi: number): boolean =>
    items[qi].blanks[bi]
      .map(normalizeAnswer)
      .includes(normalizeAnswer(values[`${qi}:${bi}`] ?? ''));

  const questionOk = (qi: number): boolean => items[qi].blanks.every((_, bi) => blankOk(qi, bi));

  const score = items.filter((_, qi) => questionOk(qi)).length;

  const check = () => {
    setChecked(true);
    onChecked(score, items.length);
  };

  const retry = () => {
    setChecked(false);
    setValues({});
  };

  return (
    <div>
      {items.map((it, qi) => {
        const parts = it.q.split('___');
        return (
          <div className="q" key={qi}>
            <div className="q-text">
              {qi + 1}.{' '}
              {parts.map((part, bi) => (
                <Fragment key={bi}>
                  <span dangerouslySetInnerHTML={{ __html: part }} />
                  {bi < it.blanks.length && (
                    <input
                      className={
                        'fill' + (checked ? (blankOk(qi, bi) ? ' correct' : ' wrong') : '')
                      }
                      value={values[`${qi}:${bi}`] ?? ''}
                      disabled={checked}
                      onChange={(e) => setValues({ ...values, [`${qi}:${bi}`]: e.target.value })}
                      placeholder="…"
                      aria-label={`Blank ${bi + 1}`}
                    />
                  )}
                </Fragment>
              ))}
            </div>
            {it.hint && !checked && <div className="q-hint">{it.hint}</div>}
            {checked && !questionOk(qi) && (
              <div className="fb no">→ {it.blanks.map((b) => b[0]).join('  ·  ')}</div>
            )}
            {checked && questionOk(qi) && <div className="fb ok">✓</div>}
          </div>
        );
      })}
      <button className="btn btn-check" onClick={checked ? retry : check}>
        {checked ? 'Try again' : 'Check answers'}
      </button>
      {checked && (
        <div className="ex-score">
          Score : {score} / {items.length} {score === items.length ? '— Excellent !' : ''}
        </div>
      )}
    </div>
  );
}
