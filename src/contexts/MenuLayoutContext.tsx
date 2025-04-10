import { useContext, useMemo } from 'react';

import { useState, useCallback, ReactNode } from 'react';
import { cloneDeep, set } from 'lodash';
import {
  defaultGlobalSettings,
  defaultOptions,
  defaultPerspective,
} from '../constants';
import { LayerConfig } from '../types';

import { createContext } from 'react';

const MenuLayoutContext = createContext<MenuLayoutContextType | null>(null);

type Props = {
  children: ReactNode;
};

interface MenuLayoutContextType {
  perspective: number;
  updatePerspective: (value: number) => void;
  menuSettings: LayerConfig[];
  updateProperty: (index: number, path: string, value: unknown) => void;
  batchUpdateProperty: (
    path: string,
    getter: (layout: LayerConfig, index: number) => unknown,
  ) => void;
  updateSelectedProperty: (path: string, value: unknown) => void;
  addNewLayer: () => void;
  deleteLayerByIndex: (index: number) => void;
  selectedLayer: LayerConfig | undefined;
}

export const MenuLayoutProvider = ({ children }: Props) => {
  const [perspective, setPerspective] = useState<number>(defaultPerspective);
  const [menuSettings, setMenuSettings] = useState<LayerConfig[]>(
    cloneDeep(defaultGlobalSettings),
  );

  const updatePerspective = useCallback((value: number) => {
    setPerspective(value);
  }, []);

  const updateProperty = useCallback(
    (index: number, path: string, value: unknown) => {
      const newSettings = cloneDeep(menuSettings);

      set(newSettings[index], path, value);

      setMenuSettings(newSettings);
    },
    [menuSettings],
  );

  const batchUpdateProperty = useCallback(
    (path: string, getter: (layout: LayerConfig, index: number) => unknown) => {
      const newSettings = cloneDeep(menuSettings);

      menuSettings.forEach((layer, index) => {
        const value = getter(layer, index);

        set(newSettings, path, value);
      });

      setMenuSettings(newSettings);
    },
    [menuSettings],
  );

  const updateSelectedProperty = useCallback(
    (path: string, value: unknown) => {
      const selectedIndex = menuSettings.findIndex((layer) => layer.selected);
      if (selectedIndex !== -1) {
        updateProperty(selectedIndex, path, value);
      }
    },
    [updateProperty, menuSettings],
  );

  const addNewLayer = useCallback(() => {
    const newLayer: LayerConfig = {
      label: `Layer ${menuSettings.length + 1}`,
      color: 'black',
      bg: 'white',
      visible: true,
      selected: false,
      layerSettings: cloneDeep(defaultOptions),
    };

    setMenuSettings((prev) => [...prev, newLayer]);
  }, [menuSettings]);

  const deleteLayerByIndex = useCallback((index: number) => {
    setMenuSettings((prev) => {
      const newSettings = [...prev];
      newSettings.splice(index, 1);
      return newSettings;
    });
  }, []);

  const selectedLayer = useMemo(
    () => menuSettings.find((layer) => layer.selected),
    [menuSettings],
  );

  const value: MenuLayoutContextType = {
    perspective,
    updatePerspective,
    menuSettings,
    updateProperty,
    batchUpdateProperty,
    updateSelectedProperty,
    addNewLayer,
    deleteLayerByIndex,
    selectedLayer,
  };

  return (
    <MenuLayoutContext.Provider value={value}>
      {children}
    </MenuLayoutContext.Provider>
  );
};

export const useMenuLayout = (): MenuLayoutContextType => {
  const context = useContext(MenuLayoutContext);

  if (context === null) {
    throw new Error('useMenuLayout must be used within a MenuLayoutProvider');
  }

  return context;
};

export default MenuLayoutContext;
