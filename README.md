<h1 align="center">
  CampusFix
</h1>

<p align="center">
  <strong>A modern, streamlined platform for reporting and managing campus maintenance issues.</strong>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img alt="Vite" src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
</p>

## 📖 Overview

CampusFix is a web application designed to help students and staff report infrastructure and maintenance problems on campus. It centralizes issue reporting, preventing requests from being lost in emails or informal conversations. Users can easily report issues with images, locations, and categories, while campus administrators can track, update, and manage the resolution process through a dedicated dashboard.

---

## ✨ Features

- **📝 Easy Issue Reporting:** Submit detailed maintenance requests including title, description, category (Electrical, Water, Cleanliness, etc.), specific location, and an image upload.
- **📰 Issue Feed:** A public feed where users can browse reported issues.
- **🗳️ Voting & Sorting:** Users can see the most urgent issues by sorting the feed by "Most Voted" or "Newest".
- **🔐 Admin Dashboard:** Protected routes for administrators to log in and manage issues.
- **📊 Status Tracking:** Admins can easily update the status of issues (`Pending`, `In Progress`, `Resolved`), ensuring everyone stays informed.
- **📱 Responsive Design:** Built with Tailwind CSS and shadcn/ui to provide a seamless experience on both desktop and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/), Lucide Icons
- **Backend & Auth:** [Supabase](https://supabase.com/) (PostgreSQL, Authentication, Storage)
- **Linting:** [Oxlint](https://oxc.rs/docs/guide/usage/linter.html)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or later recommended)
- npm (or yarn/pnpm)
- A Supabase project (for database, auth, and storage)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abinanda123/campus-fix.git
   cd campus-fix
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add your Supabase credentials. You will need to set up a `campus_issues` table and a `campus-issue-images` storage bucket in your Supabase project.

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or the URL provided in your terminal) to view the application in your browser.

---

## 📁 Project Structure

```text
src/
├── assets/         # Static assets (images, global styles)
├── components/     # Reusable UI components (shadcn/ui, custom components like Navbar, IssueCard)
├── lib/            # Utility functions and configurations (Supabase client, AuthContext, utils)
├── pages/          # Application routes (FeedPage, ReportPage, AdminDashboardPage, etc.)
├── App.jsx         # Main application component and routing configuration
└── main.jsx        # React entry point
```

---

## 📜 Available Scripts

- `npm run dev` - Starts the development server using Vite.
- `npm run build` - Builds the app for production to the `dist` folder.
- `npm run preview` - Locally preview the production build.
- `npm run lint` - Runs Oxlint to analyze the code for potential errors.

---

## 🤝 Contributing

Contributions are always welcome! If you have suggestions or find a bug, please feel free to open an issue or submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open-source. (Add specific license details here if applicable, e.g., MIT License).
