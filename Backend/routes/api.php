<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderdetailController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\CommentController;





/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::prefix('banner')->group(function () {
    Route::get('/index', [BannerController::class, 'index']);
    Route::get('show/{id}', [BannerController::class, 'show']);
    Route::get('status/{id}', [BannerController::class, 'status']);
    Route::post('store', [BannerController::class, 'store']);
    
    Route::post('update/{id}', [BannerController::class, 'update']);
    Route::delete('destroy/{id}', [BannerController::class, 'destroy']);
    Route::put('delete/{id}', [BannerController::class, 'delete']);
    Route::get('thungrac', [BannerController::class, 'thungrac']);
    Route::get('/index1', [BannerController::class, 'index1']);
});
Route::prefix('brand')->group(function () {
    Route::get('index', [BrandController::class, 'index']);
    Route::get('show/{id}', [BrandController::class, 'show']);
    Route::get('status/{id}', [BrandController::class, 'status']);
    Route::post('store', [BrandController::class, 'store']);
    Route::post('update/{id}', [BrandController::class, 'update']);
    Route::delete('destroy/{id}', [BrandController::class, 'destroy']);
    Route::put('delete/{id}', [BrandController::class, 'delete']);
    Route::get('thungrac', [BrandController::class, 'thungrac']);
});
Route::prefix('category')->group(function () {
    Route::get('index', [CategoryController::class, 'index']);
    Route::get('index1', [CategoryController::class, 'index1']);

    Route::get('show/{id}', [CategoryController::class, 'show']);
    Route::get('status/{id}', [CategoryController::class, 'status']);
    Route::post('store', [CategoryController::class, 'store']);
    Route::post('update/{id}', [CategoryController::class, 'update']);
    Route::delete('destroy/{id}', [CategoryController::class, 'destroy']);
    Route::put('delete/{id}', [CategoryController::class, 'delete']);
    Route::get('thungrac', [CategoryController::class, 'thungrac']);
});
Route::prefix('contact')->group(function () {
    Route::get('index', [ContactController::class, 'index']);
    Route::get('index1', [ContactController::class, 'index1']);
    Route::get('show/{id}', [ContactController::class, 'show']);
    Route::get('status/{id}', [ContactController::class, 'status']);
    Route::post('store', [ContactController::class, 'store']);
    Route::post('store1', [ContactController::class, 'store1']);
    Route::post('update/{id}', [ContactController::class, 'update']);
    Route::delete('destroy/{id}', [ContactController::class, 'destroy']);
    Route::put('delete/{id}', [ContactController::class, 'delete']);
    Route::get('thungrac', [ContactController::class, 'thungrac']);
    Route::post('create', [ContactController::class, 'create']);
});
Route::prefix('menu')->group(function () {
    Route::get('index', [MenuController::class, 'index']);
    Route::get('show/{id}', [MenuController::class, 'show']);
    Route::post('store', [MenuController::class, 'store']);
    Route::post('update/{id}', [MenuController::class, 'update']);
    Route::delete('destroy/{id}', [MenuController::class, 'destroy']);
});
Route::prefix('order')->group(function () {
    Route::get('index/{status}', [OrderController::class, 'index']);
    Route::get('status/{id}', [OrderController::class, 'status']);
    Route::get('show/{id}', [OrderController::class, 'show']);
    Route::post('update/{id}', [OrderController::class, 'update']);
    Route::delete('destroy/{id}', [OrderController::class, 'destroy']);
    Route::get('thungrac', [OrderController::class, 'thungrac']);
    Route::put('delete/{id}', [OrderController::class, 'delete']);


    Route::post('store', [OrderController::class, 'store']);

    // lấy ra order thông qua user_id
    Route::get('getOrdersByUserId/{userId}', [OrderController::class, 'getOrdersByUserId']);
});

Route::prefix('orderdetail')->group(function () {
    
    Route::post('store', [OrderdetailController::class, 'store']);
    Route::post('store1', [OrderdetailController::class, 'store1']);
});

Route::prefix('post')->group(function () {
    Route::get('index', [PostController::class, 'index']);
    Route::get('show/{id}', [PostController::class, 'show']);
    Route::get('status/{id}', [PostController::class, 'status']);
    Route::post('store', [PostController::class, 'store']);
    Route::post('update/{id}', [PostController::class, 'update']);
    Route::delete('destroy/{id}', [PostController::class, 'destroy']);
    Route::put('delete/{id}', [PostController::class, 'delete']);
    Route::get('thungrac', [PostController::class, 'thungrac']);
    Route::get('postnew', [PostController::class, 'post_new']);
    Route::get('post_detail/{slug}', [PostController::class, 'post_detail']);

    // post all
    Route::get('post_all', [PostController::class, 'post_all']);
    // post_topic
    Route::get('post_topic/{slug}', [PostController::class, 'post_topic']);
});
Route::prefix('page')->group(function () {
    Route::get('index', [PageController::class, 'index']);
    Route::get('show/{id}', [PageController::class, 'show']);
    Route::get('status/{id}', [PageController::class, 'status']);
    Route::post('store', [PageController::class, 'store']);
    Route::post('update/{id}', [PageController::class, 'update']);
    Route::delete('destroy/{id}', [PageController::class, 'destroy']);
    Route::put('delete/{id}', [PageController::class, 'delete']);
    Route::get('thungrac', [PageController::class, 'thungrac']);
    Route::get('postnew', [PageController::class, 'post_new']);
});
Route::prefix('product')->group(function () {
    //admin
    Route::get('index', [ProductController::class, 'index']);
    Route::get('show/{id}', [ProductController::class, 'show']);
    Route::get('productnew/{limit}', [ProductController::class, 'productnew']);
    Route::get('status/{id}', [ProductController::class, 'status']);
    Route::post('store', [ProductController::class, 'store']);
    Route::post('update/{id}', [ProductController::class, 'update']);
    Route::delete('destroy/{id}', [ProductController::class, 'destroy']);
    Route::put('delete/{id}', [ProductController::class, 'delete']);
    Route::get('thungrac', [ProductController::class, 'thungrac']);
    Route::post('storeimport', [ProductController::class, 'storeimport']);
    Route::post('storesale', [ProductController::class, 'storesale']);
    Route::get('import', [ProductController::class, 'import']);


    //product_category
    Route::get('product_category_filter/{slug}', [ProductController::class, 'product_category_filter']);
    Route::get('product_category_home/{id}', [ProductController::class, 'product_category_home']);
    Route::get('product_category/{slug}', [ProductController::class, 'product_category']);


    //product_brand
    Route::get('product_brand/{slug}', [ProductController::class, 'product_brand']);
    Route::get('product_brand_filter/{slug}', [ProductController::class, 'product_brand_filter']);


    //home
    Route::get('producthotbuy/{limit}', [ProductController::class, 'producthotbuy']);
    Route::get('product_detail/{slug}', [ProductController::class, 'product_detail']);
    Route::get('productsale/{limit}', [ProductController::class, 'productsale']);
    Route::get('sale', [ProductController::class, 'sale']);
    Route::get('search/{search}', [ProductController::class, 'search']);

//product_all
    Route::get('product_all', [ProductController::class, 'product_all']);
    Route::get('product_all_filter', [ProductController::class, 'product_all_filter']);
});
Route::prefix('topic')->group(function () {
    Route::get('index', [TopicController::class, 'index']);
    Route::get('show/{id}', [TopicController::class, 'show']);
    Route::get('status/{id}', [TopicController::class, 'status']);
    Route::post('store', [TopicController::class, 'store']);
    Route::post('update/{id}', [TopicController::class, 'update']);
    Route::delete('destroy/{id}', [TopicController::class, 'destroy']);
    Route::put('delete/{id}', [TopicController::class, 'delete']);
    Route::get('thungrac', [TopicController::class, 'thungrac']);
});
Route::prefix('user')->group(function () {
    Route::get('index', [UserController::class, 'index']);
    
    Route::get('show/{id}', [UserController::class, 'show']);
    Route::get('status/{id}', [UserController::class, 'status']);
    Route::post('store', [UserController::class, 'store']);
    Route::post('update/{id}', [UserController::class, 'update']);
    Route::delete('destroy/{id}', [UserController::class, 'destroy']);
    Route::put('delete/{id}', [UserController::class, 'delete']);
    Route::get('thungrac', [UserController::class, 'thungrac']);
    Route::post('login', [UserController::class, 'login']);
    Route::post('changePassword/{id}', [UserController::class, 'changePassword']);
});

Route::post('/comments', [CommentController::class, 'store']);
Route::get('index', [CommentController::class, 'index']);
Route::post('update/{id}', [CommentController::class, 'update']);
Route::delete('destroy/{id}', [CommentController::class, 'destroy']);

Route::get('login/{provider}', [SocialController::class, 'redirect']);
Route::get('callback/{provider}', [SocialController::class, 'callback']);
