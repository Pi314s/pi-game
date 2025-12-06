import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Theme Colors: Purple, Gold, Dark Grey, White
    const colors = ['#6c5ce7', '#FFD700', '#333333', '#444444', '#ffffff'];
    
    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Adjust density based on screen size
      const count = Math.floor((window.innerWidth * window.innerHeight) / 15000); 
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5, // Slow, drift movement
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1, // Small digital squares
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Spotlight/Vignette around mouse for visibility
      const gradient = ctx.createRadialGradient(
          mousePos.current.x, mousePos.current.y, 0, 
          mousePos.current.x, mousePos.current.y, 400
      );
      gradient.addColorStop(0, 'rgba(108, 92, 231, 0.05)'); // Faint purple glow
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // Update Position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Interaction with Mouse
        const dx = mousePos.current.x - p.x;
        const dy = mousePos.current.y - p.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const mouseThreshold = 150;

        // Draw line to mouse if close
        if (distToMouse < mouseThreshold) {
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - distToMouse / mouseThreshold) * 0.5;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mousePos.current.x, mousePos.current.y);
            ctx.stroke();
            
            // Push gently away if too close (optional, keeps text readable)
            if (distToMouse < 50) {
                 const force = (50 - distToMouse) / 50;
                 p.x -= (dx / distToMouse) * force * 0.5;
                 p.y -= (dy / distToMouse) * force * 0.5;
            }
        }

        // Draw connections to other particles
        // Optimization: Only check a subset or accept O(N^2) for low N
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx2 = p.x - p2.x;
            const dy2 = p.y - p2.y;
            const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
            const connectThreshold = 100;

            if (dist < connectThreshold) {
                ctx.beginPath();
                ctx.strokeStyle = '#ffffff'; // White connections
                ctx.globalAlpha = (1 - dist / connectThreshold) * 0.15; // Very faint
                ctx.lineWidth = 0.5;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }

        // Draw Particle (Square for digital feel)
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.8;
        // Highlight gold particles
        if (p.color === '#FFD700') {
             ctx.shadowColor = '#FFD700';
             ctx.shadowBlur = 10;
        } else {
             ctx.shadowBlur = 0;
        }
        
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.shadowBlur = 0; // Reset
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    // Initialize
    resizeCanvas();
    draw();

    // Event Listeners
    window.addEventListener('resize', resizeCanvas);
    
    const handleMouseMove = (e: MouseEvent) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-dark-bg"></div>
      
      {/* Moving Grid Floor (Retro-wave style) - Kept as it fits the 'based' aesthetic */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, #4b5563 1px, transparent 1px), linear-gradient(to bottom, #4b5563 1px, transparent 1px)',
             backgroundSize: '4rem 4rem',
             transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
             transformOrigin: 'top center',
             height: '200%'
           }}>
      </div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050507_90%)]"></div>
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default Background;