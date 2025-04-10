import { FC, memo, useCallback, useMemo } from 'react';
import { Button, Textarea, VStack } from '@chakra-ui/react';

import { LayerConfig } from '../types';
import { copyToClipboard } from '../utils/navigator';

type Props = {
  config: LayerConfig[];
};

const OutputConfigSettings: FC<Props> = ({ config }) => {
  const formattedConfig = useMemo(
    () => JSON.stringify(config, null, 2),
    [config],
  );

  const handleCopy = useCallback(() => {
    copyToClipboard(formattedConfig);
  }, [formattedConfig]);

  return (
    <VStack gap="20px" width="100%" alignItems="start">
      <Button onClick={handleCopy}>Copy Config</Button>
      <Textarea fontFamily="monospace" width="100%" rows={10}>
        {formattedConfig}
      </Textarea>
    </VStack>
  );
};

export default memo(OutputConfigSettings);
