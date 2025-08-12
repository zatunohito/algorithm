'use client';

import { Content } from '@/lib/base1Data';
import SectionHeader from './SectionHeader';
import CodeExample from './CodeExample';
import ProblemSection from './ProblemSection';

interface LessonContentRendererProps {
  content: Content[];
}

const FlowchartBox = ({ title, content }: { title: string, content: string }) => (
  <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
    <h3 className="text-xl font-semibold text-white mt-0 mb-4">{title}</h3>
    <div className="flex justify-center items-center">
      <div className="border-2 border-blue-400 rounded-full px-8 py-3 text-white font-mono text-lg bg-gray-800/50">
        {content}
      </div>
    </div>
  </div>
);

export default function LessonContentRenderer({ content }: LessonContentRendererProps) {
  return (
    <div className="space-y-8">
      {content.map((item, index) => {
        switch (item.type) {
          case 'header':
            return <SectionHeader key={index} title={item.title!} />;
          case 'paragraph':
            return <p key={index} dangerouslySetInnerHTML={{ __html: item.text! }} />;
          case 'list':
            return (
              <ul key={index} className="list-disc pl-8 space-y-2">
                {item.items!.map((li, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: li }} />
                ))}
              </ul>
            );
          case 'code':
            return (
              <CodeExample
                key={index}
                title={item.title!}
                code={item.code!}
                description={item.description}
              />
            );
          case 'problem':
            return (
              <ProblemSection
                key={index}
                title={item.title!}
                code={item.code!}
                answer={item.answer!}
                explanation={item.explanation!}
              />
            );
          case 'flowchart-box':
            return (
              <FlowchartBox
                key={index}
                title={item.title!}
                content={item.content!}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
