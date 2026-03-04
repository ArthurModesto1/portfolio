import { Suspense, lazy, useEffect, useRef } from 'react';
import './SplineBackground.css';

const Spline = lazy(() => import('@splinetool/react-spline'));

function SplineBackground() {
  const splineRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (splineRef.current && splineRef.current.spline) {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        splineRef.current.spline.emitEvent('mouseMove', { x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="spline-background">
      <Suspense fallback={<div className="spline-loading">Loading...</div>}>
        <Spline
          ref={splineRef}
          scene="https://prod.spline.design/uwjRZkJ6RNrdwkNk/scene.splinecode"
          /*Para alterar o fundo basta trocar o link a cima por outro do spline*/
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Suspense>
    </div>
  );
}

export default SplineBackground;