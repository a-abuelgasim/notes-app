import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Note, Tag } from './App';
import ReactSelect from 'react-select/creatable';
import { useMemo, useState } from 'react';
import { NoteCard } from './NoteCard';


// TYPES
type AvailableTags = Tag[];

type NoteListProps = {
	availableTags: AvailableTags;
	notes: Note[];
	onDeleteTag: (id: string) => void
	onUpdateTag: (id: string, label: string) => void
}

type EditTagsModalProps = {
	availableTags: AvailableTags;
	handleClose: () => void;
	onDeleteTag: (id: string) => void
	onUpdateTag: (id: string, label: string) => void
	show: boolean;
}

export function NoteList({availableTags, notes, onDeleteTag, onUpdateTag}: NoteListProps) {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [title, setTitle] = useState('');
	const [editTagsModalShow, setEditTagsModalShow] = useState(false);

	const filteredNotes = useMemo(() => (
		notes.filter(note => ((
			title === '' ||
			note.title.toLowerCase().includes(title.toLowerCase().trim())
		) && (
			selectedTags.length === 0 ||
			selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id))
		))
	)), [title, selectedTags, notes]);

	return (
		<>
			<Row className='align-items-center mb-4'>
				<Col>
					<h1>Notes</h1>
				</Col>

				<Col xs="auto">
					<Stack
							direction="horizontal"
							gap={2}>
						<Link to="/new">
							<Button
									type="button"
									variant="primary">
								Create
							</Button>
						</Link>

						<Button
								onClick={() => setEditTagsModalShow(true)}
								type="button"
								variant="outline-secondary">
							Edit Tags
						</Button>
					</Stack>
				</Col>
			</Row>

			<Form>
				<Row className="mb-4">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>

							<Form.Control
									value={title}
									onChange={e => {
										const title = e.target.value;
										setTitle(title);
									}} />
						</Form.Group>
					</Col>

					<Col>
						<Form.Label>Tags</Form.Label>
						<ReactSelect
								isMulti
								onChange={tags => {
									setSelectedTags(tags.map(tag => ({
										id: tag.value,
										label: tag.label,
									})))
								}}
								options={availableTags.map(tag => ({
									label: tag.label,
									value: tag.id,
								}))}
								value={selectedTags.map(tag => ({
									label: tag.label,
									value: tag.id
								}))} />
					</Col>
				</Row>
			</Form>

			<Row
					className="g-3"
					lg={3}
					sm={2}
					xl={4}
					xs={1}>
				{filteredNotes.map(note => (
					<Col key={note.id}>
						<NoteCard note={note} />
					</Col>
				))}
			</Row>

			<EditTagsModal
					availableTags={availableTags}
					handleClose={() => setEditTagsModalShow(false)}
					onDeleteTag={onDeleteTag}
					onUpdateTag={onUpdateTag}
					show={editTagsModalShow} />
		</>
	)
}


function EditTagsModal({availableTags, handleClose, onDeleteTag, onUpdateTag, show}: EditTagsModalProps) {
	return(
		<Modal
				onHide={handleClose}
				show={show}>
			<Modal.Header closeButton>
				<Modal.Title>Edit tags</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form>
					<Stack gap={2}>
						{availableTags.map(tag => (
							<Row key={tag.id}>
								<Col>
									<Form.Control
											onChange={e => onUpdateTag(tag.id, e.target.value)}
											value={tag.label} />
								</Col>

								<Col xs="auto">
									<Button
											onClick={() => onDeleteTag(tag.id)}
											variant="outline-danger">
										&times;
									</Button>
								</Col>
							</Row>
						))}
					</Stack>
				</Form>
			</Modal.Body>
		</Modal>
	)
}
