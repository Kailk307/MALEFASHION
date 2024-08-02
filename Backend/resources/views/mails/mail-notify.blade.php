<!DOCTYPE html>
<html>

<head>
    <!-- <title>Failed Login Attempt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background-color: #007bff;
            color: #ffffff;
            padding: 10px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }

        .email-body {
            padding: 20px;
        }

        .email-body h2 {
            color: #333333;
        }

        .email-body p {
            color: #555555;
            line-height: 1.6;
        }

        .email-footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #777777;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 10px;
            color: #ffffff;
            background-color: #007bff;
            border-radius: 5px;
            text-decoration: none;
        }

        .btn:hover {
            background-color: #0056b3;
        }
    </style> -->
</head>

<body>
    
    <div class="email-container">
        <div class="email-header">
            <h1>Thông báo</h1>
        </div>
        <div class="email-body">
            <h2>{{ $data['type'] }}</h2>
            <p> {{ $data['content'] }}</p>
            
        </div>
      
    </div>
</body>

</html>