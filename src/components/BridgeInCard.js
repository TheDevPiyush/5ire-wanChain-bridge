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
import { _5ireTestnetAddresses, AmoyPolygonTestnetAddresses, SepoliaETHAddresses } from "@/lib/contractAddresses"
import { formatEther, parseEther } from "viem"
import { IERC20 } from "@/lib/ABIs/IERC20"
import { FireHub } from "@/lib/ABIs/FireHub"
import { _5ireTestnet } from "@/lib/chainsConfigs"
import { CurrencyDropdown } from "./currencyDropdown"
import { truncateAddress } from "./truncateAddress"

export default function BridgeInCard() {
    const [fromChain, setFromChain] = useState("");
    const [toChain, setToChain] = useState("5ireChain Thunder Testnet");
    const [SwapTokenAmount, setSwapTokenAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [TOKEN_5IRE, setTOKEN_5IRE] = useState('');
    const [WETH_TOKEN, setWETH_TOKEN] = useState('');
    const [chainConfigs, setchainConfigs] = useState({ fireRouter: "", chainID: "", firehub: "" });
    const [bridgeLoading, setBridgeLoading] = useState({ loadingStatus: null });
    const [currency, setCurrency] = useState("");
    const [explorerURL, setExplorerURL] = useState("");
    const [txHash, setTxHash] = useState("");

    const { isConnected, address, isDisconnected, chain } = useAccount();
    const { switchChainAsync } = useSwitchChain();
    const { toast } = useToast();
    const { data: balance } = useBalance({ address: address, token: "0x999A50941c934DF44b045Ab15e3Fb08e22607eC9" });

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
        refetch: getFeeFetch,

    } = useReadContract({
        abi: fireRouterAbi.abi,
        address: chainConfigs.fireRouter,
        functionName: "estimateFee",
        args: [chainConfigs.chainID, 1000000]
    });


    // ---- CHECKING FOR SUCCESSFULL APPROVAL OF TRANSACTIONS ---
    useEffect(() => {
        if (approveSuccess) {
            toast({ title: "Tokens Approved ✅" });
            startBridgeIn();
        }
    }, [approveSuccess, approveTxSuccess])


    // ----- CHECKING FOR SUCCESSFULL BRIDGE TRANSFER TRANSACTIONS -----
    useEffect(() => {
        if (swapTokenSuccess && TxSwapTokenData && TxSwapTokenDataSuccess) {
            toast({ title: "BRIDGE Transaction Successfull ✅" });
            setBridgeLoading({ loadingStatus: null })
            setTxHash(TxSwapTokenData?.transactionHash)
        }
    }, [TxSwapTokenData, TxSwapTokenDataSuccess])


    // ---- CHECKING/ALERTING FOR ERROR IN TRANSACTIONS ---
    useEffect(() => {
        if (getFeeDataError && fromChain) {
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




    // ---- SELETING CHAIN FROM DROPDOWN -----
    const handleFromChainSelect = async (chainName) => {
        setLoading(true)
        await switchChainAsync({ chainId: chainName.id })
        setFromChain(chainName)
        setLoading(false)
        getFeeFetch;
    }

    // ----- SETTING PARAMETERS BASED ON SELECTED CHAIN -----
    useEffect(() => {
        if (fromChain) {
            if (fromChain.name === "Polygon Amoy") {
                setTOKEN_5IRE(AmoyPolygonTestnetAddresses.Token5IRE);
                setchainConfigs({
                    fireRouter: AmoyPolygonTestnetAddresses.FireRouter,
                    chainID: AmoyPolygonTestnetAddresses.ChainId,
                    firehub: AmoyPolygonTestnetAddresses.FireHub
                })
                setWETH_TOKEN(_5ireTestnetAddresses.WETH);
                setExplorerURL(`https://amoy.polygonscan.com/tx/${txHash}`)
                console.log('amoy')
            }
            else if (fromChain.name === "Sepolia Testnet") {
                setTOKEN_5IRE(SepoliaETHAddresses.Token5IRE);
                setchainConfigs({
                    fireRouter: SepoliaETHAddresses.FireRouter,
                    chainID: SepoliaETHAddresses.ChainId,
                    firehub: SepoliaETHAddresses.FireHub
                });
                setWETH_TOKEN(_5ireTestnetAddresses.WETH);
                setExplorerURL(`https://sepolia.etherscan.io/tx/${txHash}`)
                console.log('sepolia')

            }
            else { setTOKEN_5IRE(""); setWETH_TOKEN(""); }
        }
    }, [fromChain])



    //   SELECTING CURRENCY FROM THE DROPDOWN -------------
    const handleCurrencySelect = async (currency) => {
        setCurrency(currency)
    }


    // ----- Approve the ERC20 5ire Tokens on other Chains-------
    const handleBridgeIn = async () => {
        if (!getFeeData || !fromChain || !SwapTokenAmount || !currency) return;

        setBridgeLoading({ loadingStatus: "Approving Tokens...." })

        try {
            await approveTokenFunctionAsync({
                abi: IERC20.abi,
                functionName: "approve",
                address: TOKEN_5IRE,
                args: [chainConfigs.firehub, parseEther(SwapTokenAmount)],
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
                address: chainConfigs.firehub,
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
            className="h-fit transition-all mx-3 w-full max-w-md rounded-lg bg-card text-card-foreground p-3 space-y-2 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
            <CardHeader >
                <TabBar />
            </CardHeader>

            <CardContent className="space-y-6">

                <div className="flex flex-col w-full">
                    <span className="mb-2 text-base">From</span>
                    <NetworkDropdown
                        currentChain={fromChain}
                        loading={loading}
                        disabled={false}
                        onSelect={handleFromChainSelect}
                    />
                </div>

                <div className="flex flex-col">
                    <span className="mb-2 text-base font-medium">To</span>
                    <div className="flex gap-3 w-full p-4 bg-muted text-muted-foreground rounded-lg">
                        {/* <img className="w-[30px] rounded-full" src={"https://s3.coinmarketcap.com/static-gravity/image/fd7a43cc620c4ade96804bb1c36aac6f.png" || null} alt="logoIcon" /> */}
                        {toChain}
                    </div>
                </div>

                <div className="space-y-2 border-2 border-muted gap-3 flex flex-col rounded-sm p-4 w-full">
                    <div className="text-base flex w-full justify-between font-medium">
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


                    <div className="flex w-full justify-between">
                        <div>
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

                {fromChain && <div className={`flex text-muted-foreground  justify-between w-full items-center p-1 rounded-md text-sm ${(getFeeDataLoading && !getFeeData) ? "animate-pulse" : ""}`}>
                    <div className="flex items-center justify-center gap-2">
                        Gas Fee :
                        {
                            getFeeData ?
                                <span className="mx-2 text-white font-semibold">
                                    {(formatEther(getFeeData))} ETH
                                </span>
                                :
                                <span className="mx-2 border-2 border-r-0 rounded-full flex items-center font-bold animate-spin border-white w-3 h-3" ></span>
                        }
                    </div>
                    {TxSwapTokenData &&
                        <span className="text-muted-foreground"> Tx Hash : <a href={explorerURL} target="_blank" className="text-primary underline underline-offset-4 font-mono">
                            {truncateAddress(TxSwapTokenData?.transactionHash)}
                        </a></span>
                    }
                </div>}
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
