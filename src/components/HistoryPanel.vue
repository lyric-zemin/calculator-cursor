<script setup lang="ts">
import { computed } from 'vue'
import type { HistoryItem } from '@/types/calculator'

const props = defineProps<{
  history: HistoryItem[]
}>()

const emit = defineEmits<{
  fill: [item: HistoryItem, useResult: boolean]
  clear: []
}>()

const historyList = computed(() => {
  if (!props.history || !Array.isArray(props.history)) return []
  return props.history
})
</script>

<template>
  <section
    class="w-full md:w-64 md:flex-shrink-0 md:max-w-64 rounded-xl border-2 border-cyber-border bg-cyber-panel/90 backdrop-blur p-4 flex flex-col max-h-80"
  >
    <div class="flex items-center justify-between mb-3">
      <h2 class="font-display text-sm font-semibold text-cyber-magenta tracking-wider">HISTORY</h2>
      <button
        v-if="historyList.length > 0"
        type="button"
        class="text-xs text-cyber-dim hover:text-cyber-magenta transition"
        @click="emit('clear')"
      >
        清空
      </button>
    </div>
    <ul class="flex-1 overflow-y-auto space-y-2 pr-2 history-scroll">
      <li
        v-for="(item, i) in [...historyList].reverse()"
        :key="`${item.expression}-${item.result}-${i}`"
        class="rounded border border-cyber-border bg-black/30 p-2 text-xs cursor-pointer hover:border-cyber-cyan/60 transition group"
        @click="emit('fill', item, true)"
      >
        <div class="text-cyber-dim truncate">{{ item.expression }}</div>
        <div class="text-cyber-cyan font-mono mt-0.5 tabular-nums">= {{ item.result }}</div>
      </li>
      <li v-if="historyList.length === 0" class="text-cyber-dim text-xs py-4 text-center">
        暂无记录
      </li>
    </ul>
  </section>
</template>
