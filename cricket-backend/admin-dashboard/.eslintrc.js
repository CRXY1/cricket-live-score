module.exports = {
  root: true,
  extends: ['react-app'],
  rules: {
    // Disable problematic rules
    'import/no-anonymous-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
