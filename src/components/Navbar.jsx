"use client"
import React from 'react'
import { NavDropDown } from './NavDropdown';
import { ToggleTheme } from './toggle-theme';

export default function Navbar({ logout, account, selectedChain, totalSupply, balance, logoURL, theme }) {

    return (
        <nav className="flex items-center justify-between mb-6">
            {theme === "dark" ? (
                <img src={logoURL || ""} className="w-[6rem] h-[2.5rem]" alt="5ire logo" />
            ) : (
                <img src={logoURL || ""} className="w-[6rem] h-[2.5rem]" alt="5ire logo" />
            )}

            <div className="flex gap-2">
                <NavDropDown
                    logout={logout}
                    account={account}
                    selectedChain={selectedChain}
                    totalSupply={totalSupply}
                    balance={balance}
                />
                <ToggleTheme />
            </div>
        </nav>
    )
}
