import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decodeDomain } from "../helper/functions";
import Web3 from "web3";
import ManageSubdomains from "./ManageSubdomains";
import ManageKeyValues from "./ManageKeyValues";

let web3 = new Web3(Web3.givenProvider);

const Manage = (props) => {
    const { domain } = useParams();
    const [selectedSubdomain, setSelectedSubdomain] = useState("");
    const [subdomains, setSubdomains] = useState([]);
    const [keys, setKeys] = useState([]);
    const [values, setValues] = useState([]);

    useEffect(() => {
        props.onLoading(true);
        const fetchData = async () => {
            if (props.registrarContract) {
                let sd = await props.registrarContract.methods.getSubdomains(domain).call();
                setSubdomains(sd);
                onUpdateKeyValues("");
                props.onLoading(false);
            }
        };
        fetchData();
    }, [domain]);

    let updateSubdomains = async () => {
        props.onLoading(true);
        let sd = await props.registrarContract.methods.getSubdomains(domain).call();
        setSubdomains(sd);
        props.onLoading(false);
    };

    let onUpdateKeyValues = async (sd) => {
        props.onLoading(true);
        try {
            let subd = typeof(sd) != "undefined" ? sd : selectedSubdomain;
            let fullDomain = (subd.length > 0 ? subd + "." : "") + domain;
            let tokenId = web3.utils.keccak256(fullDomain);
            let keyValues = await props.domainContract.methods.getAllRecords(tokenId).call();
            setKeys(keyValues.keys);
            setValues(keyValues.values);
        }
        catch (error) {
            console.error(error);
            window.alert(error.message);
        }
        finally {
            props.onLoading(false);
        }
    };

    let selectSubdomain = async (event) => {
        setSelectedSubdomain(event.target.value);
        onUpdateKeyValues(event.target.value);
    };

    if (!props.visible) return null;

    return (
        <div className="container mt-4">
            <h3>{decodeDomain(domain)}</h3>
            <ManageSubdomains registrarContract={props.registrarContract} domain={domain} subdomains={subdomains} account={props.account} selectedSubdomain={selectedSubdomain} onSelectSubdomain={selectSubdomain} onUpdateSubdomains={updateSubdomains} onLoading={props.onLoading}></ManageSubdomains>
            <ManageKeyValues domainContract={props.domainContract} keys={keys} values={values} account={props.account} domain={domain} subdomain={selectedSubdomain} allSubdomains={subdomains} onUpdateKeyValues={onUpdateKeyValues} onLoading={props.onLoading}/>
        </div>
    )
}

export default Manage;
