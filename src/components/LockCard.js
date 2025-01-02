import React from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function LockCoinsCard({
    account,
    connectWallet,
    totalSupply,
    balance,
    amount,
    setAmount,
    toChainId,
    setToChainId,
    toSC,
    setToSC,
    toUser,
    setToUser,
    gasLimit,
    setGasLimit,
    lockCoins,
    error,
    setTheme,
}) {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                {/* Theme toggle button (example) */}
                <Button variant="secondary" onClick={() => setTheme("light")}>
                    Change Theme
                </Button>
            </div>

            {/* If the user is connected */}
            {account ? (
                <Card className="max-w-lg mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl">Account Details</CardTitle>
                        <CardDescription>Connected to: {account}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <p className="text-sm">
                            <strong>Total Locked Supply:</strong>{" "}
                            <span className="text-amber-400">{totalSupply}</span> 5ire
                        </p>
                        <p className="text-sm">
                            <strong>Your Locked Balance:</strong>{" "}
                            <span className="text-amber-500">{balance}</span> 5ire
                        </p>

                        <hr className="my-4" />

                        <div>
                            <h2 className="text-xl font-semibold mb-2">
                                Enter details to Lock your coins
                            </h2>

                            {/* 5ire Amount to lock */}
                            <label className="block text-sm font-medium mb-1">
                                5ire Amount to Lock (e.g., 1.5):
                            </label>
                            <Input
                                type="text"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />

                            {/* Destination Chain ID using shadcn/ui Select */}
                            <label className="block text-sm font-medium mt-4 mb-1">
                                Destination Chain ID:
                            </label>
                            <Select onValueChange={(val) => setToChainId(val)} value={toChainId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select chain" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Chains</SelectLabel>
                                        {/* Replace these with your actual chain IDs */}
                                        <SelectItem value="1">Chain One (ID=1)</SelectItem>
                                        <SelectItem value="2">Chain Two (ID=2)</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {/* Destination contract address */}
                            <label className="block text-sm font-medium mt-4 mb-1">
                                Destination Contract Address:
                            </label>
                            <Input
                                type="text"
                                placeholder="toSC"
                                value={toSC}
                                onChange={(e) => setToSC(e.target.value)}
                            />

                            {/* Destination user address */}
                            <label className="block text-sm font-medium mt-4 mb-1">
                                Destination User Address:
                            </label>
                            <Input
                                type="text"
                                placeholder="toUser"
                                value={toUser}
                                onChange={(e) => setToUser(e.target.value)}
                            />

                            {/* Gas limit */}
                            <label className="block text-sm font-medium mt-4 mb-1">
                                Gas Limit (e.g., 50000):
                            </label>
                            <Input
                                type="text"
                                placeholder="gasLimit"
                                value={gasLimit}
                                onChange={(e) => setGasLimit(e.target.value)}
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end">
                        <Button variant="default" onClick={lockCoins}>
                            Lock Coins
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <div className="text-center">
                    <Button variant="default" onClick={connectWallet}>
                        Connect Wallet
                    </Button>
                </div>
            )}

            {/* Display any errors */}
            {error && (
                <div className="mt-4 text-red-500 font-bold text-md text-center">
                    {error}
                </div>
            )}
        </div>
    )
}
