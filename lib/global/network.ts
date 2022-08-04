import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient } from 'wagmi';
import { networkConfig } from '~/lib/config/network-config';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const response = configureChains(
    [
        {
            id: parseInt(networkConfig.chainId),
            network: networkConfig.networkShortName,
            name: networkConfig.networkName,
            nativeCurrency: {
                name: networkConfig.eth.name,
                symbol: networkConfig.eth.symbol,
                decimals: networkConfig.eth.decimals,
            },
            rpcUrls: {
                default: networkConfig.rpcUrl,
            },
            blockExplorers: {
                etherscan: {
                    name: networkConfig.etherscanName,
                    url: networkConfig.etherscanUrl,
                },
                default: {
                    name: networkConfig.etherscanName,
                    url: networkConfig.etherscanUrl,
                },
            },
            testnet: networkConfig.testnet,
        },
    ],
    [
        jsonRpcProvider({
            rpc: (chain) => ({ http: networkConfig.rpcUrl }),
        }),
    ],
);

export const networkChainDefinitions = response.chains;
export const networkProvider = response.provider({ chainId: parseInt(networkConfig.chainId) });

const { connectors } = getDefaultWallets({
    appName: networkConfig.appName,
    chains: networkChainDefinitions,
});

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider: response.provider,
});
