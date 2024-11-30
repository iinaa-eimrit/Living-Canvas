export const fragmentShader = `
precision mediump float;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
uniform vec2 audioData;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 center = mouse / resolution;
  
  float dist = length(uv - center);
  float glow = 0.05 / dist;
  
  vec3 color = vec3(glow) * vec3(0.5, 0.8, 1.0);
  
  // Add audio reactive glow
  if (audioData.x > 0.0) {
    color += vec3(audioData.x * 0.5) * vec3(1.0, 0.2, 0.3);
  }
  
  gl_FragColor = vec4(color, 1.0);
}`;

export const vertexShader = `
attribute vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;