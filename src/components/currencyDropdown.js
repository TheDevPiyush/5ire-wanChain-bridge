"use client"

import React, { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
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

import { _5ireTestnet } from "@/lib/chainsConfigs"

export function CurrencyDropdown({ onSelect }) {
    const [open, setOpen] = useState(false)
    const [selectedCurrency, setSelectedCurrency] = useState("")

    const sampleCurrency = ['5ire', 'POL', 'ETH', 'USDC', 'SepoliaETH']

    const handleSelect = (currency) => {
        setSelectedCurrency(currency)
        onSelect && onSelect(currency)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen} className="w-full">
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="py-5 justify-between w-fit"
                >
                    {selectedCurrency ? (
                        selectedCurrency
                    ) : (
                        "Select Currency"
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 bg-transparent w-fit backdrop-blur-md shadow-xl">
                <Command className="bg-transparent">
                    <CommandList>
                        <CommandGroup>
                            {sampleCurrency.map((currency) => (
                                <CommandItem
                                    key={currency}
                                    className={cn(selectedCurrency === currency ? "font-bold px-4" : "px-4")}
                                    onSelect={() => handleSelect(currency)}
                                >
                                    <Check
                                        className={cn(
                                            "h-4 w-4",
                                            selectedCurrency === currency ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <div className="flex justify-center items-center gap-2">
                                        <span>{currency}</span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
