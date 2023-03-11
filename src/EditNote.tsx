import { NoteData, Tag } from './App';
import { NoteForm } from './NoteForm';
import { useNote } from './NoteLayout';


// TYPES
export type EditNoteProps = {
	availableTags: Tag[];
	onAddTag: (tag: Tag) => void;
	onSubmit: (id: string, data: NoteData) => void;
}

export function EditNote({availableTags, onAddTag, onSubmit}: EditNoteProps) {
	const note = useNote();

	return (
		<>
			<h1 className="mb-4">Edit Note</h1>

			<NoteForm
					availableTags={availableTags}
					markdown={note.markdown}
					onAddTag={onAddTag}
					onSubmit={data => onSubmit(note.id, data)}
					tags={note.tags}
					title={note.title} />
		</>
	)
};
