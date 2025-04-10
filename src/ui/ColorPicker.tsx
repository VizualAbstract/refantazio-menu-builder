import { FC, memo, useCallback } from 'react';
import {
  ColorPicker as ChakraColorPicker,
  ColorPickerRootProps as ChakraColorPickerRootProps,
  Color,
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
  const handleColorChange = useCallback(
    (value: Color) => {
      onChange?.(value.toString('rgba') || '');
    },
    [onChange],
  );

  return (
    <ChakraColorPicker.Root
      key={defaultValue}
      value={color ? parseColor(color) : undefined}
      onValueChangeEnd={(e) => handleColorChange(e.value)}
      defaultValue={defaultValue ? parseColor(defaultValue) : undefined}
      {...colorPickerRootProps}
    >
      <ChakraColorPicker.HiddenInput />
      <ChakraColorPicker.Control>
        <ChakraColorPicker.Input
          width={width}
          onChange={(e) => handleColorChange(parseColor(e.target.value))}
        />
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
