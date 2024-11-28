"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase"; // Ajusta esta ruta si es necesario
import { NoteData } from "./types/Note"; // Ajusta esta ruta si es necesario
import NoteList from "./components/note-list/NoteList"; // Ajusta esta ruta si es necesario
import Sidebar from "./components/sidebar/Sidebar"; // Ajusta esta ruta si es necesario

export default function Home() {
    const [notes, setNotes] = useState<NoteData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterId, setFilterId] = useState<number>(0);
    const [isClearing, setIsClearing] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            setIsLoading(true);
            const { data } = filterId === 0
                ? await supabase.from("notes").select("*").order("created_at", { ascending: false })
                : await supabase.from("notes").select("*").eq("category", filterId).order("created_at", { ascending: false });
            setNotes(data || []);
            setIsLoading(false);
        };
        fetchNotes();
    }, [filterId]);

    const handleDoubleClick = () => {
        const newNote: NoteData = {
            id: Math.random(),
            title: "",
            content: "",
            category: 1,
            created_at: new Date(),
            status: 0,
            isCreating: true,
        };
        setNotes([newNote, ...notes]);
    };

    const updateNote = async (updatedNote: NoteData) => {
        const updatedNotes = notes.map(note =>
            note.id === updatedNote.id ? updatedNote : note
        );
        setNotes(updatedNotes);

        if (updatedNote.id.toString().includes(".")) {
            if (updatedNote.title === "" && updatedNote.content === "") {
                setNotes(notes => notes.filter(note => note.id !== updatedNote.id));
                return;
            }
            const { data, error } = await supabase
                .from("notes")
                .insert({
                    title: updatedNote.title,
                    content: updatedNote.content,
                    category: updatedNote.category,
                })
                .select()
                .single();
            if (!error && data) {
                setNotes(notes =>
                    notes.map(note =>
                        note.id === updatedNote.id ? data : note
                    )
                );
            }
        } else {
            await supabase
                .from("notes")
                .update({
                    title: updatedNote.title,
                    content: updatedNote.content,
                    category: updatedNote.category,
                })
                .eq("id", updatedNote.id);
        }
    };

    const deleteNote = async (noteId: number) => {
        setNotes(notes.filter(note => note.id !== noteId));
        await supabase
            .from("notes")
            .delete()
            .eq("id", noteId);
    };

    const clearFilteredNotes = async () => {
        setIsClearing(true);
        const notesToDelete = notes.map(note => note.id);
        for (const noteId of notesToDelete) {
            await supabase
                .from("notes")
                .delete()
                .eq("id", noteId);
        }
        setNotes([]);
        setIsClearing(false);
    };

    return (
        <div className="flex flex-row h-screen">
            <div className="max-w-60 border-r shadow-md bg-white">
                <Sidebar onFilterChange={setFilterId} onClearNotes={clearFilteredNotes} isClearing={isClearing} />
            </div>
            <div
                className="w-full"
                onDoubleClick={handleDoubleClick}
            >
                <div className="flex-1 p-4">
                    {isLoading
                        ? skeletonLoader()
                        : notes.length === 0
                            ? <p className="text-xl font-semibold text-slate-500 animate-pulse">No hay notas con esta categoría...</p>
                            : <NoteList notes={notes} onUpdateNote={updateNote} onDeleteNote={deleteNote} />}
                </div>
            </div>
        </div>
    );
}

const skeletonLoader = () => {
    return (
        <div className="w-full h-screen flex p-4">
            <div className="space-y-2.5 animate-pulse w-full">
                <div className="flex items-center w-full space-x-4">
                    <div className="shadow-sm rounded-md h-44 bg-gray-400 w-full"></div>
                    <div className="shadow-sm rounded-md h-44 bg-gray-400 w-full"></div>
                    <div className="shadow-sm rounded-md h-44 bg-gray-300 w-full"></div>
                    <div className="shadow-sm rounded-md h-44 bg-gray-200 w-full"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};
