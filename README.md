
```markdown
# 📚 Bookworm Backend

The robust backend engine for the Bookworm application. This API handles user authentication, book library management, reading lists, and review systems.

## ✨ Key Features

* **User Authentication:** Secure Sign-up and Login using JWT (JSON Web Tokens).
* **Book Management:** Full CRUD (Create, Read, Update, Delete) operations for the book catalog.
* **Reading Lists:** Manage user-specific "Want to Read", "Reading", and "Read" statuses.
* **Search Engine:** Filter books by title, author, or genre.
* **Security:** Password hashing with `bcrypt` and protected API routes.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (with Mongoose)
* **Auth:** JWT & Bcrypt

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/Alauddin-24434/BookWorm_Backend.git](https://github.com/Alauddin-24434/BookWorm_Backend.git)
cd BookWorm_Backend

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Environment Setup

Create a `.env` file in the root directory and add your configuration:

```env
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
ENV=production
PORT=5000
MONGO_URI=




CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=


```

### 4. Run the Server

**Development Mode (Auto-reload):**

```bash
npm run dev

```

**Production Mode:**

```bash
npm run prod



