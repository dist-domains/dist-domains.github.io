import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import info from "../img/info.svg";

const InfoKeysModal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <img onClick={handleShow} className="info-icon" src={info} alt="" />
  
        <Modal
          show={show}
          onHide={handleClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Keys</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <p>Below are a list of supported keys.</p>

            <h4 className="mb-3">browser.redirect_url</h4>
            <p>Fallback redirection URL where no other DNS key values are set, or all other resolution methods fail.</p>

            <h4 className="mb-3">dns.A</h4>
            <p>An A record maps a domain name to the IP address (Version 4) of the computer hosting the domain. An A record uses a domain name to find the IP address of a computer connected to the internet.</p>

            <h4 className="mb-3">dns.A.ttl</h4>
            <p>TTL (Time To Live) is a setting that tells the resolver how long to cache the A query result before requesting a new one. Value is expecting an integer in seconds (i.e. a value of 300 equals 5 minutes).</p>

            <h4 className="mb-3">tor.onion</h4>
            <p>The TOR address (.onion) of the computer hosting the domain. This record enables the resolver to forward requests to a computer on the TOR network. This can be useful when the server is not accessible via a public static IP address.</p>
            
            <h4 className="mb-3">tor.onion.ttl</h4>
            <p>TTL (Time To Live) is a setting that tells the resolver how long to cache the TOR onion query result before requesting a new one. Value is expecting an integer in seconds (i.e. a value of 300 equals 5 minutes).</p>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default InfoKeysModal;
