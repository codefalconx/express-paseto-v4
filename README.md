# PASETO v4 Token Server (Express.js)

A simple **Express.js** server that implements **PASETO v4.public (Ed25519)** tokens for secure authentication and authorization.  
This example demonstrates how to **issue** and **verify** public (asymmetric) tokens using the `paseto` library.

---

## 🚀 Features

- Uses **PASETO v4 (Ed25519)** for signing and verifying tokens.
- Implements two REST endpoints:
    - `POST /token` → issues a signed token
    - `POST /verify` → verifies a token’s validity
- Automatically generates a new **Ed25519 key pair** on startup.
- Built with **Express.js** and **Node.js** (ES Modules).

---

## 📦 Requirements

- **Node.js** v18 or higher
- **npm** or **yarn**

---

## ⚙️ Installation

```bash
# Clone this repository
git clone https://github.com/codefalconx/express-paseto-v4.git
cd express-paseto-v4

# Install dependencies
npm install express paseto tweetnacl dotenv
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root (optional):

```bash
PORT=3000
```

If not specified, the server defaults to port `3000`.

---

## ▶️ Run the Server

```bash
node server.js
```

You’ll see:

```
🟡 Generating Ed25519 key pair (v4.public) ...
✅ Keys ready, starting Express...
🚀 Server running on http://localhost:3000
```

---

## 📚 API Endpoints

### 1. Issue Token

**POST** `/token`

#### Request Body
```json
{
  "userId": "123",
  "role": "admin"
}
```

#### Response
```json
{
  "token": "v4.public.eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4iLC..."
}
```

---

### 2. Verify Token

**POST** `/verify`

#### Request Body
```json
{
  "token": "v4.public.eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4iLC..."
}
```

#### Response (valid)
```json
{
  "valid": true,
  "payload": {
    "userId": 123,
    "role": "admin",
    "issuedAt": "2025-12-28T21:41:15.485Z",
    "iat": "2025-12-28T21:41:15.501Z",
    "exp": "2025-12-28T22:41:15.501Z",
    "aud": "users",
    "iss": "my-app"
  }
}
```

#### Response (invalid/expired)
```json
{
  "error": "Invalid or expired token"
}
```

---

## 🧠 How It Works

1. **Key Generation:**  
   The server generates an Ed25519 key pair using Node’s `crypto` module.

2. **Token Signing:**  
   `/token` signs a payload with the private key using `V4.sign()` from the `paseto` library.

3. **Token Verification:**  
   `/verify` validates the token using the corresponding public key with `V4.verify()`.

4. **Security:**
    - Tokens are asymmetric (public/private).
    - Expiration (`expiresIn`) and issuer/audience claims are enforced.

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **PASETO v4 (paseto library)**
- **Ed25519 cryptography**

---

## 🛡️ Notes

- This example regenerates a new key pair on each startup.  
  For production, store your keys securely (e.g., in `.pem` files or a secrets manager).
- Use HTTPS in production for secure transport.

---

## 📄 License

MIT License © 2025 codefalconx
