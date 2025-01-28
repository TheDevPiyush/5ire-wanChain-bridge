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
    NetworkDropdown
} from "./networkDropdown"
import { useAccount, useBalance, useReadContract, useSwitchChain, useTransactionReceipt, useWriteContract } from "wagmi"
import { useToast } from "@/hooks/use-toast"
import TabBar from "./TabBar"
import { fireRouterAbi } from "@/lib/ABIs/FireRouter"
import { _5ireTestnetAddresses, AmoyPolygonTestnetAddresses } from "@/lib/contractAddresses"
import { formatEther, parseEther } from "viem"
import { IERC20 } from "@/lib/ABIs/IERC20"
import { FireHub } from "@/lib/ABIs/FireHub"
import { _5ireTestnet } from "@/lib/chainsConfigs"
import { CurrencyDropdown } from "./currencyDropdown"
import { truncateAddress } from "./truncateAddress"

export default function BridgeInCard() {
    const [fromChain, setFromChain] = useState("")
    const [toChain, setToChain] = useState("5ireChain Thunder Testnet")
    const [SwapTokenAmount, setSwapTokenAmount] = useState("")
    const [loading, setLoading] = useState(false);
    const [TOKEN_5IRE, setTOKEN_5IRE] = useState('');
    const [WETH_TOKEN, setWETH_TOKEN] = useState('')
    const [bridgeLoading, setBridgeLoading] = useState({ loadingStatus: null })
    const [currency, setCurrency] = useState("");


    const { isConnected, address, isDisconnected, chain } = useAccount()
    const { switchChainAsync } = useSwitchChain()
    const { toast } = useToast();
    const { data: balance } = useBalance({ address: address });

    // Swap the tokens from 5ireChain to Polygon
    const {
        data: swapTokenData,
        isSuccess: swapTokenSuccess,
        isError: swapTokenError,
        writeContractAsync: swapTokenFunction,
    } = useWriteContract();

    const { data: TxSwapTokenData, isSuccess: TxSwapTokenDataSuccess } = useTransactionReceipt({ hash: swapTokenData })


    // ------- Get Approval for ERC-20--------------
    const {
        data: approveTokenData,
        writeContractAsync: approveTokenFunctionAsync,
        isSuccess: approveSuccess,
        isError: approveError
    } = useWriteContract();

    const { data: approveTx, isSuccess: approveTxSuccess } = useTransactionReceipt({ hash: approveTokenData })


    // ---- Get the Gas Fee for BRIDGE IN transaction --- 
    const {
        data: getFeeData,
        isSuccess: getFeeDataSuccess,
        isError: getFeeDataError,
        isLoading: getFeeDataLoading,
        refetch: getFeeFetch
    } = useReadContract({
        abi: fireRouterAbi.abi,
        address: AmoyPolygonTestnetAddresses.FireRouter,
        functionName: "estimateFee",
        args: [1073741853, 1000000]
    });


    // ---- CHECKING FOR SUCCESSFULL APPROVAL OF TRANSACTIONS ---
    useEffect(() => {
        if (approveSuccess && approveTx && approveTxSuccess) {
            toast({ title: "Tokens Approved ✅" });
            startBridgeIn();
        }
    }, [approveSuccess, approveTxSuccess])


    // ----- CHECKING FOR SUCCESSFULL BRIDGE TRANSFER TRANSACTIONS -----
    useEffect(() => {
        if (swapTokenSuccess && TxSwapTokenData && TxSwapTokenDataSuccess) {
            toast({ title: "BRIDGE Transaction Successfull ✅" });
            setBridgeLoading({ loadingStatus: null })
        }
    }, [TxSwapTokenData, TxSwapTokenDataSuccess])


    // ---- CHECKING/ALERTING FOR ERROR IN TRANSACTIONS ---
    useEffect(() => {
        if (getFeeDataError) {
            toast({ title: "Couldn't fetch latest Gas Fee. ⛽", description: "Select a network to fetch gas fee." });
            getFeeFetch;
        };
        if (approveError) {
            toast({ title: "Approve Transaction Failed 🛑" })
            setBridgeLoading({ loadingStatus: null })
        };
        if (swapTokenError) {
            toast({ title: "BRIDGE Transaction Failed 🛑" });
            setBridgeLoading({ loadingStatus: null })
        };
    }, [getFeeDataError, approveError, swapTokenError])


    // ----- SETTING PARAMETERS BASED ON SELECTED CHAIN -----
    useEffect(() => {
        if (fromChain) {
            if (fromChain.name === "Polygon Amoy") {
                setTOKEN_5IRE("0x999A50941c934DF44b045Ab15e3Fb08e22607eC9");
                setWETH_TOKEN("0xCFaEB74409E4C6756C43F75455fc42A6A3FdEb1f");
            }
            else { setTOKEN_5IRE(""); setWETH_TOKEN(""); }
        }
    }, [fromChain])


    // ---- SELETING CHAIN FROM DROPDOWN -----
    const handleFromChainSelect = async (chainName) => {
        setLoading(true)
        await switchChainAsync({ chainId: chainName.id })
        setFromChain(chainName)
        setLoading(false)
        getFeeFetch;
    }


    const handleCurrencySelect = async (currency) => {
        setCurrency(currency)
    }


    // ----- Approve the ERC20 contract -------
    const handleBridgeIn = async () => {
        if (!getFeeData || !fromChain || !SwapTokenAmount || !currency) return;

        setBridgeLoading({ loadingStatus: "Approving Tokens...." })

        try {
            await approveTokenFunctionAsync({
                abi: IERC20.abi,
                functionName: "approve",
                address: TOKEN_5IRE,
                args: [AmoyPolygonTestnetAddresses.FireHub, parseEther(SwapTokenAmount)],
            })
        }
        catch (e) {
            console.log("Approval Failed");
            console.log(e);
            setBridgeLoading({ loadingStatus: null })
        }
    }


    // MAIN BRIDGE TRANFER FUNCTION : FROM OTHER CHAIN TO 5IRECHAIN
    const startBridgeIn = async () => {
        const srcSwapDetails = {
            sellToken: WETH_TOKEN,
            sellAmt: parseEther(SwapTokenAmount),
            buyToken: WETH_TOKEN,
            swapData: "0x"
        };
        const bridgeInfo = {
            asset: TOKEN_5IRE,
            rmtChainId: "1073741853",
            gasLimit: "1000000",
            gasFee: getFeeData,
            receiver: address,
            swapDetails: srcSwapDetails
        };
        let value = BigInt(bridgeInfo.gasFee).toString();
        try {
            setBridgeLoading({ loadingStatus: "BRIDGING...." })
            const hash = await swapTokenFunction({
                address: AmoyPolygonTestnetAddresses.FireHub,
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
        catch (e) {
            console.log(e);
            console.log(address)
            console.log(AmoyPolygonTestnetAddresses.FireHub)
            console.log(TOKEN_5IRE)
            setBridgeLoading({ loadingStatus: null })
        }
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
                    <NetworkDropdown
                        currentChain={chain}
                        loading={loading}
                        disabled={false}
                        onSelect={handleFromChainSelect}
                    />
                </div>

                <div className="flex flex-col">
                    <span className="mb-2 text-sm font-medium">To</span>
                    <div className="flex gap-3 w-full p-4 bg-muted text-muted-foreground rounded-lg">
                        {/* <img className="w-[30px] rounded-full" src={"https://s3.coinmarketcap.com/static-gravity/image/fd7a43cc620c4ade96804bb1c36aac6f.png" || null} alt="logoIcon" /> */}
                        {toChain}
                    </div>
                </div>

                <div className="space-y-2 border-2 border-muted rounded-sm p-4 w-full">
                    <div className="text-sm font-medium mb-4">
                        Choose Currency & Enter Amount
                    </div>


                    <div className="flex w-full justify-between gap-7">
                        <div className="">
                            <CurrencyDropdown
                                loading={loading}
                                disabled={false}
                                onSelect={handleCurrencySelect} />
                        </div>

                        <div className="flex items-center justify-start gap-3">
                            <Input
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


                <div className={`flex text-muted-foreground items-center w-fit p-1 rounded-md text-sm ${(getFeeDataLoading && !getFeeData) ? "animate-pulse" : ""}`}>
                    Gas Fee :
                    {
                        getFeeData ?
                            <span className="mx-2 text-white font-semibold">
                                {(formatEther(getFeeData))} ETH
                            </span>
                            :
                            <span className="mx-2 border-2 border-r-0 rounded-full flex items-center font-bold animate-spin border-white w-3 h-3" ></span>
                    }
                    {TxSwapTokenData &&
                        <span className="text-muted-foreground"> Tx Hash : <a href={`https://testnet.5irescan.io/tx/${TxSwapTokenData?.transactionHash}`} target="_blank" className="text-primary underline underline-offset-4 font-mono">
                            {truncateAddress(TxSwapTokenData?.transactionHash)}
                        </a></span>
                    }
                </div>

            </CardContent>

            <CardFooter>
                <Button
                    className="w-full"
                    disabled={!fromChain || !toChain || !SwapTokenAmount || bridgeLoading?.loadingStatus !== null}
                    onClick={handleBridgeIn}
                >
                    {
                        bridgeLoading.loadingStatus === null
                            ?
                            <span>BRIDGE IN</span>
                            :
                            bridgeLoading.loadingStatus === "Approving Tokens...."
                                ?
                                <>
                                    <span>Approving Tokens....</span>
                                    <span className="border-2 border-r-0 rounded-full font-bold animate-spin border-white w-7 h-7" ></span>
                                </>

                                :
                                <>
                                    <span>BRIDING....</span>
                                    <span className="border-2 border-r-0 rounded-full font-bold animate-spin border-white w-7 h-7" ></span>
                                </>

                    }
                </Button>
            </CardFooter>
        </Card>
    )
}
