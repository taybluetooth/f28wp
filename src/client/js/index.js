import { connect, play } from './networking';
import { startRendering, stopRendering } from './render';
import { startCapturingInput, stopCapturingInput } from './input';
import { downloadAssets } from './assets';
import { initState } from './state';

import './css/stylesheet.css';


Promise.all([
  connect(),
  downloadAssets(),
]).then(() => {
    initState();
    startCapturingInput();
    startRendering();
  };
});
