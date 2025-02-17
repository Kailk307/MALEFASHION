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
        Schema::create('orderdetail', function (Blueprint $table) {
            $table->id(); //id
            $table->unsignedInteger('order_id');
            $table->unsignedInteger('product_id');
            $table->double('price');
            $table->unsignedInteger('qty');
            $table->double('discount');
            $table->double('amount');
            $table->unsignedTinyInteger('status')->default(2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orderdetail');
    }
};
