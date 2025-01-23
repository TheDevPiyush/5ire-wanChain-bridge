"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./abi.json"; // Make sure this ABI has unlockCoins(...)
import { useTheme } from "next-themes";

// --- shadcn/ui components ---
import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useWallet from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { truncateAddress } from "@/components/truncateAddress";
import Navbar from "@/components/Navbar";

export default function UnlockContractApp() {
    // --- State variables ---
    const [account, setAccount] = useState("");
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [unlockContract, setUnlockContract] = useState(null);

    const [totalSupply, setTotalSupply] = useState("0");
    const [balance, setBalance] = useState("0");

    // For unlocking
    const [toChainId, setToChainId] = useState("");
    const [toSC, setToSC] = useState("");
    const [toUser, setToUser] = useState("");
    const [amount, setAmount] = useState("");
    const [gasLimit, setGasLimit] = useState("300000");

    const [error, setError] = useState("");
    const [logoURL, setLogoURL] = useState(null);
    const [loading, setLoading] = useState(false);
    const [txHash, setTxHash] = useState("");
    const [selectedChain, setSelectedChain] = useState("");

    // Hooks
    const { setTheme, theme } = useTheme();
    const { updateWalletAddress } = useWallet();
    const { toast } = useToast();

    // --- Contract details ---
    const UNLOCK_CONTRACT_ADDRESS = "0xeE02101Da362c9bFc616F72AbF8301Ba94f3C4fe";
    const UNLOCK_CONTRACT_ABI = abi;

    // 1. Connect wallet
    const connectWallet = async () => {
        setLoading(true);
        if (!window.ethereum) {
            alert("Please install MetaMask (or a 5ire-compatible wallet).");
            setLoading(false);
            return;
        }
        try {
            const browserProvider = new ethers.BrowserProvider(window.ethereum);
            const signerInstance = await browserProvider.getSigner();
            const network = await browserProvider.getNetwork();
            const accounts = await browserProvider.send("eth_requestAccounts", []);

            const contract = new ethers.Contract(
                UNLOCK_CONTRACT_ADDRESS,
                UNLOCK_CONTRACT_ABI,
                signerInstance
            );

            setSelectedChain(network.chainId);
            setProvider(browserProvider);
            setSigner(signerInstance);
            setUnlockContract(contract);
            setAccount(accounts[0]);
            updateWalletAddress(accounts[0]);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Error connecting to wallet:", err);
            setError(err.toString());
        }
    };

    // 2. Fetch total supply
    const fetchTotalSupply = async () => {
        if (!unlockContract) return;
        try {
            const supply = await unlockContract.totalSupply();
            setTotalSupply(ethers.formatEther(supply));
        } catch (err) {
            setError(err.toString());
        }
    };

    // 3. Fetch user balance
    const fetchBalance = async () => {
        if (!unlockContract || !account) return;
        try {
            const bal = await unlockContract.balanceOf(account);
            setBalance(ethers.formatEther(bal));
        } catch (err) {
            setError(err.toString());
            toast({
                variant: "destructive",
                description: "Please Choose Amoy Polygon Network in MetaMask.",
            });
        }
    };

    // 4. Unlock coins
    const unlockCoins = async () => {
        if (!unlockContract || !signer || !account) return;
        if (!amount || !toChainId || !toSC || !toUser || !gasLimit) {
            toast({ description: "Missing Inputs. Please Check" });
            return;
        }

        try {
            setLoading(true);
            const amountWei = ethers.parseEther(amount || "0");
            const gasFee = ethers.parseEther("0.00008");

            const tx = await unlockContract.unlockCoins(
                BigInt(toChainId),
                toSC,
                toUser,
                amountWei,
                BigInt(gasLimit || "0"),
                { value: gasFee }
            );

            setTxHash(tx.hash);
            await tx.wait();

            toast({
                description: "Unlock Transaction Successful! ✅",
            });

            setLoading(false);
            fetchTotalSupply();
            fetchBalance();
        } catch (err) {
            setLoading(false);
            console.error("Error unlocking coins:", err);
            toast({
                variant: "destructive",
                title: "Transaction Failed! ❌",
                description: "Make sure you've selected Polygon in wallet.",
            });
            setError(err.toString());
        }
    };

    // Logout
    const logout = () => {
        setSigner(null);
        setAccount(null);
    };

    // Listen to events related to unlocking
    useEffect(() => {
        if (!unlockContract) return;

        // Example: if the contract emits an event called "coinsReleased"
        const releaseFilter = unlockContract.filters.coinsReleased?.();
        if (releaseFilter) {
            unlockContract.on(releaseFilter, (chainId, user, amt, sc) => {
                console.log("coinsReleased Event:", {
                    chainId: chainId.toString(),
                    user,
                    amount: ethers.formatEther(amt),
                    sc,
                });
            });
        }

        return () => {
            if (releaseFilter) {
                unlockContract.removeAllListeners(releaseFilter);
            }
        };
    }, [unlockContract]);

    // Fetch data if contract & account are ready
    useEffect(() => {
        if (unlockContract && account) {
            fetchTotalSupply();
            fetchBalance();
            setToUser(account);
        }
    }, [unlockContract, account, selectedChain]);

    // When chain ID changes or txHash updates
    useEffect(() => {
        if (toChainId === "1073741853") {
            setToSC("0x0fEc43F72F1CFC634302e9BdD3aF84b6Ec808f4d");
        }

        // Show a toast if new txHash
        if (txHash) {
            toast({
                title: "Transaction Hash:",
                description: truncateAddress(txHash),
                action: (
                    <ToastAction
                        altText="Copy the transaction hash"
                        onClick={() => navigator.clipboard.writeText(txHash)}
                    >
                        Copy Hash
                    </ToastAction>
                ),
            });
        }
    }, [toChainId, txHash]);

    // Handle theme & auto-connect
    useEffect(() => {
        connectWallet();

        if (theme === "light") {
            setLogoURL("https://docs.5ire.org/_astro/logo-light.Co9I08d7.svg");
        } else {
            setLogoURL(
                "https://5ire.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_light.57910aff.png&w=256&q=75"
            );
        }

        if (typeof window.ethereum !== "undefined") {

            window.ethereum.on('chainChanged', (chainHEX) => {
                const currentChainID = parseInt(chainHEX);
                setSelectedChain(currentChainID);
                connectWallet();
            })

            window.ethereum.on("accountsChanged", () => {
                connectWallet();
            });
        }
    }, [theme]);

    return (
        <div className="p-6">
            {/* Nav */}
            <Navbar
                logout={logout}
                account={account}
                selectedChain={selectedChain}
                totalSupply={totalSupply}
                balance={balance}
                logoURL={logoURL} theme={theme} />

            {/*----------------------------------------------------------------
                UNLOCK COINS -- Card Component 
            ----------------------------------------------------------------*/}
            <Card className="max-w-xl mx-auto">
                <CardHeader className="my-2">
                    <h1 className="text-2xl font-bold">Unlock 5ire Coins</h1>
                    <div className="text-base text-muted-foreground">Make sure you've selected Amoy Polygon in wallet.</div>
                </CardHeader>

                <CardContent>
                    <div>
                        <label className="block font-bold">Amount to Unlock</label>
                        <Input
                            className="py-5 my-2"
                            type="text"
                            placeholder="e.g. 1.5"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                        <label className="block font-bold">Destination Chain ID</label>
                        <Select value={toChainId} onValueChange={(val) => setToChainId(val)}>
                            <SelectTrigger className="py-5 my-2">
                                <SelectValue placeholder="Select chain" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1073741853">5ire Chain</SelectItem>
                                    {/* Add any other chain options if needed */}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <label className="block font-bold">Destination Contract</label>
                        <Input
                            className="py-5 my-2"
                            type="text"
                            disabled
                            placeholder="Select a chain ID"
                            value={toSC}
                            onChange={(e) => setToSC(e.target.value)}
                        />

                        <label className="block font-bold">Recipient User Address</label>
                        <Input
                            className="py-5 my-2"
                            type="text"
                            placeholder="The user on chain A to receive coins"
                            value={toUser}
                            onChange={(e) => setToUser(e.target.value)}
                        />

                        <label className="block font-bold">Gas Limit</label>
                        <Input
                            className="py-5 my-2"
                            type="text"
                            disabled
                            placeholder="gasLimit"
                            value={gasLimit}
                            onChange={(e) => setGasLimit(e.target.value)}
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end">
                    {account ? (
                        <Button
                            disabled={loading}
                            className="w-full py-6 font-bold text-lg"
                            variant="default"
                            onClick={unlockCoins}
                        >
                            {loading ? (
                                <>
                                    Unlocking Coins...
                                    <span className="animate-spin border-2 border-l-0 border-purple-200 w-7 h-7 rounded-full ml-2" />
                                </>
                            ) : (
                                "Unlock Coins"
                            )}
                        </Button>
                    ) : (
                        <Button
                            disabled={loading}
                            className="w-full py-6 font-bold text-lg"
                            variant="destructive"
                            onClick={connectWallet}
                        >
                            {loading ? "Connecting..." : "Connect Wallet"}
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
