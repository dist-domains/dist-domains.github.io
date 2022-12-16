import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useMetaMask } from "metamask-react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import config from "../config";
import Web3 from "web3";
import Header from "./Header";
import Footer from "./Footer";
import Purchase from "./Purchase";
import Tld from "./Tld";
import PurchaseReceipt from "./PurchaseReceipt";
import Manage from "./Manage";
import NotMetaMask from "./NotMetamask";
import Pricing from "./Pricing";
import Loading from "./Loading";
import NotConnected from "./NotConnected";
import NoWallet from "./NoWallet";
import NetworkWarning from "./NetworkWarning";
import EarnEth from "./EarnEth";
import Error from "./Error";
import UnsupportedNetwork from "./UnsupportedNetwork";

// Contracts
import { distDomainAbi } from "../abis/DistDomainAbi";
import { distRegistrarAbi} from "../abis/DistRegistrarAbi";
import { distTldAbi} from "../abis/DistTldAbi";

let web3 = new Web3(Web3.givenProvider);
let contractDomain = null;
let contractRegistrar = null;
let contractTlds = null;

const App = (props) => {
    const { status, connect, account, chainId } = useMetaMask();
    const [loaded, setLoaded] = useState(false);
    const [tlds, setTlds] = useState([]);
    const [tldPrices, setTldPrices] = useState([]);
    const [tldReferralFees, setTldReferralFees] = useState([]);
    const [userDomains, setUserDomains] = useState([]);
    const [referrerAddress, setReferrerAddress] = useState([]);
    const [referrerLink, setReferrerLink] = useState("");
    const [cookies, setCookie] = useCookies(['ref']);

    let statusElement = null;
    let network = null;

    switch (chainId) {
        case '0x1':
            network = config.network.mainnet;
            break;
        case '0x5':
            network = config.network.goerli;
            break;
        default:
            statusElement = status === "connected" ? <UnsupportedNetwork chainId={chainId} /> : null;
    }

    if (!statusElement) {
        switch(status) {
            case "initializing":
                statusElement = <Loading visible={true} message={status} />;
                break;
            case "unavailable":
                network = { name: "Unsupported" };
                statusElement = <NoWallet />;
                break;
            case "notConnected":
                statusElement = <NotConnected onClickConnect={connect} />;
                break;
            case "connecting":
                statusElement = <Loading visible={true} message={status} />;
                break;
            case "connected":
                if (!loaded) {
                    statusElement = <Loading visible={true} message={status} />;
                } else if (typeof web3 !== 'undefined' && (
                    web3.currentProvider.isMetaMask !== true ||
                    web3.currentProvider.isBraveWallet === true
                )) {
                    statusElement = <NotMetaMask visible={true} message={status} />;
                }
                break;
            default:
                console.error('Unknown status: ' + status);
        }

        if (status !== "unavailable") {
            if (network === null) {
                network = { name: "none" };
                statusElement = <NotConnected onClickConnect={connect} />;
            } else {
                contractDomain = new web3.eth.Contract(distDomainAbi, network.domainAddress);
                contractRegistrar = new web3.eth.Contract(distRegistrarAbi, network.registrarAddress);
                contractTlds = new web3.eth.Contract(distTldAbi, network.tldAddress);
            }
        }
    } else {
        network = { name: "Unsupported" };
    }

    useEffect(() => {
        setLoaded(false);
        const params = new URLSearchParams(window.location.search); 
        let ref = params.get("ref");
        if (ref && /^0x[a-fA-F0-9]{40}$/.test(ref)) {
            let expireDate = new Date();
            expireDate.setTime(expireDate.getTime() + 31557600000); // one year in future
            setCookie("ref", ref, {path: "/", expires: expireDate});
            if (typeof window !== 'undefined') {
                window.location.href = window.location.protocol + "//" + window.location.host;
            }            
        }
        if (cookies.ref) {
            setReferrerAddress(cookies.ref);
        }
        if (account && contractTlds && network.name !== "Unsupported") {
            const fetchData = async () => {
                try {
                    var allTlds = await contractTlds.methods.getAllTlds().call();
                    setTlds(allTlds.tlds);
                    setTldPrices(allTlds.mintingFees);
                    setTldReferralFees(allTlds.referrerFees);
                    var domains = await contractDomain.methods.getDomains(account).call();
                    setUserDomains(domains);
                } 
                catch (error) {
                    setTlds([]);
                    let e = error.toString();
                    console.error(e);
                    window.alert(e);
                    window.location.replace("#/error");
                }
                finally {
                    setLoaded(true);
                }
            };
            fetchData();
            setReferrerLink(window.location.protocol + "//" + window.location.host + window.location.pathname + "?ref=" + account);
        }
    }, [account, chainId, cookies.ref, setCookie, network.name]);

    let onUpdateAccount = () => {
        setTlds([]);
        window.location.replace("#/");
    }

    let onUpdateDomains = async () => {
        var domains = await contractDomain.methods.getDomains(account).call();
        setUserDomains(domains);
    }

    let onLoading = (isLoading) => {
        setLoaded(!isLoading);
    };

    let isVisible = statusElement ? false : true;

    return (
        <>
            {statusElement}
            <Router>
                <NetworkWarning network={network.name} account={account} visible={isVisible} />
                <Header domains={userDomains} visible={isVisible} />
                <Routes>
                    <Route path="/" element={<Purchase registrarContract={contractRegistrar} visible={isVisible} onUpdateAccount={onUpdateAccount} onUpdateDomains={onUpdateDomains} onLoading={onLoading} network={network.name} account={account} tlds={tlds} referrerAddress={referrerAddress} />} />
                    <Route path="/tld" element={<Tld visible={isVisible} />} />
                    <Route path="/purchase" element={<Purchase registrarContract={contractRegistrar} visible={isVisible} onUpdateAccount={onUpdateAccount} onUpdateDomains={onUpdateDomains} onLoading={onLoading} network={network.name} account={account} tlds={tlds} referrerAddress={referrerAddress} />} />
                    <Route path="purchase/:blockhash" element={<PurchaseReceipt visible={isVisible} />} />
                    <Route path="/pricing" element={<Pricing visible={isVisible} tlds={tlds} tldPrices={tldPrices} tldReferralFees={tldReferralFees} linkAddress={referrerLink} />} />
                    <Route path="manage/:domain" element={<Manage domainContract={contractDomain} registrarContract={contractRegistrar} visible={isVisible} account={account} onLoading={onLoading} />} />
                    <Route path="/earneth" element={<EarnEth linkAddress={referrerLink} visible={isVisible} />} />
                    <Route path="/error" element={<Error visible={isVisible} />} />
                </Routes>
                <Footer visible={isVisible} />
            </Router>
        </>
    )
}

export default App;
