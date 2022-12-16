import React, { useEffect, useState } from 'react';
import { decodeDomain } from '../helper/functions';
import Web3 from 'web3';
import { useTranslation } from 'react-i18next';
import InfoKeysModal from "./InfoKeysModal";

let web3 = new Web3(Web3.givenProvider);

const ManageKeyValues = (props) => {
    const { t } = useTranslation();
    const [key, setKey] = useState("");
    const [keyError, setKeyError] = useState("");
    const [val, setVal] = useState("");
    const [editVal, setEditVal] = useState("");
    const [editIndex, setEditIndex] = useState(-1);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [someSelected, setSomeSelected] = useState(false);
    const [allKeysSelected, setAllKeysSelected] = useState(false);

    const fullDomain = (props.subdomain.length > 0 ? props.subdomain + "." : "") + props.domain;
    const displayDomain = decodeDomain(fullDomain);

    useEffect(() => {
        if (props.keys.length > 0) {
            setSelectedKeys(new Array(props.keys.length).fill(false));
        }
    }, [props.keys.length]);

    let keyChange = (event) => {
        setKey(event.target.value);
    };

    let valChange = (event) => {
        setVal(event.target.value);
    };

    let editValChange = (event) => {
        setEditVal(event.target.value);
    };

    let editRow = (event) => {
        const i = parseInt(event.target.value);
        setEditVal(props.values[i]);
        setEditIndex(i);
        setKeyError("");
    };

    let saveRow = async (event) => {
        let i = parseInt(editIndex);
        const key = props.keys[i];
        props.onLoading(true);
        let keyValTx = null;
        try {
            let tokenId = web3.utils.keccak256(fullDomain);
            let estimatedGas = await props.domainContract.methods.set(key, editVal, tokenId).estimateGas({ from: props.account });
            keyValTx = await props.domainContract.methods.set(key, editVal, tokenId).send({ from: props.account, gas: estimatedGas });
        } 
        catch (error) {
            window.alert(error.message);
            console.error(error);
            props.onLoading(false);
        }
        finally {
            if (keyValTx) {
                props.onLoading(false);
                props.onUpdateKeyValues();
                setEditVal("");
                setEditIndex(-1);
            } else {
                props.onLoading(false);
            }
        }
    };

    let cancelEdit = () => {
        setKeyError("");
        setEditIndex(-1);
    };

    let addKeyValue = async () => {
        let keyErr = "";
        if (key.length === 0) {
            keyErr = "key cannot be empty";
        }
        if (keyErr.length > 0) {
            setKeyError(keyErr);
        } else {
            props.onLoading(true);
            let keyValTx = null;
            try {
                let tokenId = web3.utils.keccak256(fullDomain);
                let estimatedGas = await props.domainContract.methods.set(key, val, tokenId).estimateGas({ from: props.account });
                keyValTx = await props.domainContract.methods.set(key, val, tokenId).send({ from: props.account, gas: estimatedGas });
            } 
            catch (error) {
                window.alert(error.message);
                console.error(error);
                props.onLoading(false);
            }
            finally {
                if (keyValTx) {
                    props.onUpdateKeyValues();
                }
                props.onLoading(false);
            }
        }
    };

    let checkAllKeyValues = (event) => {
        setAllKeysSelected(event.target.checked);
        setSelectedKeys(new Array(props.keys.length).fill(event.target.checked === true));
        setSomeSelected(event.target.checked === true && props.keys.length > 0);
    };

    let checkKeyValue = (event) => {
        const updatedKeys = [...selectedKeys];
        updatedKeys[parseInt(event.target.value)] = event.target.checked === true;
        setSelectedKeys(updatedKeys);
        setAllKeysSelected(updatedKeys.every((checked) => { return checked === true; }));
        setSomeSelected(updatedKeys.some((checked) => { return checked === true; }))
    };

    let removeSelected = async (event) => {
        let keepKeys = [];
        let keepValues = [];
        for (let i=0; i<selectedKeys.length; i++) {
            if (selectedKeys[i] === false) {
                keepKeys.push(props.keys[i]);
                keepValues.push(props.values[i]);
            }
        }
        props.onLoading(true);
        let keyValTx = null;
        try {
            let tokenId = web3.utils.keccak256(fullDomain);
            let estimatedGas = await props.domainContract.methods.resetMany(keepKeys, keepValues, tokenId).estimateGas({ from: props.account });
            keyValTx = await props.domainContract.methods.resetMany(keepKeys, keepValues, tokenId).send({ from: props.account, gas: estimatedGas });
        } 
        catch (error) {
            window.alert(error.message);
            console.error(error);
            props.onLoading(false);
        }
        finally {
            if (keyValTx) {
                props.onUpdateKeyValues();
            }
            props.onLoading(false);
        }
    };

    let copyToSubdomain = async (event) => {
        let fullCopyToDomain = "";
        let copyKeys = [];
        let copyValues = [];
        if (event.target.value === "d") {
            fullCopyToDomain = props.domain;
        } else {
            const index = parseInt(event.target.value);
            fullCopyToDomain = props.allSubdomains[index] + "." + props.domain;
        }
        for (let i=0; i<selectedKeys.length; i++) {
            if (selectedKeys[i] === true) {
                copyKeys.push(props.keys[i]);
                copyValues.push(props.values[i]);
            }
        }
        let confirmMsg = t("This action will delete any existing key / values for [DOMAIN]. Are you sure?").replace("[DOMAIN]", fullCopyToDomain);
        if (window.confirm(confirmMsg)) {
            props.onLoading(true);
            let keyValTx = null;
            try {
                let tokenId = web3.utils.keccak256(fullCopyToDomain);
                let estimatedGas = await props.domainContract.methods.resetMany(copyKeys, copyValues, tokenId).estimateGas({ from: props.account });
                keyValTx = await props.domainContract.methods.resetMany(copyKeys, copyValues, tokenId).send({ from: props.account, gas: estimatedGas });
            } 
            catch (error) {
                window.alert(error.message);
                console.error(error);
                props.onLoading(false);
            }
            finally {
                if (keyValTx) {
                    props.onUpdateKeyValues();
                }
                props.onLoading(false);
            }
        }
    };

    let keyValueRow = (i, key, value) => {
        if (i === editIndex) {
            return (
            <tr key={i}>
                <td><input className="form-check-input" type="checkbox" value={i} checked={selectedKeys[i] || false} onChange={checkKeyValue}></input></td>
                <td>
                    {key}
                </td>
                <td>
                    <div className="row">
                        <div className="col-sm-4">
                            <input type="text" className={"form-control"} onChange={editValChange} value={editVal}></input>
                        </div>
                    </div>
                </td>
                <td style={{'textAlign': 'right'}}>
                    <button value={i} onClick={saveRow} className="btn btn-primary btn-sm">{t("Save")}</button>&nbsp;
                    <button onClick={cancelEdit} className="btn btn-secondary btn-sm">{t("Cancel")}</button>
                </td>
            </tr>);
        } else {
            return <tr key={i}><td><input className="form-check-input" type="checkbox" value={i} checked={selectedKeys[i] || false} onChange={checkKeyValue}></input></td><td>{key}</td><td>{value}</td><td style={{'textAlign': 'right'}}><button value={i} onClick={editRow} className="btn btn-secondary btn-sm">{t("Edit")}</button></td></tr>;
        }
    };

    let keyValueRows = [];
    for(let i=0; i<props.keys.length; i++) {
        keyValueRows.push(keyValueRow(i, props.keys[i], props.values[i]));
    }

    let copyToDomains = [];
    if (props.allSubdomains.length > 0) {
        copyToDomains.push((<li key={"sep"}><hr className="dropdown-divider"></hr></li>));
        copyToDomains.push((<li key={"d"}><button className="dropdown-item" type="button" value={"d"} onClick={copyToSubdomain}>{t("Copy to")}: {props.domain}</button></li>))
    }
    for(let j=0;j<props.allSubdomains.length;j++) {
        copyToDomains.push((<li key={j}><button className="dropdown-item" type="button" value={j} onClick={copyToSubdomain}>{t("Copy to")}: <b>{props.allSubdomains[j]}</b>.{props.domain}</button></li>));
    }

    return (
        <>
            <h4 className="mt-4">{t("Key Values for")} ({displayDomain})</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th><input className="form-check-input" disabled={props.keys.length === 0} type="checkbox" value="" checked={allKeysSelected || false} onChange={checkAllKeyValues}></input></th>
                        <th>{t("Key")}</th>
                        <th style={{'minWidth': '100px'}}>{t("Value")}</th>
                        <th style={{'textAlign': 'right'}}>{t("Action")}</th>
                    </tr>
                </thead>
                <tbody>
                    {keyValueRows}
                    <tr>
                        <td>&nbsp;</td>
                        <td className="keys">
                            <div className="row">
                                <div className="col-sm-8">
                                    <div className="info-input">
                                        <input type="text" className={"form-control" + (keyError.length > 0 ? " is-invalid" : "")} onChange={keyChange} placeholder={t("Key")}></input><InfoKeysModal />
                                        <div className="invalid-feedback">
                                            {t(keyError)}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </td>
                        <td className="values">
                            <div className="row">
                                <div className="col-sm-4">
                                    <input type="text" className={"form-control"} onChange={valChange} placeholder={t("Value")}></input>
                                </div>
                            </div>
                        </td>
                        <td style={{'textAlign': 'right'}}><button className="btn btn-secondary btn-sm" onClick={addKeyValue}>{t("Add")}</button></td>
                    </tr>
                    <tr>
                        <td>↑</td>
                        <td colSpan={3}>
                            <div className="dropdown">
                                <button className={"btn btn-secondary dropdown-toggle" + (!someSelected ? " disabled" : "")} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {t("With selected")}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li key={"remove"}><button className="dropdown-item" type="button" onClick={removeSelected}>{t("Remove selected key values")}</button></li>                                    
                                    {copyToDomains}
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default ManageKeyValues;
