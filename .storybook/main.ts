module.exports = {
  stories: [
    './stories/**/*.stories.?(ts|tsx|js|jsx)',
    '../src/components/**/*.stories.?(ts|tsx|js|jsx)',
    '../src/assets/**/*.stories.?(ts|tsx|js|jsx)',
  ],
  addons: [
    '@storybook/addon-ondevice-controls',
    '@storybook/addon-ondevice-actions',
  ],
};
