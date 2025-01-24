import { polygonAmoy, sepolia } from 'viem/chains'
import { http, createConfig } from 'wagmi'


// 5ire Testnet Config
const _5ireTestnetConfig = {
    id: 997,
    name: '5ireChain Thunder Testnet',
    network: '5ireChain Testnet',
    nativeCurrency: { name: 'T5IRE', symbol: 'T5IRE', decimals: 18, },
    rpcUrls: { default: { http: ['https://rpc.testnet.5ire.network'] } },
    blockExplorers: { default: { name: '5irechain Explorer', url: 'https://testnet.5irescan.io' } },
    testnet: true,
}

// 5ire Mainnet Config
const _5ireMainnetConfig = {
    id: 995,
    name: '5ireChain',
    network: '5ireChain Mainnet',
    nativeCurrency: { name: '5IRE', symbol: '5IRE', decimals: 18, },
    rpcUrls: { default: { http: ['https://rpc.5ire.network'] } },
    blockExplorers: { default: { name: '5irechain Explorer', url: 'https://5irescan.io' } },
    testnet: false,
}

// BNB Testnet Config
const bscTestnet = {
    id: 97,
    name: 'BNB Smart Chain Testnet',
    network: 'bscTestnet',
    nativeCurrency: { name: 'BNB', symbol: 'tBNB', decimals: 18 },
    rpcUrls: { default: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545/'] } },
    blockExplorers: { default: { name: 'BscScan', url: 'https://testnet.bscscan.com' } },
    testnet: true,

}

// Initialiase and Send the Configs into Wagmi
export const config = createConfig({
    chains: [
        _5ireTestnetConfig,
        bscTestnet,
        sepolia,
        polygonAmoy,

        // ------------ UNCOMMENT THIS IF 5IRE MAINNET IS REQUIRED ---------
        // _5ireMainnetConfig,
    ],
    transports: {
        [_5ireTestnetConfig.id]: http(_5ireTestnetConfig.rpcUrls.default.http[0]),
        [bscTestnet.id]: http(bscTestnet.rpcUrls.default.http[0]),
        [sepolia.id]: http(sepolia.rpcUrls.default.http[0]),
        [polygonAmoy.id]: http(polygonAmoy.rpcUrls.default.http[0])

        // --------------- UNCOMMENT THIS IF 5IRE MAINNET IS REQUIRED -------------------
        // [_5ireMainnetConfig.id]: http(_5ireMainnetConfig.rpcUrls.default.http[0]), 

    },
    syncConnectedChain: true
})