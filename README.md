# Thinkr - Notes Keeping App

> A full-stack cloud-based note-taking application with authentication, built using React, Node.js, Express, and MongoDB.

---

## Features

- **User Authentication**: Sign up, log in, and log out securely using JWT tokens.
- **Notes CRUD**: Create, read, update, and delete your personal notes.
- **Tagging**: Add tags to notes for better organization.
- **Responsive UI**: Modern, mobile-friendly interface using React Bootstrap.
- **Persistent Storage**: All notes are stored securely in MongoDB.
- **Protected Routes**: Only authenticated users can access and manage their notes.

---

## Tech Stack

- **Frontend**: React, React Router, React Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Styling**: Custom CSS, Bootstrap

---

## Project Structure

```
Thinkr - Notes Keeping/
├── backend/           # Express backend (API, models, middleware)
├── public/            # Static files for React app
├── src/               # React frontend source code
│   ├── components/    # React components (Addnote, Notes, Login, Signup, etc.)
│   ├── context/       # React Context for notes state management
│   └── stylesheets/   # Custom CSS files
├── package.json       # Project metadata and scripts
└── README.md          # This file
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended)
- MongoDB (local or cloud instance)

### 1. Clone the Repository

```sh
git clone <repo-url>
cd "Thinkr - Notes Keeping"
```

### 2. Install Dependencies

#### For the frontend:

```sh
npm install
```

#### For the backend:

```sh
cd backend
npm install
```

### 3. Configure Environment

- By default, the backend connects to MongoDB at `mongodb://localhost:27017/inotebook`.
- You can change this in `backend/db.js` if needed.
- JWT secret is hardcoded for demo; update it for production in `backend/routes/auth.js` and `backend/middleware/fetchuser.js`.

### 4. Run the Application

#### Start both frontend and backend concurrently:

```sh
npm run both
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

---

## Usage

1. **Sign Up** for a new account or **Log In** if you already have one.
2. **Add Notes**: Use the form to create new notes with a title, description, and optional tag.
3. **Edit/Delete Notes**: Use the edit and delete icons on each note card.
4. **Log Out**: Use the logout button in the navbar.

---

## API Endpoints (Backend)

- `POST   /api/auth/user/signup` - Register a new user
- `POST   /api/auth/user/login` - Log in and receive JWT
- `POST   /api/auth/user/detail` - Get user details (auth required)
- `GET    /api/notes/show` - Get all notes for user (auth required)
- `POST   /api/notes/upload` - Add a new note (auth required)
- `PUT    /api/notes/update/:id` - Update a note (auth required)
- `DELETE /api/notes/delete/:id` - Delete a note (auth required)

---

## Folder Details

- **backend/**: Express server, API routes, MongoDB models, authentication middleware.
- **src/components/**: React UI components (Addnote, Notes, Noteitem, Login, Signup, Navbar, etc.)
- **src/context/notes/**: React Context API for global notes state and actions.
- **src/stylesheets/**: Custom CSS for theming and layout.

---

## Scripts

- `npm start` - Start React frontend
- `npm run both` - Start both frontend and backend (needs `concurrently`)
- `cd backend && nodemon index.js` - Start backend only (with auto-reload)

---

## License

This project is for educational/demo purposes. Please update the license as needed.

---

## Credits

- Inspired by iNotebook and modern note-taking apps.
- Built with [React](https://reactjs.org/), [Express](https://expressjs.com/), and [MongoDB](https://www.mongodb.com/).

---

## Screenshots

_Add screenshots of the app UI here if desired._

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Contact

For questions or feedback, please open an issue or contact the maintainer.
