import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const EarnEth = (props) => {
    const { t } = useTranslation();
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    let copyToClipboard = (e) => {
        navigator.clipboard.writeText(props.linkAddress).then(() => {
            setShowCopySuccess(true);
        })
    };

    if (!props.visible) return null;
    return (
        <div className="container mt-4">
            <div>
                <h3>{t("Earn ETH")}</h3>
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
    )
}

export default EarnEth;
