interface ProblemSectionProps {
  title: string
  code: string
  answer: string
  explanation: string
}

export default function ProblemSection({ title, code, answer, explanation }: ProblemSectionProps) {
  return (
    <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
      <h3 className="text-xl font-semibold text-white mt-0 mb-4">{title}</h3>
      <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
        <code dangerouslySetInnerHTML={{ __html: code }} />
      </pre>
      <details className="mt-4 group">
        <summary className="cursor-pointer text-blue-400 hover:text-blue-300 list-none group-open:text-white">
          答えを見る
        </summary>
        <div className="mt-2 pt-4 border-t border-gray-700 text-gray-300">
          <p><strong className="text-white">答え:</strong> {answer}</p>
          <p className="mt-2">
            <strong className="text-white">理由:</strong> {explanation}
          </p>
        </div>
      </details>
    </div>
  )
}