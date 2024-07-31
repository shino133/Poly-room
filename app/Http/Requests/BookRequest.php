<?php

namespace App\Http\Requests;

use Carbon\Carbon;

class BookRequest extends ValidationRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'room_id' => 'required|exists:rooms,id',
            'start_at' => [
                'required',
                'date',
                function ($attribute, $value, $fail) {
                    if (Carbon::parse($value)->lt(Carbon::now())) {
                        $fail('The ' . $attribute . ' must be a date after or equal to today.');
                    }
                }
            ],
            'end_at' => [
                'required',
                'date',
                'after:start_at' // So sánh với start_at
            ],
            'note' => 'nullable|string|max:255',
        ];
    }
}
