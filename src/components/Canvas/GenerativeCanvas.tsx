import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { useArtStore } from '../../store/artStore';
import { useAudioAnalyzer } from '../../hooks/useAudioAnalyzer';
import { ParticleMode } from './modes/ParticleMode';
import { WaveMode } from './modes/WaveMode';
import { FractalMode } from './modes/FractalMode';
import { FluidMode } from './modes/FluidMode';
import { LandscapeMode } from './modes/LandscapeMode';
import { KaleidoscopeMode } from './modes/KaleidoscopeMode';
import { RibbonsMode } from './modes/RibbonsMode';
import type { P5Instance } from '../../types';

const GenerativeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5>();
  const { artwork } = useArtStore();
  const { analyzeAudio } = useAudioAnalyzer();
  const [modes, setModes] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!canvasRef.current) return;

    const sketch = (p5: P5Instance) => {
      const modesInstance = {
        particles: new ParticleMode(p5),
        waves: new WaveMode(p5),
        fractals: new FractalMode(p5),
        fluid: new FluidMode(p5),
        landscape: new LandscapeMode(p5),
        kaleidoscope: new KaleidoscopeMode(p5),
        ribbons: new RibbonsMode(p5)
      };

      setModes(modesInstance);

      p5.setup = () => {
        const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
        canvas.parent(canvasRef.current!);
        
        if (artwork.mode === 'particles') {
          modesInstance.particles.setup(artwork.complexity, artwork.color);
        }
      };

      p5.draw = () => {
        p5.background(0, artwork.trail * 255);
        
        const audioData = artwork.soundReactive ? analyzeAudio() : undefined;

        // Set blend mode
        switch (artwork.blendMode) {
          case 'additive':
            p5.blendMode(p5.ADD);
            break;
          case 'multiply':
            p5.blendMode(p5.MULTIPLY);
            break;
          case 'screen':
            p5.blendMode(p5.SCREEN);
            break;
          default:
            p5.blendMode(p5.BLEND);
        }

        const currentMode = modesInstance[artwork.mode];
        if (currentMode) {
          if (artwork.mode === 'kaleidoscope') {
            (currentMode as KaleidoscopeMode).setSymmetry(artwork.symmetry);
          }
          currentMode.draw(artwork.color, artwork.speed, artwork.mouseInteraction, audioData);
        }
      };

      p5.windowResized = () => {
        p5.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    p5Ref.current = new p5(sketch);

    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
      }
    };
  }, []);

  // Update mode-specific settings when they change
  useEffect(() => {
    if (modes[artwork.mode]) {
      if (artwork.mode === 'kaleidoscope') {
        (modes[artwork.mode] as KaleidoscopeMode).setSymmetry(artwork.symmetry);
      }
    }
  }, [artwork.mode, artwork.symmetry, modes]);

  return <div ref={canvasRef} className="w-full h-full" />;
};

export default GenerativeCanvas;