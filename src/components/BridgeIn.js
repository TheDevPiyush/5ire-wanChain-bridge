"use client"

import React, { useEffect, useState } from "react"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import chainOptions from "@/lib/chainOptions.json"
import {
    DropdownSelection
} from "./DropdownSelection"
import { useAccount } from "wagmi"
import { useToast } from "@/hooks/use-toast"
import { usePathname } from "next/navigation"
import Link from "next/link"
import TabBar from "./TabBar"

export default function BridgeInCard() {
    const [fromChain, setFromChain] = useState("")
    const [toChain, setToChain] = useState("5ireChain")
    const [tokenAmount, setTokenAmount] = useState("")
    const [selectedToken, setSelectedToken] = useState("USDC")

    const { isConnected, address, isDisconnected } = useAccount()

    const { toast } = useToast();

    const handleFromChainSelect = (chainName) => {
        setFromChain(chainName)
    }

    const handleBridge = () => {
        console.log("Bridging", tokenAmount, selectedToken, "from", fromChain, "to", toChain)
    }

    useEffect(() => {
        if (isConnected && address)
            toast({ title: address })

        if (isDisconnected) toast({ title: "Wallet Disconnected 🛑" })
    }, [isConnected, isDisconnected])

    return (
        <Card
            className="        
            mx-auto 
            w-full 
            max-w-md 
            rounded-lg 
            bg-card 
            text-card-foreground 
            p-3 
            space-y-2
            sm:max-w-lg 
            md:max-w-xl 
            lg:max-w-2xl"
        >
            <CardHeader >
                <TabBar />
            </CardHeader>

            <CardContent className="space-y-6">

                <div className="flex flex-col w-full">
                    <span className="mb-2 text-sm font-medium">From</span>
                    <DropdownSelection
                        disabled={false}
                        options={chainOptions}
                        onSelect={handleFromChainSelect}
                    />
                </div>

                <div className="flex flex-col">
                    <span className="mb-2 text-sm font-medium">To</span>
                    <div className="w-full p-4 bg-muted text-muted-foreground rounded-lg">
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
                    onClick={handleBridge}
                >
                    Bridge In
                </Button>
            </CardFooter>
        </Card>
    )
}
