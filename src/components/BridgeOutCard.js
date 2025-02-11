"use client"

import React, { useEffect, useState } from "react"
import { Card, CardHeader, CardContent, CardFooter, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownSelection, NetworkDropdown } from "./networkDropdown"
import TabBar from "./TabBar"
import { useAccount, useBalance, useReadContract, useSwitchChain, useTransactionReceipt, useWriteContract } from "wagmi"
import { _5ireTestnet } from "@/lib/chainsConfigs"
import { _5ireTestnetAddresses, AmoyPolygonTestnetAddresses, SepoliaETHAddresses } from "@/lib/contractAddresses"
import { formatEther, parseEther } from "viem"
import { fireRouterAbi } from '@/lib/ABIs/FireRouter'
import { FireHub } from "@/lib/ABIs/FireHub"
import { useToast } from "@/hooks/use-toast"
import { truncateAddress } from "./truncateAddress"
import { CurrencyDropdown } from "./currencyDropdown"

export default function BridgeOutCard() {

    const [fromChain, setFromChain] = useState("5ireChain Thunder Testnet");
    const [toChain, setToChain] = useState("");
    const [SwapTokenAmount, setSwapTokenAmount] = useState("");
    const [bridgeLoading, setBridgeLoading] = useState(false);
    const { address, isConnected, isDisconnected } = useAccount();
    const { data: balance } = useBalance({ address: address });
    const { switchChainAsync } = useSwitchChain();
    const { toast } = useToast();

    const [TOKEN_5IRE, setTOKEN_5IRE] = useState('');
    const [WETH_TOKEN, setWETH_TOKEN] = useState('')
    const [currency, setCurrency] = useState("");
    const [rmtChainId, setRmtChainId] = useState("")


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
        args: [_5ireTestnetAddresses.ChainId, 1000000]
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
            setTimeout(() => {
                toast({
                    title: "Please Wait",
                    description: "Switching to 5ireChain..."
                })
            }, 1500);
            await switchChainAsync({ chainId: _5ireTestnet.id })
        }
        catch (e) { console.log(e) }
    };


    // SELECT CHAIN FROM THE DROPDOWN
    const handleToChainSelect = (chainName) => {
        setToChain(chainName)
    };

    // SELECT CURRENCY FROM DROPDOWN
    const handleCurrencySelect = async (currency) => {
        setCurrency(currency)
    }

    // MAIN BRIDGE TRANFER FUNCTION : FROM 5IRECHAIN TO OTHER CHAINS
    const handleBridgeOut = async () => {
        console.log(toChain, TOKEN_5IRE, WETH_TOKEN, rmtChainId, getFeeData, currency, SwapTokenAmount, address)
        console.log("-----------------------------------------------------------")
        if (!toChain || !SwapTokenAmount || !getFeeData || !currency) return;
        if (Number(SwapTokenAmount) <= 0 || SwapTokenAmount.includes('.')) { toast({ title: "Amount can only be positive Integer" }); return; }

        setBridgeLoading(true)

        const srcSwapDetails = {
            sellToken: TOKEN_5IRE,
            sellAmt: parseEther(SwapTokenAmount),
            buyToken: TOKEN_5IRE,
            swapData: "0x"
        };
        const bridgeInfo = {
            asset: WETH_TOKEN,
            rmtChainId: rmtChainId,
            gasLimit: "1000000",
            gasFee: getFeeData,
            receiver: address,
            swapDetails: srcSwapDetails
        };
        let value = (parseEther(SwapTokenAmount) + BigInt(bridgeInfo.gasFee)).toString();
        console.log(value)
        console.log(bridgeInfo)
        try {
            await swapTokenFunction({
                address: _5ireTestnetAddresses.FireHub,
                abi: FireHub.abi,
                functionName: "bridgeETH",
                value: value,
                args: [bridgeInfo]
            })
        }
        catch (e) {
            console.log("Transaction Failed")
        }
    }


    // ---------- CHECKING/ALERT FOR FAILED TRANSACTIONS -------
    useEffect(() => {
        if (getFeeData) console.log(getFeeData);
        if (getFeeDataError) toast({ title: "Couldn't fetch Gas Fee ⛽", description: "Try to switch to 5ireChain network." });

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
            console.log(swapTokenTx);
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
                setTOKEN_5IRE(AmoyPolygonTestnetAddresses.Token5IRE);
                setWETH_TOKEN(_5ireTestnetAddresses.WETH);
                setRmtChainId(AmoyPolygonTestnetAddresses.ChainId)
            }
            else if (toChain.name === "Sepolia Testnet") {
                setTOKEN_5IRE(SepoliaETHAddresses.Token5IRE);
                setWETH_TOKEN(_5ireTestnetAddresses.WETH)
                setRmtChainId(SepoliaETHAddresses.ChainId)
            }
            else { setTOKEN_5IRE(""); setWETH_TOKEN(""); }
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
                    <span className="mb-2 text-base font-medium">From</span>
                    <div className="flex gap-3 w-full p-4 bg-muted text-muted-foreground font-bold rounded-lg">
                        <img className="w-[30px] rounded-full" src="https://s3.coinmarketcap.com/static-gravity/image/fd7a43cc620c4ade96804bb1c36aac6f.png" alt="" />
                        {fromChain}
                    </div>
                </div>

                <div className="flex flex-col">
                    <span className="mb-2 text-base font-medium">To</span>
                    <NetworkDropdown
                        disabled={false}
                        onSelect={handleToChainSelect}
                    />
                </div>

                <div className="space-y-2 border-2 border-muted rounded-sm p-4 w-full">
                    <div className="text-base font-medium mb-4 flex justify-between w-full">
                        Choose Currency & Enter Amount
                        <span>
                            {
                                balance &&
                                <div className="text-muted-foreground text-sm w-full">
                                    <span>Balance : </span>
                                    <span className="text-secondary-foreground font-bold">
                                        {Number(formatEther(balance?.value)).toFixed(0)} {balance?.symbol}
                                    </span>
                                </div>
                            }
                        </span>
                    </div>


                    <div className="flex w-full justify-between gap-7">
                        <div className="">
                            <CurrencyDropdown
                                disabled={false}
                                onSelect={handleCurrencySelect} />
                        </div>

                        <div className="flex items-center justify-start gap-3">
                            <Input
                                min="1"
                                type="number"
                                value={SwapTokenAmount}
                                onChange={(e) => setSwapTokenAmount(e.target.value)}
                                placeholder="0.0"
                                className="max-w-[100px] border-2 flex-1"
                            />
                            <Button variant="outline" size="lg" onClick={() => setSwapTokenAmount(Number(formatEther(balance.value)).toFixed(0))}>
                                MAX
                            </Button>
                        </div>
                    </div>
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
            </CardContent>

            <CardFooter>
                <Button
                    className="w-full flex justify-center items-center gap-3"
                    disabled={!fromChain || !toChain || !SwapTokenAmount || bridgeLoading || !rmtChainId || isDisconnected || !address}
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
