import { FC, memo, useCallback, useMemo } from 'react';
import { Button, Textarea, VStack } from '@chakra-ui/react';

import { LayerConfig } from '../types';
import { buildLayerStyles } from '../utils/css';
import { copyToClipboard } from '../utils/navigator';

type Props = {
  config: LayerConfig[];
};

const OutputCSSSettings: FC<Props> = ({ config }) => {
  const CSSConfig = useMemo(
    () =>
      config.map((layer, index) => buildLayerStyles(layer, index)).join('\n\n'),
    [config],
  );

  const handleCopy = useCallback(() => {
    copyToClipboard(CSSConfig);
  }, [CSSConfig]);

  return (
    <VStack gap="20px" width="100%" alignItems="start">
      <Button onClick={handleCopy}>Copy CSS</Button>
      <Textarea fontFamily="monospace" width="100%" rows={10}>
        {CSSConfig}
      </Textarea>
    </VStack>
  );
};

export default memo(OutputCSSSettings);
