import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Textarea, VStack } from '@chakra-ui/react';

import { LayerConfig } from '../types';
import { buildLayerStyles } from '../utils/css';
import { copyToClipboard } from '../utils/navigator';
import { debounce } from 'lodash';

type Props = {
  config: LayerConfig[];
};

const OutputCSSSettings: FC<Props> = ({ config }) => {
  const [debouncedConfig, setDebouncedConfig] = useState(() =>
    config.map((layer, index) => buildLayerStyles(layer, index)).join('\n\n'),
  );

  const CSSConfig = useMemo(
    () =>
      config.map((layer, index) => buildLayerStyles(layer, index)).join('\n\n'),
    [config],
  );

  useEffect(() => {
    const updateConfig = debounce(() => {
      setDebouncedConfig(CSSConfig);
    }, 200);

    updateConfig();

    return () => {
      updateConfig.cancel();
    };
  }, [CSSConfig]);

  const handleCopy = useCallback(() => {
    copyToClipboard(debouncedConfig);
  }, [CSSConfig]);

  return (
    <VStack gap="20px" width="100%" alignItems="start">
      <Button onClick={handleCopy}>Copy CSS</Button>
      <Textarea
        fontFamily="monospace"
        width="100%"
        rows={10}
        value={debouncedConfig}
        readOnly
      />
    </VStack>
  );
};

export default memo(OutputCSSSettings);
