import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"

export default function AlertDilog({ loading, account, amount, lockcoins, connectWallet }) {
    return (
        <AlertDialog>
            {account
                ?
                <AlertDialogTrigger onClick={() => { alert(12) }} className="bg-primary w-full  font-bold text-lg py-3 rounded-md">
                    {loading ?
                        <>Transfering Coins.. <span className="animate-spin border-2 border-l-0 border-purple-200 w-7 h-7 rounded-full"></span></>
                        : 'Transfer Coins'}
                </AlertDialogTrigger>
                :
                <Button disabled={loading} className='w-full py-6 font-bold text-lg' variant="destructive" onClick={connectWallet}>
                    {loading ? 'Connecting...' : 'Connect Wallet'}
                </Button>}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to transfer {amount} 5ire Coins? </AlertDialogTitle>
                    <AlertDialogDescription>
                        This will transfer {amount} 5ire coins from you wallet to the selected Chain Network and receipient address. Make sure the receipient address is correct.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={lockcoins}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}
