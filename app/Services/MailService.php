<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;

class MailService
{
    public static function sendMail($to, $mailable)
    {
        try{
            Mail::to($to)->send($mailable);
            return true;
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }
}