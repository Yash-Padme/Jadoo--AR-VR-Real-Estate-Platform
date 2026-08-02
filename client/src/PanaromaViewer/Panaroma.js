import React, { useEffect, useRef } from 'react';
import * as PANOLENS from 'panolens';
import * as THREE from 'three';

const PanoramaViewer = (prop) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const panoramaImage = new PANOLENS.ImagePanorama(prop.VRImage);
    const viewer = new PANOLENS.Viewer({
      container: viewerRef.current,
      autoRotate: true,
      autoRotateSpeed: 0.3,
      controlBar: false,
    });
    viewer.add(panoramaImage);
  }, []);

  return (
    <div className='flex h-[100vh] items-center bg-black'>
      <div ref={viewerRef} className="flex h-[100%] fixed w-[100%]"></div>
    </div>
    
  );
};

export default PanoramaViewer;