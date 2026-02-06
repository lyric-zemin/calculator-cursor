<script setup lang="ts">
import type { useCalculator } from '@/composables/useCalculator'

defineProps<{
  calc: ReturnType<typeof useCalculator>
}>()
</script>

<template>
  <div class="grid grid-cols-4 gap-2">
    <button
      type="button"
      class="col-span-2 rounded-lg py-3 px-4 border border-cyber-border bg-cyber-panel text-cyber-magenta hover:border-cyber-magenta hover:shadow-glow-magenta transition"
      @click="calc.clear"
    >
      C
    </button>
    <button
      type="button"
      class="rounded-lg py-3 px-4 border border-cyber-border bg-cyber-panel text-cyber-dim hover:border-cyber-cyan transition"
      @click="calc.backspace"
    >
      ←
    </button>
    <button
      type="button"
      class="rounded-lg py-3 px-4 border border-cyber-border bg-cyber-panel text-cyber-cyan hover:border-cyber-cyan hover:shadow-glow-cyan transition"
      @click="calc.setOperator('/')"
    >
      ÷
    </button>

    <button
      v-for="n in [7, 8, 9]"
      :key="n"
      type="button"
      class="rounded-lg py-3 px-4 border border-cyber-border bg-cyber-panel/80 text-gray-200 hover:border-cyber-cyan/60 hover:bg-cyber-panel transition"
      @click="calc.appendNum(String(n))"
    >
      {{ n }}
    </button>
    <button
      type="button"
      class="rounded-lg py-3 px-4 border border-cyber-border bg-cyber-panel text-cyber-cyan hover:border-cyber-cyan hover:shadow-glow-cyan transition"
      @click="calc.setOperator('*')"
    >
      ×
    </button>

    <button
      v-for="n in [4, 5, 6]"
      :key="n"
      type="button"
      class="rounded-lg py-3 px-4 border border-cyber-border bg-cyber-panel/80 text-gray-200 hover:border-cyber-cyan/60 hover:bg-cyber-panel transition"
      @click="calc.appendNum(String(n))"
    >
      {{ n }}
    </button>
    <button
      type="button"
      class="rounded-lg py-3 px-4 border border-cyber-border bg-cyber-panel text-cyber-cyan hover:border-cyber-cyan hover:shadow-glow-cyan transition"
      @click="calc.setOperator('-')"
    >
      −
    </button>

    <button
      v-for="n in [1, 2, 3]"
      :key="n"
      type="button"
      class="rounded-lg py-3 px-4 border border-cyber-border bg-cyber-panel/80 text-gray-200 hover:border-cyber-cyan/60 hover:bg-cyber-panel transition"
      @click="calc.appendNum(String(n))"
    >
      {{ n }}
    </button>
    <button
      type="button"
      class="rounded-lg py-3 px-4 border border-cyber-border bg-cyber-panel text-cyber-cyan hover:border-cyber-cyan hover:shadow-glow-cyan transition"
      @click="calc.setOperator('+')"
    >
      +
    </button>

    <button
      type="button"
      class="col-span-2 rounded-lg py-3 px-4 border border-cyber-border bg-cyber-panel/80 text-gray-200 hover:border-cyber-cyan/60 hover:bg-cyber-panel transition"
      @click="calc.appendNum('0')"
    >
      0
    </button>
    <button
      type="button"
      class="rounded-lg py-3 px-4 border border-cyber-border bg-cyber-panel/80 text-gray-200 hover:border-cyber-cyan/60 hover:bg-cyber-panel transition"
      @click="calc.appendNum('.')"
    >
      .
    </button>
    <button
      type="button"
      class="col-span-2 rounded-lg py-3 px-4 border-2 border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan font-semibold hover:shadow-glow-cyan transition"
      @click="calc.equals"
    >
      =
    </button>
  </div>
</template>
