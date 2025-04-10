import { FC, memo } from 'react';
import {
  Slider as ChakraSlider,
  SliderRootProps as ChakraSliderProps,
} from '@chakra-ui/react';

type Props = {
  onChange: (value: number[]) => void;
  hideIndicators?: boolean;
  indicators?: {
    value: number;
    label: string;
  }[];
} & Omit<ChakraSliderProps, 'onValueChange' | 'marks' | 'onChange'>;

const Slider: FC<Props> = ({
  defaultValue,
  value,
  step,
  min,
  max,
  indicators,
  hideIndicators = false,
  onChange,
  ...rootSliderProps
}) => {
  return (
    <ChakraSlider.Root
      width="100%"
      defaultValue={defaultValue}
      value={value}
      step={step}
      min={min}
      max={max}
      onValueChange={(e) => {
        onChange(e.value);
      }}
      {...rootSliderProps}
    >
      <ChakraSlider.Control>
        <ChakraSlider.Track>
          <ChakraSlider.Range />
        </ChakraSlider.Track>
        <ChakraSlider.Thumbs />
        {!hideIndicators && <ChakraSlider.Marks marks={indicators} />}
      </ChakraSlider.Control>
    </ChakraSlider.Root>
  );
};

export default memo(Slider);
