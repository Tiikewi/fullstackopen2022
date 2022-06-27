module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        jest: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 13,
    },
    rules: {
        indent: [0, 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        eqeqeq: ['error', 'always'],
        'no-trailing-spaces': 'error',
        'object-curly-spacing': ['error', 'always'],
        'arrow-spacing': ['error', { before: true, after: true }],
    },
    extends: ['plugin:jest/recommended'],
    plugins: ['jest'],
}
