import Head from "next/head"
import styles from "../styles/Home.module.css"
//import ManualHeader from "../components/ManualHeader.jsx"
import Header from "../components/Header"
import LotteryEntrance from "../components/LotteryEntrance"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart contract lottery</title>
                <meta name="description" content="Out SmartContract lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/*<ManualHeader />*/}
            <Header />
            <LotteryEntrance />
        </div>
    )
}
