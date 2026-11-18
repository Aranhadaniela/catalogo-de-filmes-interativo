import { useState } from "react";
import { backdropUrl, imagesUrl } from "../../service/tmdb";

type BackdropImageProps = {
  backdropPath: string | null;
  posterPath: string | null;
  alt: string;
  className?: string;
};

const BackdropImage = ({
  backdropPath,
  posterPath,
  alt,
  className,
}: BackdropImageProps) => {
  const [failedPath, setFailedPath] = useState<string | null>(null);

  const backdropOk = backdropPath && failedPath !== backdropPath;
  const src = backdropOk
    ? `${backdropUrl}${backdropPath}`
    : posterPath
      ? `${imagesUrl}${posterPath}`
      : null;

  if (!src) return null;

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => {
        if (backdropOk) setFailedPath(backdropPath);
      }}
    />
  );
};

export default BackdropImage;
