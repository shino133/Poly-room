# laravel-react-example
1. Giới thiệu
Tên dự án: FPoly Booking
Mô tả ngắn gọn: Hệ thống đặt phòng dành cho giảng viên và sinh viên.
Phiên bản: 1.0.0
Tác giả: CLB IT - FPoly Hà Nam
Ngày: 26/07/2024
## Các tính năng chính:
Đặt phòng theo ngày và giờ.
Quản lý lịch sử đặt phòng.
Tạo và quản lý tài khoản người dùng.
Thông báo qua email về trạng thái đặt phòng.

2. Cài đặt và triển khai
Phần mềm: PHP 8.2+, MySQL 5.7+, Composer, Laravel 8.x.
# Hướng dẫn cài đặt
Clone repository từ GitHub:
git clone https://github.com/example/product-management.git
cd product-management

## Cài đặt các package cần thiết:
composer install

### Thiết lập admin
1. cd admin
2. npm install
3. Tạo file .env
4. Cấu hình file env (copy .env.example)
5. npm run dev 

### Thiết lập client
1. cd client
2. npm install
3. Tạo file .env
4. Cấu hình file env (copy .env.example) 
5. npm run dev 

## Cấu hình tệp .env:
APP_NAME=ProductManagement
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=product_management
DB_USERNAME=root
DB_PASSWORD=

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=http://127.0.0.1:3000
SANCTUM_STATEFUL_DOMAINS=http://127.0.0.1:3000
## Tạo app key 
php artisan key:generate

## Chạy migrations và seed database:
php artisan migrate --seed

## Khởi động server:
php artisan serve



## Setup Mailtrap test  
<pre>
    - Truy cập https://mailtrap.io/
    - Đăng kí 1 tài khoản
    - Ở sidebar chọn Email Testing -> Inboxes -> My Inbox
    - Kéo xuống Code Sample -> chọn PHP -> chọn Laravel 9+
    - Copy phần code bên dưới và dán vào env phần mail
            MAIL_MAILER=log
            MAIL_HOST=127.0.0.1
            MAIL_PORT=2525
            MAIL_USERNAME=null
            MAIL_PASSWORD=null
            MAIL_ENCRYPTION=null
            MAIL_FROM_ADDRESS="hello@example.com"
            MAIL_FROM_NAME="${APP_NAME}"
</pre>
