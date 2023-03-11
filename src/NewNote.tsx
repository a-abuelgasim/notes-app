import { NoteData, Tag } from './App';
import { NoteForm } from './NoteForm';


// TYPES
export type NewNoteProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
}

export function NewNote({availableTags, onAddTag, onSubmit}: NewNoteProps) {
	return (
		<>
			<h1 className="mb-4">New Note</h1>

			<NoteForm
					availableTags={availableTags}
					onAddTag={onAddTag}
					onSubmit={onSubmit} />
		</>
	)
};
