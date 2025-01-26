"use client"

import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardContent, CardFooter, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownSelection } from "./networkDropdown"
import TabBar from "./TabBar"
import { useAccount, useBalance, useReadContract, useSwitchChain, useTransactionReceipt, useWriteContract } from "wagmi"
import { _5ireTestnet } from "@/lib/chainsConfigs"
import { _5ireTestnetAddresses } from "@/lib/contractAddresses"
import { formatEther, parseEther } from "viem"
import { fireRouterAbi } from '@/lib/ABIs/FireRouter'
import { FireHub } from "@/lib/ABIs/FireHub"
import { useToast } from "@/hooks/use-toast"
import { truncateAddress } from "./truncateAddress"

export default function BridgeOutCard() {

    const [fromChain, setFromChain] = useState("5ireChain Thunder Testnet");
    const [toChain, setToChain] = useState("");
    const [SwapTokenAmount, SwapTetTokenAmount] = useState("");
    const [bridgeLoading, setBridgeLoading] = useState(false);
    const { address } = useAccount();
    const { data: balance } = useBalance({ address: address });
    const { switchChainAsync } = useSwitchChain();
    const { toast } = useToast();

    const [TOKEN_5IRE, setTOKEN_5IRE] = useState('');
    const [WETH_TOKEN, setWETH_TOKEN] = useState('')


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

    const { data: swapTokenTx, isSuccess: swapTokenTxSuccess, isError: swapTokenTxError } = useTransactionReceipt({ hash: swapTokenData })


    // AUTOMATICALLY SWITCH USER TO 5IRECHAIN 
    const switchChain = async () => {
        try {
            await switchChainAsync({ chainId: _5ireTestnet.id })
        }
        catch (e) { console.log(e) }
    };


    // SELECT CHAIN FROM THE DROPDOWN
    const handleToChainSelect = (chainName) => {
        setToChain(chainName)
    };


    // MAIN BRIDGE TRANFER FUNCTION : FROM 5IRECHAIN TO OTHER CHAINS
    const handleBridgeOut = async () => {

        if (!toChain || !SwapTokenAmount || !getFeeData) return;

        setBridgeLoading(true)
        const srcSwapDetails = {
            sellToken: TOKEN_5IRE,
            sellAmt: parseEther(SwapTokenAmount),
            buyToken: TOKEN_5IRE,
            swapData: "0x"
        };
        const bridgeInfo = {
            asset: WETH_TOKEN,
            rmtChainId: "2147484614",
            gasLimit: "500000",
            gasFee: getFeeData,
            receiver: address,
            swapDetails: srcSwapDetails
        };
        let value = (parseEther(SwapTokenAmount) + BigInt(bridgeInfo.gasFee)).toString();

        try {
            await swapTokenFunction({
                address: _5ireTestnetAddresses.FireHub,
                abi: FireHub.abi,
                functionName: "bridgeETH",
                value: value,
                args: [bridgeInfo]
            })
        }
        catch (e) { console.log("Transaction Failed") }
    }


    // ---------- CHECKING/ALERT FOR FAILED TRANSACTIONS -------
    useEffect(() => {
        if (getFeeDataError) toast({ title: "Couldn't fetch Gas Fee ⛽" });

        if (swapTokenError) {
            toast({ title: "Transaction Failed. Please try again. 🛑" });
            setBridgeLoading(false)
        }

        if (swapTokenError && SwapTokenAmount.includes('.')) {
            toast({ title: "Please enter a integer value only. Avoid decimals" });
            setBridgeLoading(false)
        }
    }, [getFeeData, getFeeDataError, swapTokenSuccess, swapTokenError])



    // ---------- CHECKING/ALERT FOR SUCCESSFULL TRANSACTIONS -------
    useEffect(() => {
        if (swapTokenTx?.status === "reverted") {
            toast({ title: "Transaction reverted due to technical issue 🔄️" });
            setBridgeLoading(false);
        }
        else if (swapTokenTxSuccess && swapTokenSuccess) {
            toast({ title: "Transaction Successfull ✅" });
            setBridgeLoading(false);
        }
    }, [swapTokenTx, swapTokenTxSuccess, swapTokenTxError])


    // SWITCH TO 5IRECHAIN ON PAGE LOAD
    useEffect(() => {
        switchChain();
    }, [])

    useEffect(() => {

        if (toChain) {
            if (toChain.name === "Polygon Amoy") {
                setTOKEN_5IRE("0x999A50941c934DF44b045Ab15e3Fb08e22607eC9");
                setWETH_TOKEN("0xCFaEB74409E4C6756C43F75455fc42A6A3FdEb1f");
            }
            else {
                setTOKEN_5IRE("");
                setWETH_TOKEN("");
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
                    <div className="flex justify-between w-full">
                        <div className={`flex text-muted-foreground w-fit p-1 rounded-md text-sm 
                        ${(getFeeDataLoading && !getFeeData) ? "animate-pulse" : ""}`}>
                            Gas Fee :
                            {
                                getFeeData ?
                                    <span className="mx-2 font-semibold">
                                        {(formatEther(getFeeData))} 5ire
                                    </span>
                                    :
                                    <span className="mx-2">...</span>
                            }
                        </div>
                        {swapTokenTx &&
                            <span className="text-muted-foreground"> Tx Hash : <a href={`https://testnet.5irescan.io/tx/${swapTokenTx?.transactionHash}`} target="_blank" className="text-primary underline underline-offset-4 font-mono">
                                {truncateAddress(swapTokenTx?.transactionHash)}
                            </a></span>
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
                            : <span className="font-bold text-base">BRIDGE OUT</span>
                    }
                </Button>
            </CardFooter>
        </Card >
    )
}
