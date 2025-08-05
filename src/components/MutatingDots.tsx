export default function MutatingDots() {
  return (
    <div className="flex space-x-1">
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-3 h-3 bg-blue-700 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  )
}