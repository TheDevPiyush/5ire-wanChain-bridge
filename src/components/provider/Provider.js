"use client"

import { ThemeProvider } from '@/providers/theme-provider'
import React from 'react'
import { Toaster } from '../ui/toaster'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectButton, darkTheme, lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css';

export default function Provider({ children }) {

    const queryClient = new QueryClient()

    return (
        <html lang="en">
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange>
                    <Toaster />
                    <WagmiProvider config={config}>
                        <QueryClientProvider client={queryClient}>
                            <RainbowKitProvider coolMode modalSize="compact" showRecentTransactions={false} theme={{
                                lightMode: lightTheme(),
                                darkMode: darkTheme({ overlayBlur: 'small' }),
                            }}>
                                <div className="connect-btn w-full flex justify-end">
                                    <ConnectButton
                                        chainStatus={'icon'}
                                        showBalance={true}
                                        accountStatus={{
                                            smallScreen: 'avatar',
                                            largeScreen: 'avatar',
                                        }} />
                                </div>
                                {children}
                            </RainbowKitProvider>
                        </QueryClientProvider>
                    </WagmiProvider>
                </ThemeProvider>
            </body>
        </html >
    )
}
