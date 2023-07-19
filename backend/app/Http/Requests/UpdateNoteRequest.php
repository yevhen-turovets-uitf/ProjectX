<?php


namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNoteRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'id' => 'required|int|exists:App\Models\Note,id',
            'title' => 'required|string',
            'text' => 'required|string',
        ];
    }
}
