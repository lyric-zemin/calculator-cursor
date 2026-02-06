import { defineConfig } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      cyber: {
        bg: '#0a0a0f',
        panel: '#12121a',
        border: '#1e2a3a',
        cyan: '#00f5ff',
        magenta: '#ff00aa',
        yellow: '#f0e040',
        green: '#00ff88',
        dim: '#4a5568',
      },
    },
    fontFamily: {
      mono: ['"JetBrains Mono"', '"Share Tech Mono"', 'monospace'],
      display: ['Orbitron', 'monospace'],
    },
    boxShadow: {
      glow: '0 0 20px currentColor',
      'glow-cyan': '0 0 20px #00f5ff',
      'glow-magenta': '0 0 20px #ff00aa',
    },
  },
})
