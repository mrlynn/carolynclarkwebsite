import { Box } from '@mui/material';
import Image from 'next/image';
import { brandColors } from '@/lib/theme';

interface FeaturedImageProps {
  src: string;
  alt: string;
  aspectRatio?: number;
  rounded?: boolean;
  shadow?: boolean;
  /** When true, hints LCP for above-the-fold hero images */
  priority?: boolean;
  objectPosition?: string;
}

export function FeaturedImage({
  src,
  alt,
  aspectRatio = 16 / 9,
  rounded = true,
  shadow = true,
  priority = false,
  objectPosition = 'center',
}: FeaturedImageProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${(1 / aspectRatio) * 100}%`,
        overflow: 'hidden',
        borderRadius: rounded ? '24px' : '0px',
        boxShadow: shadow ? `0 20px 40px rgba(0, 0, 0, 0.1)` : 'none',
        backgroundColor: brandColors.creamDeep,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 900px) 100vw, 480px"
        style={{
          objectFit: 'cover',
          objectPosition,
        }}
        priority={priority}
      />
    </Box>
  );
}
