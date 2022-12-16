import React, { useEffect, useState } from "react";
import { Modal, Button, Image, Form } from "react-bootstrap";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { encodeLabel, decodeLabel } from "../helper/functions";
import searchIcon from "../img/search-icon.png";
import tickIcon from "../img/tick.png";
import crossIcon from "../img/cross.png";
import Section1 from "./Section1";

let web3 = new Web3(Web3.givenProvider);

const Purchase = (props) => {

    const { t } = useTranslation();
    const [sld, setSld] = useState("");
    const [tld, setTld] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showUnavailableModal, setShowUnavailableModal] = useState(false);
    const [useSafeMint, setUseSafeMint] = useState(false);
    const [useCommitReveal, setUseCommitReveal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (tld === "" && props.tlds.length > 0) {
            setTld(props.tlds[0]);
        }
    }, [tld, props.tlds]);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleUnavailableClose = () => setShowUnavailableModal(false);
    const handleUnavailableShow = () => setShowUnavailableModal(true);

    const handleChangeSafeMint = (event) => {
        setUseSafeMint(event.target.checked);
    }

    const handleChangeCommitReveal = (event) => {
        setUseCommitReveal(event.target.checked);
    }

    let sldChange = (event) => {
        setSld(event.target.value);
    };

    let tldChange = (event) => {
        setTld(event.target.value);
    }

    let handlePurchase = async (event) => {
        props.onLoading(true);
        let purchaseTx = null;

        try {
            let encodedDomain = encodeLabel(sld);

            let estimatedGas, tx = null;
        
            let referrer = props.referrerAddress;
            if (!referrer || !/^0x[a-fA-F0-9]{40}$/.test(referrer)) {
                referrer = "0x0000000000000000000000000000000000000000";
            }  
    
            if (useCommitReveal) {
                let tokenId = web3.utils.keccak256(encodedDomain + "." + tld);
                estimatedGas = await props.registrarContract.methods.commitDomain(tokenId, tld, referrer).estimateGas({ from: props.account });
                tx = await props.registrarContract.methods.commitDomain(tokenId, tld, referrer).send({ from: props.account, gas: estimatedGas });
                estimatedGas = await props.registrarContract.methods.revealDomain(encodedDomain, tld, useSafeMint).estimateGas({ from: props.account });
                tx = await props.registrarContract.methods.revealDomain(encodedDomain, tld, useSafeMint).send({ from: props.account, gas: estimatedGas });
                purchaseTx = tx.blockHash.toString();
            } else {
                //tx = await props.registrarContract.methods.mintDomain(encodedDomain, tld, useSafeMint, referrer);
                estimatedGas = await props.registrarContract.methods.mintDomain(encodedDomain, tld, useSafeMint, referrer).estimateGas({ from: props.account });
                tx = await props.registrarContract.methods.mintDomain(encodedDomain, tld, useSafeMint, referrer).send({ from: props.account, gas: estimatedGas });
                purchaseTx = tx.blockHash.toString();
             }
        }
        catch (error) {
            setShowModal(false);
            var e = error.toString();
            console.error(e);
            e = e.replace(/(\r\n|\n|\r)/gm, "");
            e = e.toString().replace(/\s*\{.*\}/gm, "");
            e = e.replace("Error: execution reverted: ", "");
            e = e.replace(/0x.+/gm,"");
            props.onLoading(false);
            setErrorMsg(e);
        }
        finally {
            if (purchaseTx) {
                props.onUpdateDomains();
                props.onLoading(false);
                navigate(`/purchase/${purchaseTx}`);
            } else {
                props.onLoading(false);
            }
        }
    };

    let searchDomain = async (event) => {
        let encodedDomain = encodeLabel(sld);
        let tokenId = web3.utils.keccak256(encodedDomain + "." + tld);

        if (sld.length <= 1) {
            setErrorMsg(t("Please enter a domain name"));
            return;
        }
      
        props.onLoading(true);

        try {
            var domainIsRegistered = await props.registrarContract.methods.isRegistered(tokenId).call();
            if (domainIsRegistered) {
                handleUnavailableShow();
            } else {
                handleShow();
            }
        }
        catch (error) {
            setShowModal(false);
            var e = error.toString();
            console.error(e);
            e = e.replace(/(\r\n|\n|\r)/gm, "");
            e = e.toString().replace(/\s*\{.*\}/gm, "");
            e = e.replace("Error: execution reverted: ", "");
            e = e.replace(/0x.+/gm,"");
            props.onLoading(false);
            setErrorMsg(e);   
        }
        finally {
            props.onLoading(false);
        }
    };

    if (!props.visible) return null;

    return (
        <>
            <section className="domain-section sect d-flex align-items-center justify-content-center py-3">
                <div className="container domain-container">
                    <div className="row justify-content-center align-items-center">
                        <h2 className="domain-heading text-center mb-4">{t("Buy Domain")}</h2>
                        <form onSubmit={searchDomain} className="needs-validation" noValidate>
                            <div className="input-group domain-purchase">
                                <input autoFocus type="text" placeholder={t("find your new domain")} className={"domain-sld w-50 form-control" + (errorMsg ? " is-invalid" : "")} aria-label="Domain" value={sld} onChange={sldChange} required></input>
                                <select onChange={tldChange} defaultValue={tld} className={"domain-tld form-select" + (errorMsg ? " is-invalid" : "")} aria-label="Domain extension" required>{
                                    props.tlds.map((val) => <option key={val} value={val}>.{decodeLabel(val)}</option>)
                                }</select>
                                <button className="domain-search btn btn-primary" type="button" id="btnBuy" onClick={searchDomain}>
                                    <img className="domain-search-icon" src={searchIcon} width={20} height={20} alt={t("search")} />
                                    {t("Search")}
                                </button>
                            </div>
                            <div>
                                <div className="domain-error text-center invalid-feedback" style={(errorMsg ? { display: "block" } : {})}>
                                    {t(errorMsg)}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <section className="domain-section-m sect d-flex align-items-center justify-content-center py-3">
                <div className="container domain-container-m">
                    <div className="row justify-content-center align-items-center">
                        <h2 className="domain-heading text-center mb-4">{t("Buy Domain")}</h2>
                        <form onSubmit={searchDomain} className="needs-validation" noValidate>
                            <div className="domain-purchase-m input-group">
                                <input autoFocus type="text" placeholder={t("find your new domain")} className={"domain-sld-m w-50 form-control" + (errorMsg ? " is-invalid" : "")} aria-label="Domain" value={sld} onChange={sldChange} required></input>
                                <select onChange={tldChange} defaultValue={tld} className={"domain-tld-m form-select" + (errorMsg ? " is-invalid" : "")} aria-label="Domain extension" required>{
                                    props.tlds.map((val) => <option key={val} value={val}>.{decodeLabel(val)}</option>)
                                }</select>
                            </div>
                            <div>
                                <div className="domain-error-m text-center invalid-feedback" style={(errorMsg ? { display: "block" } : {})}>
                                    {t(errorMsg)}
                                </div>
                            </div>
                            <div className="domain-search-container-m d-grid">
                                <button className="domain-search-m btn btn-primary" type="button" id="btnBuy" onClick={searchDomain}>
                                    <img className="domain-search-icon-m" src={searchIcon} width={16} height={16} alt={t("search")} />
                                    {t("Search")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <div className="text-center mt-1" style={{"display": "none"}}>
                <span style={{"fontWeight": "bold"}}>{t("Address")}</span>&#58;&nbsp;<div className="d-inline">{props.account}</div>
            </div>

            <Section1></Section1>

            <Modal size="lg" show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>{t("Result")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">

                <div className="row h-100">
                    <div className="col"><Image src={tickIcon} className="success-img"></Image></div>
                    <div className="col-8">
                        <h2>{t("Available")}</h2>
                        <p>{t("AvailableDesc")}</p>

                        <div className="my-4">
                            <Form.Check 
                                type="switch"
                                id="safe-mint-switch"
                                label={t("Use Safe Mint")}
                                onChange={handleChangeSafeMint}
                                checked={useSafeMint}
                            />
                        </div>

                        <div className="my-4">
                            <Form.Check 
                                type="switch"
                                id="commit-reveal-switch"
                                label={t("Use Commit / Reveal")}
                                onChange={handleChangeCommitReveal}
                                checked={useCommitReveal}
                            />
                        </div>

                        <div className="my-4">
                            {t("GasWarning")}
                        </div>

                    </div>
                </div>

                </Modal.Body>
                <Modal.Footer>
                <Button size="lg" variant="secondary" onClick={handleClose}>
                    {t("Cancel")}
                </Button>
                <Button size="lg" variant="primary" onClick={handlePurchase}>
                    {t("Purchase")}
                </Button>
                </Modal.Footer>
            </Modal>


            <Modal size="lg" show={showUnavailableModal} onHide={handleUnavailableClose} keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>{t("Result")}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">

                <div className="row h-100">
                    <div className="col"><Image src={crossIcon} className="success-img"></Image></div>
                    <div className="col-8">
                        <h2>{t("Unvailable")}</h2>
                        <p>{t("UnavailableDesc")}</p>

                    </div>
                </div>

                </Modal.Body>
                <Modal.Footer>
                <Button size="lg" variant="secondary" onClick={handleUnavailableClose}>
                    {t("Close")}
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Purchase;
