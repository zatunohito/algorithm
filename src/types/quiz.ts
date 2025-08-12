
export interface Question {
  id: number;
  text: string;
  code?: string;
  image?: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}
