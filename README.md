# BloodBank – Modern Blood Donation & Request Platform

BloodBank is a full-stack application built with Next.js, MongoDB, and Firebase Authentication.  
It allows users to request blood, register as donors, manage their profiles, and browse donors based on location and blood group.

---

## Features

### Authentication
- Email & password login (Firebase)
- Google login
- Auth state persistence
- Secure token storage with cookies

### Blood Requests
- Submit a blood request
- View all public blood requests
- Manage your own requests (delete/view)
- Dynamic division → district → upazila system

### Donor Management
- Register as a donor
- List of all donors
- Detailed donor profile view

### User Profile
- View and update profile information
- Auto-fetch data from MongoDB
- Read-only name & email (from Firebase)

### UI & Experience
- Fully responsive (mobile/tablet/desktop)
- Tailwind CSS + DaisyUI design system
- Loading spinners and smooth UI transitions
- Interactive coverage map using React Leaflet

---

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 18
- Tailwind CSS
- DaisyUI
- React Hook Form
- React Query

### Backend
- Next.js API Routes
- MongoDB (Native Driver)
- Firebase Authentication

### Hosting
- Vercel (frontend + API)
- MongoDB Atlas (database)
- Firebase Console (auth)

---

