import { FC, memo } from 'react';
import {
  List as ChakraList,
  ListRootProps as ChakraListRootProps,
  ListItemProps as ChakraListItemProps,
  Text,
} from '@chakra-ui/react';

export const List: FC<ChakraListRootProps> = memo(
  ({ children, ...listRootProps }) => {
    return (
      <ChakraList.Root padding="0 1rem" {...listRootProps}>
        {children}
      </ChakraList.Root>
    );
  },
);

export const ListItem: FC<ChakraListItemProps> = memo(
  ({ children, ...listRootProps }) => {
    return (
      <ChakraList.Item {...listRootProps}>
        <Text fontSize="12px">{children}</Text>
      </ChakraList.Item>
    );
  },
);
