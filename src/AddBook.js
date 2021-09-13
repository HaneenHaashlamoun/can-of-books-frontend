import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export class AddBook extends Component {

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handelDisplayAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.handelAddModal}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="bookName" placeholder="Enter Book Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>description</Form.Label>
              <Form.Control type="text" name="bookDescription" placeholder="Enter Book Description" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" name="bookStatus" placeholder="Enter Book Status" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" name="email" placeholder="Enter your email" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create New Book!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    )
  }
}

