import { NavLink } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { useProgress } from '../hooks/ProgressContext';

/** The "carnet" spine: brand, progress bar, and the lesson navigation. */
export function Sidebar() {
  const { isDone, completedCount, reset } = useProgress();
  const total = lessons.length;
  const pct = Math.round((completedCount / total) * 100);

  const onReset = () => {
    if (window.confirm('Reset all saved progress? This clears completed lessons and scores.')) {
      reset();
    }
  };

  return (
    <aside className="spine">
      <NavLink to="/" className="brand">
        Le <em>Carnet</em>
      </NavLink>
      <div className="brand-sub">Français · Niveau A1</div>

      <div className="progress-cap">Progress</div>
      <div className="prog-bar">
        <div className="prog-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="prog-num">
        {completedCount} / {total} lessons complete
      </div>
      {completedCount > 0 && (
        <button className="reset-progress" onClick={onReset}>
          reset progress
        </button>
      )}

      <nav>
        <NavLink to="/" end className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
          <span className="nav-dot">◈</span>
          <span className="nav-label">
            <span className="nav-fr">Le plan</span>
            <span className="nav-en">Course overview</span>
          </span>
        </NavLink>
        {lessons.map((l) => (
          <NavLink
            key={l.id}
            to={`/lesson/${l.slug}`}
            className={({ isActive }) =>
              'nav-item' + (isActive ? ' active' : '') + (isDone(l.id) ? ' done' : '')
            }
          >
            <span className="nav-dot">{isDone(l.id) ? '✓' : l.id}</span>
            <span className="nav-label">
              <span className="nav-fr">{l.fr}</span>
              <span className="nav-en">{l.en}</span>
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
