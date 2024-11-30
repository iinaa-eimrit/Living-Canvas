import React from 'react';
import { Sliders, Palette, Gauge, Mouse, Volume, Layers, Droplets } from 'lucide-react';
import { useArtStore } from '../../store/artStore';

const ArtControls: React.FC = () => {
  const {
    artwork,
    setMode,
    setColor,
    setSpeed,
    setComplexity,
    toggleMouseInteraction,
    toggleSoundReactive,
    setBlendMode,
    setSymmetry,
    setTrail
  } = useArtStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 text-white p-4">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          <input
            type="color"
            value={artwork.color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5" />
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={artwork.speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-32"
          />
        </div>

        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5" />
          <input
            type="range"
            min="10"
            max="200"
            value={artwork.complexity}
            onChange={(e) => setComplexity(parseInt(e.target.value))}
            className="w-32"
          />
        </div>

        {artwork.mode === 'kaleidoscope' && (
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            <input
              type="range"
              min="3"
              max="12"
              value={artwork.symmetry}
              onChange={(e) => setSymmetry(parseInt(e.target.value))}
              className="w-32"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5" />
          <select
            value={artwork.blendMode}
            onChange={(e) => setBlendMode(e.target.value as any)}
            className="bg-transparent border border-white/20 rounded px-2 py-1"
          >
            <option value="normal">Normal</option>
            <option value="additive">Additive</option>
            <option value="multiply">Multiply</option>
            <option value="screen">Screen</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleMouseInteraction}
            className={`flex items-center gap-2 px-3 py-1 rounded ${
              artwork.mouseInteraction ? 'bg-white/20' : 'bg-transparent border border-white/20'
            }`}
          >
            <Mouse className="w-4 h-4" />
            Mouse
          </button>

          <button
            onClick={toggleSoundReactive}
            className={`flex items-center gap-2 px-3 py-1 rounded ${
              artwork.soundReactive ? 'bg-white/20' : 'bg-transparent border border-white/20'
            }`}
          >
            <Volume className="w-4 h-4" />
            Sound
          </button>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={artwork.mode}
            onChange={(e) => setMode(e.target.value as any)}
            className="bg-transparent border border-white/20 rounded px-2 py-1"
          >
            <option value="particles">Particles</option>
            <option value="waves">Waves</option>
            <option value="fractals">Fractals</option>
            <option value="fluid">Fluid</option>
            <option value="landscape">Landscape</option>
            <option value="kaleidoscope">Kaleidoscope</option>
            <option value="ribbons">Ribbons</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ArtControls;