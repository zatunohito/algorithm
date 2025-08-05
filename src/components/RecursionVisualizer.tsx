'use client'

import { useState, useEffect } from 'react'

interface RecursionVisualizerProps {
  initialValue: number
}

interface CallStack {
  id: number
  value: number
  status: 'calling' | 'waiting' | 'returning'
  result?: number
}

export default function RecursionVisualizer({ initialValue }: RecursionVisualizerProps) {
  const [callStack, setCallStack] = useState<CallStack[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [finalResult, setFinalResult] = useState<number | null>(null)
  const [speed, setSpeed] = useState(800)

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const factorial = async (n: number, callId: number = 0): Promise<number> => {
    // 新しい関数呼び出しをスタックに追加
    setCallStack(prev => [...prev, { id: callId, value: n, status: 'calling' }])
    await sleep(speed)

    // ベースケース
    if (n === 0) {
      setCallStack(prev => prev.map(call => 
        call.id === callId ? { ...call, status: 'returning', result: 1 } : call
      ))
      await sleep(speed)
      return 1
    }

    // 待機状態に変更
    setCallStack(prev => prev.map(call => 
      call.id === callId ? { ...call, status: 'waiting' } : call
    ))

    // 再帰呼び出し
    const result = await factorial(n - 1, callId + 1)
    const finalResult = n * result

    // 結果を返す状態に変更
    setCallStack(prev => prev.map(call => 
      call.id === callId ? { ...call, status: 'returning', result: finalResult } : call
    ))
    await sleep(speed)

    // スタックから削除
    setCallStack(prev => prev.filter(call => call.id !== callId))
    await sleep(speed / 2)

    return finalResult
  }

  const runFactorial = async () => {
    setIsRunning(true)
    setCallStack([])
    setFinalResult(null)
    
    const result = await factorial(initialValue)
    setFinalResult(result)
    setIsRunning(false)
  }

  const reset = () => {
    setCallStack([])
    setFinalResult(null)
    setIsRunning(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'calling': return 'bg-blue-500'
      case 'waiting': return 'bg-yellow-500'
      case 'returning': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">
          factorial({initialValue}) の再帰可視化
        </h3>
        {finalResult !== null && (
          <span className="text-green-400 font-bold">結果: {finalResult}</span>
        )}
      </div>

      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3">呼び出しスタック</h4>
        <div className="min-h-64 bg-gray-800 rounded p-4 flex flex-col-reverse gap-2">
          {callStack.length === 0 && !isRunning && (
            <div className="text-gray-400 text-center py-8">
              開始ボタンを押して再帰の動作を確認してください
            </div>
          )}
          {callStack.map((call, index) => (
            <div
              key={call.id}
              className={`p-3 rounded transition-all duration-300 ${getStatusColor(call.status)} text-white`}
            >
              <div className="flex justify-between items-center">
                <span className="font-mono">factorial({call.value})</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {call.status === 'calling' && '呼び出し中'}
                    {call.status === 'waiting' && '待機中'}
                    {call.status === 'returning' && `返り値: ${call.result}`}
                  </span>
                  <span className="text-xs bg-black/30 px-2 py-1 rounded">
                    #{call.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={runFactorial}
            disabled={isRunning}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded transition-colors"
          >
            {isRunning ? '実行中...' : '開始'}
          </button>
          <button
            onClick={reset}
            disabled={isRunning}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 text-white rounded transition-colors"
          >
            リセット
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-300 text-sm">速度:</label>
          <input
            type="range"
            min="300"
            max="1500"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isRunning}
            className="w-20"
          />
          <span className="text-gray-300 text-sm">{speed}ms</span>
        </div>
      </div>

      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-300">呼び出し中</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span className="text-gray-300">待機中</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-300">返り値計算中</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-800 rounded text-sm text-gray-300">
        <strong>動作説明:</strong> 各関数呼び出しがスタックに積まれ、ベースケース(factorial(0))に到達すると、
        結果が順番に計算されてスタックから取り除かれます。
      </div>
    </div>
  )
}