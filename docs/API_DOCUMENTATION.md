# StudentHub API Documentation

## Authentication

POST /api/v1/admin/login

Request:

{
  "email": "admin@gmail.com",
  "password": "1234567"
}

Response:

{
  "success": true,
  "token": "jwt_token"
}