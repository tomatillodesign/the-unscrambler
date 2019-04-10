import React, { Component } from 'react';

import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

class DefinitionModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <>
        <Button variant="dictionary" onClick={this.handleShow}>
          {this.props.word}
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="dictionary-word-modal-title">{this.props.word}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.def}</Modal.Body>
        </Modal>
      </>
    );
  }
}

export default DefinitionModal;
