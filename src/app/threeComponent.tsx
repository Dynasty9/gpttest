'use client'

import React, { useRef, useEffect } from 'react';
import Three from "./threejs";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current && typeof window !== 'undefined') {
        Three.init(containerRef);
        Three.animate();        
    }
  }, []);
  return <div ref={containerRef} />;
};
export default ThreeScene;