import { useTranslation } from 'react-i18next';
import '../i18n';

const Loading = (props) => {

    const { t } = useTranslation();

    return(
    <section id="loading" className="sect min-vh-100 d-flex align-items-center justify-content-center py-3">
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="spinner-border" style={{width: '3rem', height: '3rem'}} role="status">
                    <span className="visually-hidden">t("Loading...")</span>
                </div>
                <span id="loading-msg" className="text-center mt-3">{t("Connecting")}</span>
            </div>
        </div>
    </section>);
}

export default Loading;
