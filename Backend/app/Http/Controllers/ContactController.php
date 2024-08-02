<?php


namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\Recipient;
use App\Jobs\SendEmail;
use Illuminate\Support\Facades\Validator;
class ContactController extends Controller
{
    function index()
    {
        $Contacts = Contact::where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->select('id', 'name', 'id', 'status', 'email','phone')
            ->get();
        $total = Contact::count();
        $result = [
            'status' => true,
            'Contacts' => $Contacts,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }
    function show($id)
    {
        $Contact = Contact::find($id);
        if ($Contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'contact' => $Contact,
            'message' => 'Tai du lieu thanh cong'
        ];
        return response()->json($result, 200);
    }

    function status( $id)
    {
        $Contact = Contact::find($id);
        if ($Contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $Contact->status = ($Contact->status == 1)?2:1;
        $Contact->updated_at = date('Y-m-d H:i:s');
        $Contact->updated_by = 1; //tam
        if ($Contact->save()) {
            $result = [
                'status' => true,
                'contact' => $Contact,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'brand' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }


    function store(Request $request)
    {
        $Contact = new Contact();
        $Contact->name = $request->name;
        $Contact->contact_id = $request->contact_id;  
        $Contact->email = $request->email;
        $Contact->phone= $request->phone;
        $Contact->title = $request->title;
        $Contact->content = $request->content;
        $Contact->created_at = date('Y-m-d H:i:s');
        $Contact->created_by = 1; //tam
        $Contact->status = $request->status;

        if ($Contact->save()) {
            $result = [
                'status' => true,
                'Contact' => $Contact,
                'message' => 'Them du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'Contact' => null,
            'message' => 'Khong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $Contact = Contact::find($id);
        if ($Contact == null) {
            $result = [
                'status' => false,
                'Contact' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        $Contact = new Contact();
        $Contact->name = $request->name;
        $Contact->contact_id = $request->contact_id;
        $Contact->email = $request->email;
        $Contact->phone = $request->phone;
        $Contact->title = $request->title;
        $Contact->content = $request->content;
        $Contact->created_at = date('Y-m-d H:i:s');
        $Contact->created_by = 1; //tam
        $Contact->status = $request->status;

        if ($Contact->save()) {
            $result = [
                'status' => true,
                'Contact' => $Contact,
                'message' => 'Cap nhat du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'Contact' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $Contact = Contact::find($id);
        if ($Contact == null) {
            $result = [
                'status' => false,
                'brand' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }

        if ($Contact->delete()) {
            $result = [
                'status' => true,
                'contact' => $Contact,
                'message' => 'Xoa du lieu thanh cong'
            ];
            return response()->json($result, 200);
        }

        // If delete fails
        $result = [
            'status' => false,
            'contact' => null,
            'message' => 'Khong the xoa du lieu'
        ];
        return response()->json($result, 200);
    }
    // Add this method to your ContactController class

    function delete(Request $request, $id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'contact' => null,
                'message' => 'Khong tim thay du lieu'
            ];
            return response()->json($result, 404);
        }
        $contact->status = $request->status;
        if ($contact->save()) {
            $result = [
                'status' => true,
                'contact' => $contact,
                'message' => 'Da xoa vao thung rac'
            ];
            return response()->json($result, 200);
        }

        // If save fails
        $result = [
            'status' => false,
            'contact' => null,
            'message' => 'Khoong the them du lieu'
        ];
        return response()->json($result, 200);
    }

    public function thungrac()
    {
        $contact = Contact::where('status', '=', 0)
        ->orderBy('created_at', 'desc')
        ->select('id', 'name','phone')
        ->get();
        $total = Contact::count();
        $resul = [
            'status' => true,
            'contact' => $contact,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($resul, 200);
    }

    // ... Other methods ...
    // gửi mail
    public function index1()
    {
        $contact = Contact::all();
        return view('contact', compact('contacts'));
    }
    public function store1(Request $request)
    {
        // Tạo mới người dùng
        $Contact = new Contact();
        $Contact->name = $request->name;
        $Contact->contact_id = $request->contact_id;
        $Contact->email = $request->email;
        $Contact->phone = $request->phone;
        $Contact->title = $request->title;
        $Contact->content = $request->content;
        $Contact->created_at = date('Y-m-d H:i:s');
        $Contact->created_by = 1; //tam
        $Contact->status = $request->status;

        // Chuẩn bị dữ liệu thông báo
        $message = [
            'type' => '',
            'contact' => $Contact->content,
            'content' => 'Cảm ơn bạn đã phản hồi với shop, mong sẽ luôn được mọi người ủng hộ',
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
        $contact = Contact::find($id);
        $contact->delete();

        $recipients = Recipient::all();

        // Prepare the message data
        $message = [
            'type' => 'Create contact',
            'contact' => $contact->name,
            'content' => 'has been created!',
        ];

        // Dispatch the SendEmail job
        SendEmail::dispatch($message, $recipients)->delay(now()->addMinute(1));

        return redirect()->back();
    }
}
