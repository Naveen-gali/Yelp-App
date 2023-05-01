module.exports = {
  stories: [
    '../src/components/**/*.stories.?(ts|tsx|js|jsx)',
    '../src/assets/**/*.stories.?(ts|tsx|js|jsx)',
    '../src/screens/**/*.stories.?(ts|tsx|js|jsx)',
  ],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
};
