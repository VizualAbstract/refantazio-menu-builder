import { FC, memo, useMemo } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

type Props = {
  title: string;
  isSelected?: boolean;
  isTextFlipped?: boolean;
  transformOrigin?: string;
} & Omit<BoxProps, 'children'>;

const TitleLayer: FC<Props> = ({
  title,
  isSelected,
  isTextFlipped,
  transformOrigin,
  ...boxProps
}) => {
  const selectedStyles = useMemo(() => {
    if (!isSelected) {
      return {};
    }

    return {
      border: '1px solid white',
      boxShadow: '0 0 0 2px #4285f4',
    };
  }, [isSelected]);

  const originIndicatorStyles = useMemo(() => {
    if (!transformOrigin) return {};

    // Split the transform origin string, e.g., "100px 50px 0px" into separate values
    const parts = transformOrigin.split(' ');

    if (parts.length < 2) return {};

    // Extract values without the 'px' suffix
    const x = parseInt(parts[0], 10);
    const y = parseInt(parts[1], 10);

    return {
      position: 'absolute',
      width: '6px',
      height: '6px',
      backgroundColor: 'red',
      borderRadius: '50%',
      top: '0',
      left: '0',
      transform: `translate(${x}px, ${y}px)`,
      marginLeft: '-3px',
      marginTop: '-3px',
      zIndex: 1000,
      pointerEvents: 'none',
      boxShadow: '0 0 0 1px #fff',
    };
  }, [transformOrigin]);

  return (
    <Box
      position="absolute"
      transformStyle="preserve-3d"
      transformOrigin={transformOrigin || 'left'}
      padding="0 4px 0 6px"
      fontSize="15px"
      whiteSpace="nowrap"
      border="1px solid transparent"
      cursor="pointer"
      width="max-content"
      fontFamily="Carbon, sans-serif"
      fontWeight={700}
      {...selectedStyles}
      {...boxProps}
    >
      <Box transform={isTextFlipped ? 'scaleX(-1) scaleY(-1)' : undefined}>
        {title}
      </Box>
      {isSelected && <Box {...originIndicatorStyles} />}
    </Box>
  );
};

export default memo(TitleLayer);
