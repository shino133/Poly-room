<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("room_id")->nullable();
            $table->unsignedBigInteger("user_id")->nullable();
            $table->dateTime("time_start");
            $table->dateTime("time_end");
            $table->dateTime("time_created")->useCurrent();
            $table->string("status");
            $table->text("note");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
