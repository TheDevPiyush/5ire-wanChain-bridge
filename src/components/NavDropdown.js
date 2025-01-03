"use client"
import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { truncateAddress } from "./truncateAddress"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CommandSeparator } from "cmdk"

export function NavDropDown({ logout, account, balance, selectedChain }) {
    const [open, setOpen] = React.useState(false)

    const location = usePathname()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between">
                    {account ? truncateAddress(account) : 'Not Connected'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>

                            <CommandItem className={`my-3 ${location === '/' ? 'font-bold text-white bg-primary' : ''}`}>
                                <Link className="w-full" href={'/'}>Lock & Transfer Coins</Link>
                            </CommandItem>

                            <CommandItem className={`my-3 ${location === '/ReceiveCoins' ? 'font-bold text-white bg-primary' : ''}`}>
                                <Link
                                    className="w-full"
                                    href={'/ReceiveCoins'}>
                                    Unlock & Redeem Coins
                                </Link>
                            </CommandItem>

                            <CommandItem className='my-3 text-red-400 font-semibold'>
                                <div onClick={logout} className="w-full" >
                                    Log Out
                                </div>
                            </CommandItem>

                            <CommandSeparator />


                            <CommandItem disabled>
                                Balance : <span className="text-amber-500 font-bold">{balance} ETH </span>
                            </CommandItem>
                            <CommandItem disabled>
                                Chain : <span className="text-amber-500 font-bold">{selectedChain}</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
