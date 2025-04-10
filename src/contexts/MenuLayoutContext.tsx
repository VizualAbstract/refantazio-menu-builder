import { useContext, useMemo } from 'react';

import { useState, useCallback, ReactNode } from 'react';
import { cloneDeep, set } from 'lodash';
import {
  defaultGlobalSettings,
  defaultOptions,
  defaultPerspective,
  globalSettingsList,
} from '../constants';
import { LayerConfig } from '../types';

import { createContext } from 'react';

const MenuLayoutContext = createContext<MenuLayoutContextType | null>(null);

interface MenuLayoutContextType {
  perspective: number;
  menuSettings: LayerConfig[];
  selectedLayer: LayerConfig | undefined;
  updatePerspective: (value: number) => void;
  updateProperty: (index: number, path: string, value: unknown) => void;
  updateProperties: (
    index: number,
    updates: Array<{ path: string; value: unknown }>,
  ) => void;
  batchUpdateProperty: (
    path: string,
    getter: (layout: LayerConfig, index: number) => unknown,
  ) => void;
  updateSelectedProperty: (path: string, value: unknown) => void;
  addNewLayer: () => void;
  deleteLayerByIndex: (index: number) => void;
  applySettings: (index: number) => void;
}

type Props = {
  children: ReactNode;
};

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

  const updateProperties = useCallback(
    (index: number, updates: Array<{ path: string; value: unknown }>) => {
      const newSettings = cloneDeep(menuSettings);

      updates.forEach((update) => {
        set(newSettings[index], update.path, update.value);
      });

      setMenuSettings(newSettings);
    },
    [menuSettings],
  );

  const batchUpdateProperty = useCallback(
    (path: string, getter: (layout: LayerConfig, index: number) => unknown) => {
      const newSettings = cloneDeep(menuSettings);

      newSettings.forEach((layer, index) => {
        const value = getter(layer, index);
        set(layer, path, value);
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
      isTextFlipped: false,
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

  const applySettings = useCallback((index: number) => {
    const settings = cloneDeep(globalSettingsList[index]);

    setMenuSettings(settings);
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
    updateProperties,
    batchUpdateProperty,
    updateSelectedProperty,
    addNewLayer,
    deleteLayerByIndex,
    selectedLayer,
    applySettings,
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
