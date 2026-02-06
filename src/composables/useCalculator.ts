import { ref, computed } from 'vue'
import Decimal from 'decimal.js'
import type { Op, HistoryItem } from '@/types/calculator'

const HISTORY_KEY = 'cyber-calc-history'
const MAX_HISTORY = 50

// 格式化数字显示：去除不必要的尾随零，但保留小数
function formatNumber(value: Decimal | number | string): string {
  const d = new Decimal(value)
  if (d.isNaN() || !d.isFinite()) return 'Error'
  
  // 转换为字符串，去除尾随零
  let str = d.toString()
  
  // 如果是整数，直接返回
  if (!str.includes('.')) return str
  
  // 去除尾随零和小数点（如果小数部分全为0）
  str = str.replace(/\.?0+$/, '')
  
  return str || '0'
}

function loadHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveHistory(list: HistoryItem[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(-MAX_HISTORY)))
}

export function useCalculator() {
  const currentInput = ref('')
  const prevValue = ref<Decimal | null>(null)
  const currentOp = ref<Op | null>(null)
  const isResultState = ref(false)
  const history = ref<HistoryItem[]>(loadHistory())

  const displayValue = computed(() => {
    const s = currentInput.value.trim()
    return s === '' ? '0' : s
  })

  const expressionLine = computed(() => {
    if (prevValue.value === null || currentOp.value === null) return ''
    const opSymbol = currentOp.value === '*' ? '×' : currentOp.value === '/' ? '÷' : currentOp.value
    return `${formatNumber(prevValue.value)} ${opSymbol}`
  })

  function applyOp(a: Decimal, op: Op, b: Decimal): Decimal {
    try {
      switch (op) {
        case '+':
          return a.add(b)
        case '-':
          return a.sub(b)
        case '*':
          return a.mul(b)
        case '/':
          if (b.isZero()) return new Decimal(NaN)
          return a.div(b)
        default:
          return b
      }
    } catch {
      return new Decimal(NaN)
    }
  }

  function parseInput(): Decimal {
    const s = currentInput.value.trim()
    if (s === '' || s === '.' || s === '-.') return new Decimal(0)
    try {
      return new Decimal(s)
    } catch {
      return new Decimal(0)
    }
  }

  function appendNum(digit: string) {
    if (isResultState.value) {
      currentInput.value = ''
      isResultState.value = false
    }
    if (digit === '.' && currentInput.value.includes('.')) return
    if (digit === '0' && currentInput.value === '0' && !currentInput.value.includes('.')) return
    if (digit !== '.' && currentInput.value === '0' && !currentInput.value.includes('.')) {
      currentInput.value = digit
      return
    }
    currentInput.value += digit
  }

  function setOperator(op: Op) {
    const num = parseInput()
    if (prevValue.value !== null && currentOp.value !== null && !isResultState.value) {
      const result = applyOp(prevValue.value, currentOp.value, num)
      if (result.isNaN() || !result.isFinite()) {
        currentInput.value = 'Error'
        isResultState.value = true
        prevValue.value = null
        currentOp.value = null
        return
      }
      prevValue.value = result
      currentInput.value = formatNumber(result)
    } else {
      prevValue.value = num
    }
    currentOp.value = op
    isResultState.value = true
  }

  function equals() {
    if (prevValue.value === null || currentOp.value === null) return
    const num = parseInput()
    const result = applyOp(prevValue.value, currentOp.value, num)
    if (result.isNaN() || !result.isFinite()) {
      currentInput.value = 'Error'
      isResultState.value = true
      prevValue.value = null
      currentOp.value = null
      return
    }
    const prevStr = formatNumber(prevValue.value)
    const numStr = currentInput.value
    const opSymbol = currentOp.value === '*' ? '×' : currentOp.value === '/' ? '÷' : currentOp.value
    const expr = `${prevStr} ${opSymbol} ${numStr}`
    const resultNum = result.toNumber()
    history.value = [...history.value, { expression: expr, result: resultNum }]
    saveHistory(history.value)
    currentInput.value = formatNumber(result)
    prevValue.value = null
    currentOp.value = null
    isResultState.value = true
  }

  function clear() {
    currentInput.value = ''
    prevValue.value = null
    currentOp.value = null
    isResultState.value = false
  }

  function backspace() {
    if (isResultState.value) return
    currentInput.value = currentInput.value.slice(0, -1)
  }

  function fillFromHistory(item: HistoryItem, useResult: boolean) {
    if (useResult) {
      currentInput.value = formatNumber(item.result)
    } else {
      currentInput.value = item.expression
    }
    isResultState.value = false
  }

  function clearHistory() {
    history.value = []
    saveHistory([])
  }

  return {
    currentInput,
    displayValue,
    expressionLine,
    prevValue,
    currentOp,
    history,
    appendNum,
    setOperator,
    equals,
    clear,
    backspace,
    fillFromHistory,
    clearHistory,
  }
}
