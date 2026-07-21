import { useState } from 'react';
import type { McqItem } from '../../types';

interface MCQProps {
  items: McqItem[];
  onChecked: (score: number, total: number) => void;
}

/** Multiple-choice exercise. One correct option per question. */
export function MCQ({ items, onChecked }: MCQProps) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const score = items.filter((it, i) => selected[i] === it.answer).length;

  const check = () => {
    setChecked(true);
    onChecked(score, items.length);
  };

  const retry = () => {
    setChecked(false);
    setSelected({});
  };

  return (
    <div>
      {items.map((it, i) => (
        <div className="q" key={i}>
          <div className="q-text" dangerouslySetInnerHTML={{ __html: `${i + 1}. ${it.q}` }} />
          <div className="opts">
            {it.options.map((op) => {
              let cls = 'opt';
              if (checked) {
                if (op === it.answer) cls += ' correct';
                else if (selected[i] === op) cls += ' wrong';
              } else if (selected[i] === op) {
                cls += ' sel';
              }
              return (
                <button
                  className={cls}
                  key={op}
                  disabled={checked}
                  onClick={() => setSelected({ ...selected, [i]: op })}
                >
                  {op}
                </button>
              );
            })}
          </div>
          {checked && selected[i] !== it.answer && (
            <div className="fb no">
              → {it.answer}. {it.why ?? ''}
            </div>
          )}
        </div>
      ))}
      <button className="btn btn-check" onClick={checked ? retry : check}>
        {checked ? 'Try again' : 'Check answers'}
      </button>
      {checked && (
        <div className="ex-score">
          Score : {score} / {items.length} {score === items.length ? '— Parfait !' : ''}
        </div>
      )}
    </div>
  );
}
