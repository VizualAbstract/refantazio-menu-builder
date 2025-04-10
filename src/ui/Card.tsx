import { FC, memo } from 'react';
import {
  Card as ChakraCard,
  CardRootProps as ChakraCardRootProps,
} from '@chakra-ui/react';

type CardRootProps = ChakraCardRootProps;

const Card: FC<CardRootProps> = ({ children, ...cardRootProps }) => {
  return (
    <ChakraCard.Root {...cardRootProps}>
      <ChakraCard.Body>{children}</ChakraCard.Body>
    </ChakraCard.Root>
  );
};

export default memo(Card);
