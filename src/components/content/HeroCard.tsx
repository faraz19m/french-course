import { Rich } from '../Rich';

/** The "what you'll master this hour" panel at the top of each lesson. */
export function HeroCard({ title, goals, pills }: { title: string; goals: string[]; pills?: string[] }) {
  return (
    <div className="hero-card">
      <h3>{title}</h3>
      <ul>
        {goals.map((goal, i) => (
          <Rich as="li" key={i} html={goal} />
        ))}
      </ul>
      {pills && pills.length > 0 && (
        <div className="pills">
          {pills.map((pill) => (
            <span className="pill" key={pill}>
              {pill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
