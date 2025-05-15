interface CroppedArea {
  width: number;
  height: number;
  x: number;
  y: number;
}

export default function getCroppedImg(imageSrc: string, crop: CroppedArea): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) return reject(new Error('Canvas context is null'));

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      const base64Image = canvas.toDataURL('image/jpeg');
      resolve(base64Image);
    };
    image.onerror = () => reject(new Error('Failed to load image'));
  });
}
