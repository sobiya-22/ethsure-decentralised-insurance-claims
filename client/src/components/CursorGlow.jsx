import React, { useEffect } from 'react';

const CursorGlow = () => {
  useEffect(() => {
    let hideTimer = null;
    const onMove = (e) => {
      const root = document.documentElement;
      root.style.setProperty('--cursor-x', e.clientX + 'px');
      root.style.setProperty('--cursor-y', e.clientY + 'px');
      const spot = document.querySelector('.cursor-spotlight');
      if (spot) {
        spot.classList.add('active');
        if (hideTimer) clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          spot.classList.remove('active');
        }, 1200);
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  return (
    <></>
  );
};

export default CursorGlow;


