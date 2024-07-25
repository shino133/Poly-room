<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Status</title>
    <style>
        /* Bootstrap CSS */
        @import url('https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css');
    </style>
</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card mt-5">
                    <div class="card-header bg-primary text-white">
                        <h4>Booking {{ $mailData['status'] }}</h4>
                    </div>
                    <div class="card-body">
                        <p>Dear {{ $mailData['name'] }},</p>
                        <p>We are pleased to inform you that your booking status is as follows:</p>
                        <ul>
                            <li><strong>Room Number:</strong> {{ $mailData['roomNumber'] }}</li>
                            <li><strong>Status:</strong> {{ $mailData['status'] }}</li>
                            <li><strong>Check-in Date:</strong> {{ $mailData['checkInDate'] }}</li>
                            <li><strong>Check-out Date:</strong> {{ $mailData['checkOutDate'] }}</li>
                        </ul>
                        <p>Thank you for choosing our service.</p>
                        <p>Best Regards,<br>Your Company</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
