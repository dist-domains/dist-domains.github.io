import React from "react";
import { useTranslation } from "react-i18next";

const Tld = (props) => {
    const { t } = useTranslation();

    if (!props.visible) return null;
    return (
        <div className="container mt-4">
            <h3>{t("Own a Top Level Domain")}</h3>
            <p>{t("OwnTldDesc")}</p>
        </div>
    )
}

export default Tld;