"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getTokenImageUrl } from "@/services/imageService";

interface TokenImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function TokenImage({
  src,
  alt,
  width,
  height,
  className = "",
}: TokenImageProps) {
  const [imageSrc, setImageSrc] = useState<string>("/placeholder.png");

  useEffect(() => {
    // If this is one of our special token image URLs, get the actual image data
    if (src.startsWith("/api/images/tokens/")) {
      const storedImage = getTokenImageUrl(src);
      setImageSrc(storedImage);
    } else {
      // This is a regular image URL
      setImageSrc(src);
    }
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className="object-cover rounded-lg"
        onError={() => setImageSrc("/placeholder.png")}
      />
    </div>
  );
}
