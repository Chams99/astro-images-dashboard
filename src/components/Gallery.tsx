import React, { useRef } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  label?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  currentSrc: string;
  onSelect: (src: string, alt: string) => void;
  onToggleVisibility?: () => void;
}

export default function Gallery({
  images,
  currentSrc,
  onSelect,
  onToggleVisibility
}: GalleryProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!listRef.current) return;
    const width = listRef.current.clientWidth;
    const amount = Math.max(140, Math.floor(width * 0.6));
    listRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="gallery">
      <div className="gallery-title">Gallery</div>
      <button
        type="button"
        className="gallery-toggle"
        onClick={onToggleVisibility}
        aria-label="Hide gallery"
      >
        Hide
      </button>
      <button
        type="button"
        className="gallery-nav"
        onClick={() => scrollByAmount('left')}
        aria-label="Scroll gallery left"
      >
        ‹
      </button>
      <div
        className="gallery-list"
        role="listbox"
        aria-label="Scene gallery"
        ref={listRef}
      >
        {images.map((image) => {
          const isActive = image.src === currentSrc;
          return (
            <button
              key={image.src}
              type="button"
              className={`gallery-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelect(image.src, image.alt)}
              aria-pressed={isActive}
              aria-label={image.label ?? image.alt}
            >
              <img className="gallery-thumb" src={image.src} alt={image.alt} loading="lazy" />
              <span className="gallery-label">{image.label ?? image.alt}</span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="gallery-nav"
        onClick={() => scrollByAmount('right')}
        aria-label="Scroll gallery right"
      >
        ›
      </button>
    </div>
  );
}
