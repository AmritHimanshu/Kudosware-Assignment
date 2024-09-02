# YourHR - Job Search Service
> **Note:** This project was developed as part of an assignment.

### https://kudosware-assignment-seven.vercel.app/

## Project Overview

**YourHR** is a job search service that aims to help job seekers find the ideal job roles based on their qualifications and preferences. The application allows users to sign up, submit their resumes, and manage their profiles. It’s a straightforward, user-friendly platform that ensures seamless interaction between job seekers and their profiles.

## Features

- **User Signup**: 
  - Users can create an account by providing their name, email, password, and uploading a resume.
  - Password and confirm password fields include a show/hide password toggle for user convenience.
  - The form ensures that all fields are filled out correctly before submission.

- **User Signin**:
  - Registered users can log in using their email and password.
  - After successful authentication, users can access and manage their profiles.

- **Profile Management**:
  - Users can view and edit their profile information, including updating their name, email, password, and resume.
  - The edit profile page is responsive and easy to use on different screen sizes.

- **Resume Upload**:
  - Users can upload their resumes in PDF format, which is securely stored on Cloudinary.
  - Uploaded resumes can be updated via the profile management page.

## Technology Stack

### Frontend

- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework used for styling the application.
- **FormData API**: Used for handling form submissions, including file uploads.

### Backend

- **Node.js**: JavaScript runtime environment for building the server-side logic.
- **Express.js**: A minimal and flexible Node.js web application framework used for creating API endpoints.
- **PostgreSQL**: A powerful, open-source relational database system used for storing user information.
- **Multer**: A Node.js middleware used for handling file uploads in forms.

### Cloud Storage

- **Cloudinary**: A cloud service used to store and manage uploaded resumes.

## Setup Instructions

### Prerequisites

- **Node.js** (v12 or higher)
- **PostgreSQL** (v10 or higher)
- **NPM** or **Yarn**
- **Cloudinary Account**: For storing resumes

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/yourhr.git
   cd yourhr
   
## Installation

2. **Install Dependencies**:
   ```bash
   npm install

## Setup Environment Variables

Create a `.env` file in the root directory and add the following environment variables:
```bash
DATABASE_URL=postgres://username:password@localhost:5432/yourhr
CLOUDINARY_URL=cloudinary://your-cloudinary-api-key

## Database Setup

- Ensure PostgreSQL is running.
- Create the required database by running the following commands in the PostgreSQL CLI:
  ```sql
  CREATE DATABASE yourhr;

## Start the Server

Start the backend server using the following command:
```bash
npm start



