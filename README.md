# 赛博朋克计算器

Vue 3 + Vite + TypeScript + UnoCSS + pnpm 实现的赛博朋克风格计算器，支持四则运算、运算前编辑输入、历史记录查看与代入。

## 技术栈

- **Vue 3** (Composition API + `<script setup>`)
- **Vite** 构建
- **TypeScript**
- **UnoCSS** 原子化样式与赛博朋克主题
- **pnpm** 包管理

## 功能

- 加减乘除运算，支持连续运算（如 1 + 2 + 3）
- 运算前可随时修改当前数字：退格（←）、清空（C）、重新输入
- 历史记录：每次按等号后写入，可点击某条将结果代入当前输入，支持清空历史
- 历史持久化到 `localStorage`，刷新后保留

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建
pnpm build

# 预览构建结果
pnpm preview
```

## 项目结构

```
src/
├── main.ts                 # 入口，挂载 Vue 并引入 UnoCSS
├── App.vue                 # 根组件，布局与计算器/历史区域
├── components/
│   ├── CalculatorKeypad.vue  # 数字与运算符按键
│   └── HistoryPanel.vue       # 历史记录列表
├── composables/
│   └── useCalculator.ts      # 计算逻辑与历史状态
└── types/
    └── calculator.ts         # Op、HistoryItem 类型
```

## 样式说明

赛博朋克主题在 `uno.config.ts` 中定义：深色背景（`cyber-bg`）、霓虹青（`cyber-cyan`）、品红（`cyber-magenta`）等，配合 JetBrains Mono / Orbitron 字体与网格背景。
