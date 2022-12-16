import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

//import brandLogo from "../img/logo.png";

const Footer = (props) => {
    const { t } = useTranslation();

    if (!props.visible) return null;
    return (
        <>
            <div className="container">
            <footer className="py-3 my-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><Link className="nav-link px-2 text-muted" to="/">{t("Home")}</Link></li>
                <li className="nav-item"><Link className="nav-link px-2 text-muted" to="/purchase">{t("Buy a Domain")}</Link></li>
                <li className="nav-item"><Link className="nav-link px-2 text-muted" to="/pricing">{t("Pricing")}</Link></li>
                <li className="nav-item"><Link className="nav-link px-2 text-muted" to="/tld">{t("Own a TLD")}</Link></li>
                </ul>
                <p className="text-center text-muted">© 2022</p>
            </footer>
            </div>
        </>
    )
}

export default Footer;
