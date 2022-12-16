import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Pricing = (props) => {
    const { t } = useTranslation();
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    let copyToClipboard = (e) => {
        navigator.clipboard.writeText(props.linkAddress).then(() => {
            setShowCopySuccess(true);
        })
    };

    let rows = [];
    for (let i=0; i<props.tlds.length;i++) {
        let priceEth = Number(props.tldPrices[i] * 0.000000000000000001).toFixed(18).replace(/\.?0+$/,"");
        rows.push(<tr key={props.tlds[i]}>
                    <td>.{props.tlds[i]}</td>
                    <td align="right">{priceEth}</td>
                    <td align="right">{props.tldPrices[i]}</td>
                    <td align="right">{props.tldReferralFees[i]}</td>
                </tr>);
    }
    if (!props.visible) return null;
    return (
        <>
            <div className="container mt-4">
                <h3>{t("Domain Prices")}</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>{t("TLD")}</th>
                            <th className="heading-right">{t("Price (ETH)")}</th>
                            <th className="heading-right">{t("Price (Wei)")}</th>
                            <th className="heading-right">{t("Referral Fee (Wei)")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
                
            <div className="container mt-4">
                <div>
                    <h3>{t("Earn Referral Fees")}</h3>
                    <p>{t("Earn ETH Text2")}</p>
                </div>
                <div className="mb-2">
                    <code>{props.linkAddress}</code>
                </div>
                <div className="mb-2">
                    <button className="btn btn-secondary btn-sm" onClick={copyToClipboard}>{t("Copy link")}</button> 
                </div>
                <div className={`mb-2 ${showCopySuccess ? 'alert-shown' : 'alert-hidden'}`} onTransitionEnd={() => setShowCopySuccess(false)}>
                    {t("Link copied to clipboard")}
                </div>
            </div>
        </>
    )
    // TODO: Include custom referal link e.g. URL?ref=[ETH_ADDRESS]
}

export default Pricing;