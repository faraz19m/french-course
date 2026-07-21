import { Link } from 'react-router-dom';

/** Shown for unknown routes or unresolved lesson slugs. */
export function NotFound({ message }: { message?: string }) {
  return (
    <div className="notfound">
      <div className="eyebrow">404</div>
      <h1>
        Page introuvable
        <span className="en">{message ?? "This page doesn't exist."}</span>
      </h1>
      <p>
        <Link className="fbtn" to="/">
          ← Back to the course
        </Link>
      </p>
    </div>
  );
}
