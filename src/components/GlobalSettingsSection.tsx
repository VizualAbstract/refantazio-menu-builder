import { FC, memo, useCallback, useMemo, useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  Separator,
  Text,
  VStack,
} from '@chakra-ui/react';

import { defaultGlobalSettings, globalSettingsList } from '../constants';
import { Accordion, AccordionItem } from '../ui/Accordion';

import Slider from '../ui/Slider';
import Blockquote from '../ui/Blockquote';
import { List, ListItem } from '../ui/List';
import ColorPicker from '../ui/ColorPicker';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import { useMenuLayout } from '../contexts/MenuLayoutContext';

type Props = {
  selectedIndex: number;
  onChangeSelectedIndex: (index: number) => void;
};

const GlobalSettingsSection: FC<Props> = ({
  selectedIndex,
  onChangeSelectedIndex,
}) => {
  const {
    perspective,
    menuSettings,
    updateProperty,
    updatePerspective,
    batchUpdateProperty,
    addNewLayer,
    deleteLayerByIndex,
    applySettings,
  } = useMenuLayout();

  const [settingsIndex, setSettingsIndex] = useState<number>(0);

  const settingOptions = useMemo(
    () =>
      globalSettingsList.map((_item, index) => ({
        label: `Settings ${index + 1}`,
        value: `${index}`,
      })),
    [],
  );

  const selectedSetting = useMemo(
    () =>
      settingsIndex || settingsIndex === 0 ? [`${settingsIndex}`] : undefined,
    [settingsIndex],
  );

  const handleUpdatePerspective = useCallback(
    (value: string | number) => {
      updatePerspective(Number(value));
    },
    [updatePerspective],
  );

  const handleSettingsChange = useCallback(
    (value: string[]) => {
      applySettings(Number(value[0]));
      setSettingsIndex(Number(value[0]));
    },
    [applySettings],
  );

  const handleToggleSelected = useCallback(
    (index: number) => {
      onChangeSelectedIndex(index);
      batchUpdateProperty('selected', (_layer, idx) => {
        return idx === index;
      });
    },
    [batchUpdateProperty, onChangeSelectedIndex],
  );

  const handleResetConfig = useCallback(
    () =>
      batchUpdateProperty('', (layer) => {
        const defaultSetting = defaultGlobalSettings.find(
          (item) => item.label === layer.label,
        );

        return {
          ...defaultSetting,
          layerSettings:
            layer.layerSettings || defaultSetting?.layerSettings || {},
        };
      }),
    [batchUpdateProperty],
  );

  const handleUpdateColor = useCallback(
    (index: number, color: string) => updateProperty(index, 'color', color),
    [updateProperty],
  );

  const handleUpdateVisibility = useCallback(
    (index: number, visible: boolean) =>
      updateProperty(index, 'visible', visible),
    [updateProperty],
  );

  const handleUpdateLabel = useCallback(
    (index: number, label: string) => updateProperty(index, 'label', label),
    [updateProperty],
  );

  const handleUpdateBG = useCallback(
    (index: number, bg: string) => updateProperty(index, 'bg', bg),
    [updateProperty],
  );

  const handleHideAll = useCallback(
    () => batchUpdateProperty('visible', () => false),
    [batchUpdateProperty],
  );

  const handleShowAll = useCallback(
    () => batchUpdateProperty('visible', () => true),
    [batchUpdateProperty],
  );

  const handleShowOnlySelected = useCallback(() => {
    batchUpdateProperty('visible', (layer) => {
      return layer.selected ? true : false;
    });
  }, [batchUpdateProperty]);

  const handleFlipText = useCallback(() => {
    batchUpdateProperty('isTextFlipped', (layer) => {
      return !layer.isTextFlipped;
    });
  }, [batchUpdateProperty]);

  const handleFlipLayerText = useCallback(
    (index: number, isTextFlipped: boolean) => {
      updateProperty(index, 'isTextFlipped', !isTextFlipped);
    },
    [updateProperty],
  );

  return (
    <VStack gap="20px">
      <VStack gap="10px" width="100%" alignItems="start">
        <HStack gap="20px" width="100%" justifyContent="center">
          <Box>Perspective</Box>
          <Slider
            width="100%"
            defaultValue={[perspective]}
            step={1}
            min={0}
            max={1000}
            onChange={(values) => handleUpdatePerspective(values[0])}
            indicators={[
              {
                value: 0,
                label: '0px',
              },
              {
                value: 50,
                label: '50px',
              },
              {
                value: 200,
                label: '200px',
              },
              {
                value: 500,
                label: '500px',
              },
              {
                value: 1000,
                label: '1000px',
              },
            ]}
          />
          <InputGroup endAddon="px" width="max-content">
            <Input
              type="number"
              value={perspective}
              onChange={(e) => handleUpdatePerspective(e.target.value)}
              min={0}
              max={1000}
              step={1}
              width="80px"
            />
          </InputGroup>
        </HStack>
        <Blockquote bg="#bfdbfe73" colorPalette="blue">
          <Text fontSize="12px" fontWeight="bold">
            What perspective does:
          </Text>
          <Text fontSize="12px">
            It sets the distance between the viewer (you) and the z=0 plane.
          </Text>
          <List>
            <ListItem>
              Small values (50-200px): Intense 3D effect (like viewing very
              close)
            </ListItem>
            <ListItem>
              Large values (500-1000px): Subtle 3D effect (like viewing from far
              away)
            </ListItem>
          </List>
        </Blockquote>
      </VStack>
      <Accordion
        isCollapsible
        defaultValue={['visibility-and-color']}
        key={selectedIndex}
      >
        <AccordionItem
          value="visibility-and-color"
          borderBottom="none"
          label="Visibility And Color"
        >
          <VStack gap="20px">
            <VStack gap="10px" width="100%" alignItems="start">
              {menuSettings.map((item, index) => {
                const { label, color, bg, visible } = item;
                return (
                  <HStack
                    key={index}
                    justifyContent="space-between"
                    width="100%"
                  >
                    <Checkbox
                      isChecked={visible}
                      onChange={(isChecked) =>
                        handleUpdateVisibility(index, isChecked)
                      }
                    />
                    <Input
                      width="200px"
                      placeholder="Label"
                      value={label}
                      onChange={(e) => handleUpdateLabel(index, e.target.value)}
                    />
                    <Separator />
                    <Box>Color</Box>
                    <ColorPicker
                      width="100px"
                      defaultValue={color}
                      onChange={(color) => handleUpdateColor(index, color)}
                    />
                    <Box>BG</Box>
                    <ColorPicker
                      width="100px"
                      defaultValue={bg}
                      onChange={(bg) => handleUpdateBG(index, bg)}
                    />
                    <Separator />
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleFlipLayerText(index, item.isTextFlipped)
                      }
                    >
                      Flip
                    </Button>
                    <Button
                      width="100px"
                      onClick={() => handleToggleSelected(index)}
                      colorScheme={item.selected ? 'blue' : 'gray'}
                      disabled={item.selected}
                    >
                      {item.selected ? 'Selected' : 'Select'}
                    </Button>
                    <Button
                      colorPalette="red"
                      onClick={() => deleteLayerByIndex(index)}
                      disabled={item.selected}
                    >
                      Delete
                    </Button>
                  </HStack>
                );
              })}
            </VStack>
            <HStack gap="10px" width="100%" justifyContent="center">
              <Select
                options={settingOptions}
                value={selectedSetting}
                width="150px"
                onChange={handleSettingsChange}
                placeholder="Load settings"
              />
              <Button onClick={addNewLayer}>Add Layer</Button>
              <Button onClick={handleHideAll}>Hide All</Button>
              <Button onClick={handleShowAll}>Show All</Button>
              <Button onClick={handleResetConfig}>Reset config</Button>
              <Button onClick={handleShowOnlySelected}>
                Show Only Selected
              </Button>
              <Button onClick={handleFlipText}>Flip All</Button>
            </HStack>
          </VStack>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};

export default memo(GlobalSettingsSection);
