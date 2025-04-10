import { FC, memo } from 'react';

import { Accordion, AccordionItem } from '../ui/Accordion';

import OutputConfigSettings from '../ui/OutputConfigSettings';
import OutputCSSSettings from '../ui/OutputCSSSettings';
import { useMenuLayout } from '../contexts/MenuLayoutContext';

const OutputSection: FC = () => {
  const { menuSettings } = useMenuLayout();

  return (
    <>
      <Accordion showMultiple defaultValue={['config', 'css']}>
        <AccordionItem
          value="config"
          borderBottom="none"
          label="Config settings"
        >
          <OutputConfigSettings config={menuSettings} />
        </AccordionItem>
        <AccordionItem value="css" borderBottom="none" label="CSS styles">
          <OutputCSSSettings config={menuSettings} />
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default memo(OutputSection);
