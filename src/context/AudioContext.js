// react
import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();
const AudioProvider = ({ children }) => {
  const [volume, setVolume] = useState(100);

  return (
    <AudioContext.Provider value={{ volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}

export { AudioProvider, useAudio };
