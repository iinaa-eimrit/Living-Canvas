import { saveAs } from 'file-saver';
import type { ExportOptions } from '../types';

export const exportArtwork = (canvas: HTMLCanvasElement, options: ExportOptions) => {
  if (options.format === 'png') {
    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `living-canvas-${Date.now()}.png`);
      }
    });
  } else if (options.format === 'gif' && options.duration && options.fps) {
    // Implementation for GIF recording would go here
    // We'd need to use a GIF encoder library for this
    console.log('GIF export not implemented yet');
  }
};

export const generateShareableLink = (artworkState: any) => {
  const stateString = btoa(JSON.stringify(artworkState));
  return `${window.location.origin}?state=${stateString}`;
};