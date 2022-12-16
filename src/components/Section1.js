import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import secureIcon from "../img/secure.png";
import inexpensiveIcon from "../img/inexpensive.png";
import privateIcon from "../img/private.png";
import ethIcon from "../img/ethereum.png";

const Section1 = (props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    let earnEthClick = async (event) => {
      navigate("/earneth");
    };

    return (
        <section className="section-1">
            <div className="container aos-init aos-animate" data-aos="fade-up">
                <div className="row">
                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                        <div className="sectionBox icon-box aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
                        <div className="icon"><img alt={t("Secure")} src={secureIcon} width={64} height={64} /></div>
                        <h4 className="title">{t("Secure")}</h4>
                        <p className="description">{t("Secure Text")}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                        <div className="sectionBox icon-box aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
                        <div className="icon"><img alt={t("Inexpensive")} src={inexpensiveIcon} width={64} height={64} /></div>
                        <h4 className="title">{t("Inexpensive")}</h4>
                        <p className="description">{t("Inexpensive Text")}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                        <div className="sectionBox icon-box aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
                        <div className="icon"><img alt={t("Private")} src={privateIcon} width={64} height={64} /></div>
                        <h4 className="title">{t("Private")}</h4>
                        <p className="description">{t("Private Text")}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0 link-cursor" onClick={earnEthClick}>
                        <div className="sectionBox icon-box aos-init aos-animate" data-aos="fade-up" data-aos-delay="400">
                        <div className="icon"><img alt={t("Earn ETH")} src={ethIcon} width={64} height={64}/></div>
                        <h4 className="title">{t("Earn ETH")}</h4>
                        <p className="description">{t("Earn ETH Text")}</p>
                        </div>
                    </div>
                </div>
            </div>
            </section>
    )
}

export default Section1;

/*
<section id="featured-services" className="featured-services">
   <div className="container aos-init aos-animate" data-aos="fade-up">
      <div className="row">
         <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
               <div className="icon"><i className="bx bxl-dribbble"></i></div>
               <h4 className="title"><a href="">Lorem Ipsum</a></h4>
               <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
            </div>
         </div>
         <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">
               <div className="icon"><i className="bx bx-file"></i></div>
               <h4 className="title"><a href="">Sed ut perspiciatis</a></h4>
               <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
            </div>
         </div>
         <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box aos-init aos-animate" data-aos="fade-up" data-aos-delay="300">
               <div className="icon"><i className="bx bx-tachometer"></i></div>
               <h4 className="title"><a href="">Magni Dolores</a></h4>
               <p className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
            </div>
         </div>
         <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box aos-init aos-animate" data-aos="fade-up" data-aos-delay="400">
               <div className="icon"><i className="bx bx-world"></i></div>
               <h4 className="title"><a href="">Nemo Enim</a></h4>
               <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
            </div>
         </div>
      </div>
   </div>
</section>*/