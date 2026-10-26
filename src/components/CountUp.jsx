import React, { useEffect, useState, useRef } from 'react';

export default function CountUp({ target, duration = 1800, decimals = 0, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime = null;
    const startValue = 0;
    const endValue = Number(target);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Smooth easeOutCubic curve so the count slows down gracefully at the end
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * easeOutProgress;

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(step);
  }, [hasAnimated, target, duration]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}