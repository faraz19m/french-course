import { Link, useParams } from 'react-router-dom';
import { adjacentLessons, lessonBySlug, lessons } from '../data/lessons';
import { ContentRenderer } from '../components/ContentRenderer';
import { useProgress } from '../hooks/ProgressContext';
import { NotFound } from './NotFound';

/** Renders a single lesson, resolved from the `:slug` route param. */
export function LessonPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isDone, toggleDone } = useProgress();

  const lesson = slug ? lessonBySlug.get(slug) : undefined;
  if (!lesson) {
    return <NotFound message={`No lesson called "${slug ?? ''}".`} />;
  }

  const done = isDone(lesson.id);
  const { prev, next } = adjacentLessons(lesson.id);

  return (
    <>
      <div className="eyebrow">
        Leçon {lesson.id} sur {lessons.length}
      </div>
      <h1>
        {lesson.fr}
        <span className="en">{lesson.en}</span>
      </h1>

      <ContentRenderer blocks={lesson.blocks} lessonId={lesson.id} />

      <button
        className={'done-btn' + (done ? ' is-done' : '')}
        onClick={() => toggleDone(lesson.id)}
      >
        {done ? '✓ Lesson complete — click to unmark' : 'Mark this lesson complete'}
      </button>

      <div className="footer-nav">
        {prev ? (
          <Link className="fbtn" to={`/lesson/${prev.slug}`}>
            ← Précédent
          </Link>
        ) : (
          <span className="fbtn is-disabled">← Précédent</span>
        )}
        {next ? (
          <Link className="fbtn" to={`/lesson/${next.slug}`}>
            Suivant →
          </Link>
        ) : (
          <span className="fbtn is-disabled">Suivant →</span>
        )}
      </div>
    </>
  );
}
