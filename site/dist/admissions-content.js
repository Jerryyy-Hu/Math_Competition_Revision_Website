import { admissionsFrameworks } from './admissions-framework.js';
import { tmuaContent } from './tmua-content.js';
import { stepPureContent } from './step-pure-content.js';
import { stepFurtherPureContent } from './step-further-pure-content.js';
import { stepMechanicsContent } from './step-mechanics-content.js';
import { stepStatisticsContent } from './step-statistics-content.js';

const content = {
  tmua: tmuaContent,
  step: { ...stepPureContent, ...stepFurtherPureContent, ...stepMechanicsContent, ...stepStatisticsContent },
};

/** Require the approved framework and authored chapters to match exactly. */
export const admissionsCollections = structuredClone(admissionsFrameworks).map((collection) => {
  const used = new Set();
  for (const subject of collection.subjects) {
    subject.topics = subject.topics.map((chapter) => {
      const key = `${subject.id}/${chapter.id}`;
      const authored = content[collection.id][key];
      if (!authored) throw new Error(`Missing admissions chapter: ${collection.id}/${key}`);
      used.add(key);
      const defaultScope = collection.id === 'step' ? (chapter.scope === 'STEP 3' ? 'STEP 3' : 'STEP 2 & 3') : chapter.scope;
      const bullets = structuredClone(authored.bullets).map((item) => ({ ...item, scope: item.scope || defaultScope }));
      return {
        ...chapter, bullets,
        exercises: structuredClone(authored.exercises).map((problem) => ({ ...problem, scope: problem.scope || defaultScope })),
        keywords: [...new Set(bullets.flatMap((item) => item.keywords))],
        sources: [collection.sources[0]],
      };
    });
  }
  for (const key of Object.keys(content[collection.id])) {
    if (!used.has(key)) throw new Error(`Unmapped admissions chapter: ${collection.id}/${key}`);
  }
  return collection;
});
