"use client"

import React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

// Import these based on your project setup or UI library
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

export function DropdownSelection({ options, onSelect, disabled }) {
    const [open, setOpen] = React.useState(false)
    const [name, setName] = React.useState("")

    const handleSelect = (selectedName) => {
        setName((prev) => (selectedName === prev ? "" : selectedName))
        setOpen(false)
        if (onSelect) {
            onSelect(selectedName)
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen} className="w-full">
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full py-7 justify-between"
                >
                    {name
                        ? options.find((option) => option.name === name)?.name
                        : "Select options..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput className="w-[300px]" placeholder="Search options..." />
                    <CommandList>
                        <CommandEmpty>No options found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.name}
                                    name={option.name}
                                    onSelect={() => handleSelect(option.name)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            name === option.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
