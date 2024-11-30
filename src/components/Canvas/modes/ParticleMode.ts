import { P5Instance, Particle } from '../../../types';

export class ParticleMode {
  private particles: Particle[] = [];
  private p5: P5Instance;
  private mouseX = 0;
  private mouseY = 0;

  constructor(p5: P5Instance) {
    this.p5 = p5;
  }

  setup(complexity: number, color: string) {
    this.particles = [];
    for (let i = 0; i < complexity; i++) {
      this.particles.push({
        x: this.p5.random(this.p5.width),
        y: this.p5.random(this.p5.height),
        vx: this.p5.random(-1, 1),
        vy: this.p5.random(-1, 1),
        color,
        size: this.p5.random(2, 8),
        originalX: this.p5.random(this.p5.width),
        originalY: this.p5.random(this.p5.height),
      });
    }
  }

  draw(color: string, speed: number, mouseInteraction: boolean, audioData?: { volume: number; frequency: number }) {
    this.mouseX = this.p5.mouseX;
    this.mouseY = this.p5.mouseY;

    this.particles.forEach((particle) => {
      if (mouseInteraction) {
        const dx = this.mouseX - particle.x;
        const dy = this.mouseY - particle.y;
        const distance = this.p5.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const angle = this.p5.atan2(dy, dx);
          particle.vx -= this.p5.cos(angle) * 0.5;
          particle.vy -= this.p5.sin(angle) * 0.5;
        }
      }

      if (audioData) {
        particle.size = particle.size * 0.9 + audioData.volume * 10 * 0.1;
        speed *= 1 + audioData.volume;
      }

      particle.x += particle.vx * speed;
      particle.y += particle.vy * speed;

      // Wrap around edges
      if (particle.x < 0) particle.x = this.p5.width;
      if (particle.x > this.p5.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.p5.height;
      if (particle.y > this.p5.height) particle.y = 0;

      this.p5.fill(color);
      this.p5.noStroke();
      this.p5.circle(particle.x, particle.y, particle.size);
    });
  }
}