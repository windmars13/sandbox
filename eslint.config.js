// eslint.config.js
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // ✅ ignores 拆成獨立物件,放最前面才會是全域忽略
  { ignores: ['node_modules/', 'dist/', 'build/', '*.min.js'] },

  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      // ✅ 用官方 globals 套件取代手動列舉,避免漏掉或拼錯
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      eqeqeq: ['error', 'always'],
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
    },
  },
  {
    // ✅ 新增：vitest 測試檔案需要 describe/it/expect 等 globals,
    // 否則會被 js.configs.recommended 的 no-undef 標記為未定義變數。
    // 注意：globals 套件本身沒有內建 "vitest" key,故手動列出
    // (對應 vitest.config 裡 test.globals: true 開啟的那批全域變數)
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        suite: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
  },
];
