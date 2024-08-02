<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Validator; 
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Recipient;

use App\Jobs\SendEmail;
use Illuminate\Support\Str;

class UserController extends Controller
{

    function index()
    {
        $user = User::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'username', 'status', 'gender', 'phone', 'email','password')
            ->get();
        $total = User::count();
        $result = [
            'status' => true,
            'user' => $user,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $user = User::find($id);

        if ($user === null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'user' => $user,
            'message' => 'Tai du lieu thanh cong'
        ];

        return response()->json($result, 200);
    }


    function store(Request $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password = $request->password;
        $user->gender = $request->gender;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->roles = $request->roles;



        $user->created_at = date('Y-m-d H:i:s');
        $user->created_by = 1; //tam
        $user->status = $request->status;

        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null, 'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $user->name = $request->name;
        $user->username = $request->username;
        $user->password = $request->password;
        $user->gender = $request->gender;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->roles = $request->roles;

        $user->created_at = date('Y-m-d H:i:s');
        $user->created_by = 1; //tam
        $user->status = $request->status;

        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($user->delete()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
    function status($id)
    {
        $user = User::find($id);
        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $user->status = ($user->status == 1) ? 2 : 1;
        $user->updated_at = date('Y-m-d H:i:s');
        $user->updated_by = 1; //tam
        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }
    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        // Replace 'User' with the actual model representing your users
        $user = User::where('username', $username)->first();

        if ($user) {
            // Use Hash::check to compare hashed passwords
            if (Hash::check($password, $user->password)) {
                // Authentication successful
                $result = [
                    'status' => true,
                    'message' => 'Login successful',
                    'user' => $user,
                ];
                return response()->json($result, 200);
            }
        }

        // Authentication failed
        $result = [
            'status' => false,
            'message' => 'Invalid username or password',
        ];
        return response()->json($result, 401);
    }
    public function register(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string',
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:6',
            'gender' => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'required|email|unique:users',
            'roles' => 'nullable|string',
            'status' => 'nullable|integer',
        ]);

        // Create a new User instance
        $user = new User();

        // Populate properties from the validated data
        $user->name = $validatedData['name'];
        $user->username = $validatedData['username'];
        $user->password = Hash::make($validatedData['password']);
        $user->gender = $validatedData['gender'] ?? null;
        $user->phone = $validatedData['phone'] ?? null;
        $user->email = $validatedData['email'];
        $user->roles = $validatedData['roles'] ?? null;
        $user->created_at = now();
        $user->created_by = 1; // tam
        $user->status = $validatedData['status'] ?? 1;

        // Save the user to the database
        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'User registered successfully',
            ];
            return response()->json($result, 201);
        }

        // If save fails
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Failed to register user',
        ];
        return response()->json($result, 422);
    }
    public function changePassword(Request $request, $id)
    {
        $user = User::find($id);

        if ($user == null) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Không tìm thấy người dùng',
            ];
            return response()->json($result, 404);
        }

        // Kiểm tra mật khẩu cũ
        if (!Hash::check($request->old_password, $user->password)) {
            $result = [
                'status' => false,
                'user' => null,
                'message' => 'Mật khẩu cũ không chính xác',
            ];
            return response()->json($result, 422);
        }

        // Cập nhật mật khẩu mới
        $user->password = bcrypt($request->new_password);

        if ($user->save()) {
            $result = [
                'status' => true,
                'user' => $user,
                'message' => 'Đổi mật khẩu thành công',
            ];
            return response()->json($result, 200);
        }

        // Nếu cập nhật thất bại
        $result = [
            'status' => false,
            'user' => null,
            'message' => 'Không thể đổi mật khẩu',
        ];
        return response()->json($result, 500);
    }

    public function index1()
    {
        $users = User::all();
        return view('user', compact('users'));
    }
    public function store1(Request $request)
    {
        // Tạo mới người dùng
        $user = new User();
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password = bcrypt($request->password); // Bảo mật mật khẩu bằng cách mã hóa nó
        $user->gender = $request->gender;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->roles = $request->roles;
        // $user->provider = $request->provider;
        // $user->provider_id = $request->provider_id;
        $user->created_at = now(); // Sử dụng now() để lấy thời gian hiện tại
        $user->created_by = 1; // tam
        $user->status = $request->status;
        $user->save();

        // Chuẩn bị dữ liệu thông báo
        $message = [
            'type' => 'Tạo liên hệ mới thành công',
            'user' => $user->name,
            'content' => 'Đã thêm 1 liên lạc mới!',
        ];

        // Lấy địa chỉ email từ request (hoặc đặt email cố định ở đây)
        $recipientEmail = $request->input('email'); // Hoặc bạn có thể đặt email cố định như 'example@example.com'

        // Dispatch SendEmail job chỉ gửi đến một địa chỉ email cụ thể
        SendEmail::dispatch($message, $recipientEmail)->delay(now()->addMinute(1));

        // Chuyển hướng về trang trước đó
        return redirect()->back();
    }

    public function delete1($id)
    {
        $users= User::find($id);
        $users->delete();

        $recipients = Recipient::all();

        // Prepare the message data
        $message = [
            'type' => 'Create user',
            'user' => $users->name,
            'content' => 'has been created!',
        ];

        // Dispatch the SendEmail job
        SendEmail::dispatch($message, $recipients)->delay(now()->addMinute(1));

        return redirect()->back();
    }
}
