"use client";

import { useState, useRef } from "react";
import { Button, Group, Modal, Text, FileButton, Stack, Image, ActionIcon, Box } from "@mantine/core";
import { FaUpload, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

interface Props {
  opened: boolean;
  close: () => void;
  onImagesUpload?: (images: File[]) => void;
}

export const CarImagesUploadModal = (props: Props) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleFileSelect = (files: File[]) => {
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} не является изображением`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error(`${file.name} слишком большой (максимум 5MB)`);
        return false;
      }
      return true;
    });

    const totalImages = selectedImages.length + validFiles.length;
    if (totalImages > 5) {
      toast.error(`Максимум 5 изображений разрешено`);
      return;
    }

    const newImages = [...selectedImages, ...validFiles];
    setSelectedImages(newImages);

    // Create URLs for preview
    const newUrls = validFiles.map(file => URL.createObjectURL(file));
    setImageUrls(prev => [...prev, ...newUrls]);
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    
    // Revoke URL to prevent memory leaks
    URL.revokeObjectURL(imageUrls[index]);
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileSelect(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSave = () => {
    if (props.onImagesUpload) {
      props.onImagesUpload(selectedImages);
    }
    props.close();
    // Clean up URLs
    imageUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedImages([]);
    setImageUrls([]);
  };

  const handleClose = () => {
    // Clean up URLs
    imageUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedImages([]);
    setImageUrls([]);
    props.close();
  };

  return (
    <Modal
      centered
      opened={props.opened}
      onClose={handleClose}
      title="Загрузить изображения автомобиля"
      size="lg"
      closeOnClickOutside={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack gap="md">
        <Text size="sm" color="dimmed">
          Выберите до 5 изображений вашего автомобиля. Поддерживаются форматы: JPG, PNG, GIF. Максимальный размер: 5MB.
        </Text>

        {/* Drag and Drop Area */}
        <Box
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
        >
          <FaUpload className="mx-auto text-4xl text-gray-400 mb-4" />
          <Text size="lg" mb="xs">Перетащите изображения сюда</Text>
          <Text size="sm" color="dimmed" mb="md">или</Text>
          
          <FileButton
            onChange={(files) => files && handleFileSelect(Array.from(files))}
            accept="image/*"
            multiple
          >
            {(props) => (
              <Button {...props} variant="outline">
                Выбрать файлы
              </Button>
            )}
          </FileButton>
        </Box>

        {/* Image Preview */}
        {imageUrls.length > 0 && (
          <div>
            <Text size="sm" fw={500} mb="sm">
              Выбранные изображения ({selectedImages.length}/5):
            </Text>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative">
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="rounded-lg"
                    height={120}
                    fit="cover"
                  />
                  <ActionIcon
                    variant="filled"
                    color="red"
                    size="sm"
                    className="absolute -top-2 -right-2"
                    onClick={() => removeImage(index)}
                  >
                    <FaTimes size={12} />
                  </ActionIcon>
                </div>
              ))}
            </div>
          </div>
        )}
      </Stack>

      <Group mt="lg" justify="flex-end">
        <Button onClick={handleClose} variant="default">
          Отменить
        </Button>
        <Button
          onClick={handleSave}
          className="bg-dark-blue hover:bg-dark-blue"
          disabled={selectedImages.length === 0}
        >
          Загрузить ({selectedImages.length})
        </Button>
      </Group>
    </Modal>
  );
}; 