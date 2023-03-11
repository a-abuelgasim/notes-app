import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';
import { NoteData, Tag } from './App';
import { v4 as uuid} from 'uuid';


// TYPES
export type NoteFormProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm(
	{
		availableTags,
		markdown = '',
		onAddTag,
		onSubmit,
		tags = [],
		title = '',
	}: NoteFormProps) {

	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
	const navigate = useNavigate();

	// FUNCTIONS
	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		onSubmit({
			markdown: markdownRef.current!.value,
			tags: selectedTags,
			title: titleRef.current!.value,
		});

		navigate('..');
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>

							<Form.Control
									defaultValue={title}
									ref={titleRef}
									required />
						</Form.Group>
					</Col>

					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>

							<CreatableReactSelect
								isMulti
								onCreateOption={label => {
									const newTag: Tag = {id: uuid(), label};
									setSelectedTags(prev => [...prev, newTag]);
									onAddTag(newTag);
								}}
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
								}))}
							/>
						</Form.Group>
					</Col>
				</Row>

				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>

					<Form.Control
							as="textarea"
							defaultValue={markdown}
							ref={markdownRef}
							required
							rows={15} />
				</Form.Group>

				<Stack
						className="justify-content-end"
						direction="horizontal"
						gap={2}>
					<Button
							type="submit"
							variant="primary">
						Save
					</Button>

					<Link to="..">
						<Button
								type="button"
								variant="outline-secondary">
							Cancel
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	)
}
