import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Loading from "./Loading";
import network from "../img/unsupported-network.svg";
import HeaderEmpty from "./HeaderEmpty";

const UnsupportedNetwork = (props) => {
    const [showLoading, setShowLoading] = useState(true);
    const { t } = useTranslation();
    useEffect(() => {
        setShowLoading(props.chainId !== null);
    }, [props.chainId]);

    var loading = !props.chainId ? <Loading visible={showLoading} /> :  null;
    return(
        <>
            {loading}
            <HeaderEmpty visible={true} />
            <section className="sect d-flex align-items-center justify-content-center py-3 connect-sect">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <img src={network} className="network-img" alt={t("Unsupported Network")}></img>
                        <h3 className="text-center mt-3">{t("Unsupported Network")}</h3>
                        <p className="text-center mt-3">{t("Unsupported Network Text")}</p>
                    </div>
                </div>
            </section>        
        </>
    );
}

export default UnsupportedNetwork;
