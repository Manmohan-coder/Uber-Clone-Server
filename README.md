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

## `/api/v1/users/login` User Login Endpoint

### HTTP Method

`POST`

### Description

Authenticates a user with email and password. Returns a JWT token and user details upon successful login.

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

- `email` (string, required, valid email format)
- `password` (string, required, min 6 chars)

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "User logged in successfully",
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

#### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
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

## `/api/v1/users/me` Get Current User Endpoint

### HTTP Method

`GET`

### Description

Retrieves the currently authenticated user's information. Requires a valid JWT token in the `Authorization` header or as a cookie.

### Headers

- `Authorization: Bearer <jwt_token>` (or send token as a cookie named `token`)

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "User retrieved successfully",
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

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
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

## `/api/v1/users/logout` User Logout Endpoint

### HTTP Method

`GET`

### Description

Logs out the currently authenticated user by blacklisting their JWT token and clearing the authentication cookie.

### Headers

- `Authorization: Bearer <jwt_token>` (or send token as a cookie named `token`)

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "User logged out successfully"
  }
  ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
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
## `/api/v1/captains/register` Captain Registration Endpoint

### HTTP Method

`POST`

### Description

Registers a new captain (driver) in the system. Requires valid personal and vehicle information. Returns a JWT token and captain details upon successful registration.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

- `fullname.firstname` (string, required, min 3 chars)
- `fullname.lastname` (string, required, min 3 chars)
- `email` (string, required, valid email format)
- `password` (string, required, min 6 chars)
- `vehicle.color` (string, required, min 3 chars)
- `vehicle.plate` (string, required, min 5 chars, unique)
- `vehicle.capacity` (number, required, min 1)
- `vehicle.vehicleType` (string, required, one of: `car`, `bike`, `auto`)

### Responses

#### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "message": "Captain registered successfully",
    "token": "<jwt_token>",
    "captain": {
      "id": "<captain_id>",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

#### Duplicate Email

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Email already exists"
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
## `/api/v1/captains/login` Captain Login Endpoint

### HTTP Method

`POST`

### Description

Authenticates a captain (driver) with email and password. Returns a JWT token and captain details upon successful login.

### Request Body

Send a JSON object with the following structure:

```json
{
  "email": "jane.smith@example.com",
  "password": "yourpassword"
}
```

- `email` (string, required, valid email format)
- `password` (string, required, min 6 chars)

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Captain logged in successfully",
    "token": "<jwt_token>",
    "captain": {
      "id": "<captain_id>",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

#### Invalid Credentials

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
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

## `/api/v1/captains/me` Get Captain Profile Endpoint

### HTTP Method

`GET`

### Description

Retrieves the currently authenticated captain's profile information. Requires a valid JWT token in the `Authorization` header or as a cookie.

### Headers

- `Authorization: Bearer <jwt_token>` (or send token as a cookie named `token`)

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Captain profile retrieved successfully",
    "captain": {
      "id": "<captain_id>",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC1234",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### Not Found

- **Status Code:** `404 Not Found`
- **Body:**
  ```json
  {
    "message": "Captain not found"
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

## `/api/v1/captains/logout` Captain Logout Endpoint

### HTTP Method

`GET`

### Description

Logs out the currently authenticated captain by blacklisting their JWT token and clearing the authentication cookie.

### Headers

- `Authorization: Bearer <jwt_token>` (or send token as a cookie named `token`)

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
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