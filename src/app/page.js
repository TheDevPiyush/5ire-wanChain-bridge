"use client";

import React, { useState, useEffect } from "react";
import { ethers, LogDescription } from "ethers";
import abi from "./abi.json";
import { useTheme } from "next-themes";

// --- shadcn/ui components ---
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleTheme } from "@/components/toggle-theme";
import Image from "next/image";
import { NavDropDown } from "@/components/NavDropdown";
import useWallet from "@/hooks/useWallet";
import AlertDilog from "@/components/AlertDilog";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { truncateAddress } from "@/components/truncateAddress";
export default function LockContractApp() {
  // --- State variables ---
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [lockContract, setLockContract] = useState(null);
  const [totalSupply, setTotalSupply] = useState("0");
  const [balance, setBalance] = useState("0");
  const [toChainId, setToChainId] = useState("");
  const [toSC, setToSC] = useState('');
  const [toUser, setToUser] = useState('');
  const [amount, setAmount] = useState("");
  const [gasLimit, setGasLimit] = useState("300000");
  const [error, setError] = useState("");
  const [logoURL, setLogoURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('')
  const [selectedChain, setSelectedChain] = useState('')
  // Hooks Variables
  const { setTheme, theme } = useTheme();
  const { updateWalletAddress, walletAddress } = useWallet()
  const { toast } = useToast();

  // --- Contract details ---
  const LOCK_CONTRACT_ADDRESS = "0x0fEc43F72F1CFC634302e9BdD3aF84b6Ec808f4d";
  const LOCK_CONTRACT_ABI = abi;

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
      const selectedChain = await browserProvider.getNetwork();
      const accounts = await browserProvider.send("eth_requestAccounts", []);

      const contract = new ethers.Contract(
        LOCK_CONTRACT_ADDRESS,
        LOCK_CONTRACT_ABI,
        signerInstance
      );
      setSelectedChain(selectedChain.chainId);
      setProvider(browserProvider);
      setSigner(signerInstance);
      setLockContract(contract);
      setAccount(accounts[0]);
      updateWalletAddress(accounts[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error connecting to wallet:", error);
      setError(error.toString());
    }
  };

  // 2. Fetch total supply
  const fetchTotalSupply = async () => {
    if (!lockContract) return;
    try {
      const supply = await lockContract.totalSupply();
      // Assuming 5ire also uses 18 decimals like Ethereum
      setTotalSupply(ethers.formatEther(supply));
    } catch (error) {
      console.error("Error fetching total supply:", error);
      setError(error.toString());
      toast({
        variant: "destructive",
        title: 'Could not update total supply.',
        description: 'Make sure you are on 5ire scan network, and logged in.',
      })
    }
  };

  // 3. Fetch user balance
  const fetchBalance = async () => {
    if (!lockContract || !account) return;
    try {
      const bal = await lockContract.balanceOf(account);
      setBalance(ethers.formatEther(bal));
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast({
        variant: "destructive",
        title: 'Could not update balance.',
        description: 'Make sure you are on 5ire scan network, and logged in.',
      })
      setError(error.toString());
    }
  };

  // 4. Lock coins into the contract
  const lockCoins = async () => {
    if (!lockContract || !signer || !account) return;
    if (!amount || !toChainId || !toSC || !toUser || !gasLimit) { toast({ description: 'Missing Inputs. Please Check' }); return; }
    try {
      setLoading(true);
      const amountWei = ethers.parseEther(amount || "0");
      const gasFee = ethers.parseEther("1.34");

      const tx = await lockContract.lockCoin(
        BigInt(toChainId),
        toSC,
        toUser,
        amountWei,
        BigInt(gasLimit || "0"),
        { value: amountWei + gasFee }
      );

      setTxHash(tx.hash)

      await tx.wait();

      toast({
        description: 'Transaction Successful! ✅',
      })

      setLoading(false);
      // Refresh data
      fetchTotalSupply();
      fetchBalance();
    } catch (error) {
      setLoading(false);
      console.error("Error locking coins:", error);
      toast({
        variant: "destructive",
        description: 'Transaction Failed! ❌',
      })
      setError(error.toString());
    }
  };

  const logout = () => {
    setSigner(null);
    setAccount(null);
  }

  // Listen to events
  useEffect(() => {
    if (!lockContract) return;
    const lockedFilter = lockContract.filters.Locked();
    const unlockedFilter = lockContract.filters.Unlocked();

    lockContract.on(lockedFilter, (toChainId, to, amt, toSC) => {
      console.log("Locked Event:", {
        toChainId: toChainId.toString(),
        to,
        amount: ethers.formatEther(amt),
        toSC,
      });
    });

    lockContract.on(
      unlockedFilter,
      (messageId, fromChainId, to, amt, fromSC) => {
        console.log("Unlocked Event:", {
          messageId,
          fromChainId: fromChainId.toString(),
          to,
          amount: ethers.formatEther(amt),
          fromSC,
        });
      }
    );

    return () => {
      // Cleanup listeners when component unmounts
      lockContract.removeAllListeners(lockedFilter);
      lockContract.removeAllListeners(unlockedFilter);
    };
  }, [lockContract]);

  // Fetch data on load if already connected
  useEffect(() => {
    if (lockContract && account) {
      fetchTotalSupply();
      fetchBalance();
      setToUser(account);
    }
  }, [lockContract, account, selectedChain]);


  // dropdown chain id selection here and toast on hash generation.
  useEffect(() => {
    if (toChainId === "2147484614") {
      setToSC('0xeE02101Da362c9bFc616F72AbF8301Ba94f3C4fe')
    }

    if (txHash) {
      toast({
        title: 'Transation Hash:',
        description: truncateAddress(txHash),
        action: <ToastAction altText="copy the transaction hash" onClick={() => { navigator.clipboard.writeText(txHash) }}>Copy Hash</ToastAction>
      })
    }
  }, [toChainId, txHash])

  // show 5ire logo based on current selected theme mode, and check if metamask is already loggedin the app.
  useEffect(() => {

    connectWallet();

    if (theme === 'light') {
      setLogoURL('https://docs.5ire.org/_astro/logo-light.Co9I08d7.svg')
    }
    else {
      setLogoURL('https://5ire.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_light.57910aff.png&w=256&q=75')
    }

    if (typeof window.ethereum !== "undefined") {

      window.ethereum.on('chainChanged', (chainHEX) => {
        const currentChainID = parseInt(chainHEX);
        setSelectedChain(currentChainID);
      })

      window.ethereum.on("accountsChanged", (accounts) => {

        if (accounts.length > 0) {
          connectWallet();
        } else {
          updateWalletAddress(null);
          setAccount(null)
        }
      });
    }
  }, [theme])

  return (
    <div className="p-6">
      <nav className="flex items-center justify-between">

        {theme === 'dark' ?
          <img src={logoURL} className="w-[6rem] h-[2.5rem]" alt="" />
          :
          <img src={logoURL} className="w-[6rem] h-[2.5rem]" alt="" />}

        <div className="flex gap-2">
          <NavDropDown logout={logout} account={account} selectedChain={selectedChain} totalSupply={totalSupply} balance={balance} />
          <ToggleTheme />
        </div>
      </nav>


      {/* Main card component. */}
      <Card className="max-w-xl mx-auto">
        <CardHeader className='my-2'>
          <h1 className="text-2xl font-bold">
            Transfer 5ire Coins to Other Chains
          </h1>
        </CardHeader>

        {/*Contains Input fields for the card.  */}
        <CardContent>
          <div>
            <label className="block font-bold">5ire Coins Amount to Transfer</label>
            <Input
              className='py-5 my-2'
              type="text"
              placeholder="e.g. 1.5"
              value={amount}
              onChange={(e) => setAmount(e.target.value)} />

            <label className="block font-bold"> Destination Chain ID</label>
            <Select value={toChainId} onValueChange={(val) => setToChainId(val)}>
              <SelectTrigger className='py-5 my-2'>
                <SelectValue placeholder="Select chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="2147484614">Amoy Polygon</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <label className="block font-bold"> Destination Contract Address</label>
            <Input
              className='py-5 my-2'
              disabled={true}
              type="text"
              placeholder="Select a chain ID"
              value={toSC}
              onChange={(e) => setToSC(e.target.value)}
            />

            <label className="block font-bold"> Recipient User Address</label>
            <Input
              className='py-5 my-2'
              type="text"
              placeholder="Coins will be sent to this address"
              value={toUser}
              onChange={(e) => setToUser(e.target.value)}
            />

            <label className="block font-bold">Gas Limit</label>
            <Input
              className='py-5 my-2'
              type="text"
              placeholder="gasLimit"
              disabled
              value={gasLimit}
              onChange={(e) => setGasLimit(e.target.value)}
            />
          </div>
        </CardContent>


        {/* Button to show dialog and to call lock functions */}
        <CardFooter className="flex justify-end">
          {
            account ?

              <Button disabled={loading} className='w-full py-6 font-bold text-lg' variant="default" onClick={lockCoins}>
                {loading ?
                  <>Transfering Coins.. <span className="animate-spin border-2 border-l-0 border-purple-200 w-7 h-7 rounded-full"></span></>
                  : 'Transfer Coins'}
              </Button>
              :
              <Button disabled={loading} className='w-full py-6 font-bold text-lg' variant="destructive" onClick={connectWallet}>
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </Button>
          }
        </CardFooter>


      </Card>
    </div>
  );
}
