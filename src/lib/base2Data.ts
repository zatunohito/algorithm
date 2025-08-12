
import DocLesson1 from '@/components/lessons/base2/doc/Lesson1';
import ProblemsLesson1 from '@/components/lessons/base2/problems/Lesson1';
import DocLesson2 from '@/components/lessons/base2/doc/Lesson2';
import ProblemsLesson2 from '@/components/lessons/base2/problems/Lesson2';
import DocLesson3 from '@/components/lessons/base2/doc/Lesson3';
import ProblemsLesson3 from '@/components/lessons/base2/problems/Lesson3';
import DocLesson4 from '@/components/lessons/base2/doc/Lesson4';
import ProblemsLesson4 from '@/components/lessons/base2/problems/Lesson4';
import DocLesson5 from '@/components/lessons/base2/doc/Lesson5';
import ProblemsLesson5 from '@/components/lessons/base2/problems/Lesson5';
import DocLesson6 from '@/components/lessons/base2/doc/Lesson6';
import ProblemsLesson6 from '@/components/lessons/base2/problems/Lesson6';

interface LessonData {
  title: string;
  description: string;
  doc: {
    title: string;
    subtitle: string;
    contentComponent: React.ComponentType;
    visualizer?: {
      algorithm: 'linear-search' | 'binary-search' | 'bubble-sort' | 'selection-sort' | 'insertion-sort';
      data: number[];
      target?: number;
    }
  };
  problems: {
    title: string;
    description: string;
    contentComponent: React.ComponentType;
  };
  nextLesson?: string;
}

export const base2Lessons: { [key: string]: LessonData } = {
  '1': {
    title: '線形探索',
    description: '配列の先頭から順番に目的の値を探す基本的な探索アルゴリズムです。',
    doc: {
      title: 'ドキュメント: 線形探索',
      subtitle: '最も基本的な探索アルゴリズム',
      contentComponent: DocLesson1,
      visualizer: {
        algorithm: 'linear-search',
        data: [15, 7, 22, 13, 40],
        target: 13,
      }
    },
    problems: {
      title: '問題集: 線形探索',
      description: 'アルゴリズムの理解度をチェックしよう',
      contentComponent: ProblemsLesson1,
    },
    nextLesson: '2',
  },
  '2': {
    title: '二分探索',
    description: 'ソート済みの配列から高速に目的の値を探す効率的な探索アルゴリズムです。',
    doc: {
      title: 'ドキュメント: 二分探索',
      subtitle: '効率的な探索アルゴリズム',
      contentComponent: DocLesson2,
      visualizer: {
        algorithm: 'binary-search',
        data: [7, 13, 15, 22, 40],
        target: 22,
      }
    },
    problems: {
      title: '問題集: 二分探索',
      description: 'アルゴリズムの理解度をチェックしよう',
      contentComponent: ProblemsLesson2,
    },
    nextLesson: '3',
  },
  '3': {
    title: 'バブルソート',
    description: '隣り合う要素を比較・交換しながら全体を整列させる基本的なソートアルゴリズムです。',
    doc: {
      title: 'ドキュメント: バブルソート',
      subtitle: '基本的なソートアルゴリズム',
      contentComponent: DocLesson3,
      visualizer: {
        algorithm: 'bubble-sort',
        data: [22, 7, 40, 15, 13],
      }
    },
    problems: {
      title: '問題集: バブルソート',
      description: 'アルゴリズムの理解度をチェックしよう',
      contentComponent: ProblemsLesson3,
    },
    nextLesson: '4',
  },
  '4': {
    title: '選択ソート',
    description: '未整列部分から最小値（または最大値）を見つけて整列済み部分に追加していくソートです。',
    doc: {
      title: 'ドキュメント: 選択ソート',
      subtitle: '最小値を見つけて整列',
      contentComponent: DocLesson4,
      visualizer: {
        algorithm: 'selection-sort',
        data: [22, 7, 40, 15, 13],
      }
    },
    problems: {
      title: '問題集: 選択ソート',
      description: 'アルゴリズムの理解度をチェックしよう',
      contentComponent: ProblemsLesson4,
    },
    nextLesson: '5',
  },
  '5': {
    title: '挿入ソート',
    description: '整列済みの部分に新しい要素を適切な位置に挿入していくことで全体を整列させます。',
    doc: {
      title: 'ドキュメント: 挿入ソート',
      subtitle: '適切な位置に挿入して整列',
      contentComponent: DocLesson5,
      visualizer: {
        algorithm: 'insertion-sort',
        data: [22, 7, 40, 15, 13],
      }
    },
    problems: {
      title: '問題集: 挿入ソート',
      description: 'アルゴリズムの理解度をチェックしよう',
      contentComponent: ProblemsLesson5,
    },
    nextLesson: '6',
  },
  '6': {
    title: '再帰',
    description: '関数が自分自身を呼び出すことで問題を解決する強力なプログラミング手法です。',
    doc: {
      title: 'ドキュメント: 再帰',
      subtitle: '自分自身を呼び出す関数',
      contentComponent: DocLesson6,
    },
    problems: {
      title: '問題集: 再帰',
      description: 'アルゴリズムの理解度をチェックしよう',
      contentComponent: ProblemsLesson6,
    },
  },
};
