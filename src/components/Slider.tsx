import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps {
  onValueChange?: (value: number) => void;
  initialValue?: number;
}

export default function Slider({ onValueChange, initialValue = 30 }: SliderProps) {
  const [position, setPosition] = useState(initialValue);
  const [thumbPercent, setThumbPercent] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((value: number) => {
    const newPosition = Math.max(0, Math.min(100, value));
    setPosition(newPosition);
    onValueChange?.(newPosition);

    if (trackRef.current) {
      const trackWidth = trackRef.current.getBoundingClientRect().width;
      const thumbWidth = thumbRef.current?.getBoundingClientRect().width ?? 0;
      if (trackWidth > 0 && thumbWidth > 0) {
        const usable = Math.max(trackWidth - thumbWidth, 0);
        const clampedPx = (newPosition / 100) * usable + thumbWidth / 2;
        setThumbPercent((clampedPx / trackWidth) * 100);
      } else {
        setThumbPercent(newPosition);
      }
    } else {
      setThumbPercent(newPosition);
    }
  }, [onValueChange]);

  useEffect(() => {
    updatePosition(initialValue);
  }, [initialValue, updatePosition]);

  const handleLeft = () => {
    updatePosition(position - 10);
  };

  const handleRight = () => {
    updatePosition(position + 10);
  };

  const updateFromClientX = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    updatePosition(percentage);
  }, [updatePosition]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateFromClientX(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      updateFromClientX(e.clientX);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, updateFromClientX]);

  return (
    <div className="center-slider">
      <button 
        className="slider-arrow" 
        onClick={handleLeft}
        aria-label="Previous"
        disabled={position <= 0}
      >
        <ChevronLeft size={20} />
      </button>
      <div 
        className="slider-container"
        onPointerDown={handlePointerDown}
      >
        <div className="slider-track" ref={trackRef}>
          <div 
            className={`slider-thumb ${isDragging ? 'dragging' : ''}`}
            style={{ left: `${thumbPercent}%` }}
            ref={thumbRef}
          ></div>
        </div>
        <div className="slider-value">{Math.round(position)}%</div>
      </div>
      <button 
        className="slider-arrow" 
        onClick={handleRight}
        aria-label="Next"
        disabled={position >= 100}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
