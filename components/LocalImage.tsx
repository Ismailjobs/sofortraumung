"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

type LocalImageProps = Omit<ImageProps, "onError" | "src" | "alt"> & {
  src: string;
  alt: string;
  fallbackClassName?: string;
};

export default function LocalImage({
  src,
  alt,
  className,
  fallbackClassName = "bg-slate-800",
  fill,
  ...rest
}: LocalImageProps) {
  const [hasError, setHasError] = useState<boolean>(false);

  if (hasError) {
    if (fill) {
      return (
        <div
          className={`absolute inset-0 ${fallbackClassName}`}
          role="img"
          aria-label={alt}
        />
      );
    }
    return (
      <div
        className={`${fallbackClassName} ${className ?? ""}`}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      unoptimized
      onError={() => setHasError(true)}
      {...rest}
    />
  );
}
