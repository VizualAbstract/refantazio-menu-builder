import { FC, memo, useMemo } from 'react';
import {
  createListCollection,
  Select as ChakraSelect,
  SelectRootProps as ChakraSelectRootProps,
} from '@chakra-ui/react';

type Props = {
  options: {
    label: string;
    value: string;
  }[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
} & Omit<ChakraSelectRootProps, 'onChange' | 'onValueChange' | 'collection'>;

const Select: FC<Props> = ({
  onChange,
  options,
  placeholder,
  ...selectRootProps
}) => {
  const listOptions = useMemo(
    () =>
      createListCollection({
        items: options,
      }),
    [options],
  );

  return (
    <ChakraSelect.Root
      collection={listOptions}
      onValueChange={(e) => {
        onChange?.(e.value);
      }}
      {...selectRootProps}
    >
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText placeholder={placeholder} />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
      <ChakraSelect.Positioner>
        <ChakraSelect.Content>
          {listOptions.items.map((item, index) => (
            <ChakraSelect.Item key={index} item={item}>
              {item.label}
              <ChakraSelect.ItemIndicator />
            </ChakraSelect.Item>
          ))}
        </ChakraSelect.Content>
      </ChakraSelect.Positioner>
    </ChakraSelect.Root>
  );
};

export default memo(Select);
