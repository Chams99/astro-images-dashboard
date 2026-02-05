import { useState } from 'react';
import TopBar from './TopBar';
import Landscape from './Landscape';
import BottomBar from './BottomBar';
import Gallery from './Gallery';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80',
    alt: 'Mountain lake at sunset',
    label: 'Sunset Lake'
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80',
    alt: 'Forest path with sun rays',
    label: 'Forest Path'
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80',
    alt: 'Mountain ridge with mist',
    label: 'Misty Ridge'
  },
  {
    src: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1800&q=80',
    alt: 'Lake with pine forest and mountains',
    label: 'Pine Lake'
  },
  {
    src: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1800&q=80',
    alt: 'Rolling hills under sunrise',
    label: 'Golden Hills'
  },
  {
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80',
    alt: 'Snowy mountains and calm lake',
    label: 'Snowy Lake'
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80&sat=-10',
    alt: 'Cool tone mountain ridge',
    label: 'Cool Ridge'
  },
  {
    src: 'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?auto=format&fit=crop&w=1800&q=80',
    alt: 'Mountain lake with fog',
    label: 'Foggy Lake'
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80',
    alt: 'Ocean waves at sunset',
    label: 'Ocean Sunset'
  },
  {
    src: 'https://images.unsplash.com/photo-1441906363162-903afd0d3d52?auto=format&fit=crop&w=1800&q=80',
    alt: 'Rocky shoreline at dawn',
    label: 'Rocky Dawn'
  },
  {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80',
    alt: 'Forest valley with sunlight',
    label: 'Sunlit Valley'
  }
];

export default function App() {
  const [imageUrl, setImageUrl] = useState(galleryImages[0].src);
  const [imageAlt, setImageAlt] = useState(galleryImages[0].alt);
  const [galleryVisible, setGalleryVisible] = useState(true);

  const handleSelect = (src: string, alt: string) => {
    setImageUrl(src);
    setImageAlt(alt);
  };

  return (
    <>
      <TopBar />
      <Landscape imageUrl={imageUrl} alt={imageAlt} />
      {galleryVisible ? (
        <Gallery
          images={galleryImages}
          currentSrc={imageUrl}
          onSelect={handleSelect}
          onToggleVisibility={() => setGalleryVisible(false)}
        />
      ) : (
        <div className="gallery-hidden">
          <button
            type="button"
            className="gallery-toggle"
            onClick={() => setGalleryVisible(true)}
          >
            Show Gallery
          </button>
        </div>
      )}
      <BottomBar />
    </>
  );
}
