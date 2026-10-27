import '@testing-library/jest-dom';

// Mock Web Audio API for tests
class AudioContextMock {
  state = 'running';
  currentTime = 0;
  destination = {};
  createOscillator() {
    return {
      type: 'sine',
      frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
      connect: () => {},
      start: () => {},
      stop: () => {},
    };
  }
  createGain() {
    return {
      gain: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} },
      connect: () => {},
    };
  }
  createBuffer() {
    return { getChannelData: () => new Float32Array(100) };
  }
  createBufferSource() {
    return { buffer: null, connect: () => {}, start: () => {}, stop: () => {} };
  }
  createBiquadFilter() {
    return { type: 'lowpass', frequency: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {} };
  }
}

// Attach to window
(window as unknown as { AudioContext: typeof AudioContextMock }).AudioContext = AudioContextMock;
