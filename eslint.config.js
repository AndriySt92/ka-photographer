import js from '@eslint/js';
import globals from 'globals';
import eslintReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tailwindPlugin from 'eslint-plugin-tailwindcss';

// Testing plugins
import jestPlugin from 'eslint-plugin-jest';
import testingLibrary from 'eslint-plugin-testing-library';
import jestDom from 'eslint-plugin-jest-dom';

export default tseslint.config(
  {
    ignores: ['dist', '**/node_modules/**/*.d.ts', 'eslint.config.js'],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      prettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      react: eslintReact,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
      tailwindcss: tailwindPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prefer-const': 'warn',
      'react/function-component-definition': ['warn', { namedComponents: 'arrow-function' }],
      'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
      'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],

      // Prettier integration
      'prettier/prettier': 'warn',

      // Tailwind CSS Class Ordering Rules
      'tailwindcss/classnames-order': 'error',
      'tailwindcss/no-custom-classname': 'off',

      // Import sorting
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^(@|~|src)(/.*|$)'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.?(svg|png|jpg|gif|json)$'],
            ['^.+\\.?(css|scss|sass)$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',

      // Additional TypeScript rules
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',

      // ... other rules ...
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
    },
    settings: {
      react: {
        version: 'detect',
      },
      tailwindcss: {
        config: './tailwind.config.js',
        callees: ['classnames', 'clsx', 'cn'],
      },
    },
  },
  // ========== TESTING CONFIGURATIONS ==========
  {
    files: [
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
      'tests/**/*.[jt]s?(x)',
    ],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.test.json',
      },
      globals: {
        ...globals.jest,
      },
    },
    extends: [
      jestPlugin.configs['flat/recommended'],
      testingLibrary.configs['flat/react'],
      jestDom.configs['flat/recommended'],
    ],
    rules: {
      // Turn off React Refresh rule for test files
      'react-refresh/only-export-components': 'off',
      // Allow any in tests for mocks
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow non-arrow functions for Jest hooks
      'react/function-component-definition': 'off',
      // Allow console statements in tests
      'no-console': 'off',
    },
  },
);
