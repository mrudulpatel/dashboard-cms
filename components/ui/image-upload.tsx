import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Define the props expected by the Dropzone component
interface DropzoneProps {
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  fileExtension?: "png" | "jpg" | "jpeg";
  billboardId: string[];
  value?: string[];
}

// Create the Dropzone component receiving props
export function ImageUpload({
  onChange,
  className,
  fileExtension,
  billboardId,
  value,
  ...props
}: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileInfos, setFileInfos] = useState<string[]>([]); // Changed to store multiple file infos
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]); // State to store image URLs for display

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    handleFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      handleFiles(files);
    }
  };

  // set images = value
  React.useEffect(() => {
    if (value) {
      setImages(value);
    }
  }, [value]);

  const handleFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter((file) => {
      if (fileExtension && !file.name.endsWith(`.${fileExtension}`)) {
        setError(`Invalid file type. Expected: .${fileExtension}`);
        return false;
      }
      return true;
    });

    const fileInfos = validFiles.map((file) => {
      const fileSizeInKB = Math.round(file.size / 1024);
      return `Uploaded file: ${file.name} (${fileSizeInKB} KB)`;
    });

    const imageUrls = validFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageUrls]);
    onChange((prev) => [...prev, ...imageUrls]);
    setFileInfos((prevInfos) => [...prevInfos, ...fileInfos]);
    setError(null);
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card
      className={`border-2 border-dashed w-1/2 bg-muted hover:cursor-pointer hover:border-muted-foreground/50 ${className}`}
      {...props}
    >
      <CardContent
        className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex items-center justify-center text-muted-foreground">
          <span className="font-medium">Drag Files to Upload or</span>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto flex h-8 space-x-2 px-0 pl-1 text-xs"
            onClick={handleButtonClick}
          >
            Click Here
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={"image/*"}
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
        {fileInfos.map((info, index) => (
          <p key={index} className="text-muted-foreground">
            {info}
          </p>
        ))}
        {error && <span className="text-red-500">{error}</span>}
        <div className="flex flex-wrap justify-center gap-4">
          {images?.map((image, index) => (
            <Card key={index} className="w-48 h-48 relative">
              <button
                onClick={() => {
                  // Remove the image URL at the specified index
                  setImages((prevImages) =>
                    prevImages.filter((_, imgIndex) => imgIndex !== index)
                  );
                  // Remove the file info at the same index
                  setFileInfos((prevInfos) =>
                    prevInfos.filter((_, infoIndex) => infoIndex !== index)
                  );
                  // Assuming onChange is used to propagate changes up to a parent component, update it accordingly
                  onChange((prev) =>
                    prev.filter((_, imgIndex) => imgIndex !== index)
                  );
                }}
                className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                aria-label="Remove image"
              >
                <X size={16} color="white" />
              </button>
              <img
                src={image}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
