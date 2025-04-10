export type LayerSettings = {
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  translateX: number;
  translateY: number;
  translateZ: number;
  left: number;
  top: number;
  transformOriginX: number;
  transformOriginY: number;
  transformOriginZ: number;
};

export type LayerConfig = {
  label: string;
  color: string;
  bg: string;
  visible: boolean;
  selected: boolean;
  layerSettings: LayerSettings;
};
