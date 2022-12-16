import {useParams} from "react-router-dom";
import { useTranslation } from "react-i18next";

const PurchaseReceipt = (props) => {
    const { blockhash } = useParams();
    const { t } = useTranslation();

    return(
        <>
            <div className="container">
                <div className="alert alert-success mt-5" role="alert">
                {t("Domain purchase successful")}
                </div>
            </div>
        
        
            
            <section className="sect d-flex align-items-center justify-content-center py-3">
            
                <div className="container" style={{maxWidth: '500px'}}>
                <h2>{t("Block Hash")}</h2>
                    <div className="row justify-content-center align-items-center block-hash">
                        <span className="text-center">{blockhash}</span>
                    </div>
                </div>
            </section>
        </>
        );
}

export default PurchaseReceipt;