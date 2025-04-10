import { FC, memo } from 'react';
import {
  Accordion as ChakraAccordion,
  AccordionRootProps as ChakraAccordionRootProps,
  Span,
  AccordionItemProps as ChakraAccordionItemProps,
} from '@chakra-ui/react';

type AccordionRootProps = {
  defaultValues?: string[];
  value?: string[];
  showMultiple?: boolean;
  isCollapsible?: boolean;
} & Omit<
  ChakraAccordionRootProps,
  'defaultValues' | 'value' | 'multiple' | 'collapsible'
>;

export const Accordion: FC<AccordionRootProps> = memo(
  ({
    defaultValues,
    showMultiple = false,
    isCollapsible = false,
    children,
    ...accordionRootProps
  }) => {
    return (
      <ChakraAccordion.Root
        collapsible={isCollapsible}
        multiple={showMultiple}
        defaultValue={defaultValues}
        {...accordionRootProps}
      >
        {children}
      </ChakraAccordion.Root>
    );
  },
);

type AccordionItemProps = {
  value: string;
  label: React.ReactNode;
  hideIndicator?: boolean;
} & Omit<ChakraAccordionItemProps, 'value' | 'label'>;

export const AccordionItem: FC<AccordionItemProps> = memo(
  ({
    value,
    label,
    children,
    hideIndicator = false,
    ...accordionItemProps
  }) => {
    return (
      <ChakraAccordion.Item value={value} {...accordionItemProps}>
        <ChakraAccordion.ItemTrigger>
          <Span flex="1">{label}</Span>
          {!hideIndicator && <ChakraAccordion.ItemIndicator />}
        </ChakraAccordion.ItemTrigger>
        <ChakraAccordion.ItemContent>
          <ChakraAccordion.ItemBody>{children}</ChakraAccordion.ItemBody>
        </ChakraAccordion.ItemContent>
      </ChakraAccordion.Item>
    );
  },
);
