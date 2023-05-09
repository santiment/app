import { useMemo } from 'react';
import { getAddressInfrastructure } from '../../../utils/address';
import { useWalletAssets as useWalletAssetsHook } from '../../HistoricalBalance/hooks';
export const useWalletAssets = ({
  walletAddress
}) => {
  const infrastructure = useMemo(() => getAddressInfrastructure(walletAddress), [walletAddress]);
  const {
    walletAssets,
    isLoading
  } = useWalletAssetsHook({
    address: walletAddress,
    infrastructure
  });
  return {
    assets: walletAssets,
    isLoading,
    infrastructure
  };
};