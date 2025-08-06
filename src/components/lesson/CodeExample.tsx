interface CodeExampleProps {
  title: string
  code: string
  description?: string
}

export default function CodeExample({ title, code, description }: CodeExampleProps) {
  return (
    <div className="my-4 p-6 bg-gray-900/60 rounded-lg border border-gray-800">
      <h3 className="text-xl font-semibold text-white mt-0 mb-4">{title}</h3>
      <pre className="bg-gray-900 p-4 rounded-md text-white font-mono text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
      {description && <p className="mt-4">{description}</p>}
    </div>
  )
}