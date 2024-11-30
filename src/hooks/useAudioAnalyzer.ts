import { useState, useEffect } from 'react';
import { AudioData } from '../types';

export const useAudioAnalyzer = () => {
  const [audioData, setAudioData] = useState<AudioData>({ volume: 0, frequency: 0 });
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      try {
        const context = new AudioContext();
        const analyzerNode = context.createAnalyser();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        const source = context.createMediaStreamSource(stream);
        source.connect(analyzerNode);
        
        setAudioContext(context);
        setAnalyzer(analyzerNode);
      } catch (error) {
        console.error('Audio initialization failed:', error);
      }
    };

    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const analyzeAudio = () => {
    if (!analyzer) return audioData;

    const dataArray = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(dataArray);

    const volume = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
    const frequency = dataArray[0]; // Simplified frequency analysis

    return { volume: volume / 255, frequency: frequency / 255 };
  };

  return { analyzeAudio };
};