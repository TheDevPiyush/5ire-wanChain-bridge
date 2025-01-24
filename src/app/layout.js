import "./globals.css";
import Provider from "@/components/provider/Provider";


export const metadata = {
  title: "5ire Coin Tranfser",
  description: "This app allows users to transer the 5ire Coin from 5ireChain to another blockchain networks.",
};

export default function RootLayout({ children }) {
  return (
    <Provider children={children} />
  );
}
