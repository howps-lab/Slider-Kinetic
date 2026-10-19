export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  series: string;
  year: string;
  location: string;
  exif: string;
  curatorNotes: string;
  imageUrl: string;
  aspectRatio: string;
  width: number;
  height: number;
  verticalOffset: number;
  rotation: number;
  tilt: {
    rotateX: number;
    rotateY: number;
    skewX: number;
  };
  kinetic: {
    primaryWord: string;
    secondaryWord: string;
    phrase: string;
    angle: number;
    scale: number;
    offsetX: number;
    offsetY: number;
  };
  curvePath: string;
}

export type SliderDirection = 'left' | 'right' | 'idle';
