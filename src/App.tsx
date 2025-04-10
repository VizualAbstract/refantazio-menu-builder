import { FC, memo, useMemo, useState } from 'react';
import { Box, Link, Text, VStack } from '@chakra-ui/react';

import { Accordion, AccordionItem } from './ui/Accordion';
import Card from './ui/Card';
import { MenuLayoutProvider } from './contexts/MenuLayoutContext';
import MenuPreview from './components/MenuPreview';
import OutputSection from './components/OutputSection';
import GlobalSettingsSection from './components/GlobalSettingsSection';
import LayerControlsSection from './components/LayerControlsSection';

const App: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const copyrightYear: string = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const copyrightYear = currentYear >= 2025 ? `2025` : `2025-${currentYear}`;

    return copyrightYear;
  }, []);

  return (
    <MenuLayoutProvider>
      <VStack>
        <VStack
          gap="10px"
          width="100%"
          maxWidth="550px"
          padding="1rem"
          alignItems="center"
          marginTop="20px"
          marginBottom="20px"
          textAlign="center"
        >
          <Text fontSize="30px" fontWeight="bold">
            Refantazio Menu Builder
          </Text>
          <Text>
            Provides a series of configurable options to create a 3D menu,
            similar to the video game menus found in either Metaphor: Refantazio
            or the Persona series of games.
          </Text>
        </VStack>
        <Card>
          <MenuPreview />
        </Card>
        <Box width="100%" maxWidth="1000px" padding="1rem">
          <Accordion
            showMultiple
            isCollapsible
            defaultValue={['global-settings', 'layer-controls', 'output']}
          >
            <AccordionItem
              value="global-settings"
              label={
                <Text fontSize="20px" fontWeight="bold">
                  Global Settings
                </Text>
              }
              borderBottom="none"
            >
              <GlobalSettingsSection
                selectedIndex={selectedIndex}
                onChangeSelectedIndex={setSelectedIndex}
              />
            </AccordionItem>
            <AccordionItem
              value="layer-controls"
              label={
                <Text fontSize="20px" fontWeight="bold">
                  Layer Controls
                </Text>
              }
              borderBottom="none"
            >
              <LayerControlsSection
                selectedIndex={selectedIndex}
                onChangeSelectedIndex={setSelectedIndex}
              />
            </AccordionItem>
            <AccordionItem
              value="output"
              label={
                <Text fontSize="20px" fontWeight="bold">
                  Output
                </Text>
              }
              borderBottom="none"
            >
              <OutputSection />
            </AccordionItem>
          </Accordion>
        </Box>
        <Box p="2rem">
          Copyright &copy;{' '}
          <Link href="https://www.coreycapetillo.com">Corey M. Capetillo</Link>{' '}
          {copyrightYear} All rights reserved.
        </Box>
      </VStack>
    </MenuLayoutProvider>
  );
};

export default memo(App);
