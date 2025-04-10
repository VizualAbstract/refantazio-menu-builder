import { FC, memo } from 'react';
import {
  ColorPicker as ChakraColorPicker,
  ColorPickerRootProps as ChakraColorPickerRootProps,
  parseColor,
} from '@chakra-ui/react';

type Props = {
  color?: string;
  width?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
} & Omit<
  ChakraColorPickerRootProps,
  'width' | 'onValueChangeEnd' | 'onChange' | 'value' | 'defaultValue'
>;

const ColorPicker: FC<Props> = ({
  color,
  width,
  onChange,
  defaultValue,
  ...colorPickerRootProps
}) => {
  return (
    <ChakraColorPicker.Root
      value={color ? parseColor(color) : undefined}
      onValueChangeEnd={(e) => {
        onChange?.(e.value.toString('rgba') || '');
      }}
      defaultValue={defaultValue ? parseColor(defaultValue) : undefined}
      {...colorPickerRootProps}
    >
      <ChakraColorPicker.HiddenInput />
      <ChakraColorPicker.Control>
        <ChakraColorPicker.Input width={width} />
        <ChakraColorPicker.Trigger />
      </ChakraColorPicker.Control>
      <ChakraColorPicker.Positioner>
        <ChakraColorPicker.Content>
          <ChakraColorPicker.Area />
          <ChakraColorPicker.Sliders />
        </ChakraColorPicker.Content>
      </ChakraColorPicker.Positioner>
    </ChakraColorPicker.Root>
  );
};

export default memo(ColorPicker);
