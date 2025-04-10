import { FC, memo, useMemo, useState } from 'react';
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

import { cloneDeep } from 'lodash';
import { defaultGlobalSettings, globalSettingsList } from '../constants';
import { Accordion, AccordionItem } from '../ui/Accordion';

import Slider from '../ui/Slider';
import Blockquote from '../ui/Blockquote';
import { List, ListItem } from '../ui/List';
import ColorPicker from '../ui/ColorPicker';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import OutputConfigSettings from '../ui/OutputConfigSettings';
import OutputCSSSettings from '../ui/OutputCSSSettings';
import { useMenuLayout } from '../contexts/MenuLayoutContext';

const Section: FC = () => {
  const {
    perspective,
    menuSettings,
    updateProperty,
    updatePerspective,
    batchUpdateProperty,
    updateSelectedProperty,
    addNewLayer,
    selectedLayer,
    deleteLayerByIndex,
  } = useMenuLayout();

  const [settingsIndex, setSettingsIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const settingOptions = useMemo(
    () =>
      globalSettingsList.map((_item, index) => ({
        label: `Settings ${index + 1}`,
        value: `${index}`,
      })),
    [],
  );

  const layerOptions = useMemo(
    () =>
      menuSettings.map((item, index) => ({
        label: `Layer ${index + 1}: ${item.label || 'New Layer'}`,
        value: `${index}`,
      })),
    [menuSettings],
  );

  return (
    <Accordion
      showMultiple
      isCollapsible
      defaultValue={['global-settings', 'layer-controls', 'output']}
    >
      <AccordionItem
        value="global-settings"
        borderBottom="none"
        label={
          <Text fontSize="20px" fontWeight="bold">
            Global Settings
          </Text>
        }
      >
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
                onChange={(values) => updatePerspective(values[0])}
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
                  onChange={(e) => updatePerspective(Number(e.target.value))}
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
                  Large values (500-1000px): Subtle 3D effect (like viewing from
                  far away)
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
                            updateProperty(index, 'visible', isChecked)
                          }
                        />
                        <Input
                          width="200px"
                          placeholder="Label"
                          value={label}
                          onChange={(e) =>
                            updateProperty(index, 'label', e.target.value)
                          }
                        />
                        <Separator />
                        <Box>Color</Box>
                        <ColorPicker
                          width="100px"
                          color={color}
                          onChange={(color) =>
                            updateProperty(index, 'color', color)
                          }
                        />
                        <Box>BG</Box>
                        <ColorPicker
                          width="100px"
                          defaultValue={bg}
                          onChange={(bg) => updateProperty(index, 'bg', bg)}
                        />
                        <Separator />
                        <Button
                          width="100px"
                          onClick={() =>
                            batchUpdateProperty('selected', (_layer, idx) => {
                              return idx === index;
                            })
                          }
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
                    value={
                      settingsIndex || settingsIndex === 0
                        ? [`${settingsIndex}`]
                        : undefined
                    }
                    width="150px"
                    onChange={(value) => {
                      setSettingsIndex(Number(value));

                      const options = cloneDeep(
                        globalSettingsList[Number(value)],
                      );

                      batchUpdateProperty('', (_layer, index) => {
                        return {
                          ...options[index],
                        };
                      });
                    }}
                    placeholder="Load settings"
                  />
                  <Button onClick={addNewLayer}>Add Layer</Button>
                  <Button
                    onClick={() => batchUpdateProperty('visible', () => false)}
                  >
                    Hide All
                  </Button>
                  <Button
                    onClick={() => batchUpdateProperty('visible', () => true)}
                  >
                    Show All
                  </Button>
                  <Button
                    onClick={() =>
                      batchUpdateProperty('', (layer) => {
                        const defaultSetting = defaultGlobalSettings.find(
                          (item) => item.label === layer.label,
                        );

                        return {
                          ...defaultSetting,
                          layerSettings:
                            layer.layerSettings ||
                            defaultSetting?.layerSettings ||
                            {},
                        };
                      })
                    }
                  >
                    Reset config
                  </Button>
                  <Button
                    onClick={() => {
                      batchUpdateProperty('selected', (layer) => {
                        return layer.visible ? !layer.selected : false;
                      });
                    }}
                  >
                    Show Only Selected
                  </Button>
                </HStack>
              </VStack>
            </AccordionItem>
          </Accordion>
        </VStack>
      </AccordionItem>
      <AccordionItem
        value="layer-controls"
        borderBottom="none"
        label={
          <Text fontSize="20px" fontWeight="bold">
            Layer Controls
          </Text>
        }
      >
        <VStack gap="20px" width="100%" alignItems="start">
          <HStack>
            <Text fontSize="15px">Layer</Text>
            <Select
              options={layerOptions}
              width="320px"
              value={
                setSelectedIndex || setSelectedIndex === 0
                  ? [`${setSelectedIndex}`]
                  : undefined
              }
              onChange={(value) => {
                setSelectedIndex(Number(value));
                batchUpdateProperty('selected', (_layer, index) => {
                  return index === Number(value);
                });
              }}
              placeholder="Select layer"
            />
          </HStack>
          <Accordion
            isCollapsible
            showMultiple
            defaultValue={['position', 'transform', 'transform-origin']}
          >
            <AccordionItem
              value="position"
              borderBottom="none"
              label="Position"
            >
              <VStack gap="20px">
                <VStack gap="10px" width="100%" alignItems="start">
                  <HStack gap="20px" width="100%" justifyContent="center">
                    <Box>Left</Box>
                    <Slider
                      width="100%"
                      value={[
                        selectedLayer ? selectedLayer.layerSettings.left : 0,
                      ]}
                      step={1}
                      min={0}
                      max={100}
                      onChange={(values) =>
                        updateSelectedProperty('layerSettings.left', values[0])
                      }
                    />
                    <InputGroup endAddon="%" width="max-content">
                      <Input
                        type="number"
                        value={selectedLayer?.layerSettings.left || 0}
                        onChange={(e) =>
                          updateProperty(
                            selectedIndex,
                            'layerSettings.left',
                            Number(e.target.value),
                          )
                        }
                        min={0}
                        max={100}
                        step={1}
                        width="80px"
                      />
                    </InputGroup>
                  </HStack>
                  <HStack gap="20px" width="100%" justifyContent="center">
                    <Box>Top</Box>
                    <Slider
                      width="100%"
                      value={[selectedLayer?.layerSettings.top || 0]}
                      step={1}
                      min={0}
                      max={100}
                      onChange={(values) =>
                        updateProperty(
                          selectedIndex,
                          'layerSettings.top',
                          values[0],
                        )
                      }
                    />
                    <InputGroup endAddon="%" width="max-content">
                      <Input
                        type="number"
                        value={selectedLayer?.layerSettings.top || 0}
                        onChange={(e) =>
                          updateProperty(
                            selectedIndex,
                            'layerSettings.top',
                            Number(e.target.value),
                          )
                        }
                        min={0}
                        max={100}
                        step={1}
                        width="80px"
                      />
                    </InputGroup>
                  </HStack>
                </VStack>
                <Blockquote bg="#fef08a73" colorPalette="yellow">
                  <Text fontSize="12px" fontWeight="bold">
                    Position values are relative to the container:
                  </Text>
                  <List>
                    <ListItem>top: 0% = top edge of container</ListItem>
                    <ListItem>top: 50% = middle of container</ListItem>
                    <ListItem>top: 100% = bottom edge of container</ListItem>
                    <ListItem>
                      Similarly for left: 0% (left edge), 50% (center), 100%
                      (right edge)
                    </ListItem>
                  </List>
                </Blockquote>
              </VStack>
            </AccordionItem>
            <AccordionItem
              value="transform"
              label="Transform"
              borderBottom="none"
            >
              <VStack gap="20px">
                <VStack gap="10px" width="100%" alignItems="start">
                  <HStack gap="20px" width="100%" justifyContent="center">
                    <Text whiteSpace="nowrap">Translate X</Text>
                    <Slider
                      width="100%"
                      value={[selectedLayer?.layerSettings.translateX || 0]}
                      step={1}
                      min={-100}
                      max={100}
                      onChange={(values) =>
                        updateProperty(
                          selectedIndex,
                          'layerSettings.translateX',
                          values[0],
                        )
                      }
                    />
                    <InputGroup endAddon="%" width="max-content">
                      <Input
                        type="number"
                        value={selectedLayer?.layerSettings.translateX || 0}
                        onChange={(e) =>
                          updateProperty(
                            selectedIndex,
                            'layerSettings.translateX',
                            Number(e.target.value),
                          )
                        }
                        min={-100}
                        max={100}
                        step={1}
                        width="80px"
                      />
                    </InputGroup>
                  </HStack>
                  <HStack gap="20px" width="100%" justifyContent="center">
                    <Text whiteSpace="nowrap">Translate Y</Text>
                    <Slider
                      width="100%"
                      value={[selectedLayer?.layerSettings.translateY || 0]}
                      step={1}
                      min={-100}
                      max={100}
                      onChange={(values) =>
                        updateProperty(
                          selectedIndex,
                          'layerSettings.translateY',
                          values[0],
                        )
                      }
                    />
                    <InputGroup endAddon="%" width="max-content">
                      <Input
                        type="number"
                        value={selectedLayer?.layerSettings.translateY || 0}
                        onChange={(e) =>
                          updateProperty(
                            selectedIndex,
                            'layerSettings.translateY',
                            Number(e.target.value),
                          )
                        }
                        min={-100}
                        max={100}
                        step={1}
                        width="80px"
                      />
                    </InputGroup>
                  </HStack>
                  <HStack gap="20px" width="100%" justifyContent="center">
                    <Text whiteSpace="nowrap">Translate Z</Text>
                    <Slider
                      width="100%"
                      value={[selectedLayer?.layerSettings.translateZ || 0]}
                      step={1}
                      min={-100}
                      max={100}
                      onChange={(values) =>
                        updateProperty(
                          selectedIndex,
                          'layerSettings.translateZ',
                          values[0],
                        )
                      }
                    />
                    <InputGroup endAddon="px" width="max-content">
                      <Input
                        type="number"
                        value={selectedLayer?.layerSettings.translateZ || 0}
                        onChange={(e) =>
                          updateProperty(
                            selectedIndex,
                            'layerSettings.translateZ',
                            Number(e.target.value),
                          )
                        }
                        min={-100}
                        max={100}
                        step={1}
                        width="80px"
                      />
                    </InputGroup>
                  </HStack>
                  <HStack gap="20px" width="100%" justifyContent="center">
                    <Text whiteSpace="nowrap">Rotate X</Text>
                    <Slider
                      width="100%"
                      value={[selectedLayer?.layerSettings.rotateX || 0]}
                      step={1}
                      min={-360}
                      max={360}
                      onChange={(values) =>
                        updateProperty(
                          selectedIndex,
                          'layerSettings.rotateX',
                          values[0],
                        )
                      }
                    />
                    <InputGroup endAddon="deg" width="max-content">
                      <Input
                        type="number"
                        value={selectedLayer?.layerSettings.rotateX || 0}
                        onChange={(e) =>
                          updateProperty(
                            selectedIndex,
                            'layerSettings.rotateX',
                            Number(e.target.value),
                          )
                        }
                        min={-360}
                        max={360}
                        step={1}
                        width="80px"
                      />
                    </InputGroup>
                  </HStack>
                  <HStack gap="20px" width="100%" justifyContent="center">
                    <Text whiteSpace="nowrap">Rotate Y</Text>
                    <Slider
                      width="100%"
                      value={[selectedLayer?.layerSettings.rotateY || 0]}
                      step={1}
                      min={-360}
                      max={360}
                      onChange={(values) =>
                        updateProperty(
                          selectedIndex,
                          'layerSettings.rotateY',
                          values[0],
                        )
                      }
                    />
                    <InputGroup endAddon="deg" width="max-content">
                      <Input
                        type="number"
                        value={selectedLayer?.layerSettings.rotateY || 0}
                        onChange={(e) =>
                          updateProperty(
                            selectedIndex,
                            'layerSettings.rotateY',
                            Number(e.target.value),
                          )
                        }
                        min={-360}
                        max={360}
                        step={1}
                        width="80px"
                      />
                    </InputGroup>
                  </HStack>
                  <HStack gap="20px" width="100%" justifyContent="center">
                    <Text whiteSpace="nowrap">Rotate Z</Text>
                    <Slider
                      width="100%"
                      value={[selectedLayer?.layerSettings.rotateZ || 0]}
                      step={1}
                      min={-360}
                      max={360}
                      onChange={(values) =>
                        updateProperty(
                          selectedIndex,
                          'layerSettings.rotateZ',
                          values[0],
                        )
                      }
                    />
                    <InputGroup endAddon="deg" width="max-content">
                      <Input
                        type="number"
                        value={selectedLayer?.layerSettings.rotateZ || 0}
                        onChange={(e) =>
                          updateProperty(
                            selectedIndex,
                            'layerSettings.rotateZ',
                            Number(e.target.value),
                          )
                        }
                        min={-360}
                        max={360}
                        step={1}
                        width="80px"
                      />
                    </InputGroup>
                  </HStack>
                </VStack>
                <Button
                  onClick={() =>
                    updateProperty(
                      selectedIndex,
                      'layerSettings',
                      defaultGlobalSettings[selectedIndex].layerSettings,
                    )
                  }
                >
                  Reset All Transforms
                </Button>
              </VStack>
            </AccordionItem>
            <AccordionItem label="Transform Origin" value="transform-origin">
              <VStack gap="20px">
                <VStack gap="10px" width="100%" alignItems="start">
                  <HStack gap="20px" width="100%" justifyContent="center">
                    <Text whiteSpace="nowrap">X</Text>
                    <Slider
                      width="100%"
                      value={[
                        selectedLayer?.layerSettings.transformOriginX || 0,
                      ]}
                      step={1}
                      min={-100}
                      max={100}
                      onChange={(values) =>
                        updateProperty(
                          selectedIndex,
                          'layerSettings.transformOriginX',
                          values[0],
                        )
                      }
                    />
                    <InputGroup endAddon="%" width="max-content">
                      <Input
                        type="number"
                        value={
                          selectedLayer?.layerSettings.transformOriginX || 0
                        }
                        onChange={(e) =>
                          updateProperty(
                            selectedIndex,
                            'layerSettings.transformOriginX',
                            Number(e.target.value),
                          )
                        }
                        min={-100}
                        max={100}
                        step={1}
                        width="80px"
                      />
                    </InputGroup>
                  </HStack>
                  <HStack gap="20px" width="100%" justifyContent="center">
                    <Text whiteSpace="nowrap">Y</Text>
                    <Slider
                      width="100%"
                      value={[
                        selectedLayer?.layerSettings.transformOriginY || 0,
                      ]}
                      step={1}
                      min={-100}
                      max={100}
                      onChange={(values) =>
                        updateProperty(
                          selectedIndex,
                          'layerSettings.transformOriginY',
                          values[0],
                        )
                      }
                    />
                    <InputGroup endAddon="%" width="max-content">
                      <Input
                        type="number"
                        value={
                          selectedLayer?.layerSettings.transformOriginY || 0
                        }
                        onChange={(e) =>
                          updateProperty(
                            selectedIndex,
                            'layerSettings.transformOriginY',
                            Number(e.target.value),
                          )
                        }
                        min={-100}
                        max={100}
                        step={1}
                        width="80px"
                      />
                    </InputGroup>
                  </HStack>
                  <HStack gap="20px" width="100%" justifyContent="center">
                    <Text whiteSpace="nowrap">Z</Text>
                    <Slider
                      width="100%"
                      value={[
                        selectedLayer?.layerSettings.transformOriginZ || 0,
                      ]}
                      step={1}
                      min={-100}
                      max={100}
                      onChange={(values) =>
                        updateProperty(
                          selectedIndex,
                          'layerSettings.transformOriginZ',
                          values[0],
                        )
                      }
                    />
                    <InputGroup endAddon="%" width="max-content">
                      <Input
                        type="number"
                        value={
                          selectedLayer?.layerSettings.transformOriginZ || 0
                        }
                        onChange={(e) =>
                          updateProperty(
                            selectedIndex,
                            'layerSettings.transformOriginZ',
                            Number(e.target.value),
                          )
                        }
                        min={-100}
                        max={100}
                        step={1}
                        width="80px"
                      />
                    </InputGroup>
                  </HStack>
                </VStack>
                <Button
                  onClick={() => {
                    updateProperty(
                      selectedIndex,
                      'layerSettings.transformOriginX',
                      defaultGlobalSettings[selectedIndex].layerSettings
                        .transformOriginX,
                    );

                    updateProperty(
                      selectedIndex,
                      'layerSettings.transformOriginY',
                      defaultGlobalSettings[selectedIndex].layerSettings
                        .transformOriginY,
                    );

                    updateProperty(
                      selectedIndex,
                      'layerSettings.transformOriginZ',
                      defaultGlobalSettings[selectedIndex].layerSettings
                        .transformOriginZ,
                    );
                  }}
                >
                  Reset All Transform Origins
                </Button>
              </VStack>
            </AccordionItem>
          </Accordion>
        </VStack>
      </AccordionItem>
      <AccordionItem
        value="output"
        borderBottom="none"
        label={
          <Text fontSize="20px" fontWeight="bold">
            Output
          </Text>
        }
      >
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
      </AccordionItem>
    </Accordion>
  );
};

export default memo(Section);
