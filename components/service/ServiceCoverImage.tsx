import Image from "next/image";
import type { ServiceCoverImage as CoverConfig } from "@/config/service-images";

interface ServiceCoverImageProps {
  cover: CoverConfig;
  variant: "card" | "hero";
  priority?: boolean;
  className?: string;
}

export default function ServiceCoverImage({
  cover,
  variant,
  priority = false,
  className = "",
}: ServiceCoverImageProps) {
  const scale =
    variant === "hero"
      ? (cover.heroScale ?? cover.scale ?? 1.15)
      : (cover.scale ?? 1);
  const opacity = variant === "hero" ? (cover.heroOpacity ?? 0.22) : 1;

  return (
    <Image
      src={cover.src}
      alt={variant === "hero" ? "" : cover.alt}
      fill
      unoptimized
      priority={priority}
      aria-hidden={variant === "hero" ? true : undefined}
      sizes={
        variant === "card"
          ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          : "100vw"
      }
      className={`object-cover ${className}`.trim()}
      style={{
        objectPosition: cover.objectPosition ?? "center center",
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        opacity: variant === "hero" ? opacity : undefined,
      }}
    />
  );
}
