'use client'

import React, { useRef, useEffect } from 'react';
import Three from "./threejs";

const ThreeScene: React.FC<{textureURL: String}> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current && typeof window !== 'undefined') {
        Three.init(containerRef);
        Three.animate();        
    }
  }, []);
  if(props.textureURL)
    Three.setTextureURL(props.textureURL);
  return <div ref={containerRef} />;
};
export default ThreeScene;