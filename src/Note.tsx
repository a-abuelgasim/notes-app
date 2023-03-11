import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "./NoteLayout";


// TYPES
type NoteProps = {
	onDelete: (id: string) => void;
}

export function Note({onDelete}: NoteProps) {
	const note = useNote();
	const navigate = useNavigate();

	// FUNCTIONS
	function onDeleteClick() {
		onDelete(note.id);
	}

	return(
		<>
			<Row className="align-items-center mb-4">
				<Col className="">
					<h1>{note.title}</h1>

					{note.tags.length > 0 &&
						<Stack
								className="flex-wrap"
								direction="horizontal"
								gap={1}>
							{note.tags.map(tag => (
								<Badge
										className="text-truncate"
										key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					}
				</Col>

				<Col xs="auto">
					<Stack
							direction="horizontal"
							gap={2}>
						<Link to={`/${note.id}/edit`}>
							<Button
									type="button"
									variant="primary">
								Edit
							</Button>
						</Link>

						<Button
								type="button"
								onClick={() => {
									onDeleteClick();
									navigate('/');
								}}
								variant="outline-danger">
							Delete
						</Button>

						<Link to="..">
							<Button
									type="button"
									variant="outline-secondary">
								Back
							</Button>
						</Link>
					</Stack>
				</Col>
			</Row>

			<ReactMarkdown>{note.markdown}</ReactMarkdown>
		</>
	)
}
