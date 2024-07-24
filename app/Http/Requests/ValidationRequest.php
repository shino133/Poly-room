<?php
namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class ValidationRequest extends FormRequest
{
    /**
     * Handle a failed validation attempt.
     *
     * @param \Illuminate\Contracts\Validation\Validator $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        $response = response()->json([
            'message' => 'Validation failed',
            'errors' => $validator->errors(),
            'status' => 'error',
        ], 422);

        throw new ValidationException($validator, $response);
    }
}
