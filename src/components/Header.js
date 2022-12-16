import { Link } from "react-router-dom";
import { Nav, Navbar, Container, NavDropdown} from "react-bootstrap";
import { decodeDomain } from "../helper/functions";
import { useTranslation } from "react-i18next";
import "../i18n";
import langIcon from "../img/language.svg";
import brandLogo from "../img/logo.png";

const Header = (props) => {
    const { t, i18n } = useTranslation();

    /*let domainEntry = (domain) => {
        let toAdd = "/manage/" + domain;
        return <NavDropdown.Item as={Link} to={toAdd} key={domain}>{decodeDomain(domain)}</NavDropdown.Item>;
    };*/

    let manageDomains = () => {
        if (props.domains.length===0) {
            return <NavDropdown.Item disabled={true}>No Domains</NavDropdown.Item>;
        } else {
            return props.domains.map((domain) => {
                let toAdd = "/manage/" + domain;
                return <NavDropdown.Item as={Link} to={toAdd} key={domain}>{decodeDomain(domain)}</NavDropdown.Item>;
            });
        }
    };

    let changeLang = (lang) => {
        i18n.changeLanguage(lang);
    };

    if (!props.visible) return null;

    return (
        <>
            <Navbar className="header-top" bg="light" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/" ><img className="brand-logo" src={brandLogo} alt={t("Brand")}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Nav.Link as={Link} to="/purchase" eventKey="1">{t("Buy a Domain")}</Nav.Link>
                        <Nav.Link as={Link} to="/pricing" eventKey="2">{t("Pricing")}</Nav.Link>
                        <Nav.Link as={Link} to="/tld" eventKey="3">{t("Own a TLD")}</Nav.Link>
                        <NavDropdown title={t("Manage Domains")} id="basic-nav-dropdown">
                            {manageDomains()}
                        </NavDropdown>
                        <NavDropdown className="d-flex ml-auto" title={<div className="d-inline"><img src={langIcon} alt={t("Language")} width={32} height={32} /></div>} id="lang-nav-dropdown">
                            <NavDropdown.Item key={"English"} onClick={() => changeLang("en")}>{(i18n.language === "en" ? "✓ " : "")}{t("English")}</NavDropdown.Item>
                            <NavDropdown.Item key={"French"} onClick={() => changeLang("fr")}>{(i18n.language === "fr" ? "✓ " : "")}{t("French")}</NavDropdown.Item>
                            <NavDropdown.Item key={"German"} onClick={() => changeLang("de")}>{(i18n.language === "de" ? "✓ " : "")}{t("German")}</NavDropdown.Item>
                            <NavDropdown.Item key={"Spanish"} onClick={() => changeLang("es")}>{(i18n.language === "es" ? "✓ " : "")}{t("Spanish")}</NavDropdown.Item>
                            <NavDropdown.Item key={"Russian"} onClick={() => changeLang("ru")}>{(i18n.language === "ru" ? "✓ " : "")}{t("Russian")}</NavDropdown.Item>
                            <NavDropdown.Item key={"Chinese"} onClick={() => changeLang("zh")}>{(i18n.language === "zh" ? "✓ " : "")}{t("Chinese")}</NavDropdown.Item>
                            <NavDropdown.Item key={"Japanese"} onClick={() => changeLang("ja")}>{(i18n.language === "ja" ? "✓ " : "")}{t("Japanese")}</NavDropdown.Item>
                            <NavDropdown.Item key={"Arabic"} onClick={() => changeLang("ar")}>{(i18n.language === "ar" ? "✓ " : "")}{t("Arabic")}</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;
