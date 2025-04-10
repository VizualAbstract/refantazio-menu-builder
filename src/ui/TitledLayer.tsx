import { FC, memo, useMemo } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

type Props = {
  title: string;
  isSelected?: boolean;
  isTextFlipped?: boolean;
} & Omit<BoxProps, 'children'>;

const TitleLayer: FC<Props> = ({
  title,
  isSelected,
  isTextFlipped,
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

  return (
    <Box
      position="absolute"
      transformStyle="preserve-3d"
      transformOrigin="left"
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
    </Box>
  );
};

export default memo(TitleLayer);
