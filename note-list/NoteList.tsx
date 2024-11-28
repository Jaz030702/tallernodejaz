import { NoteData } from "../../types/Note"; // Ajusta esta ruta si es necesario
import NoteCard from "../note-card/NoteCard"; // Ajusta esta ruta si es necesario

interface NoteListProps {
    notes: NoteData[];
    onUpdateNote: (updatedNote: NoteData) => Promise<void>;
    onDeleteNote: (noteId: number) => void;
}

const NoteList = ({ notes, onUpdateNote, onDeleteNote }: NoteListProps) => {
    return (
        <div className="flex flex-wrap p-4 gap-4 overflow-auto max-h-screen">
            {notes.map((note) => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onUpdateNote={onUpdateNote}
                    onDeleteNote={onDeleteNote}
                />
            ))}
        </div>
    );
};

export default NoteList;
