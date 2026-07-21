import type { VocabItem } from '../../types';

/** A responsive grid of vocabulary chips: word · pronunciation · meaning. */
export function Vocab({ items }: { items: VocabItem[] }) {
  return (
    <div className="vocab">
      {items.map((item, i) => (
        <div className="vchip" key={i}>
          <span className="w">{item.fr}</span> <span className="p">{item.pron}</span>
          <br />
          <span className="e">{item.en}</span>
        </div>
      ))}
    </div>
  );
}
