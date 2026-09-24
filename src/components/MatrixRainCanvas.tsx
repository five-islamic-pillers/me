import React, { useEffect, useRef } from 'react';

interface MatrixRainCanvasProps {
  className?: string;
}

export const MatrixRainCanvas: React.FC<MatrixRainCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Authentic Matrix Katakana + Numbers + Symbols
  const chars = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ01234567890ABCDEF$#%*+=-/<>{}[]@&|!?';
  const charsLen = chars.length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    const fontSize = 16;
    let columns = 0;
    let drops: number[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth || 1200;
      height = parent?.clientHeight || window.innerHeight || 800;

      canvas.width = width;
      canvas.height = height;

      columns = Math.floor(width / fontSize) + 1;
      drops = [];
      const rows = Math.floor(height / fontSize);
      for (let i = 0; i < columns; i++) {
        // Stagger drops randomly so streams are already gently falling
        drops[i] = Math.floor(Math.random() * rows);
      }

      // Initial dark fill
      ctx.fillStyle = '#040906';
      ctx.fillRect(0, 0, width, height);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let lastTime = 0;

    // Smooth, non-flashing draw loop
    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      // Smooth ~28-30fps frame pacing for calm, steady digital rain with ZERO flicker
      if (currentTime - lastTime < 36) {
        return;
      }
      lastTime = currentTime;

      // Soft progressive fade layer (0.05 opacity provides smooth, long trails without strobing)
      ctx.fillStyle = 'rgba(4, 9, 6, 0.055)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace, 'Courier New'`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * charsLen));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // 1. Head character: clean bright white-green lead
        ctx.fillStyle = '#f0fdf4';
        ctx.fillText(char, x, y);

        // 2. Immediate body character: vibrant neon emerald
        if (drops[i] > 1) {
          ctx.fillStyle = '#22c55e';
          const bodyChar = chars.charAt(Math.floor(Math.random() * charsLen));
          ctx.fillText(bodyChar, x, (drops[i] - 1) * fontSize);
        }

        // Advance or reset
        if (y > height && Math.random() > 0.985) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Matrix Canvas Element (No flashing, clean and smooth) */}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'absolute',
          inset: 0,
        }}
      />

      {/* Gentle blend into next section */}
      <div 
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none bg-gradient-to-t from-[#070b09] to-transparent"
      />
    </div>
  );
};
