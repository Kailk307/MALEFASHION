<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment; // Import model Comment
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    function index()
    {
        $Cọmments = Comment::where('id', '!=', 0)
        ->orderBy('created_at', 'desc')
        ->select('id', 'name', 'id', 'comment', 'email', 'phone')
        ->get();
        $total = Comment::count();
        $result = [           
            'Cọmments' => $Cọmments,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    // Phương thức để lưu bình luận vào cơ sở dữ liệu
    public function store(Request $request)
    {
        // Validate dữ liệu đầu vào
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'comment' => 'required|string',
            'email' => 'required|string|email|max:255',
            'phone' => 'required|string|max:15',
        ]);

        try {
            // Tạo và lưu bình luận mới từ dữ liệu được gửi từ frontend
            $comment = Comment::create([
                'name' => $validatedData['name'],
                'comment' => $validatedData['comment'],
                'email' => $validatedData['email'],
                'phone' => $validatedData['phone'],
            ]);

            // Trả về kết quả thành công với dữ liệu bình luận
            return response()->json(['message' => 'Comment saved successfully', 'data' => $comment], 200);
        } catch (\Exception $e) {
            // Ghi lại lỗi nếu có
            Log::error('Error saving comment: ' . $e->getMessage());

            // Trả về mã lỗi và thông báo lỗi
            return response()->json(['message' => 'Error saving comment', 'error' => $e->getMessage()], 500);
        }
    }
}
