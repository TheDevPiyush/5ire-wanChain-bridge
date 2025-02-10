import { http, createConfig } from 'wagmi'
import { _5ireTestnet, AmoyPolygonTestnet, bscTestnet, sepoliaTestnet } from './chainsConfigs'

export const config = createConfig({
    chains: [
        _5ireTestnet,
        bscTestnet,
        sepoliaTestnet,
        AmoyPolygonTestnet,
    ],
    transports: {
        [_5ireTestnet.id]: http(_5ireTestnet.rpcUrls.default.http[0]),
        [bscTestnet.id]: http(bscTestnet.rpcUrls.default.http[0]),
        [sepoliaTestnet.id]: http(sepoliaTestnet.rpcUrls.default.http[0]),
        [AmoyPolygonTestnet.id]: http(AmoyPolygonTestnet.rpcUrls.default.http[0])
    },
    syncConnectedChain: true
})