import { Row, Col, Badge, Stack, Button, Modal } from 'react-bootstrap';
import { useNote } from '../components/NoteLayout';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

type NoteProps = {
  onDelete: (id: string) => void;
}

export function Note({onDelete}: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function confirmDelete() {
      onDelete(note.id)
      navigate("/")
  }

  return <>
  <Row className="align-items-center mb-4">
    <Col>
      <h1>{note.title}</h1>
      {note.tags.length > 0 && (
        <Stack gap={1} direction="horizontal" className="flex-wrap">
          {note.tags.map(tag => (
            <Badge className="text-truncate" key={tag.id}>
              {tag.label}
            </Badge>
          ))}
        </Stack>
      )}
    </Col>
    <Col xs="auto">
      <Stack gap={2} direction="horizontal">
        <Link to={`/${note.id}/edit`}>
          <Button variant="primary">Edit</Button>
        </Link>
        <Button variant='danger' onClick={handleShow}>Delete</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            Confirm Delete
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete <Badge bg='dark' style={{fontSize: 16}}>{note.title}</Badge>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>Cancel</Button>
            <Button variant='danger' onClick={confirmDelete}>Delete</Button>
          </Modal.Footer>
        </Modal>
        <Link to="/">
          <Button variant="outline-secondary">Back</Button>
        </Link>
      </Stack>
    </Col>
  </Row>
  <ReactMarkdown>{note.markdown}</ReactMarkdown>
</>
}