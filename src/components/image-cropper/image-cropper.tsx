import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button, Modal, FileButton } from "@mantine/core";
import getCroppedImg from "@/utils/cropImage";

interface ImageCropperProps {
  onChange: (croppedImage: string) => void;
  component: (props: any) => JSX.Element;
}

interface CroppedArea {
  width: number;
  height: number;
  x: number;
  y: number;
}

export default function ImageCropper({ onChange, component }: ImageCropperProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CroppedArea | null>(null);
  const [opened, setOpened] = useState(false);

  const onFileChange = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setOpened(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_: any, croppedPixels: CroppedArea) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const cropImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
      onChange(cropped); // ⬅ Send back to parent
      setOpened(false);
    } catch (e) {
      console.error("Crop failed:", e);
    }
  };

  return (
    <>
      <FileButton onChange={onFileChange} accept="image/*">
        {(props) => component(props)}
      </FileButton>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Crop Image"
        size="lg"
      >
        <div style={{ position: "relative", width: "100%", height: 400 }}>
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
        </div>
        <Button mt="md" onClick={cropImage}>
          Crop
        </Button>
      </Modal>
    </>
  );
}
