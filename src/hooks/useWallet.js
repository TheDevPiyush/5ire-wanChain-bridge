'use client'
import React, { createContext, useContext, useState } from 'react'

const walletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState(null);

    const updateWalletAddress = (address) => {
        setWalletAddress(address)
    }

    return (
        <walletContext.Provider value={{ walletAddress, updateWalletAddress }}>
            {children}
        </walletContext.Provider>
    )
}

export default function useWallet() {
    return useContext(walletContext);
}
