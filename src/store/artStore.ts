import { create } from 'zustand';
import { ArtworkState } from '../types';

interface ArtStore {
  artwork: ArtworkState;
  setMode: (mode: ArtworkState['mode']) => void;
  setColor: (color: string) => void;
  setSpeed: (speed: number) => void;
  setComplexity: (complexity: number) => void;
  toggleMouseInteraction: () => void;
  toggleSoundReactive: () => void;
  setBlendMode: (mode: ArtworkState['blendMode']) => void;
  setSymmetry: (value: number) => void;
  setTrail: (value: number) => void;
}

export const useArtStore = create<ArtStore>((set) => ({
  artwork: {
    mode: 'particles',
    color: '#00ff00',
    speed: 1,
    complexity: 50,
    mouseInteraction: true,
    soundReactive: false,
    quality: 'medium',
    showFPS: false,
    blendMode: 'normal',
    symmetry: 8,
    trail: 0.5
  },
  setMode: (mode) => set((state) => ({ artwork: { ...state.artwork, mode } })),
  setColor: (color) => set((state) => ({ artwork: { ...state.artwork, color } })),
  setSpeed: (speed) => set((state) => ({ artwork: { ...state.artwork, speed } })),
  setComplexity: (complexity) =>
    set((state) => ({ artwork: { ...state.artwork, complexity } })),
  toggleMouseInteraction: () =>
    set((state) => ({
      artwork: { ...state.artwork, mouseInteraction: !state.artwork.mouseInteraction },
    })),
  toggleSoundReactive: () =>
    set((state) => ({
      artwork: { ...state.artwork, soundReactive: !state.artwork.soundReactive },
    })),
  setBlendMode: (blendMode) =>
    set((state) => ({ artwork: { ...state.artwork, blendMode } })),
  setSymmetry: (symmetry) =>
    set((state) => ({ artwork: { ...state.artwork, symmetry } })),
  setTrail: (trail) =>
    set((state) => ({ artwork: { ...state.artwork, trail } }))
}));