# Digital Life Lessons – Frontend

A modern, responsive full-stack web application where users can share, save, and discover meaningful life lessons. Built with React, Vite, DaisyUI, Tailwind CSS, and Firebase authentication.

Live Demo
https://digital-life-client.vercel.app/

## Features

- Email/Password + Google Login
- Premium membership with lifetime access (Stripe integration)
- Create, edit, delete personal life lessons
- Public lessons with filters, search, pagination
- Like, save, report, comment on lessons
- Admin panel (manage users, lessons, reports)
- Dark mode + beautiful animations (AOS + Lottie)
- Responsive design (mobile, tablet, desktop)

## Tech Stack

- **Frontend**: React 18, Vite, React Router, TanStack Query, React Hook Form
- **UI**: DaisyUI, Tailwind CSS, AOS (animations), Lottie React
- **Auth**: Firebase Authentication
- **State**: Context API + Custom Hooks
- **Payments**: Stripe Checkout
- **Others**: SweetAlert2, Axios, Tippy.js (tooltips)

## Installation

1. Clone the repo
```bash
git clone https://github.com/yourusername/digital-life-lessons-client.git
cd digital-life-lessons-client

npm install
VITE_image_host_key=your_imgbb_api_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
npm run dev
```
