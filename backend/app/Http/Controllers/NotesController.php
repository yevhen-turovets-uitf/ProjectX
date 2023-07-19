<?php

namespace App\Http\Controllers;

use App\Exceptions\AccessErrorException;
use App\Http\Requests\CreateNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use App\Models\Note;

class NotesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(
        int $userid
    ): array
    {
        return Note::where('owner_id', $userid)->get()->toArray();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        int $userid,
        CreateNoteRequest $request
    ): ?Note
    {
        return Note::create([
            'title' => $request->title,
            'text' => $request->text,
            'author_id' => $request->id,
            'owner_id' => $userid,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        int $userid,
        UpdateNoteRequest $request,
        int $id
    ): ?Note
    {
        $note = Note::find($id);
        if ($note && $note->user->id == $userid) {
            $note->update([
                'title' => $request->title,
                'text' => $request->text,
            ]);
        } else {
            throw new AccessErrorException();
        }

        return $note;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(
        int $userid,
        int $id
    ): void
    {
        $note = Note::find($id);
        if ($note && $note->user->id == $userid) {
            $note->delete();
        } else {
            throw new AccessErrorException();
        }
    }
}
