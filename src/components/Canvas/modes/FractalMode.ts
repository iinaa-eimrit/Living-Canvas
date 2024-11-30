import { P5Instance } from '../../../types';

export class FractalMode {
  private p5: P5Instance;
  private angle = 0;

  constructor(p5: P5Instance) {
    this.p5 = p5;
  }

  draw(color: string, speed: number, mouseInteraction: boolean, audioData?: { volume: number; frequency: number }) {
    this.angle += speed * 0.01;
    
    const drawBranch = (len: number, level: number) => {
      this.p5.stroke(color);
      this.p5.line(0, 0, 0, -len);
      this.p5.translate(0, -len);

      if (level > 0) {
        let branchAngle = this.angle;
        if (mouseInteraction) {
          const dx = this.p5.mouseX - this.p5.width / 2;
          const dy = this.p5.mouseY - this.p5.height / 2;
          branchAngle += this.p5.atan2(dy, dx) * 0.1;
        }
        
        if (audioData) {
          branchAngle *= 1 + audioData.volume * 0.5;
          len *= 1 + audioData.volume * 0.2;
        }

        this.p5.push();
        this.p5.rotate(branchAngle);
        drawBranch(len * 0.7, level - 1);
        this.p5.pop();

        this.p5.push();
        this.p5.rotate(-branchAngle);
        drawBranch(len * 0.7, level - 1);
        this.p5.pop();
      }
    };

    this.p5.push();
    this.p5.translate(this.p5.width / 2, this.p5.height * 0.8);
    drawBranch(this.p5.height * 0.3, 8);
    this.p5.pop();
  }
}