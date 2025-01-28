import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function TabBar() {
    const pathname = usePathname();

    return (
        <div className="flex justify-center w-full gap-4">
            <Link className={`${pathname === "/bridge-in" ? "bg-primary font-bold border-[1px] border-white" : 'bg-muted'} p-2 rounded-xl transition-all`} href={'/bridge-in'}>
                BRIDGE IN
            </Link>
            <Link className={`${pathname === "/bridge-out" ? "bg-primary font-bold border-[1px] border-white" : 'bg-muted'} p-2 rounded-xl transition-all`} href={'/bridge-out'}>
                BRIDGE OUT
            </Link>
            {/* <Link className={`${pathname === "/inprogress" ? "bg-primary font-bold" : 'bg-muted'} p-2 rounded-xl transition-all`} href={'/inprogress'}>
                In Progress
            </Link> */}
        </div>
    )
}
