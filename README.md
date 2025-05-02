# Klimb Assignment - User Management System

A clean, responsive React application for managing users with TypeScript. This application allows you to add, edit, search, and delete users with form validation and data persistence.

## Features

- **User Management**
  - Add new users with form validation
  - Edit existing users
  - Delete users with confirmation
  - Search users by email with autocomplete
  - Display user's full name in search suggestions

- **Form Validation**
  - Email format validation
  - Phone number validation (10 digits)
  - All fields are mandatory
  - No duplicate emails allowed

- **Data Persistence**
  - User data is saved to localStorage
  - Data persists between browser sessions

- **Responsive Design**
  - Works on desktop and mobile devices
  - Clean, intuitive user interface

## Technologies Used

- **React** - UI library
- **TypeScript** - Type safety
- **Formik** - Form handling
- **Yup** - Form validation
- **CSS** - Styling
- **localStorage** - Data persistence

## Project Structure

```
user-management-app/
├── src/
│   ├── components/
│   │   ├── UserForm.tsx - Form for adding/editing users
│   │   ├── UserForm.css - Styles for the form
│   │   ├── UserList.tsx - Component for displaying and searching users
│   │   └── UserList.css - Styles for the user list
│   ├── types/
│   │   └── User.ts - Type definitions
│   ├── App.tsx - Main application component
│   ├── App.css - Main application styles
│   ├── main.tsx - Entry point
│   └── index.css - Global styles
├── public/
│   └── index.html - HTML template
└── package.json - Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/klimb-assignment.git
   cd klimb-assignment
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Adding a User
1. Fill out the form at the top of the page
2. All fields are mandatory
3. Click "Add User"

### Editing a User
1. Click the "Edit" button next to a user
2. Modify the user's information in the form
3. Click "Update User" to save changes or "Cancel" to discard

### Deleting a User
1. Click the "Delete" button next to a user
2. Confirm the deletion in the popup dialog

### Searching for Users
1. Type in the search box
2. The list will filter as you type
3. Email suggestions will appear with the user's full name

## Assignment Requirements

This project was created as part of a technical assignment with the following requirements:

- Create a React application with TypeScript
- Implement add/edit/display/search functionality for users
- Create a form with validation for email format, phone number, and mandatory fields
- Prevent duplicate email IDs
- Implement email search with autocomplete showing user's full name
- Use a single component for both add and edit user forms
