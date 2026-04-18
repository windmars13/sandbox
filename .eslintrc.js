'use strict'

module.exports = {
  root: true,

  // ─── 執行環境 ───────────────────────────────────────────────
  env: {
    browser: true,   // window, document
    node: true,      // process, require
    es2022: true,    // 最新 ES 語法支援
  },

  // ─── 解析器設定 ─────────────────────────────────────────────
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  // ─── 繼承規則（順序不能亂）──────────────────────────────────
  extends: [
    'eslint:recommended',   // 1. ESLint 官方推薦（品質規則）
    'prettier',             // 2. 最後放，關掉所有與 Prettier 衝突的排版規則
  ],

  // ─── 品質規則（只管邏輯，不管排版）──────────────────────────
  rules: {
    // --- 變數與宣告 ---
    'no-var': 'error',               // 禁用 var，統一用 let/const
    'prefer-const': 'error',         // 能 const 就不用 let
    'no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',       // _開頭參數允許不用（callback 佔位常見）
      varsIgnorePattern: '^_',
    }],

    // --- 最佳實踐 ---
    'eqeqeq': ['error', 'always'],  // 強制 === 不允許 ==
    'no-console': 'warn',            // console.log 上 production 要清掉
    'no-debugger': 'error',          // debugger 不能上 production
    'no-alert': 'warn',              // alert/confirm/prompt 避免使用
    'no-duplicate-imports': 'error', // 禁止重複 import 同一模組
    'no-return-await': 'error',      // async function 裡 return await 是多餘的

    // --- 現代語法偏好 ---
    'prefer-arrow-callback': 'error', // callback 優先用箭頭函式
    'prefer-template': 'error',       // 優先用 template literal，不要字串串接
    'object-shorthand': 'error',      // { foo: foo } → { foo }
  },

  // ─── 特定檔案覆寫 ───────────────────────────────────────────
  overrides: [
    {
      // 設定檔本身跑在 CommonJS 環境
      files: ['.eslintrc.js', 'vite.config.*', 'jest.config.*'],
      env: { node: true },
      rules: {
        'no-console': 'off',
      },
    },
    {
      // 測試檔允許 console 和 debugger
      files: ['**/*.test.*', '**/*.spec.*', '**/tests/**'],
      rules: {
        'no-console': 'off',
        'no-debugger': 'off',
      },
    },
  ],

  // ─── 忽略不需要 lint 的目錄 ────────────────────────────────
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '.nuxt/',
    '.next/',
    'coverage/',
    '*.min.js',
  ],
}
