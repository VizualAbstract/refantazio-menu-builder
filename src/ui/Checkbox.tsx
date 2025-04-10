import { FC, memo } from 'react';
import {
  Checkbox as ChakraCheckbox,
  CheckboxRootProps as ChakraCheckboxRootProps,
} from '@chakra-ui/react';

type Props = {
  isChecked?: boolean;
  onChange?: (value: boolean) => void;
} & Omit<ChakraCheckboxRootProps, 'onCheckedChange' | 'checked' | 'onChange'>;

const Checkbox: FC<Props> = ({ isChecked, onChange }) => {
  return (
    <ChakraCheckbox.Root
      checked={!!isChecked}
      onCheckedChange={(e) => {
        onChange?.(!!e.checked);
      }}
    >
      <ChakraCheckbox.HiddenInput />
      <ChakraCheckbox.Control>
        <ChakraCheckbox.Indicator />
      </ChakraCheckbox.Control>
    </ChakraCheckbox.Root>
  );
};

export default memo(Checkbox);
