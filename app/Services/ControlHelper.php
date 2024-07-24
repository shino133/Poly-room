<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
// use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ControlHelper
{
    /**
     * Save image in local file system and return saved image path
     *
     * @param $image
     * @param $folderSave
     * @throws \Exception
     * @author Zura Sekhniashvili <zurasekhniashvili@gmail.com>
     */
    public function saveImage($image , $folderSave = null)
    {
        // Check if image is valid base64 string
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            // Take out the base64 encoded text without mime type
            $image = substr($image, strpos($image, ',') + 1);
            // Get file extension
            $type = strtolower($type[1]); // jpg, png, gif

            // Check if file is an image
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        if ($folderSave != null) {
            $dir .= $folderSave . '/';
        }
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }

    public static function handleExc(\Exception $e)
    {
        return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
    }
}
