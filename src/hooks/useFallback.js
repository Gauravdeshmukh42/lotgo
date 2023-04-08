import {useCallback, useState} from 'react';

export function useFallback() {
  const [refresh, setRefresh] = useState(false);

  const update = useCallback(() => {
    setRefresh((r) => !r);
  }, [setRefresh]);

  return [refresh, update];
}
