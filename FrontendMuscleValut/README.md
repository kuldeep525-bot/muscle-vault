frontend/
├── public/
│ └── images/ # Gym photos yahan rakhna
│
├── src/
│ ├── components/
│ │ ├── layout/
│ │ │ ├── Navbar.jsx
│ │ │ ├── Footer.jsx
│ │ │ └── Layout.jsx
│ │ │
│ │ ├── sections/ # Landing page ke sections
│ │ │ ├── Hero.jsx
│ │ │ ├── About.jsx
│ │ │ ├── Features.jsx
│ │ │ ├── Plans.jsx
│ │ │ ├── Trainers.jsx
│ │ │ ├── Testimonials.jsx
│ │ │ ├── Gallery.jsx
│ │ │ └── Contact.jsx
│ │ │
│ │ ├── admin/ # Admin dashboard components
│ │ │ ├── Sidebar.jsx
│ │ │ ├── DashboardStats.jsx
│ │ │ ├── MembersTable.jsx
│ │ │ ├── AttendanceTable.jsx
│ │ │ ├── PlansManager.jsx
│ │ │ ├── TrainersManager.jsx
│ │ │ └── InquiriesTable.jsx
│ │ │
│ │ ├── auth/
│ │ │ ├── LoginForm.jsx
│ │ │ └── SignupForm.jsx
│ │ │
│ │ └── ui/ # Reusable small components
│ │ ├── Button.jsx
│ │ ├── Modal.jsx
│ │ ├── Loader.jsx
│ │ └── StatCard.jsx
│ │
│ ├── pages/
│ │ ├── Home.jsx # Landing page
│ │ ├── Login.jsx
│ │ ├── Signup.jsx
│ │ ├── Dashboard.jsx # Admin dashboard
│ │ ├── Members.jsx
│ │ ├── Attendance.jsx
│ │ ├── Plans.jsx
│ │ ├── Trainers.jsx
│ │ └── Inquiries.jsx
│ │
│ ├── context/
│ │ └── AuthContext.jsx # Login state global
│ │
│ ├── hooks/
│ │ └── useAuth.js # Auth helper hook
│ │
│ ├── utils/
│ │ └── api.js # Axios base setup
│ │
│ ├── App.jsx # Routes define hote hain
│ ├── main.jsx # Entry point
│ └── index.css # Tailwind imports
│
├── .env # API URL
├── tailwind.config.js
├── vite.config.js
└── package.json
