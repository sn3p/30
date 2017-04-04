import '../css/main.css';
import Thirty from './Thirty';

const options = {
  width: window.innerWidth,
  height: window.innerHeight,
  text: '30',
  size: 500,
  density: 14,
  colors: [0x222222, 0xc49a62, 0xffb600, 0x5ccfea, 0x98edc2, 0xceff00, 0xe90055, 0xbfb1f2],
};

const thirty = new Thirty(options);
