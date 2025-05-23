# Uber Clone Server API Documentation

## `/api/v1/users/register` User Registration Endpoint

### HTTP Method

`POST`

### Description

Registers a new user in the system. Requires a valid email, a first name with at least 3 characters, and a password with at least 6 characters. Returns a JWT token and user details upon successful registration.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `fullname.firstname` (string, required, min 3 chars)
- `fullname.lastname` (string, optional, min 3 chars if provided)
- `email` (string, required, valid email format)
- `password` (string, required, min 6 chars)

### Responses

#### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "message": "User registered successfully",
    "token": "<jwt_token>",
    "user": {
      "id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

#### Server Error

- **Status Code:** `500 Internal Server Error`
- **Body:**
  ```json
  {
    "error": "Error message"
  }
  ```

---

For more endpoints and details, see the source code.