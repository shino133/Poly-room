<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


abstract class Controller
{
    /**
     * Function to save image to the upload folder
     *
     * @param \Illuminate\Http\Request $request
     * @param string $inputName
     * @return string|null
     */
    protected function saveImage(Request $request, string $inputName)
    {
        if ($request->hasFile($inputName) && $request->file($inputName)->isValid()) {
            $file = $request->file($inputName);
            $fileName = Str::uuid() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('uploads', $fileName, 'public');

            return $fileName;
        }

        return null;
    }
}
