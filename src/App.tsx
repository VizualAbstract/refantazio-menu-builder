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

import { cloneDeep, set } from 'lodash';
import { LayerConfig, LayerSettings } from './types';
import {
  defaultGlobalSettings,
  defaultOptions,
  defaultPerspective,
  globalSettingsList,
} from './constants';
import { Accordion, AccordionItem } from './ui/Accordion';
import Card from './ui/Card';
import Slider from './ui/Slider';
import Blockquote from './ui/Blockquote';
import { List, ListItem } from './ui/List';
import ColorPicker from './ui/ColorPicker';
import Select from './ui/Select';
import Checkbox from './ui/Checkbox';
import OutputConfigSettings from './ui/OutputConfigSettings';
import OutputCSSSettings from './ui/OutputCSSSettings';
import { MenuLayoutProvider } from './contexts/MenuLayoutContext';
import MenuPreview from './components/MenuPreview';

const App: FC = () => {
  const [perspective, setPerspective] = useState<number>(defaultPerspective);
  const [globalSettings, setGlobalSettings] = useState<LayerConfig[]>(
    cloneDeep(defaultGlobalSettings),
  );

  const layerOptions = useMemo(
    () =>
      globalSettings.map((item, index) => ({
        label: `Layer ${index + 1}: ${item.label || 'New Layer'}`,
        value: `${index}`,
      })),
    [globalSettings],
  );

  const settingOptions = useMemo(
    () =>
      globalSettingsList.map((_item, index) => ({
        label: `Settings ${index + 1}`,
        value: `${index}`,
      })),
    [],
  );

  const selectedLayerIndex = useMemo(() => {
    return globalSettings.findIndex((item) => item.selected);
  }, [globalSettings]);

  const selectedLayer = useMemo(() => {
    return globalSettings[selectedLayerIndex];
  }, [globalSettings, selectedLayerIndex]);

  const selectedOption = useMemo(() => {
    return layerOptions[selectedLayerIndex] || '';
  }, [layerOptions, selectedLayerIndex]);

  // For updating direct layer properties (like label, color, visible)
  const handleUpdateLayer = useCallback(
    (
      index: number,
      property: string,
      value: string | number | boolean | LayerSettings,
    ) => {
      const newGlobalSettings = cloneDeep<LayerConfig[]>(globalSettings);
      set(newGlobalSettings[index], property, value);
      setGlobalSettings(newGlobalSettings);
    },
    [globalSettings],
  );

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
          {/* <Box
            width="200px"
            height="200px"
            borderRadius="50%"
            bg="rgba(0, 0, 0, 0.5)"
            position="relative"
            overflow="visible"
            margin="50px auto"
          > */}
          <MenuPreview />
          {/* <Box perspective={perspective} width="100%" height="100%">
              <Box
                position="absolute"
                width="10px"
                height="10px"
                bg="blue"
                borderRadius="50%"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex={90}
                pointerEvents="none"
              />
              {[
                globalSettings.map((item, index) => {
                  const { label, color, bg, visible, selected } = item;
                  return (
                    <TitledLayer
                      key={index}
                      title={label}
                      bg={bg}
                      color={color}
                      isSelected={selected}
                      opacity={visible ? 1 : 0}
                      top={`${item.layerSettings.top}%`}
                      left={`${item.layerSettings.left}%`}
                      transform={`rotateZ(${item.layerSettings.rotateZ}deg) translateX(${item.layerSettings.translateX}%) rotateX(${item.layerSettings.rotateX}deg) translateY(${item.layerSettings.translateY}%) rotateY(${item.layerSettings.rotateY}deg) translateZ(${item.layerSettings.translateZ}px)`}
                      transformOrigin={`${item.layerSettings.transformOriginX}px ${item.layerSettings.transformOriginY}px ${item.layerSettings.transformOriginZ}px`}
                      onClick={() => {
                        const newGlobalSettings = [...globalSettings];

                        newGlobalSettings[index].selected =
                          !newGlobalSettings[index].selected;

                        newGlobalSettings.forEach((item, i) => {
                          if (i !== index) {
                            item.selected = false;
                          }
                        });
                        setGlobalSettings(newGlobalSettings);
                      }}
                    />
                  );
                }),
              ]}
            </Box> */}
          {/* </Box> */}
        </Card>
        <Box width="100%" maxWidth="1000px" padding="1rem">
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
                      onChange={(values) => {
                        setPerspective(values[0]);
                      }}
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
                        onChange={(e) => {
                          setPerspective(Number(e.target.value));
                        }}
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
                      It sets the distance between the viewer (you) and the z=0
                      plane.
                    </Text>
                    <List>
                      <ListItem>
                        Small values (50-200px): Intense 3D effect (like viewing
                        very close)
                      </ListItem>
                      <ListItem>
                        Large values (500-1000px): Subtle 3D effect (like
                        viewing from far away)
                      </ListItem>
                    </List>
                  </Blockquote>
                </VStack>
                <Accordion
                  isCollapsible
                  defaultValue={['visibility-and-color']}
                  key={selectedLayerIndex}
                >
                  <AccordionItem
                    value="visibility-and-color"
                    borderBottom="none"
                    label="Visibility And Color"
                  >
                    <VStack gap="20px">
                      <VStack gap="10px" width="100%" alignItems="start">
                        {globalSettings.map((item, index) => {
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
                                  handleUpdateLayer(index, 'visible', isChecked)
                                }
                              />
                              <Input
                                width="200px"
                                placeholder="Label"
                                value={label}
                                onChange={(e) =>
                                  handleUpdateLayer(
                                    index,
                                    'label',
                                    e.target.value,
                                  )
                                }
                              />
                              <Separator />
                              <Box>Color</Box>
                              <ColorPicker
                                width="100px"
                                color={color}
                                onChange={(color) =>
                                  handleUpdateLayer(index, 'color', color)
                                }
                              />
                              <Box>BG</Box>
                              <ColorPicker
                                width="100px"
                                defaultValue={bg}
                                onChange={(bg) =>
                                  handleUpdateLayer(index, 'bg', bg)
                                }
                              />
                              <Separator />
                              <Button
                                width="100px"
                                onClick={() => {
                                  const newGlobalSettings = [...globalSettings];

                                  newGlobalSettings[index].selected =
                                    !newGlobalSettings[index].selected;

                                  newGlobalSettings.forEach((item, i) => {
                                    if (i !== index) {
                                      item.selected = false;
                                    }
                                  });

                                  newGlobalSettings[index].visible = true;
                                  setGlobalSettings(newGlobalSettings);
                                }}
                                colorScheme={item.selected ? 'blue' : 'gray'}
                                disabled={item.selected}
                              >
                                {item.selected ? 'Selected' : 'Select'}
                              </Button>
                              <Button
                                colorPalette="red"
                                onClick={() => {
                                  const newGlobalSettings = [...globalSettings];
                                  newGlobalSettings.splice(index, 1);
                                  setGlobalSettings(newGlobalSettings);
                                }}
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
                          width="150px"
                          value={
                            selectedOption.value
                              ? [selectedOption.value]
                              : undefined
                          }
                          onChange={(value) => {
                            const options = cloneDeep(
                              globalSettingsList[Number(value)],
                            );
                            setGlobalSettings(options);
                          }}
                          placeholder="Load settings"
                        />
                        <Button
                          onClick={() => {
                            const newGlobalSettings = [...globalSettings];
                            newGlobalSettings.push({
                              label: 'New Layer',
                              color: 'black',
                              bg: 'white',
                              visible: true,
                              selected: false,
                              layerSettings: defaultOptions,
                            });
                            setGlobalSettings(newGlobalSettings);
                          }}
                        >
                          Add Layer
                        </Button>
                        <Button
                          onClick={() => {
                            const newGlobalSettings = [...globalSettings];
                            newGlobalSettings.forEach((item) => {
                              item.visible = false;
                            });
                            setGlobalSettings(newGlobalSettings);
                          }}
                        >
                          Hide All
                        </Button>
                        <Button
                          onClick={() => {
                            const newGlobalSettings = [...globalSettings];
                            newGlobalSettings.forEach((item) => {
                              item.visible = true;
                            });
                            setGlobalSettings(newGlobalSettings);
                          }}
                        >
                          Show All
                        </Button>
                        <Button
                          onClick={() => {
                            const newGlobalSettings: LayerConfig[] = cloneDeep(
                              defaultGlobalSettings,
                            );
                            setGlobalSettings(
                              newGlobalSettings.map((item) => ({
                                ...item,
                                layerSettings:
                                  globalSettings.find(
                                    (layer) => layer.label === item.label,
                                  )?.layerSettings || item.layerSettings,
                              })),
                            );
                          }}
                        >
                          Reset config
                        </Button>
                        <Button
                          onClick={() => {
                            const newGlobalSettings = [...globalSettings];
                            newGlobalSettings.forEach((item) => {
                              item.visible = item.selected;
                            });
                            setGlobalSettings(newGlobalSettings);
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
                  <Text fontSize="15px">Select Layer</Text>
                  <Select
                    options={layerOptions}
                    width="320px"
                    value={
                      selectedOption.value ? [selectedOption.value] : undefined
                    }
                    onChange={(value) => {
                      const selectedIndex = Number(value);
                      const newGlobalSettings = globalSettings.map(
                        (item, index) => ({
                          ...item,
                          selected: index === selectedIndex,
                        }),
                      );
                      setGlobalSettings(newGlobalSettings);
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
                              selectedLayer
                                ? selectedLayer.layerSettings.left
                                : 0,
                            ]}
                            step={1}
                            min={0}
                            max={100}
                            onChange={(values) => {
                              const newGlobalSettings = [...globalSettings];
                              newGlobalSettings[
                                selectedLayerIndex
                              ].layerSettings.left = values[0];
                              setGlobalSettings(newGlobalSettings);
                            }}
                          />
                          <InputGroup endAddon="%" width="max-content">
                            <Input
                              type="number"
                              value={selectedLayer?.layerSettings.left || 0}
                              onChange={(e) =>
                                handleUpdateLayer(
                                  selectedLayerIndex,
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
                              handleUpdateLayer(
                                selectedLayerIndex,
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
                                handleUpdateLayer(
                                  selectedLayerIndex,
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
                          <ListItem>
                            top: 100% = bottom edge of container
                          </ListItem>
                          <ListItem>
                            Similarly for left: 0% (left edge), 50% (center),
                            100% (right edge)
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
                            value={[
                              selectedLayer?.layerSettings.translateX || 0,
                            ]}
                            step={1}
                            min={-100}
                            max={100}
                            onChange={(values) =>
                              handleUpdateLayer(
                                selectedLayerIndex,
                                'layerSettings.translateX',
                                values[0],
                              )
                            }
                          />
                          <InputGroup endAddon="%" width="max-content">
                            <Input
                              type="number"
                              value={
                                selectedLayer?.layerSettings.translateX || 0
                              }
                              onChange={(e) =>
                                handleUpdateLayer(
                                  selectedLayerIndex,
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
                            value={[
                              selectedLayer?.layerSettings.translateY || 0,
                            ]}
                            step={1}
                            min={-100}
                            max={100}
                            onChange={(values) =>
                              handleUpdateLayer(
                                selectedLayerIndex,
                                'layerSettings.translateY',
                                values[0],
                              )
                            }
                          />
                          <InputGroup endAddon="%" width="max-content">
                            <Input
                              type="number"
                              value={
                                selectedLayer?.layerSettings.translateY || 0
                              }
                              onChange={(e) =>
                                handleUpdateLayer(
                                  selectedLayerIndex,
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
                            value={[
                              selectedLayer?.layerSettings.translateZ || 0,
                            ]}
                            step={1}
                            min={-100}
                            max={100}
                            onChange={(values) =>
                              handleUpdateLayer(
                                selectedLayerIndex,
                                'layerSettings.translateZ',
                                values[0],
                              )
                            }
                          />
                          <InputGroup endAddon="px" width="max-content">
                            <Input
                              type="number"
                              value={
                                selectedLayer?.layerSettings.translateZ || 0
                              }
                              onChange={(e) =>
                                handleUpdateLayer(
                                  selectedLayerIndex,
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
                              handleUpdateLayer(
                                selectedLayerIndex,
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
                                handleUpdateLayer(
                                  selectedLayerIndex,
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
                              handleUpdateLayer(
                                selectedLayerIndex,
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
                                handleUpdateLayer(
                                  selectedLayerIndex,
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
                              handleUpdateLayer(
                                selectedLayerIndex,
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
                                handleUpdateLayer(
                                  selectedLayerIndex,
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
                          handleUpdateLayer(
                            selectedLayerIndex,
                            'layerSettings',
                            defaultGlobalSettings[selectedLayerIndex]
                              .layerSettings,
                          )
                        }
                      >
                        Reset All Transforms
                      </Button>
                    </VStack>
                  </AccordionItem>
                  <AccordionItem
                    label="Transform Origin"
                    value="transform-origin"
                  >
                    <VStack gap="20px">
                      <VStack gap="10px" width="100%" alignItems="start">
                        <HStack gap="20px" width="100%" justifyContent="center">
                          <Text whiteSpace="nowrap">X</Text>
                          <Slider
                            width="100%"
                            value={[
                              selectedLayer?.layerSettings.transformOriginX ||
                                0,
                            ]}
                            step={1}
                            min={-100}
                            max={100}
                            onChange={(values) =>
                              handleUpdateLayer(
                                selectedLayerIndex,
                                'layerSettings.transformOriginX',
                                values[0],
                              )
                            }
                          />
                          <InputGroup endAddon="%" width="max-content">
                            <Input
                              type="number"
                              value={
                                selectedLayer?.layerSettings.transformOriginX ||
                                0
                              }
                              onChange={(e) =>
                                handleUpdateLayer(
                                  selectedLayerIndex,
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
                              selectedLayer?.layerSettings.transformOriginY ||
                                0,
                            ]}
                            step={1}
                            min={-100}
                            max={100}
                            onChange={(values) =>
                              handleUpdateLayer(
                                selectedLayerIndex,
                                'layerSettings.transformOriginY',
                                values[0],
                              )
                            }
                          />
                          <InputGroup endAddon="%" width="max-content">
                            <Input
                              type="number"
                              value={
                                selectedLayer?.layerSettings.transformOriginY ||
                                0
                              }
                              onChange={(e) =>
                                handleUpdateLayer(
                                  selectedLayerIndex,
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
                              selectedLayer?.layerSettings.transformOriginZ ||
                                0,
                            ]}
                            step={1}
                            min={-100}
                            max={100}
                            onChange={(values) =>
                              handleUpdateLayer(
                                selectedLayerIndex,
                                'layerSettings.transformOriginZ',
                                values[0],
                              )
                            }
                          />
                          <InputGroup endAddon="%" width="max-content">
                            <Input
                              type="number"
                              value={
                                selectedLayer?.layerSettings.transformOriginZ ||
                                0
                              }
                              onChange={(e) =>
                                handleUpdateLayer(
                                  selectedLayerIndex,
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
                          handleUpdateLayer(
                            selectedLayerIndex,
                            'layerSettings.transformOriginX',
                            defaultGlobalSettings[selectedLayerIndex]
                              .layerSettings.transformOriginX,
                          );

                          handleUpdateLayer(
                            selectedLayerIndex,
                            'layerSettings.transformOriginY',
                            defaultGlobalSettings[selectedLayerIndex]
                              .layerSettings.transformOriginY,
                          );

                          handleUpdateLayer(
                            selectedLayerIndex,
                            'layerSettings.transformOriginZ',
                            defaultGlobalSettings[selectedLayerIndex]
                              .layerSettings.transformOriginZ,
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
                  <OutputConfigSettings config={globalSettings} />
                </AccordionItem>
                <AccordionItem
                  value="css"
                  borderBottom="none"
                  label="CSS styles"
                >
                  <OutputCSSSettings config={globalSettings} />
                </AccordionItem>
              </Accordion>
            </AccordionItem>
          </Accordion>
        </Box>
      </VStack>
    </MenuLayoutProvider>
  );
};

export default memo(App);
