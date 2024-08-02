<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    function index()
    {
        $banners = banner::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'link', 'status', 'image','position')
            ->get();
        $total = Banner::count();
        $result = [
            'status' => true,
            'banners' => $banners,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $banner = Banner::find($id);

        if ($banner === null) {
            $result = [
                'status' => false,
                'banner' => null,

                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'banner' => $banner,
            'message' => 'Tai du lieu thanh cong'
        ];

        return response()->json($result, 200);
    }


    public function store(Request $request)
    {
        $banner = new Banner();
        $banner->name = $request->name;
        $banner->link = $request->link;

        // Upload file -- reactjs
        $image = $request->file('image');

        if ($image != null && $image->isValid()) {
            $extension = $image->getClientOriginalExtension();

            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/banner'), $fileName);
                $banner->image = $fileName;
            } else {
                // Handle the case when no valid image is uploaded
                $banner->image = ''; // Or set it to null, depending on your database configuration
            }
        }

        // End upload

        $banner->position = $request->position;
        $banner->description = $request->description;
        $banner->created_at = now(); // Use the now() function to get the current timestamp
        $banner->created_by = 1; // tam
        $banner->status = $request->status;

        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Thêm dữ liệu thành công'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Không thể thêm dữ liệu'
        ];
        return response()->json($result, 200);
    }



    function update(Request $request, $id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $banner->name = $request->name;
        $banner->link = $request->link;
        // Upload file -- reactjs
        $image = $request->file('image');  // Use file() method to get the UploadedFile instance
        if ($image != null && $image->isValid()) {
            $extension = $image->getClientOriginalExtension();
            $image = $request->image;
            if ($image != null) {
                $extension = $image->getClientOriginalExtension();
                if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                    $fileName = date('YmdHis') . '.' . $extension;
                    $image->move(public_path('images/banner'), $fileName);
                    $banner->image = $fileName;
                }
            }
        }

        $banner->position = $request->position;
        $banner->description = $request->description;
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->updated_by = 1; //tam
        $banner->status = $request->status;

        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($banner->delete()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
    function status( $id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $banner->status = ($banner->status == 1)?2:1;
        $banner->updated_at = date('Y-m-d H:i:s');
        $banner->updated_by = 1; //tam
        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    function index1()
    {
        $banners = banner::where('status', '=', 1)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'link', 'status', 'image', 'position')
            ->get();
        $total = Banner::count();
        $result = [
            'status' => true,
            'banners' => $banners,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function delete(Request $request, $id)
    {
        $banner = Banner::find($id);
        if ($banner == null) {
            $result = [
                'status' => false,
                'banner' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $banner->status = $request->status;
        if ($banner->save()) {
            $result = [
                'status' => true,
                'banner' => $banner,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'banner' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    public function thungrac()
    {
        $banner = Banner::where('status', '=', 0)
        ->orderBy('created_at', 'desc')
        ->select('id', 'name', 'status', 'image')
        ->get();
        $total = Banner::count();
        $resul = [
            'status' => true,
            'banner' => $banner,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }
}
