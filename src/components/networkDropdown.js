"use client"

import React, { useEffect, useState } from "react"
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

import { useSwitchChain } from "wagmi"
import { _5ireTestnet } from "@/lib/chainsConfigs"


export function NetworkDropdown({ onSelect, disabled, loading, currentChain }) {

    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [icon, setIcon] = useState("");
    const { chains } = useSwitchChain();

    useEffect(() => {
        if (currentChain && currentChain?.id !== _5ireTestnet.id) setName(currentChain.name)
        if (currentChain && currentChain?.icon !== _5ireTestnet.id) setIcon(currentChain.icon)
    }, [currentChain])


    const handleSelect = async (selectedName) => {
        setName(selectedName.name);
        setIcon(selectedName.icon);
        setOpen(false);
        if (onSelect) {
            onSelect(selectedName)
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen} className="w-full">

            <PopoverTrigger asChild className={`${loading ? "animate-pulse" : ""}`}>
                <Button
                    disabled={disabled || loading}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-full py-7 justify-between`}>
                    {name
                        ?
                        <div className="flex gap-2 items-center">
                            {<img className="w-[30px] rounded-full" src={icon && icon} alt="icon" />}
                            {name}
                        </div>
                        : "Select a network"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>


            <PopoverContent className="p-0 bg-transparent backdrop-blur-md shadow-xl">
                <Command className="bg-transparent">
                    <CommandInput className="w-[400px]" placeholder="Search networks..." />
                    <CommandList>
                        <CommandEmpty>No options found.</CommandEmpty>
                        <CommandGroup>
                            {chains.map((chains) => (
                                chains.id !== _5ireTestnet.id &&
                                (<CommandItem
                                    className={`${name === chains.name ? 'font-bold' : ''}`}
                                    key={chains.name}
                                    name={chains.name}
                                    onSelect={() => handleSelect(chains)}>
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            name === chains.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <div className="flex justify-center items-center gap-2">
                                        <span><img className="w-[30px] rounded-full" src={chains.icon} alt="" /> </span>
                                        <span>{chains.name}</span>
                                    </div>
                                </CommandItem>)
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
