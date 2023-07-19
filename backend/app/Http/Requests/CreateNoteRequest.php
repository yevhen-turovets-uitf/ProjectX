<?php


namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateNoteRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'text' => 'required|string',
        ];
    }
}
