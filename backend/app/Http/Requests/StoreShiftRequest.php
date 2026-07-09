<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreShiftRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'day' => ['required', 'date'],
            'start_time' => ['required', 'date'],
            'end_time' => ['required', 'date'],
            'role' => ['required', 'date', 'after:start_time'],
            'staff_id' => ['nullable', 'exists:staff,id'],
        ];
    }
}
