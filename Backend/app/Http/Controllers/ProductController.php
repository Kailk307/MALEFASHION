<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Orderdetail;
use App\Models\Product;
use App\Models\ProductSale;
use App\Models\ProductStore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use Illuminate\Support\Str;

class ProductController extends Controller
{


    function index()
    {
        $products = Product::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image', 'price', 'category_id', 'brand_id', 'detail')
            ->get();
        $total = Product::count();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $product = Product::find($id);

        if ($product === null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'product' => $product,
            'message' => 'Tai du lieu thanh cong'
        ];

        return response()->json($result, 200);
    }


    function store(Request $request)
    {
        $product = new Product();
        $product->name = $request->name;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->detail = $request->detail;
        $product->slug = Str::of($request->name)->slug('-');
        // Upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/product'), $fileName);
                $product->image = $fileName;
            }
        }


        // end upload

        $product->description = $request->description;
        $product->price = $request->price;
        $product->created_at = date('Y-m-d H:i:s');
        $product->created_by = 1; //tam
        $product->status = $request->status;

        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null, 'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $product->name = $request->name;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->detail = $request->detail;
        $product->slug = Str::of($request->name)->slug('-');
        // Upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/product'), $fileName);
                $product->image = $fileName;
            }
        }


        // end upload

        $product->description = $request->description;
        $product->price = $request->price;
        $product->created_at = date('Y-m-d H:i:s');
        $product->created_by = 1; //tam
        $product->status = $request->status;

        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }
        // If save fails
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($product->delete()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
    function status($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $product->status = ($product->status == 1) ? 2 : 1;
        $product->updated_at = date('Y-m-d H:i:s');
        $product->updated_by = 1; //tam
        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }




    function delete(Request $request, $id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $product->status = $request->status;
        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    // public function delete(Request $request, $id)
    // {
    //     $product = Product::find($id);
    //     if ($product == null) {
    //         $result = [
    //             'status' => false,
    //             'product' => null,
    //             'message' => 'Khong tim thay du lieu'
    //         ];
    //         return response()->json($result, 200);
    //     }
    //     $count_orderdetaill = Orderdetail::where('product_id', $id)->count();
    //     if ($count_orderdetaill > 0) {
    //         $result = [
    //             'status' => false,
    //             'product' => null,
    //             'message' => 'Khong tim thay du lieu'
    //         ];
    //         return response()->json($result, 200);
    //     }
    //     $product->status = 0;
    //     $product->updated_at = date('Y-m-d H:i:s');
    //     $product->updated_by = Auth::id() ?? 1;
    //     $product->save();
    //     $result = [
    //         'status' => true,
    //         'product' => $product,
    //         'message' => 'Tải dữ liệu thành công'
    //     ];
    //     return response()->json($result, 200);
    // }
    public function thungrac()
    {
        $products = Product::where('status', '=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image', 'price', 'category_id', 'brand_id', 'detail')
            ->get();
        $total = Product::count();
        $resul = [
            'status' => true,
            'product' => $products,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }

    //sản phẩm khuyến mãi

    public function sale()
    {
        $products = Product::where('product.status', '!=', 0)
        ->join('productsale', 'productsale.product_id', '=', 'product.id')
        ->select(
            'product.name',
            'product.image',
            'product.price',
            'productsale.pricesale',
            'productsale.date_begin',
            'productsale.date_end'
        )
            ->get();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công'
        ];
        return response()->json($result, 200);
    }
    public function storesale(Request $request)
    {
        $productsale = new ProductSale();
        $productsale->product_id = $request->product_id;
        $productsale->qty = 1;
        $productsale->pricesale = $request->pricesale;
        $productsale->date_begin = $request->date_begin;
        $productsale->date_end = $request->date_end;
        $productsale->created_at = date('Y-m-d H:i:s');
        $productsale->created_by = 1;
        if ($productsale->save()) {
            $result = [
                'status' => true,
                'productsale' => $productsale,
                'message' => 'Thêm dữ liệu vào bảng khuyến mãi thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'productsale' => null,
            'message' => 'lỗi',
        ];
        return response()->json($result, 200);
    }

    public function import()
    {
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as sum_qty'), DB::raw('SUM(price) as sum_price'))
            ->groupBy('product_id');
        $products = Product::where("product.status", "!=", 0)
            ->join('category', 'category.id', '=', 'product.category_id')
            ->join('brand', 'brand.id', '=', 'product.brand_id')
            ->leftJoinSub($productstore, "productstore", function ($join) {
                $join->on('product.id', '=', 'productstore.product_id');
            })
            ->select(
                'product.id',
                'product.slug',
                'product.image',
                'product.created_at',
                'product.status',
                'product.name',
                'product.price',
                'category.name as categoryname',
                'brand.name as brandname',
                'productstore.sum_qty',
            'productstore.sum_price',

                // 'productstore.avg_priceroot'
            )
            ->orderBy('created_at', 'DESC')->get();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response()->json($result, 200);
    }
    public function storeimport(Request $request)
    {
        $productstore = new ProductStore();
        $productstore->product_id = $request->id;
        $productstore->qty = $request->qty;
        $productstore->price = $request->price;
        $productstore->updated_at = date('Y-m-d H:i:s');
        $productstore->updated_by = Auth::id() ?? 1;
        if ($productstore->save()) {
            $result = [
                'status' => true,
                'productstore' => $productstore,
                'message' => 'Tải dữ liệu thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'productstore' => null,
            'message' => 'chưa nhập dc',
        ];
        return response()->json($result, 200);
    }
    public function product_sale()
    {
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as total_qty'))
            ->groupBy('product_id');
        $productstore = Product::where('product.status', '=', 1)
            ->join('productsale', 'product.id', '=', 'productsale.category_id')
            ->joinSub($productstore, "productstore", function ($join) {
                $join->on('product.id', '=', 'productstore.product_id');
            })
            ->orderBy('product.created_at', 'desc')
            ->limit(8)
            ->get();
    }
    public function product_new()
    {
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as total_qty'))
            ->groupBy('product_id');
        $products = Product::where('product.status', '=', 1)
            ->join('productsale', 'product.id', '=', 'productsale.product_id')
            ->joinSub($productstore, "productstore", function ($join) {
                $join->on('product.id', '=', 'productstore.product_id');
            })
            ->orderBy('product.created_at', 'desc')
            ->limit(8)
            ->get();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response()->json($result, 200);
    }

    public function product_all()
    {
        $perPage = 4; // Đặt số lượng sản phẩm trên mỗi trang

        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as total_qty'))
        ->groupBy('product_id');

        $products = Product::where('product.status', '=', 1)
        ->leftJoin('productsale', 'product.id', '=', 'productsale.product_id')
        ->leftJoinSub($productstore, "productstore", function ($join) {
            $join->on('product.id', '=', 'productstore.product_id');
        })
            ->orderBy('product.created_at', 'desc')
            ->paginate($perPage);

        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response()->json($result, 200);
    }


    public function product_category($slug)
    {
        $perPage = 4; // Đặt số lượng sản phẩm trên mỗi trang
        $args = [
            ['status', '=', 1],
            ['parent_id', '=', 0]
        ];
        $args = [
            ['status', '=', 1],
            ['slug', '=', $slug]
        ];
        $cat = Category::where($args)->first();
        $listcatid = array();
        array_push($listcatid, $cat->id);
        $args1 = [
            ['status', '=', 1],
            ['parent_id', '=', $cat->id]
        ];
        $list_category1 = Category::where($args1)->get();
        if (count($list_category1) > 0) {
            foreach ($list_category1 as $cat1) {
                array_push($listcatid, $cat1->id);
                $args2 = [
                    
                    ['status', '=', 1],
                    ['parent_id', '=', $cat->id]
                ];
                $list_category2 = Category::where($args2)->get();
                if (count($list_category2) > 0) {
                    foreach ($list_category2 as $cat2) {
                        array_push($listcatid, $cat2->id);
                    }
                }
            }
        }
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as total_qty'))
        ->groupBy('product_id');
        $products = Product::where('product.status', '=', 1)
        ->leftJoin('productsale', 'product.id', '=', 'productsale.product_id')
        ->JoinSub($productstore, "productstore", function ($join) {
            $join->on('product.id', '=', 'productstore.product_id');
        })
            ->orderBy('product.created_at', 'desc')
            ->whereIn('product.category_id', $listcatid)
            ->paginate($perPage);
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response()->json($result, 200);
    }
    public function product_category_home($id)
    {
        $listcatid = array();
        array_push($listcatid, $id);
        $args1 = [
            ['status', '=', 1],
            ['parent_id', '=', $id]
        ];
        $list_category1 = Category::where($args1)->get();
        if (count($list_category1) > 0) {
            foreach ($list_category1 as $cat1) {
                array_push($listcatid, $cat1->id);
                $args2 = [
                    ['status', '=', 1],
                    ['parent_id', '=', $cat1->id]
                ];
                $list_category2 = Category::where($args2)->get();
                if (count($list_category2) > 0) {
                    foreach ($list_category2 as $cat2) {
                        array_push($listcatid, $cat2->id);
                    }
                }
            }
        }

        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as total_qty'))
            ->groupBy('product_id');
        $products = Product::where('product.status', '=', 1)
            ->leftJoin('productsale', 'product.id', '=', 'productsale.product_id')
            ->JoinSub($productstore, "productstore", function ($join) {
                $join->on('product.id', '=', 'productstore.product_id');
            })
            ->orderBy('product.created_at', 'desc')
            ->whereIn('product.category_id', $listcatid)
            ->limit(8)
            ->get();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response()->json($result, 200);
    }

    public function product_brand($slug) // chưa có filter theo giá vs sort
    {
        $perPage = 4; // Đặt số lượng sản phẩm trên mỗi trang , nếu có phân trang thì truyền

        $args = [
            ['status', '=', 1],
            ['slug', '=', $slug]
        ];
        $brand = Brand::where($args)->first();

        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as total_qty'))
        ->groupBy('product_id');
        $products = Product::where([['product.brand_id', '=', $brand->id], ['product.status', '=', 1]])
        ->leftJoin('productsale', 'product.id', '=', 'productsale.product_id')
        ->JoinSub($productstore, "productstore", function ($join) {
            $join->on('product.id', '=', 'productstore.product_id');
        })
            ->orderBy('product.created_at', 'desc')
            ->paginate($perPage);
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response()->json($result, 200);
    }
  public function product_detail($slug)
{
    $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as total_sum'))
        ->groupBy('product_id');

    // Truy vấn để lấy thông tin sản phẩm
    $product = Product::where([['slug', '=', $slug], ['status', '=', 1]])
        ->JoinSub($productstore, 'productstore', function ($join) {
            $join->on('product.id', '=', 'productstore.product_id');
        })
        ->select('product.*')
        ->first();

    if ($product == null) {
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Không tìm thấy thông tin',
        ];
        return response()->json($result, 200);
    }

    // Truy vấn để lấy các sản phẩm khác
    $product_other = Product::where([
        ['product.status', '=', 1],
        ['product.id', '!=', $product->id]
    ])
        ->leftJoin('productsale', 'product.id', '=', 'productsale.product_id')
        ->JoinSub($productstore, 'productstore', function ($join) {
            $join->on('product.id', '=', 'productstore.product_id');
        })
        ->select("product.*", "productsale.pricesale", "productsale.date_begin", "productsale.date_end")
        ->where('product.category_id', '=', $product->category_id)
        ->orderBy('product.created_at', 'desc')
        ->take(4) // Chọn số lượng sản phẩm khác muốn hiển thị
        ->get();

    $result = [
        'status' => true,
        'product' => $product,
        'product_other' => $product_other,
        'message' => 'Tải dữ liệu thành công',
    ];

    return response()->json($result, 200);
}


//san pham moi
    public function productnew($limit)
    {
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as total_qty'))
            ->groupBy('product_id');
        $products = Product::where('product.status', '=', 1)

            ->joinSub($productstore, "productstore", function ($join) {
                $join->on('productstore.product_id', '=', 'product.id');
            })
            ->orderBy('product.created_at', 'desc')
            ->select("product.id", "product.name", "product.image", "product.price", "product.slug", "product.detail")
            ->limit($limit)
            ->get();
        $result = [
            'status' => true,
            'product' => $products,
            'message' => 'Tai du lieu thanh cong',

        ];
        return response()->json($result, 200);
    }
    // san pham khuyen mai
    public function productsale($limit)
    {
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as total_qty'))
        ->groupBy('product_id');
        $products = Product::where('product.status', '=', 1)
            ->where('productsale.date_begin', '<=', Carbon::now())
            ->where('productsale.date_end', '>=', Carbon::now())
            ->joinSub($productstore, "productstore", function ($join) {
                $join->on('productstore.product_id', '=', 'product.id');
            })
            ->leftJoin("productsale", "productsale.product_id", "=", "product.id")
            ->orderBy('product.created_at', 'desc')
            ->select("product.id", "product.name", "product.image", "product.price", "product.slug", "product.detail", "productsale.pricesale")
            ->limit($limit)
            ->get();
        $result = [
            'status' => true,
            'product' => $products,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }
  //san pham ban chay
    public function producthotbuy($limit)
    {
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as sum_qty'))
        ->groupBy('product_id');
        $orderdetail = Orderdetail::select('product_id', DB::raw('SUM(qty) as order_qty'))
        ->groupBy('product_id');
        // được tạo để tính tổng số lượng sản phẩm (SUM(qty)) cho mỗi product_id trong cả ProductStore và Orderdetail bảng.
        $products = Product::where("product.status", "=", 1)
        ->joinSub($productstore, 'productstore', function ($join) {
            $join->on('productstore.product_id', '=', 'product.id');
        })
            ->joinSub($orderdetail, 'orderdetail', function ($join) {
                $join->on('orderdetail.product_id', '=', 'product.id');
            })
            ->orderBy('orderdetail.order_qty', 'desc')
            // Câu truy vấn sắp xếp kết quả dựa trên số lượng đặt hàng (order_qty) giảm dần.

            ->select('product.id', 'product.name', 'product.image', 'product.price', 'product.slug')
            ->limit($limit)
            ->get();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }
    // tim kiem
    public function search(Request $request)
    {
        $query = $request->search;
        $products = Product::where('product.status', '!=', 0)
        ->where('product.name', 'like', '%' . $query . '%')
            ->orderBy('created_at', 'desc')

            ->get();
        $resul = [
            'status' => true,
            'product' => $products,
            'message' => 'Tai du lieu thanh cong',

        ];
        return response()->json($resul, 200);
    }

    public function product_all_filter(Request $request)
    {
        $perPage = 4; // Set the number of products per page

        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');
        $sortOrder = $request->input('sort_order', 'asc'); // Default to ascending order if not specified

        // Initialize the query for the product store quantity
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as total_qty'))
        ->groupBy('product_id');

        // Initialize the main product query with necessary joins
        $productsQuery = Product::where('product.status', 1)
        ->leftJoin('productsale', 'product.id', '=', 'productsale.product_id')
        ->leftJoinSub($productstore, "productstore", function ($join) {
            $join->on('product.id', '=', 'productstore.product_id');
        });

        // Apply price filtering if both min and max prices are provided
        if (!is_null($minPrice) && !is_null($maxPrice)) {
            $productsQuery->whereBetween('product.price', [$minPrice, $maxPrice]);
        }

        // Apply sorting based on price
        $productsQuery->orderBy('product.price', $sortOrder);

        // Paginate the results
        $products = $productsQuery->paginate($perPage);

        // Prepare the response data
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
        ];

        // Return the response as a JSON with HTTP status code 200
        return response()->json($result, 200);
    }

    public function product_category_filter($slug, Request $request) // product_category có filter theo giá vs sort
    {
        $perPage = 4; // Đặt số lượng sản phẩm trên mỗi trang

        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');


        // sắp xếp theo giá
        $sortOrder = $request->input('sort_order'); // Thêm tham số sắp xếp từ người dùng, mặc định là 'asc': tăng dần

        $args = [
            ['status', '=', 1],
            ['parent_id', '=', 0]
        ];
        $args = [
            ['status', '=', 1],
            ['slug', '=', $slug]
        ];
        $cat = Category::where($args)->first();
        $listcatid = array();
        array_push($listcatid, $cat->id);
        $args1 = [
            ['status', '=', 1],
            ['parent_id', '=', $cat->id]
        ];
        $list_category1 = Category::where($args1)->get();
        if (count($list_category1) > 0) {
            foreach ($list_category1 as $cat1) {
                array_push($listcatid, $cat1->id);
                $args2 = [
                    ['status', '=', 1],
                    ['parent_id', '=', $cat->id]
                ];
                $list_category2 = Category::where($args2)->get();
                if (count($list_category2) > 0) {
                    foreach ($list_category2 as $cat2) {
                        array_push($listcatid, $cat2->id);
                    }
                }
            }
        }
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as total_qty'))
        ->groupBy('product_id');
        $products = Product::where('product.status', '=', 1)
            ->leftJoin('productsale', 'product.id', '=', 'productsale.product_id')
            ->JoinSub($productstore, "productstore", function ($join) {
                $join->on('product.id', '=', 'productstore.product_id');
            })
            ->whereIn('product.category_id', $listcatid);

        // Áp dụng điều kiện lọc theo khoảng giá
        if (!is_null($minPrice) && !is_null($maxPrice)) {
            $products->whereBetween('product.price', [$minPrice, $maxPrice]);
        }

        // Áp dụng điều kiện sắp xếp
        $products->orderBy('product.price', $sortOrder);

        // Paginate the results
        $products = $products->paginate($perPage);

        // ->paginate($perPage);
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response()->json($result, 200);
    }

    public function product_brand_filter($slug, Request $request) // chưa có filter theo giá vs sort
    {
        $perPage = 4; // Đặt số lượng sản phẩm trên mỗi trang , nếu có phân trang thì truyền

        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');


        // sắp xếp theo giá
        $sortOrder = $request->input('sort_order'); // Thêm tham số sắp xếp từ người dùng, mặc định là 'asc': tăng dần


        $args = [
            ['status', '=', 1],
            ['slug', '=', $slug]
        ];
        $brand = Brand::where($args)->first();

        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as total_qty'))
        ->groupBy('product_id');
        $products = Product::where([['product.brand_id', '=', $brand->id], ['product.status', '=', 1]])
        ->leftJoin('productsale', 'product.id', '=', 'productsale.product_id')
        ->JoinSub($productstore, "productstore", function ($join) {
            $join->on('product.id', '=', 'productstore.product_id');
        });


        if (!is_null($minPrice) && !is_null($maxPrice)) {
            $products->whereBetween('product.price', [$minPrice, $maxPrice]);
        }

        // Áp dụng điều kiện sắp xếp
        $products->orderBy('product.price', $sortOrder);

        // Paginate the results
        $products = $products->paginate($perPage);

        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
        ];
        return response()->json($result, 200);
    }
}
