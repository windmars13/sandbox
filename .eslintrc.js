// .eslintrc.js
// ⚠️  此為 ESLint v8 格式（Legacy）
// ESLint v9+ 請改用 eslint.config.js（Flat Config）
// 遷移指南：https://eslint.org/docs/latest/use/configure/migration-guide
'use strict';

module.exports = {
  root: true,

  // ─── 執行環境 ────────────────────────────────────────────
  env: {
    browser: true,
    node: true,
    es2022: true,
  },

  // ─── 解析器 ──────────────────────────────────────────────
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },

  // ─── 繼承（順序很重要）───────────────────────────────────
  extends: [
    'eslint:recommended',
    'plugin:import/recommended', // ✅ 新增：import 排序與合法性
    'prettier', // 永遠放最後，蓋掉排版衝突規則
  ],

  // ✅ 新增：import plugin 需要這個
  plugins: ['import'],

  // ─── 規則 ────────────────────────────────────────────────
  rules: {
    // --- 變數宣告 ---
    'no-var': 'error',
    'prefer-const': 'error',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-shadow': ['error', { builtinGlobals: false, hoist: 'functions' }], // ✅ 新增

    // --- 最佳實踐 ---
    eqeqeq: ['error', 'always'],
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'warn',
    'no-duplicate-imports': 'error',

    // ✅ 修正：try/catch 內 return await 是必要的，加例外
    'no-return-await': 'off',
    // 改用這個（需要 eslint-plugin-no-return-await 或直接關掉用 @typescript-eslint）

    // --- 現代語法 ---
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
    'object-shorthand': 'error',
    'prefer-destructuring': ['warn', { array: false, object: true }], // ✅ 新增

    // --- Import 排序 ---
    'import/order': [
      'warn',
      {
        // ✅ 新增
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-duplicates': 'error',
  },

  // ─── 覆寫 ────────────────────────────────────────────────
  overrides: [
    {
      files: ['.eslintrc.js', 'vite.config.*', 'jest.config.*', '*.config.js'],
      env: { node: true },
      rules: { 'no-console': 'off' },
    },
    {
      files: ['**/*.test.*', '**/*.spec.*', '**/tests/**', '**/__tests__/**'],
      rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'no-shadow': 'off', // 測試 mock 常需要同名變數
      },
    },
  ],

  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    '.nuxt/',
    '.next/',
    '.output/',
    'coverage/',
    '*.min.js',
    'public/',
  ],
};
