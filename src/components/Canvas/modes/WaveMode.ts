import { P5Instance } from '../../../types';

export class WaveMode {
  private p5: P5Instance;
  private time = 0;

  constructor(p5: P5Instance) {
    this.p5 = p5;
  }

  draw(color: string, speed: number, mouseInteraction: boolean, audioData?: { volume: number; frequency: number }) {
    this.time += speed * 0.02;
    const rows = 50;
    const cols = 50;
    
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        const xPos = (x / cols) * this.p5.width;
        const yPos = (y / rows) * this.p5.height;
        
        let amplitude = 20;
        if (audioData) {
          amplitude *= 1 + audioData.volume * 2;
        }
        
        if (mouseInteraction) {
          const dx = this.p5.mouseX - xPos;
          const dy = this.p5.mouseY - yPos;
          const distance = this.p5.sqrt(dx * dx + dy * dy);
          amplitude *= 1 + (100 / (distance + 1));
        }

        const wave = this.p5.sin(xPos * 0.05 + this.time + yPos * 0.05) * amplitude;
        
        this.p5.fill(color);
        this.p5.noStroke();
        this.p5.circle(xPos + wave, yPos + wave, 4);
      }
    }
  }
}