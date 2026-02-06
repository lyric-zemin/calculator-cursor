<script setup lang="ts">
import { useCalculator } from '@/composables/useCalculator'
import CalculatorKeypad from '@/components/CalculatorKeypad.vue'
import HistoryPanel from '@/components/HistoryPanel.vue'

const calc = useCalculator()
</script>

<template>
  <div
    class="min-h-screen bg-cyber-bg text-gray-200 font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden"
  >
    <!-- 赛博朋克背景网格 -->
    <div
      class="absolute inset-0 opacity-20 pointer-events-none"
      style="
        background-image:
          linear-gradient(rgba(0, 245, 255, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 245, 255, 0.15) 1px, transparent 1px);
        background-size: 24px 24px;
      "
    />
    <div class="absolute inset-0 bg-gradient-to-b from-cyber-cyan/5 to-transparent pointer-events-none" />

    <header class="relative z-1 text-center mb-6">
      <h1 class="font-display text-2xl font-bold tracking-widest text-cyber-cyan drop-shadow-[0_0_12px_#00f5ff]">
        CYBER CALC
      </h1>
    </header>

    <div class="relative z-1 flex flex-col md:flex-row gap-6 items-start w-full max-w-4xl px-4">
      <!-- 计算器主体 -->
      <section
        class="w-full md:w-auto md:min-w-[280px] md:flex-shrink-0 rounded-xl border-2 border-cyber-border bg-cyber-panel/90 backdrop-blur p-4 shadow-glow-cyan/20"
      >
        <div class="mb-4 rounded-lg bg-black/50 border border-cyber-border p-3 min-h-20 flex flex-col justify-end">
          <div
            class="h-5 text-cyber-dim text-sm font-mono mb-1 text-right transition-opacity duration-150"
            :class="calc.expressionLine ? 'opacity-100' : 'opacity-0'"
          >
            {{ calc.expressionLine || ' ' }}
          </div>
          <div
            class="text-right text-2xl font-display font-semibold text-cyber-cyan break-all tabular-nums"
            aria-live="polite"
          >
            {{ calc.displayValue }}
          </div>
        </div>
        <CalculatorKeypad :calc="calc" />
      </section>

      <!-- 历史记录 -->
      <HistoryPanel :history="calc.history.value" @fill="calc.fillFromHistory" @clear="calc.clearHistory" />
    </div>
  </div>
</template>
