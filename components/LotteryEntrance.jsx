import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    //console.log(parseInt(chainIdHex))
    const chainId = parseInt(chainIdHex)
    //console.log("chainId:", chainId)
    //console.log("contractAddresess:", contractAddresses)
    //console.log("Abi:", abi)

    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    //console.log("raffleAddress:", raffleAddress)

    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        msgValue: entranceFee,
        params: {},
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        console.log("entranceFeeFromCall:", entranceFeeFromCall)
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = await getRecentWinner()

        ////// Ethers 5 error
        //setEntranceFee(ethers.utils.formatUnits(entranceFeeFromCall,"ether"))

        ////// Ethers 6 works ////////////////////////////////
        /*setEntranceFee(ethers.formatEther(entranceFeeFromCall))
        console.log("entranceFee:", entranceFeeFromCall)*/
        /////////////////////////////////////////////
        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
        console.log("entranceFee:", entranceFee)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction complete!!",
            tittle: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <div className="p-5">
            Hi from lottery entrance!
            {raffleAddress ? (
                <div className="">
                    <button
                        className="bg-blue-500 hover:bg-blue-700"
                        onClick={async () =>
                            await enterRaffle({
                                //onComplete
                                //onError
                                onSuccess: handleSuccess,
                                onError: (error) =>
                                    console.log("------------------------------\n", error),
                            })
                        }
                    >
                        Enter Raffle
                    </button>
                    Entrance fee: {ethers.formatEther(entranceFee)} ETH Number of players:
                    {numPlayers}
                    Recent Winner: {recentWinner}
                </div>
            ) : (
                <div>No Raffle Address detected...</div>
            )}
        </div>
    )
}
