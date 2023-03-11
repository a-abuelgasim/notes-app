import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Note } from "./App";

import styles from './NoteCard.module.css';


// TYPES
type NoteCardProps = {
	note: Note;
}

export function NoteCard({note}: NoteCardProps) {
	return(
		<Card
				as={Link}
				className={`h-100 text-reset text-decoration-none ${styles.card}`}
				to={`/${note.id}`}>
			<Card.Body>
				<Stack
						className="align-items-center justify-content-center h-100"
						gap={2}>
					<span className="fs-5">{note.title}</span>

					{note.tags.length > 0 && (
						<Stack
								className="justify-content-center flex-wrap"
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
					)}
				</Stack>
			</Card.Body>
		</Card>
	)
}
