import { P5Instance } from '../../../types';
import { createNoise2D } from 'simplex-noise';

export class LandscapeMode {
  private p5: P5Instance;
  private noise2D: ReturnType<typeof createNoise2D>;
  private yoff = 0;
  private terrain: number[][] = [];

  constructor(p5: P5Instance) {
    this.p5 = p5;
    this.noise2D = createNoise2D();
    this.generateTerrain();
  }

  private generateTerrain() {
    const cols = Math.floor(this.p5.width / 2);
    const rows = Math.floor(this.p5.height / 2);
    
    this.terrain = Array(cols).fill(0).map(() => Array(rows).fill(0));
    
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let yoff = this.yoff;
      for (let y = 0; y < rows; y++) {
        this.terrain[x][y] = this.noise2D(xoff, yoff) * 100;
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }

  draw(color: string, speed: number, mouseInteraction: boolean, audioData?: { volume: number; frequency: number }) {
    this.p5.background(0);
    this.yoff += speed * 0.01;
    
    this.p5.stroke(color);
    this.p5.noFill();
    
    this.p5.translate(this.p5.width / 2, this.p5.height / 2);
    this.p5.rotateX(this.p5.PI / 3);
    this.p5.translate(-this.p5.width / 2, -this.p5.height / 2);
    
    if (mouseInteraction) {
      const mouseXNorm = this.p5.map(this.p5.mouseX, 0, this.p5.width, -0.1, 0.1);
      const mouseYNorm = this.p5.map(this.p5.mouseY, 0, this.p5.height, -0.1, 0.1);
      this.p5.rotateY(mouseXNorm);
      this.p5.rotateX(mouseYNorm);
    }
    
    for (let y = 0; y < this.terrain[0].length - 1; y++) {
      this.p5.beginShape(this.p5.TRIANGLE_STRIP);
      for (let x = 0; x < this.terrain.length; x++) {
        let heightMod = 1;
        if (audioData) {
          heightMod = 1 + audioData.volume;
        }
        
        this.p5.vertex(
          x * 20,
          y * 20,
          this.terrain[x][y] * heightMod
        );
        this.p5.vertex(
          x * 20,
          (y + 1) * 20,
          this.terrain[x][y + 1] * heightMod
        );
      }
      this.p5.endShape();
    }
    
    this.generateTerrain();
  }
}