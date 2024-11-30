import { P5Instance } from '../../../types';

export class RibbonsMode {
  private p5: P5Instance;
  private points: Array<{ x: number; y: number; vx: number; vy: number }> = [];
  private numRibbons = 5;

  constructor(p5: P5Instance) {
    this.p5 = p5;
    this.initRibbons();
  }

  private initRibbons() {
    this.points = [];
    for (let i = 0; i < this.numRibbons; i++) {
      this.points.push({
        x: this.p5.random(this.p5.width),
        y: this.p5.random(this.p5.height),
        vx: this.p5.random(-2, 2),
        vy: this.p5.random(-2, 2)
      });
    }
  }

  draw(color: string, speed: number, mouseInteraction: boolean, audioData?: { volume: number; frequency: number }) {
    this.p5.noFill();
    this.p5.stroke(color);
    this.p5.strokeWeight(2);

    this.points.forEach((point, i) => {
      if (mouseInteraction) {
        const dx = this.p5.mouseX - point.x;
        const dy = this.p5.mouseY - point.y;
        const angle = this.p5.atan2(dy, dx);
        point.vx += this.p5.cos(angle) * 0.1;
        point.vy += this.p5.sin(angle) * 0.1;
      }

      point.x += point.vx * speed;
      point.y += point.vy * speed;

      if (point.x < 0 || point.x > this.p5.width) point.vx *= -1;
      if (point.y < 0 || point.y > this.p5.height) point.vy *= -1;

      this.p5.beginShape();
      for (let j = 0; j < this.points.length; j++) {
        const other = this.points[j];
        const alpha = this.p5.map(j, 0, this.points.length, 255, 0);
        this.p5.stroke(color + alpha.toString(16));
        
        if (audioData) {
          const offset = audioData.volume * 50;
          const x = other.x + this.p5.sin(this.p5.frameCount * 0.05 + j) * offset;
          const y = other.y + this.p5.cos(this.p5.frameCount * 0.05 + j) * offset;
          this.p5.curveVertex(x, y);
        } else {
          this.p5.curveVertex(other.x, other.y);
        }
      }
      this.p5.endShape();
    });
  }
}