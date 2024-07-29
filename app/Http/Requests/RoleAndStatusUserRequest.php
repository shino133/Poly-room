<?php

namespace App\Http\Requests;


class RoleAndStatusUserRequest extends ValidationRequest
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
            'status' => 'required|string|in:1,0',
            'role' => 'required|string|in:1,0',
        ];
    }
}
