"use client"

import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardContent, CardFooter, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownSelection } from "./DropdownSelection"
import TabBar from "./TabBar"
import { useAccount, useBalance, useReadContract, useSwitchChain, useWriteContract } from "wagmi"
import { _5ireTestnet } from "@/lib/chainsConfigs"
import { AmoyPolygonTestnetAddresses, _5ireTestnetAddresses } from "@/lib/contractAddresses"
import { formatEther, parseEther } from "viem"
import { fireRouterAbi } from '@/lib/ABIs/FireRouter'
import { FireHub } from "@/lib/ABIs/FireHub"
import { FireSwap } from "@/lib/ABIs/FireSwap"
import { useToast } from "@/hooks/use-toast"

export default function BridgeOutCard() {

    const [fromChain, setFromChain] = useState("5ireChain Thunder Testnet");
    const [toChain, setToChain] = useState("");
    const [SwapTokenAmount, SwapTetTokenAmount] = useState("");
    const [bridgeLoading, setBridgeLoading] = useState(false);
    const { address } = useAccount();
    const { data: balance } = useBalance({ address: address });
    const { switchChainAsync } = useSwitchChain();
    const { toast } = useToast();

    const [SwapSellToken, setSwapSellToken] = useState('');
    const [SwapBuyToken, setSwapBuyToken] = useState('');
    const [bridgeAsset, setBridgeAsset] = useState('')

    const TOKEN_5IRE_ON_POLYGON = "0x999A50941c934DF44b045Ab15e3Fb08e22607eC9";
    const WETH_POLYGON = "0xCFaEB74409E4C6756C43F75455fc42A6A3FdEb1f";


    // Get the Gas Fee for BRIDGE OUT transaction -- 
    const {
        data: getFeeData,
        isSuccess: getFeeDataSuccess,
        isError: getFeeDataError,
        isLoading: getFeeDataLoading
    } = useReadContract({
        abi: fireRouterAbi.abi,
        address: _5ireTestnetAddresses.FireRouter,
        functionName: "estimateFee",
        args: [2147484614, 500000]
    });

    // Swap the tokens from 5ireChain to Polygon
    const {
        data: swapTokenData,
        isSuccess: swapTokenSuccess,
        isError: swapTokenError,
        writeContractAsync: swapTokenFunction,
    } = useWriteContract();



    const switchChain = async () => {
        try {
            await switchChainAsync({ chainId: _5ireTestnet.id })
        }
        catch (e) { console.log(e) }
    };

    const handleToChainSelect = (chainName) => {
        setToChain(chainName)
    };

    const handleBridgeOut = async () => {

        if (!toChain || !SwapTokenAmount) return;

        setBridgeLoading(true)
        const srcSwapDetails = {
            sellToken: SwapSellToken,
            sellAmt: SwapTokenAmount,
            buyToken: SwapBuyToken,
            swapData: "0x"
        };
        const bridgeInfo = {
            asset: bridgeAsset,
            rmtChainId: "2147484614",
            gasLimit: "500000",
            gasFee: getFeeData,
            receiver: address,
            swapDetails: srcSwapDetails
        };
        // let value = (BigInt(parseEther(SwapTokenAmount)) + BigInt(bridgeInfo.gasFee)).toString();
        let value = (parseEther(SwapTokenAmount) + BigInt(bridgeInfo.gasFee)).toString();

        try {
            const hash = await swapTokenFunction({
                address: _5ireTestnetAddresses.FireHub,
                abi: FireHub.abi,
                functionName: "bridgeETH",
                value: value,
                args: [bridgeInfo]
            })
            toast({
                title: "Transaction Hash",
                description: hash
            })
        }
        catch (e) { console.log("Transaction Failed") }
    }

    useEffect(() => {
        if (getFeeDataError) toast({ title: "Couldn't fetch Gas Fee ⛽", description: "There was a issue fetching the gas fee, please refresh to try again." });

        if (swapTokenSuccess) { toast({ title: "Transaction Successfull ✅" }); setBridgeLoading(false) }
        if (swapTokenError) { toast({ title: "Transaction Failed. Please try again. 🛑" }); setBridgeLoading(false) }
        if (swapTokenError && SwapTokenAmount.includes('.')) { toast({ title: "Please enter a integer value only. Avoid decimals" }); setBridgeLoading(false) }
    }, [getFeeData, getFeeDataError, swapTokenSuccess, swapTokenError])


    useEffect(() => {
        switchChain();
    }, [])

    useEffect(() => {

        if (toChain) {
            if (toChain.name === "Polygon Amoy") {
                setSwapSellToken(TOKEN_5IRE_ON_POLYGON);
                setSwapBuyToken(TOKEN_5IRE_ON_POLYGON);
                setBridgeAsset(WETH_POLYGON);
            }
            else {
                setSwapSellToken("");
                setSwapBuyToken("");
                setBridgeAsset("");

            }
        }

    }, [toChain])

    return (
        <Card
            className="h-fit mx-3 w-full max-w-md rounded-lg bg-card text-card-foreground p-3 space-y-2 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <CardHeader >
                <TabBar />
            </CardHeader>

            <CardContent className="space-y-6">

                <div className="flex flex-col w-full">
                    <span className="mb-2 text-sm font-medium">From</span>
                    <div className="flex gap-3 w-full p-4 bg-muted text-muted-foreground rounded-lg">
                        <img className="w-[30px] rounded-full" src="https://s3.coinmarketcap.com/static-gravity/image/fd7a43cc620c4ade96804bb1c36aac6f.png" alt="" />
                        {fromChain}
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className="mb-2 text-sm font-medium">To</span>
                    <DropdownSelection
                        disabled={false}
                        onSelect={handleToChainSelect}
                    />
                </div>

                <div className="space-y-2">
                    <span className="text-sm font-medium">
                        Enter Amount
                    </span>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            value={SwapTokenAmount}
                            onChange={(e) => SwapTetTokenAmount(e.target.value)}
                            placeholder="9"
                            className="max-w-[100px] flex-1"
                        />
                        <Button variant="outline" size="lg" onClick={() => SwapTetTokenAmount(Number(formatEther(balance.value)).toFixed(0))}>
                            MAX
                        </Button>
                    </div>
                    <div className={`flex text-muted-foreground w-fit p-1 rounded-md text-sm 
                        ${(getFeeDataLoading && !getFeeData) ? "animate-pulse" : ""}`}>
                        Gas Fee :
                        {
                            getFeeData ?
                                <span className="mx-2">
                                    {Number(formatEther(getFeeData)).toFixed(2)} 5ire
                                </span>
                                :
                                <span className="mx-2">...</span>
                        }
                    </div>
                </div>
            </CardContent>

            <CardFooter>
                <Button
                    className="w-full flex justify-center items-center gap-3"
                    disabled={!fromChain || !toChain || !SwapTokenAmount || bridgeLoading}
                    onClick={handleBridgeOut}
                >
                    {
                        bridgeLoading
                            ?
                            <>
                                <span>BRIDGING....</span>
                                <span className="border-2 border-r-0 rounded-full font-bold animate-spin border-white w-7 h-7" ></span>
                            </>
                            : <span className="font-bold text-base">BRIDGE IN</span>
                    }
                </Button>
            </CardFooter>
        </Card >
    )
}
