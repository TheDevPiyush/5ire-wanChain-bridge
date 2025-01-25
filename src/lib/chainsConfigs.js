// 5ire Testnet Config
export const _5ireTestnet = {
    id: 997,
    name: '5ireChain Thunder Testnet',
    network: '5ireChain Testnet',
    nativeCurrency: { name: 'T5IRE', symbol: 'T5IRE', decimals: 18, },
    rpcUrls: { default: { http: ['https://rpc.testnet.5ire.network'] } },
    blockExplorers: { default: { name: '5irechain Explorer', url: 'https://testnet.5irescan.io' } },
    testnet: true,
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbhu05xHrL89iGfHvSnNhRHM_NqFhwtXMKIw&s'
}

// 5ire Mainnet Config
export const _5ireMainnet = {
    id: 995,
    name: '5ireChain',
    network: '5ireChain Mainnet',
    nativeCurrency: { name: '5IRE', symbol: '5IRE', decimals: 18, },
    rpcUrls: { default: { http: ['https://rpc.5ire.network'] } },
    blockExplorers: { default: { name: '5irechain Explorer', url: 'https://5irescan.io' } },
    testnet: false,
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbhu05xHrL89iGfHvSnNhRHM_NqFhwtXMKIw&s'
}

// BNB Testnet Config
export const bscTestnet = {
    id: 97,
    name: 'BNB Smart Chain Testnet',
    network: 'bscTestnet',
    nativeCurrency: { name: 'BNB', symbol: 'tBNB', decimals: 18 },
    rpcUrls: { default: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545/'] } },
    blockExplorers: { default: { name: 'BscScan', url: 'https://testnet.bscscan.com' } },
    testnet: true,
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4BmPQQKuCgXZG5zyFRvIJRi9TzBHYLaJ-cA&s"
}


// Custom Sepolia Testnet Config
export const sepoliaTestnet = {
    id: 11_155_111,
    name: 'Sepolia Testnet',
    nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://sepolia.drpc.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Etherscan',
            url: 'https://sepolia.etherscan.io',
            apiUrl: 'https://api-sepolia.etherscan.io/api',
        },
    },
    testnet: true,
    icon: 'https://developers.moralis.com/wp-content/uploads/web3wiki/159-goerli/637aee14aa9d9f521437ec16_hYC2y965v3QD7fEoVvutzGbJzVGLSOk6RZPwEQWcA_E.jpeg'
}


// Custom Amoy Polygon Testnet Config
export const AmoyPolygonTestnet = {
    id: 80_002,
    name: 'Polygon Amoy',
    nativeCurrency: { name: 'POL', symbol: 'POL', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-amoy.polygon.technology'],
        },
    },
    blockExplorers: {
        default: {
            name: 'PolygonScan',
            url: 'https://amoy.polygonscan.com',
            apiUrl: 'https://api-amoy.polygonscan.com/api',
        },
    },
    testnet: true,
    icon: "https://cdn.iconscout.com/icon/free/png-256/free-polygon-token-4086724-3379854.png"
}
