import { FC, memo } from 'react';
import {
  Blockquote as ChakraBlockquote,
  BlockquoteRootProps as ChakraBlockquoteRootProps,
} from '@chakra-ui/react';

type Props = ChakraBlockquoteRootProps;

const Blockquote: FC<Props> = ({ children, ...blockquoteRootProps }) => {
  return (
    <ChakraBlockquote.Root width="100%" padding="1rem" {...blockquoteRootProps}>
      <ChakraBlockquote.Caption>{children}</ChakraBlockquote.Caption>
    </ChakraBlockquote.Root>
  );
};

export default memo(Blockquote);
