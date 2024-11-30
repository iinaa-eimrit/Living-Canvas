import React from 'react';
import GenerativeCanvas from './components/Canvas/GenerativeCanvas';
import ArtControls from './components/Controls/ArtControls';
import ExportControls from './components/Controls/ExportControls';

function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  return (
    <div className="relative w-full h-screen bg-black">
      <GenerativeCanvas />
      <ArtControls />
      <ExportControls canvasRef={canvasRef} />
      
      <div className="absolute top-0 left-0 right-0 p-6 text-white/90 bg-gradient-to-b from-black/80 to-transparent">
        <h1 className="text-4xl font-bold mb-2">The Living Canvas</h1>
        <p className="text-lg max-w-2xl">
          Welcome to an interactive journey through generative art. Move your cursor
          to interact with the particles and use the controls below to shape your
          experience.
        </p>
      </div>
    </div>
  );
}

export default App;