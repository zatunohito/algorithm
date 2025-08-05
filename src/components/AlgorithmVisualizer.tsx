'use client'

import { useState, useEffect } from 'react'

interface VisualizerProps {
  algorithm: 'linear-search' | 'binary-search' | 'bubble-sort' | 'selection-sort' | 'insertion-sort'
  data: number[]
  target?: number
}

export default function AlgorithmVisualizer({ algorithm, data, target }: VisualizerProps) {
  const initialData = algorithm === 'binary-search' ? [...data].sort((a, b) => a - b) : data
  const [currentData, setCurrentData] = useState(initialData)
  const [originalData, setOriginalData] = useState(initialData)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [compareIndex, setCompareIndex] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [step, setStep] = useState(0)
  const [found, setFound] = useState(false)
  const [speed, setSpeed] = useState(500)
  const [barCount, setBarCount] = useState(data.length)
  const [editingIndex, setEditingIndex] = useState(-1)
  const [editValue, setEditValue] = useState('')
  const [operationCount, setOperationCount] = useState(0)
  const [comparisonCount, setComparisonCount] = useState(0)
  const [swapCount, setSwapCount] = useState(0)
  const [selectedTarget, setSelectedTarget] = useState(target || initialData[0])
  const [searchPath, setSearchPath] = useState<number[]>([])
  const [binarySearchRange, setBinarySearchRange] = useState<{left: number, right: number} | null>(null)

  const reset = () => {
    setCurrentData([...originalData])
    setCurrentIndex(-1)
    setCompareIndex(-1)
    setStep(0)
    setFound(false)
    setIsRunning(false)
    setOperationCount(0)
    setComparisonCount(0)
    setSwapCount(0)
    setSearchPath([])
    setBinarySearchRange(null)
  }

  const generateRandomData = (count: number) => {
    let newData = Array.from({ length: count }, () => Math.floor(Math.random() * 90) + 10)
    if (algorithm === 'binary-search') {
      newData.sort((a, b) => a - b)
    }
    setOriginalData(newData)
    setCurrentData([...newData])
    setBarCount(count)
  }

  const handleBarCountChange = (count: number) => {
    if (isRunning) return
    generateRandomData(count)
  }

  const handleValueEdit = (index: number, value: string) => {
    if (isRunning) return
    const numValue = parseInt(value)
    if (isNaN(numValue) || numValue < 1 || numValue > 100) return
    
    let newData = [...originalData]
    newData[index] = numValue
    
    if (algorithm === 'binary-search') {
      newData.sort((a, b) => a - b)
    }
    
    setOriginalData(newData)
    setCurrentData([...newData])
    setEditingIndex(-1)
    setEditValue('')
  }

  const startEdit = (index: number) => {
    if (isRunning) return
    setEditingIndex(index)
    setEditValue(originalData[index].toString())
  }

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const linearSearch = async () => {
    if (!selectedTarget) return
    setIsRunning(true)
    let comparisons = 0
    const path: number[] = []
    
    for (let i = 0; i < currentData.length; i++) {
      setCurrentIndex(i)
      path.push(i)
      setSearchPath([...path])
      comparisons++
      setComparisonCount(comparisons)
      setOperationCount(comparisons)
      await sleep(speed)
      
      if (currentData[i] === selectedTarget) {
        setFound(true)
        break
      }
    }
    setIsRunning(false)
  }

  const binarySearch = async () => {
    if (!selectedTarget) return
    
    // 探索値が存在するかチェック
    if (!originalData.includes(selectedTarget)) {
      const randomValue = originalData[Math.floor(Math.random() * originalData.length)]
      setSelectedTarget(randomValue)
      return
    }
    
    setIsRunning(true)
    let comparisons = 0
    const path: number[] = []
    
    let left = 0
    let right = currentData.length - 1
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      setCurrentIndex(mid)
      setBinarySearchRange({left, right})
      path.push(mid)
      setSearchPath([...path])
      comparisons++
      setComparisonCount(comparisons)
      setOperationCount(comparisons)
      await sleep(speed)
      
      if (currentData[mid] === selectedTarget) {
        setFound(true)
        break
      } else if (currentData[mid] < selectedTarget) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    setIsRunning(false)
  }

  const bubbleSort = async () => {
    setIsRunning(true)
    const arr = [...currentData]
    let comparisons = 0
    let swaps = 0
    
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setCurrentIndex(j)
        setCompareIndex(j + 1)
        comparisons++
        setComparisonCount(comparisons)
        setOperationCount(comparisons + swaps)
        await sleep(speed)
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          swaps++
          setSwapCount(swaps)
          setOperationCount(comparisons + swaps)
          setCurrentData([...arr])
          await sleep(speed)
        }
      }
    }
    setCurrentIndex(-1)
    setCompareIndex(-1)
    setIsRunning(false)
  }

  const selectionSort = async () => {
    setIsRunning(true)
    const arr = [...currentData]
    let comparisons = 0
    let swaps = 0
    
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i
      setCurrentIndex(i)
      
      for (let j = i + 1; j < arr.length; j++) {
        setCompareIndex(j)
        comparisons++
        setComparisonCount(comparisons)
        setOperationCount(comparisons + swaps)
        await sleep(speed)
        
        if (arr[j] < arr[minIndex]) {
          minIndex = j
        }
      }
      
      if (minIndex !== i) {
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        swaps++
        setSwapCount(swaps)
        setOperationCount(comparisons + swaps)
        setCurrentData([...arr])
        await sleep(speed)
      }
    }
    setCurrentIndex(-1)
    setCompareIndex(-1)
    setIsRunning(false)
  }

  const insertionSort = async () => {
    setIsRunning(true)
    const arr = [...currentData]
    let comparisons = 0
    let shifts = 0
    
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i]
      let j = i - 1
      setCurrentIndex(i)
      
      while (j >= 0 && arr[j] > key) {
        setCompareIndex(j)
        comparisons++
        setComparisonCount(comparisons)
        setOperationCount(comparisons + shifts)
        await sleep(speed)
        
        arr[j + 1] = arr[j]
        shifts++
        setSwapCount(shifts)
        setOperationCount(comparisons + shifts)
        setCurrentData([...arr])
        j--
      }
      
      if (j >= 0) {
        comparisons++
        setComparisonCount(comparisons)
        setOperationCount(comparisons + shifts)
      }
      
      arr[j + 1] = key
      setCurrentData([...arr])
      await sleep(speed)
    }
    setCurrentIndex(-1)
    setCompareIndex(-1)
    setIsRunning(false)
  }

  const runAlgorithm = () => {
    reset()
    setTimeout(() => {
      switch (algorithm) {
        case 'linear-search':
          linearSearch()
          break
        case 'binary-search':
          binarySearch()
          break
        case 'bubble-sort':
          bubbleSort()
          break
        case 'selection-sort':
          selectionSort()
          break
        case 'insertion-sort':
          insertionSort()
          break
      }
    }, 100)
  }

  const getBarColor = (index: number) => {
    if (found && index === currentIndex) return 'bg-green-500'
    if (index === currentIndex) return 'bg-red-500'
    if (index === compareIndex) return 'bg-yellow-500'
    if (algorithm.includes('search') && searchPath.includes(index)) return 'bg-purple-400'
    if (algorithm === 'binary-search' && binarySearchRange && 
        (index < binarySearchRange.left || index > binarySearchRange.right)) return 'bg-gray-600'
    return 'bg-blue-500'
  }

  return (
    <div className="p-6 bg-gray-900/60 rounded-lg border border-gray-800">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h3 className="text-xl font-semibold text-white">
          {algorithm === 'linear-search' && '線形探索'}
          {algorithm === 'binary-search' && '二分探索'}
          {algorithm === 'bubble-sort' && 'バブルソート'}
          {algorithm === 'selection-sort' && '選択ソート'}
          {algorithm === 'insertion-sort' && '挿入ソート'}
          の可視化
        </h3>
        <div className="flex gap-4 text-sm">
          {algorithm.includes('search') && (
            <span className="text-gray-300">探索値: {selectedTarget}</span>
          )}
          {(algorithm.includes('search') && operationCount > 0) && (
            <span className="text-blue-300">比較回数: {operationCount}</span>
          )}
          {(algorithm.includes('sort') && operationCount > 0) && (
            <>
              <span className="text-yellow-300">比較: {comparisonCount}</span>
              <span className="text-green-300">
                {algorithm === 'insertion-sort' ? 'シフト' : '交換'}: {swapCount}
              </span>
              <span className="text-blue-300">合計: {operationCount}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-end justify-center h-64 mb-4 bg-gray-800 rounded p-4 overflow-x-auto">
        {currentData.map((value, index) => (
          <div
            key={index}
            className={`mx-1 flex flex-col items-center transition-all duration-300 ${getBarColor(index)} cursor-pointer`}
            style={{ 
              height: `${(value / Math.max(...originalData)) * 200}px`, 
              minWidth: `${Math.max(25, 200 / barCount)}px`,
              maxWidth: '50px'
            }}
            onClick={() => startEdit(index)}
          >
            {editingIndex === index ? (
              <input
                type="number"
                min="1"
                max="100"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => handleValueEdit(index, editValue)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleValueEdit(index, editValue)
                  if (e.key === 'Escape') { setEditingIndex(-1); setEditValue('') }
                }}
                className="w-8 h-4 text-xs text-center bg-gray-700 text-white border-none rounded"
                autoFocus
              />
            ) : (
              <span className="text-white text-xs mb-1 select-none">{value}</span>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {algorithm.includes('search') && (
          <div className="flex items-center gap-2 mb-4">
            <label className="text-gray-300 text-sm">探索値:</label>
            <select
              value={selectedTarget}
              onChange={(e) => setSelectedTarget(Number(e.target.value))}
              disabled={isRunning}
              className="px-2 py-1 bg-gray-700 text-white rounded text-sm"
            >
              {[...originalData].sort((a, b) => a - b).map((value, index) => (
                <option key={index} value={value}>{value}</option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex gap-2">
            <button
              onClick={runAlgorithm}
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
              min="30"
              max="1000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isRunning}
              className="w-20"
            />
            <span className="text-gray-300 text-sm">{speed}ms</span>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-gray-300 text-sm">棒の数:</label>
            <input
              type="range"
              min="2"
              max="25"
              value={barCount}
              onChange={(e) => handleBarCountChange(Number(e.target.value))}
              disabled={isRunning}
              className="w-20"
            />
            <span className="text-gray-300 text-sm">{barCount}本</span>
          </div>
          
          <button
            onClick={() => generateRandomData(barCount)}
            disabled={isRunning}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 text-white text-sm rounded transition-colors"
          >
            ランダム生成
          </button>
        </div>
      </div>

      {found && (
        <div className="mt-4 p-2 bg-green-900/50 border border-green-700 rounded text-green-300 text-center">
          値 {selectedTarget} が見つかりました！
        </div>
      )}

      {/* 探索経路のツリー表示 */}
      {algorithm.includes('search') && searchPath.length > 0 && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          {/* 線形探索のツリー */}
          {algorithm === 'linear-search' && (
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">🔍 線形探索の進行:</h4>
              <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                <div className="flex items-center space-x-1">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    START
                  </div>
                </div>
                {searchPath.map((index, step) => (
                  <div key={step} className="flex items-center space-x-1">
                    <div className="w-8 h-1 bg-gray-400 rounded"></div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg ${
                      found && step === searchPath.length - 1 ? 'bg-green-500' : 'bg-purple-600'
                    }`}>
                      {originalData[index]}
                    </div>
                    <div className="text-xs text-gray-400 px-1">
                      {originalData[index] === selectedTarget ? '✓' : '≠'}
                    </div>
                  </div>
                ))}
                {!found && (
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-1 bg-gray-400 rounded"></div>
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                      END
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 二分探索のツリー */}
          {algorithm === 'binary-search' && (
            <div>
              <h4 className="text-white font-semibold mb-4 text-lg">🎯 二分探索の進行:</h4>
              <div className="space-y-4">
                {searchPath.map((index, step) => {
                  const value = originalData[index]
                  const isFound = found && step === searchPath.length - 1
                  const comparison = value === selectedTarget ? '=' : value < selectedTarget ? '<' : '>'
                  
                  return (
                    <div key={step} className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
                      <div className="text-sm text-gray-400 w-12 font-mono">
                        Step {step + 1}
                      </div>
                      <div className={`w-16 h-10 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-lg ${
                        isFound ? 'bg-green-500' : 'bg-purple-600'
                      }`}>
                        {value}
                      </div>
                      <div className="text-lg text-gray-200 font-mono">
                        {value} {comparison} {selectedTarget}
                      </div>
                      <div className="text-sm flex-1">
                        {isFound ? (
                          <span className="text-green-400 font-semibold">→ 🎉 発見！</span>
                        ) : (
                          <span className="text-blue-400">
                            → {comparison === '<' ? '👉 右半分を探索' : '👈 左半分を探索'}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 space-y-2">
        <div className="flex gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-300">現在の位置</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-gray-300">比較中</span>
          </div>
          {algorithm.includes('search') && (
            <>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-400 rounded"></div>
                <span className="text-gray-300">探索済み</span>
              </div>
              {algorithm === 'binary-search' && (
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-gray-600 rounded"></div>
                  <span className="text-gray-300">探索範囲外</span>
                </div>
              )}
            </>
          )}
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-300">発見</span>
          </div>
        </div>
        <p className="text-xs text-gray-400">
          💡 棒をクリックして数値を編集できます（1-100）
        </p>
      </div>
    </div>
  )
}