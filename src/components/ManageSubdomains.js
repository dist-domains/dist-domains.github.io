import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Web3 from "web3";
import { decodeDomain, encodeLabel } from "../helper/functions";

let web3 = new Web3(Web3.givenProvider);

const ManageSubdomains = (props) => {
    const { t } = useTranslation();
    const [subdomain, setSubdomain] = useState("");
    const [subdomainError, setSubdomainError] = useState("");
    let mainDomain = props.selectedSubdomain === "" ? "table-primary" : "";

    let selectSubdomain = async (event) => {
        setSubdomainError("");
        props.onSelectSubdomain(event);
    };

    let addSubdomain = async (event) => {
        let errorMsg = "";
        let encodedSubdomain = encodeLabel(subdomain);
        setSubdomainError("");
        if (encodedSubdomain.length >=4 && encodedSubdomain.indexOf("xn--") === 0) {
            if (encodedSubdomain.length >= 80) {
                errorMsg = "subdomain is too long";
            } else if (encodedSubdomain.length < 5) {
                errorMsg = "subdomain must be at least 1 character long";
            } else if (!subdomain.match(/^[0-9a-z-]+$/)) {
                errorMsg = "invalid characters detected";
            }
        } else {
            if (subdomain.length < 1) {
                errorMsg = "subdomain must be at least 1 character long";
            } else if (subdomain.length >= 64) {
                errorMsg = "subdomain must be less than 64 characters";
            } else {
                if(subdomain.match(/^[0-9a-z-]+$/)) {
                    if (subdomain.match(/[-][-]/)) {
                        errorMsg = "subdomain cannot contain adjacent '-'";
                    }
                } else {
                    errorMsg = "subdomain characters must be: 0-9, a-z, or '-'";
                }
            }
        }

        if (errorMsg.length > 0) {
            setSubdomainError(errorMsg);
        } else {
            props.onLoading(true);
            let purchaseTx = null;
            try {
                let encodedSubomain = encodeLabel(subdomain);
                let tokenId = web3.utils.keccak256(props.domain);
                let estimatedGas = await props.registrarContract.methods.mintSubdomain(tokenId, encodedSubomain).estimateGas({ from: props.account });
                let tx = await props.registrarContract.methods.mintSubdomain(tokenId, encodedSubomain).send({ from: props.account, gas: estimatedGas });
                purchaseTx = tx.blockHash.toString();
            } 
            catch (error) {
                window.alert(error.message);
                console.error(error);
            }
            finally {
                if (purchaseTx) {
                    props.onUpdateSubdomains();
                }
                props.onLoading(false);
            }
        }
    };

    let subdomainChange = (event) => {
        setSubdomainError("");
        setSubdomain(event.target.value);
    };

    let subdomainRow = (sd) => {
        const fullDomain = (sd.length === 0 ? "" : decodeDomain(sd) + ".") + decodeDomain(props.domain);
        if (sd === props.selectedSubdomain) {
            return <tr key={sd} className="table-primary"><td>{fullDomain}</td><td style={{'textAlign': 'right'}}><button className="btn btn-secondary btn-sm" onClick={selectSubdomain} value={sd} disabled={true}>{t("Select")}</button></td></tr>;
        } else {
            return <tr key={sd}><td>{fullDomain}</td><td style={{'textAlign': 'right'}}><button className="btn btn-secondary btn-sm" onClick={selectSubdomain} value={sd}>{t("Select")}</button></td></tr>;
        }
    };

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>{t("Domain")}</th>
                    <th style={{'textAlign': 'right'}}>{t("Action")}</th>
                </tr>
            </thead>
            <tbody>
                <tr key="main" className={mainDomain}>
                    <td>{decodeDomain(props.domain)}</td>
                    <td style={{'textAlign': 'right'}}><button className="btn btn-secondary btn-sm" onClick={selectSubdomain} value="" disabled={props.selectedSubdomain === ""}>{t("Select")}</button></td>
                </tr>
                {props.subdomains.map(subdomainRow)}
                <tr>
                    <td>
                        <div className="row">
                            <div className="col-sm-5">
                                <input type="text" maxLength={63} className={"form-control" + (subdomainError.length > 0 ? " is-invalid" : "")} onChange={subdomainChange} placeholder={t("Subdomain")}></input>
                                <div className="invalid-feedback">
                                    {t(subdomainError)}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td style={{'textAlign': 'right'}}><button className="btn btn-secondary btn-sm" onClick={addSubdomain}>{t("Add")}</button></td>
                </tr>
            </tbody>
        </table>
    );
}

export default ManageSubdomains;
