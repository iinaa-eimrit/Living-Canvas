export interface P5Instance extends p5 {
  // Add any additional p5 instance methods/properties here
}

export interface AudioData {
  volume: number;
  frequency: number;
}

export interface ExportOptions {
  format: 'png' | 'gif';
  duration?: number;
  fps?: number;
}

export interface ArtworkState {
  mode: 'particles' | 'waves' | 'fractals' | 'fluid' | 'landscape' | 'kaleidoscope' | 'ribbons';
  color: string;
  speed: number;
  complexity: number;
  mouseInteraction: boolean;
  soundReactive: boolean;
  quality: 'low' | 'medium' | 'high';
  showFPS: boolean;
  blendMode: 'normal' | 'additive' | 'multiply' | 'screen';
  symmetry: number;
  trail: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  originalX?: number;
  originalY?: number;
  life?: number;
  maxLife?: number;
}