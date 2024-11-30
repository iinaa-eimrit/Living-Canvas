import { P5Instance } from '../../../types';
import { createNoise2D } from 'simplex-noise';

export class FluidMode {
  private p5: P5Instance;
  private noise2D: ReturnType<typeof createNoise2D>;
  private particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];
  private flowField: Array<{ angle: number }> = [];
  private cols: number = 0;
  private rows: number = 0;
  private resolution: number = 10;

  constructor(p5: P5Instance) {
    this.p5 = p5;
    this.noise2D = createNoise2D();
    this.initFlowField();
  }

  private initFlowField() {
    this.cols = Math.floor(this.p5.width / this.resolution);
    this.rows = Math.floor(this.p5.height / this.resolution);
    this.flowField = new Array(this.cols * this.rows);
    
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const angle = this.noise2D(x * 0.1, y * 0.1) * this.p5.TWO_PI;
        this.flowField[x + y * this.cols] = { angle };
      }
    }
  }

  draw(color: string, speed: number, mouseInteraction: boolean, audioData?: { volume: number; frequency: number }) {
    this.p5.background(0, 5);
    
    // Update flow field based on mouse interaction
    if (mouseInteraction) {
      const mouseCol = Math.floor(this.p5.mouseX / this.resolution);
      const mouseRow = Math.floor(this.p5.mouseY / this.resolution);
      
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          const dx = x - mouseCol;
          const dy = y - mouseRow;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 5) {
            const angle = Math.atan2(dy, dx);
            this.flowField[x + y * this.cols].angle = angle;
          }
        }
      }
    }

    // Draw flow field
    this.p5.stroke(color);
    this.p5.strokeWeight(1);
    
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const index = x + y * this.cols;
        const angle = this.flowField[index].angle;
        
        const centerX = x * this.resolution + this.resolution / 2;
        const centerY = y * this.resolution + this.resolution / 2;
        
        this.p5.push();
        this.p5.translate(centerX, centerY);
        this.p5.rotate(angle);
        this.p5.line(-this.resolution / 2, 0, this.resolution / 2, 0);
        this.p5.pop();
      }
    }
  }
}