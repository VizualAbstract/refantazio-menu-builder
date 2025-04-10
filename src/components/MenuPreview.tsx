import { FC, memo } from 'react';
import { Box } from '@chakra-ui/react';

import TitleLayer from '../ui/TitledLayer';
import { useMenuLayout } from '../contexts/MenuLayoutContext';

const MenuPreview: FC = () => {
  const { perspective, menuSettings, batchUpdateProperty } = useMenuLayout();

  return (
    <Box
      width="200px"
      height="200px"
      borderRadius="50%"
      bg="rgba(0, 0, 0, 0.5)"
      position="relative"
      overflow="visible"
      margin="50px auto"
    >
      <Box perspective={perspective} width="100%" height="100%">
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
          menuSettings.map((item, index) => {
            const { label, color, bg, visible, selected } = item;
            return (
              <TitleLayer
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
                  batchUpdateProperty('selected', (layer) => {
                    return layer.label === label ? !layer.selected : false;
                  });
                }}
                isTextFlipped={item.isTextFlipped}
              />
            );
          }),
        ]}
      </Box>
    </Box>
  );
};

export default memo(MenuPreview);
