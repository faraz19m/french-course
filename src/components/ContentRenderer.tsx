import type { ContentBlock } from '../types';
import { HeroCard } from './content/HeroCard';
import { Heading } from './content/Heading';
import { Prose } from './content/Prose';
import { Note } from './content/Note';
import { Table } from './content/Table';
import { Vocab } from './content/Vocab';
import { Exercise } from './exercises/Exercise';

/**
 * Turns a lesson's `ContentBlock[]` into React elements — the single place that
 * knows how each block type is presented. Exercises additionally need the
 * lesson id and their running index so their scores can be saved.
 */
export function ContentRenderer({ blocks, lessonId }: { blocks: ContentBlock[]; lessonId: number }) {
  let exerciseIndex = 0;

  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'hero':
            return <HeroCard key={i} title={block.title} goals={block.goals} pills={block.pills} />;
          case 'heading':
            return <Heading key={i} level={block.level} n={block.n} text={block.text} />;
          case 'lede':
            return <Prose key={i} text={block.text} lede />;
          case 'prose':
            return <Prose key={i} text={block.text} />;
          case 'note':
            return <Note key={i} text={block.text} />;
          case 'table':
            return <Table key={i} head={block.head} rows={block.rows} />;
          case 'vocab':
            return <Vocab key={i} items={block.items} />;
          case 'exercise':
            return (
              <Exercise key={i} exercise={block.exercise} lessonId={lessonId} index={exerciseIndex++} />
            );
          default: {
            // Exhaustiveness guard: adding a new block type without handling it
            // here becomes a compile error.
            const _never: never = block;
            return _never;
          }
        }
      })}
    </>
  );
}
