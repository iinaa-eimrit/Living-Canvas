import React, { useState } from 'react';
import { Download, Share2, Settings } from 'lucide-react';
import { exportArtwork, generateShareableLink } from '../../utils/export';
import { useArtStore } from '../../store/artStore';

const ExportControls: React.FC<{ canvasRef: React.RefObject<HTMLCanvasElement> }> = ({ canvasRef }) => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const { artwork } = useArtStore();

  const handleExport = (format: 'png' | 'gif') => {
    if (!canvasRef.current) return;
    exportArtwork(canvasRef.current, { format });
  };

  const handleShare = () => {
    const link = generateShareableLink(artwork);
    navigator.clipboard.writeText(link);
    alert('Share link copied to clipboard!');
  };

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2">
      <button
        onClick={() => setShowExportOptions(!showExportOptions)}
        className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      >
        <Settings className="w-6 h-6 text-white" />
      </button>

      {showExportOptions && (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleExport('png')}
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <Download className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <Share2 className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportControls;