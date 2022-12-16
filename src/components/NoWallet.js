import { useTranslation } from "react-i18next";
import { default as connectImg } from  "../img/metamask-logo.svg";
import HeaderEmpty from "./HeaderEmpty";

const NoWallet = (props) => {
    const { t } = useTranslation();

    return(
    <>
        <HeaderEmpty visible={true} />
        <section className="sect d-flex align-items-center justify-content-center py-3 connect-sect">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <img src={connectImg} className="meta meta-gray" alt="Wallet"></img>
                    <h3 className="text-center mt-3">{t("MetaMask Required")}</h3>
                    <p className="text-center mt-3">{t("MetaMask Required text")}</p>
                    <a id="get-metamask" className="btn btn-primary w-auto connect-metamask" href="https://metamask.io/" target="_blank" rel="noreferrer">{t("MetaMask Required")}</a>
                </div>
            </div>
        </section>
    </>);
}

export default NoWallet;
