import { useTranslation } from "react-i18next";
import { default as connectImg } from  "../img/metamask-logo.svg";
import HeaderEmpty from "./HeaderEmpty";

const NotConnected = (props) => {
    const { t } = useTranslation();

    return(
    <>
        <HeaderEmpty visible={true} />
        <section className="sect d-flex align-items-center justify-content-center py-3 connect-sect">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <img src={connectImg} className="meta" alt="Wallet"></img>
                    <h3 className="text-center mt-3">{t("Connect MetaMask")}</h3>
                    <p className="text-center mt-3">{t("Connect MetaMask text")}</p>
                    <button className="btn btn-primary w-auto connect-metamask" onClick={props.onClickConnect} >{t("Connect MetaMask")}</button>
                </div>
            </div>
        </section>
    </>
);
}
export default NotConnected;
