# Career Fair Registration System -- Frontend

A Next.js-based platform for managing career fairs, connecting students with employers, and streamlining the recruitment process.

## 🚀 Getting Started

### 1. **Clone the repository:**

```bash
git clone https://github.com/KaichenQu/frontend.git
```

### 2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

### 3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🛠 Tech Stack

- **Framework**: Next.js 15.0
- **UI Library**: Material-UI v6
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API Client**: Axios
- **TypeScript**: For type safety

## 📝 Features & Button Functionality

### 🔹 **Authentication**

- **Sign In**: Redirects to the login page for user authentication.
- **Browse Fairs**: Navigates to the career fairs listing page where users can explore available fairs.

### 🔹 **Career Fair Management**

- **Add New Fair**: Opens a form to create a new career fair.
- **Edit Fair**: Allows administrators to modify existing career fair details.
- **Delete Fair**: Removes a selected career fair from the listing after confirmation.

### 🔹 **User Dashboard**

- **Edit Profile**: Opens the user profile editor for updating personal information.
- **Withdraw Registration**: Allows users to unregister from a career fair.
- **Confirm Attendance**: Confirms the user's attendance at a selected career fair.

### 🔹 **Admin Dashboard**

- **View Analysis**: Navigates to the analytics section for system-wide insights.
- **Manage System**: Accesses system settings and permission management.
- **Manage Announcements**: Opens the announcements dashboard to create or edit system announcements.

### 🔹 **Announcements**

- **Create Announcement**: Opens a dialog to compose a new announcement.
- **Edit Announcement**: Allows editing of existing announcements.
- **Delete Announcement**: Removes an announcement after user confirmation.

### 🔹 **Career Fair Interaction**

- **Register**: Enables students to register for a selected career fair.
- **View Positions**: Displays available positions for a specific career fair.
- **Attend Fair**: Confirms attendance for faculty members at a career fair.

## 📝 Development Progress

### Completed Features

#### Core Structure

- ✅ Project setup with Next.js 15.0
- ✅ Material UI integration with custom theme
- ✅ Responsive layout system
- ✅ TypeScript configuration
- ✅ Tailwind CSS setup with custom utilities

#### Authentication

- ✅ Login page with email/password
- ✅ Registration with user type selection
- ✅ Password visibility toggle
- ✅ Form validation
- ✅ Interactive button effects

#### Career Fair Features

- ✅ Career fair listing page
- ✅ Position details view
- ✅ Company information display
- ✅ Job type indicators (New Grad/Intern/Visa Sponsor)

#### UI Components

- ✅ Responsive navbar with mobile drawer
- ✅ Loading animations
- ✅ Back to top button
- ✅ Card layouts with hover effects
- ✅ Custom gradient text effects

## 🔧 Configuration Files

- TypeScript configuration (`tsconfig.json`)
- Tailwind CSS setup (`tailwind.config.ts`)
- Next.js configuration (`next.config.ts`)
- ESLint rules (`.eslintrc.json`)
- Environment variables (`.env.example`)

## 📄 License

This project is licensed under the MIT License.

## 📚 Documentation References

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/getting-started/usage/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
