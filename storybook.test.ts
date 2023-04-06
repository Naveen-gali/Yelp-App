// storybook.test.js

import path from 'path';

import initStoryshots from '@storybook/addon-storyshots';

// The required import from the @storybook/addon-storyshots-puppeteer addon
import {imageSnapshot} from '@storybook/addon-storyshots-puppeteer';

// Function to customize the snapshot location
const getMatchOptions = ({context: {fileName}}) => {
  // Generates a custom path based on the file name and the custom directory.
  const snapshotPath = path.join(path.dirname(fileName), './snapshots');
  return {customSnapshotsDir: snapshotPath};
};

initStoryshots({
  // your own configuration
  framework: 'react-native',
  configPath: path.join(__dirname, '.storybook'),
  integrityOptions: {cwd: path.join(__dirname, 'src', 'assets', 'stories')},
  test: imageSnapshot({
    // invoke the function above here
    getMatchOptions,
  }),
});
