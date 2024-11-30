import { P5Instance } from '../../../types';

export class KaleidoscopeMode {
  private p5: P5Instance;
  private history: Array<{ x: number; y: number; color: string }> = [];
  private symmetry: number = 8;

  constructor(p5: P5Instance) {
    this.p5 = p5;
  }

  draw(color: string, speed: number, mouseInteraction: boolean, audioData?: { volume: number; frequency: number }) {
    this.p5.translate(this.p5.width / 2, this.p5.height / 2);
    
    if (mouseInteraction && this.p5.mouseIsPressed) {
      const mx = this.p5.mouseX - this.p5.width / 2;
      const my = this.p5.mouseY - this.p5.height / 2;
      
      this.history.push({ x: mx, y: my, color });
    }

    this.p5.noStroke();
    
    for (let i = 0; i < this.symmetry; i++) {
      this.p5.rotate(this.p5.TWO_PI / this.symmetry);
      
      this.history.forEach((point, index) => {
        const alpha = this.p5.map(index, 0, this.history.length, 0, 255);
        const size = audioData ? 5 + audioData.volume * 10 : 5;
        
        this.p5.fill(point.color + alpha.toString(16));
        this.p5.circle(point.x, point.y, size);
        this.p5.circle(-point.x, point.y, size);
      });
    }

    if (this.history.length > 100) {
      this.history.shift();
    }
  }

  setSymmetry(value: number) {
    this.symmetry = value;
  }
}