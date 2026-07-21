/**
 * A reference table. The first column is emphasised (the French term); all cells
 * may carry the trusted inline markup used throughout the course data.
 */
export function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <table>
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td
                key={j}
                className={j === 0 ? 'fr' : undefined}
                dangerouslySetInnerHTML={{ __html: cell }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
