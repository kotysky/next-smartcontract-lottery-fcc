import Head from "next/head"
import styles from "../styles/Home.module.css"
import ManualHeader from "../components/ManualHeader.jsx"
export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart contract lottery</title>
                <meta name="description" content="Out SmartContract lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ManualHeader />
        </div>
    )
}
