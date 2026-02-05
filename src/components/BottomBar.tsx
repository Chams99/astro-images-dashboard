import { useEffect, useState } from 'react';
import { Monitor, RotateCcw } from 'lucide-react';
import Slider from './Slider';

export default function BottomBar() {
  const [homeActive, setHomeActive] = useState(true); // Home is active by default
  const [monitorActive, setMonitorActive] = useState(false);
  const [sliderResetKey, setSliderResetKey] = useState(0);
  const [sliderHomeValue, setSliderHomeValue] = useState(30);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      (window as any).showToast(message, type);
    }
  };

  const handleHomeClick = () => {
    setHomeActive(true);
    setMonitorActive(false);
    showToast('Returned to Home', 'success');
    setSliderHomeValue(0);
    setSliderResetKey((prev) => prev + 1);

    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--scene-zoom', '1');
      delete document.documentElement.dataset.modes;
      delete document.documentElement.dataset.display;
      document.documentElement.dataset.home = '1';
      document.documentElement.dataset.homePulse = '1';
      window.dispatchEvent(new CustomEvent('ui:home'));
      window.setTimeout(() => {
        delete document.documentElement.dataset.home;
        delete document.documentElement.dataset.homePulse;
      }, 400);
    }
  };

  const handleMonitorClick = () => {
    const next = !monitorActive;
    setMonitorActive(next);
    showToast(`Display mode ${next ? 'on' : 'off'}`, 'info');
  };

  const handleSliderChange = (value: number) => {
    if (typeof document !== 'undefined') {
      const zoom = 1 + value / 300;
      document.documentElement.style.setProperty('--scene-zoom', zoom.toFixed(3));
    }
    // Only show toast for significant changes to avoid spam
    if (value % 25 === 0 || value === 0 || value === 100) {
      showToast(`Position: ${Math.round(value)}%`, 'info');
    }
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.display = monitorActive ? 'on' : 'off';
  }, [monitorActive]);

  return (
    <div className="ui-bar">
      <div className="bottom-bar">
        <div className="bottom-left">
          <button 
            type="button"
            className={`bottom-icon ${homeActive ? 'active' : ''}`}
            title="Reset Scene"
            onClick={handleHomeClick}
            aria-label="Reset Scene"
            aria-pressed={homeActive}
          >
            <RotateCcw size={24} />
          </button>
          <div className="decorative-shapes">
            <div className="decorative-shape"></div>
            <div className="decorative-shape"></div>
            <div className="decorative-shape"></div>
          </div>
        </div>
        
        <Slider
          key={sliderResetKey}
          initialValue={sliderHomeValue}
          onValueChange={handleSliderChange}
        />
        
        <button 
          type="button"
          className={`bottom-icon ${monitorActive ? 'active' : ''}`}
          title="Display Settings"
          onClick={handleMonitorClick}
          aria-label="Display"
          aria-pressed={monitorActive}
        >
          <Monitor size={24} />
        </button>
      </div>
    </div>
  );
}
