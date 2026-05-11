import { Box } from '@mui/material';
import Image from 'next/image';
import { brandColors } from '@/lib/theme';

interface FeaturedImageProps {
  src: string;
  alt: string;
  aspectRatio?: number;
  rounded?: boolean;
  shadow?: boolean;
}

export function FeaturedImage({
  src,
  alt,
  aspectRatio = 16 / 9,
  rounded = true,
  shadow = true,
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
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        priority
      />
    </Box>
  );
}
