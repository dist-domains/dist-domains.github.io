//import React from "react";
import { useTranslation } from "react-i18next";
import exclamation from "../img/exclamation.svg";

const NetworkWarning = (props) => {

    let networkWarning = null;
    const { t } = useTranslation();
    
    if (!props.visible) return null;

    if (props.network.toLowerCase() !== "mainnet") {
        let warnMsg = t("NetworkWarning").replace("[NETWORK]", props.network).replace("[ACCOUNT]", props.account.toUpperCase());
        networkWarning = (
            <div className="alert alert-warning" role="alert">
                <div className="network-warning container">
                    <img className="warning-icon" src={exclamation} alt="" />{warnMsg}
                </div>
            </div>);
    }

    return (
        <>
            {networkWarning}
        </>
    )
}

export default NetworkWarning;
