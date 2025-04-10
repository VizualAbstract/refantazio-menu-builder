import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Button, Textarea, VStack } from '@chakra-ui/react';

import { LayerConfig } from '../types';
import { copyToClipboard } from '../utils/navigator';
import { debounce } from 'lodash';

type Props = {
  config: LayerConfig[];
};

const OutputConfigSettings: FC<Props> = ({ config }) => {
  const [debouncedConfig, setDebouncedConfig] = useState(() =>
    JSON.stringify(config, null, 2),
  );

  useEffect(() => {
    const updateConfig = debounce(() => {
      setDebouncedConfig(JSON.stringify(config, null, 2));
    }, 200);

    updateConfig();

    return () => {
      updateConfig.cancel();
    };
  }, [config]);

  const handleCopy = useCallback(() => {
    copyToClipboard(debouncedConfig);
  }, [debouncedConfig]);

  return (
    <VStack gap="20px" width="100%" alignItems="start">
      <Button onClick={handleCopy}>Copy Config</Button>
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

export default memo(OutputConfigSettings);
