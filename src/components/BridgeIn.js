"use client"

import React, { useEffect, useState } from "react"
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    DropdownSelection
} from "./DropdownSelection"
import { useAccount, useSwitchChain } from "wagmi"
import { useToast } from "@/hooks/use-toast"
import TabBar from "./TabBar"

export default function BridgeInCard() {
    const [fromChain, setFromChain] = useState("")
    const [toChain, setToChain] = useState("5ireChain Thunder Testnet")
    const [tokenAmount, setTokenAmount] = useState("")
    const [loading, setLoading] = useState(false);

    const { isConnected, address, isDisconnected, chain } = useAccount()
    const { switchChainAsync } = useSwitchChain()
    const { toast } = useToast();

    const handleFromChainSelect = async (chainName) => {
        setLoading(true)
        await switchChainAsync({ chainId: chainName.id })
        setFromChain(chainName.name)
        setLoading(false)
    }
    
    return (
        <Card
            className="h-fit mx-3 w-full max-w-md rounded-lg bg-card text-card-foreground p-3 space-y-2 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <CardHeader >
                <TabBar />
            </CardHeader>

            <CardContent className="space-y-6">

                <div className="flex flex-col w-full">
                    <span className="mb-2 text-sm font-medium">From</span>
                    <DropdownSelection
                        currentChain={chain}
                        loading={loading}
                        disabled={false}
                        onSelect={handleFromChainSelect}
                    />
                </div>

                <div className="flex flex-col">
                    <span className="mb-2 text-sm font-medium">To</span>
                    <div className="flex gap-3 w-full p-4 bg-muted text-muted-foreground rounded-lg">
                        <img className="w-[30px] rounded-full" src="https://s3.coinmarketcap.com/static-gravity/image/fd7a43cc620c4ade96804bb1c36aac6f.png" alt="" />
                        {toChain}
                    </div>
                </div>

                <div className="space-y-2">
                    <span className="text-sm font-medium">
                        Enter Amount
                    </span>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            value={tokenAmount}
                            onChange={(e) => setTokenAmount(e.target.value)}
                            placeholder="0.0"
                            className="max-w-[100px] flex-1"
                        />
                        <Button variant="outline" size="lg" onClick={() => setTokenAmount("MAX")}>
                            MAX
                        </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Balance: 0
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Button
                    className="w-full"
                    disabled={!fromChain || !toChain || !tokenAmount}
                    onClick={() => { }}
                >
                    Bridge In
                </Button>
            </CardFooter>
        </Card>
    )
}
