import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div>
            Decentralized Lottetry
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
