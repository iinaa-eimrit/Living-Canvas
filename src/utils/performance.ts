export class OffscreenRenderer {
  private offscreenCanvas: OffscreenCanvas;
  private ctx: OffscreenCanvasRenderingContext2D | null;
  private mainCanvas: HTMLCanvasElement;
  private mainCtx: CanvasRenderingContext2D | null;

  constructor(width: number, height: number, mainCanvas: HTMLCanvasElement) {
    this.offscreenCanvas = new OffscreenCanvas(width, height);
    this.ctx = this.offscreenCanvas.getContext('2d');
    this.mainCanvas = mainCanvas;
    this.mainCtx = mainCanvas.getContext('2d');
  }

  draw(drawCallback: (ctx: OffscreenCanvasRenderingContext2D) => void) {
    if (!this.ctx || !this.mainCtx) return;

    // Clear offscreen canvas
    this.ctx.clearRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);

    // Perform drawing operations on offscreen canvas
    drawCallback(this.ctx);

    // Transfer to main canvas
    this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    this.mainCtx.drawImage(this.offscreenCanvas, 0, 0);
  }

  resize(width: number, height: number) {
    this.offscreenCanvas = new OffscreenCanvas(width, height);
    this.ctx = this.offscreenCanvas.getContext('2d');
  }
}

export class FPSCounter {
  private times: number[] = [];
  private fps: number = 0;

  measure() {
    const now = performance.now();
    while (this.times.length > 0 && this.times[0] <= now - 1000) {
      this.times.shift();
    }
    this.times.push(now);
    this.fps = this.times.length;
    return this.fps;
  }

  getFPS() {
    return this.fps;
  }
}