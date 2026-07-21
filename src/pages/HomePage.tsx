import { Link } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { studyPlan } from '../data/studyPlan';

/** The course overview: the method, the 60-minute rhythm, and the 12-lesson arc. */
export function HomePage() {
  return (
    <>
      <div className="eyebrow">The method · une heure par jour</div>
      <h1>
        Le Carnet
        <span className="en">
          Your complete French A1 course — 12 one-hour lessons, from "Bonjour" to the past tense.
        </span>
      </h1>
      <p className="lede">
        Study one lesson per sitting. Each is built for a focused 60-minute block: grammar,
        vocabulary, and self-checking exercises with instant feedback. Work top to bottom, then mark
        it complete to fill your progress spine.
      </p>

      <h2>
        <span className="n">◷</span>
        <span>How to spend each hour</span>
      </h2>
      <div className="plan">
        {studyPlan.map((row) => (
          <div className="plan-row" key={row.time}>
            <div className="plan-time">{row.time}</div>
            <div className="plan-body">
              <b>{row.title}</b> — {row.detail}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>The 12-lesson arc</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Lesson</th>
              <th>Grammar focus</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => (
              <tr key={l.id}>
                <td className="fr">{l.id}</td>
                <td>
                  <Link to={`/lesson/${l.slug}`}>{l.fr}</Link>
                </td>
                <td>{l.grammarFocus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="note">
        <b>Tip:</b> your progress is saved in this browser automatically — completed lessons and
        your best exercise scores persist across visits. Speaking out loud beats silent reading
        every time.
      </div>
    </>
  );
}
