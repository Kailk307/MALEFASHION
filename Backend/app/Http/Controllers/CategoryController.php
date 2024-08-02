<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    function index()
    {
        $categories = Category::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug', 'status', 'image')
            ->get();
        $total = Category::count();
        $result = [
            'status' => true,
            'categories' => $categories,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $category = Category::find($id);

        if ($category === null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'category' => $category,
            'message' => 'Tai du lieu thanh cong'
        ];

        return response()->json($result, 200);
    }


    function store(Request $request)
    {
        $category = new Category();
        $category->name = $request->name;
        $category->slug = Str::of($request->name)->slug('-');
        // Upload file -- reactjs
        $image = $request->file('image');  // Use file() method to get the UploadedFile instance
        if ($image != null && $image->isValid()) {
            $extension = $image->getClientOriginalExtension();
            $image = $request->image;
            if ($image != null) {
                $extension = $image->getClientOriginalExtension();
                if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                    $fileName = date('YmdHis') . '.' . $extension;
                    $image->move(public_path('images/category'), $fileName);
                    $category->image = $fileName;
                }
            }
        }


        // end upload

        $category->sort_order = $request->sort_order;
        $category->description = $request->description;
        $category->created_at = date('Y-m-d H:i:s');
        $category->created_by = 1; //tam
        $category->status = $request->status;

        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $category->name = $request->name;
        $category->slug = Str::of($request->name)->slug('-');
        // Upload file -- reactjs
        $image = $request->file('image');  // Use file() method to get the UploadedFile instance
        if ($image != null && $image->isValid()) {
            $extension = $image->getClientOriginalExtension();
            $image = $request->image;
            if ($image != null) {
                $extension = $image->getClientOriginalExtension();
                if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                    $fileName = date('YmdHis') . '.' . $extension;
                    $image->move(public_path('images/category'), $fileName);
                    $category->image = $fileName;
                }
            }
        }

        $category->sort_order = $request->sort_order;
        $category->description = $request->description;
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = 1; //tam
        $category->status = $request->status;

        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($category->delete()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
    function status( $id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $category->status = ($category->status == 1)?2:1;
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = 1; //tam
        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    public function index1()
    {
        // $data = category::all(); // Lấy dữ liệu từ database
        // return response()->json($data);
        $brand = Category::where('status', '=', 1)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'slug','parent_id', 'status', 'image')
            ->get();
        $total = Category::count();
        $resul = [
            'status' => true,
            'category' => $brand,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }
    function delete(Request $request, $id)
    {
        $category = Category::find($id);
        if ($category == null) {
            $result = [
                'status' => false,
                'category' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $category->status = $request->status;
        if ($category->save()) {
            $result = [
                'status' => true,
                'category' => $category,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'category' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    public function thungrac()
    {
        $category = Category::where('status', '=', 0)
        ->orderBy('created_at', 'desc')
        ->select('id', 'name', 'status', 'image')
        ->get();
        $total = Category::count();
        $resul = [
            'status' => true,
            'category' => $category,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }
}
