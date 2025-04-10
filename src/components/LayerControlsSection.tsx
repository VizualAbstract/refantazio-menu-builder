import { FC, memo, useMemo } from 'react';
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  Text,
  VStack,
} from '@chakra-ui/react';

import { defaultGlobalSettings } from '../constants';
import { Accordion, AccordionItem } from '../ui/Accordion';

import Slider from '../ui/Slider';
import Blockquote from '../ui/Blockquote';
import { List, ListItem } from '../ui/List';
import Select from '../ui/Select';
import { useMenuLayout } from '../contexts/MenuLayoutContext';

type Props = {
  selectedIndex: number;
  onChangeSelectedIndex: (index: number) => void;
};

const Section: FC<Props> = ({ selectedIndex, onChangeSelectedIndex }) => {
  const {
    menuSettings,
    updateProperty,
    updateProperties,
    batchUpdateProperty,
    updateSelectedProperty,
    selectedLayer,
  } = useMenuLayout();

  const layerOptions = useMemo(
    () =>
      menuSettings.map((item, index) => ({
        label: `Layer ${index + 1}: ${item.label || 'New Layer'}`,
        value: `${index}`,
      })),
    [menuSettings],
  );

  return (
    <VStack gap="20px" width="100%" alignItems="start">
      <HStack>
        <Text fontSize="15px">Layer</Text>
        <Select
          options={layerOptions}
          width="320px"
          value={
            selectedIndex || selectedIndex === 0
              ? [`${selectedIndex}`]
              : undefined
          }
          onChange={(value) => {
            onChangeSelectedIndex(Number(value));

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
        <AccordionItem value="position" borderBottom="none" label="Position">
          <VStack gap="20px">
            <VStack gap="10px" width="100%" alignItems="start">
              <HStack gap="20px" width="100%" justifyContent="center">
                <Box>Left</Box>
                <Slider
                  width="100%"
                  value={[selectedLayer ? selectedLayer.layerSettings.left : 0]}
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
                  Similarly for left: 0% (left edge), 50% (center), 100% (right
                  edge)
                </ListItem>
              </List>
            </Blockquote>
          </VStack>
        </AccordionItem>
        <AccordionItem value="transform" label="Transform" borderBottom="none">
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
                  value={[selectedLayer?.layerSettings.transformOriginX || 0]}
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
                    value={selectedLayer?.layerSettings.transformOriginX || 0}
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
                  value={[selectedLayer?.layerSettings.transformOriginY || 0]}
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
                    value={selectedLayer?.layerSettings.transformOriginY || 0}
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
                  value={[selectedLayer?.layerSettings.transformOriginZ || 0]}
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
                    value={selectedLayer?.layerSettings.transformOriginZ || 0}
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
            <Blockquote bg="blue.50" colorPalette="blue">
              <Text fontSize="12px" fontWeight="bold">
                Transform origin explained:
              </Text>
              <List>
                <ListItem>
                  The{' '}
                  <Box as="span" fontWeight="bold" color="red">
                    red dot
                  </Box>{' '}
                  shows the exact transform origin point for each layer.
                </ListItem>
                <ListItem>
                  The{' '}
                  <Box as="span" fontWeight="bold" color="blue">
                    blue dot
                  </Box>{' '}
                  shows the center of the container (50%, 50%).
                </ListItem>
                <ListItem>
                  Position values (top/left) are relative to the container.
                </ListItem>
              </List>
            </Blockquote>
            <Button
              onClick={() =>
                updateProperties(selectedIndex, [
                  {
                    path: 'layerSettings.transformOriginX',
                    value:
                      defaultGlobalSettings[selectedIndex].layerSettings
                        .transformOriginX,
                  },
                  {
                    path: 'layerSettings.transformOriginY',
                    value:
                      defaultGlobalSettings[selectedIndex].layerSettings
                        .transformOriginY,
                  },
                  {
                    path: 'layerSettings.transformOriginZ',
                    value:
                      defaultGlobalSettings[selectedIndex].layerSettings
                        .transformOriginZ,
                  },
                ])
              }
            >
              Reset All Transform Origins
            </Button>
          </VStack>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};

export default memo(Section);
