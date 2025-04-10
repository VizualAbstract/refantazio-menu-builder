import { LayerConfig } from '../types';

export const buildLayerStyles = (layer: LayerConfig, index: number) => {
  return `.layer-title-${index} {
  position: absolute;
  left: ${layer.layerSettings.left}%;
  top: ${layer.layerSettings.top}%;
  color: ${layer.color};
  background-color: ${layer.bg};
  font-size: 15px;
  font-family: Carbon, sans-serif;
  font-weight: 700;
  padding: 0 4px 0 6px;
  white-space: nowrap;
  transform-style: preserve-3d;
  transform: translate(${layer.layerSettings.translateX}px, ${layer.layerSettings.translateY}px, ${layer.layerSettings.translateZ}px) rotateX(${layer.layerSettings.rotateX}deg) rotateY(${layer.layerSettings.rotateY}deg) rotateZ(${layer.layerSettings.rotateZ}deg);
  transform-origin: ${layer.layerSettings.transformOriginX}% ${layer.layerSettings.transformOriginY}% ${layer.layerSettings.transformOriginZ}%;
}
  
.layer-title-${index} span {
  ${layer.isTextFlipped ? 'transform: rotateY(180deg);' : ''}
}
`;
};
