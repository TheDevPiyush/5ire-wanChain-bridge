"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { truncateAddress } from "./truncateAddress"

export function NavDropDown({ logout, account, balance, selectedChain }) {
    const [open, setOpen] = React.useState(false)

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
                            <CommandItem>
                                Balance : <span className="text-amber-500 font-bold">{balance} ETH </span>
                            </CommandItem>
                            <CommandItem>
                                Chain : <span className="text-amber-500 font-bold">{selectedChain}</span>
                            </CommandItem>
                            <CommandItem className='text-red-400 font-semibold'>
                                <div onClick={logout} className="w-full" >
                                    Log Out
                                </div>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
