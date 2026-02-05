import { useEffect, useState } from 'react';
import { 
  Aperture,
  Heart,
  HeartPulse,
  LeafyGreen,
  MoonStar,
  Mountain,
  Palette,
  SunMedium
} from 'lucide-react';
import IconButton from './IconButton';

export default function TopBar() {
  const [activeIcons, setActiveIcons] = useState<string[]>([]);
  const [toggleActive, setToggleActive] = useState(false);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    if (typeof window !== 'undefined' && (window as any).showToast) {
      (window as any).showToast(message, type);
    }
  };

  const handleIconToggle = (iconName: string, label: string) => {
    const wasActive = activeIcons.includes(iconName);
    setActiveIcons((prev) => (
      wasActive ? prev.filter((icon) => icon !== iconName) : [...prev, iconName]
    ));
    showToast(`${wasActive ? 'Disabled' : 'Enabled'} ${label}`, wasActive ? 'info' : 'success');

    if (iconName === 'camera' && !wasActive) {
      if (typeof document !== 'undefined') {
        document.documentElement.dataset.flash = '1';
        window.setTimeout(() => {
          delete document.documentElement.dataset.flash;
        }, 300);
      }
    }
  };

  const handleToggle = () => {
    const newState = !toggleActive;
    setToggleActive(newState);
    showToast(`Theme mode: ${newState ? 'ON' : 'OFF'}`, 'info');
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (activeIcons.length === 0) {
      delete document.documentElement.dataset.modes;
      return;
    }
    document.documentElement.dataset.modes = activeIcons.join(' ');
  }, [activeIcons]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.theme = toggleActive ? 'warm' : 'cool';
  }, [toggleActive]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleHomeReset = () => {
      setActiveIcons([]);
      setToggleActive(false);
    };
    window.addEventListener('ui:home', handleHomeReset);
    return () => window.removeEventListener('ui:home', handleHomeReset);
  }, []);

  return (
    <div className="ui-bar ui-bar-top">
      <div className="top-icons">
        <IconButton 
          icon={<LeafyGreen size={24} />} 
          title="Nature Tint"
          onClick={() => handleIconToggle('leaf', 'Nature Tint')}
          className={activeIcons.includes('leaf') ? 'active' : ''}
        />
        <IconButton 
          icon={<Mountain size={24} />} 
          title="Adventure Tone"
          onClick={() => handleIconToggle('backpack', 'Adventure Tone')}
          className={activeIcons.includes('backpack') ? 'active' : ''}
        />
        <IconButton 
          icon={<SunMedium size={24} />} 
          title="Sun Glow"
          onClick={() => handleIconToggle('sun', 'Sun Glow')}
          className={activeIcons.includes('sun') ? 'active' : ''}
        />
        <IconButton 
          icon={<Palette size={24} />} 
          title="Color Shift"
          onClick={() => handleIconToggle('globe', 'Color Shift')}
          className={activeIcons.includes('globe') ? 'active' : ''}
        />
        <IconButton 
          icon={<Heart size={24} strokeWidth={1.5} />} 
          title="Rose Overlay"
          onClick={() => handleIconToggle('heart', 'Rose Overlay')}
          className={activeIcons.includes('heart') ? 'active' : ''}
        />
        <IconButton 
          icon={<Aperture size={24} />} 
          title="Flash"
          onClick={() => handleIconToggle('camera', 'Flash')}
          className={activeIcons.includes('camera') ? 'active' : ''}
        />
        <IconButton 
          icon={<HeartPulse size={24} />} 
          title="Blush Overlay"
          onClick={() => handleIconToggle('liked', 'Blush Overlay')}
          className={activeIcons.includes('liked') ? 'active' : ''}
        />
      </div>
      <button 
        className={`ui-toggle ${toggleActive ? 'active' : ''}`}
        title={toggleActive ? 'Night Theme' : 'Day Theme'}
        onClick={handleToggle}
        aria-label="Toggle"
      >
        {toggleActive ? <MoonStar size={20} /> : <SunMedium size={20} />}
        {toggleActive && <div className="toggle-indicator"></div>}
      </button>
    </div>
  );
}
