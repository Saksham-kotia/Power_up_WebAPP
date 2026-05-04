# Power-Up Marketplace 🚀

Power-Up is a fully functional, pure client-side Single Page Application (SPA) designed to connect Learners with Vendors. Built with a modern tech stack, this marketplace allows vendors to create courses and learners to book them, with seamless real-time synchronization between users using browser storage events.

## 🎯 Features

- **Dual-Role Authentication:** Log in as a Learner or a Vendor with session-based isolation. You can open the app in two separate tabs, logged in as different roles, to simulate a live multi-user environment.
- **Vendor Dashboard:** Vendors can create new courses (with images, pricing, and descriptions) and track incoming student bookings in real-time.
- **Learner Dashboard:** Learners can browse a dynamic feed of available courses, search by keywords, filter by category, and seamlessly "Book" lessons.
- **Live State Synchronization:** No backend required! By utilizing React Context and the browser's `StorageEvent` API, course creations and lesson bookings instantly sync across different tabs.
- **Duplicate Booking Prevention:** Learners are intelligently blocked from double-booking a course they are already enrolled in.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) powered by [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) for beautiful, responsive UI design
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Context API + Local/Session Storage
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

## 📂 Project Architecture

The application relies purely on the client side without needing Node.js, Express, or a database.

### State Management (`AppContext.jsx`)
The core data (`courses` and `bookings`) is managed globally using React Context and persisted to `localStorage`. A `storage` event listener watches for cross-tab modifications, enabling the "Live Update" feature between a Vendor in one tab and a Learner in another. Session data (`currentUser`) is kept in `sessionStorage` so each tab maintains a separate identity.

### Directory Structure

```text
src/
├── components/
│   ├── CourseCard.jsx       # Reusable UI component for displaying a course summary
│   ├── CourseModal.jsx      # Modal overlay for viewing lesson details and booking
│   ├── LearnerDashboard.jsx # The main marketplace feed and filtering system
│   ├── Login.jsx            # Tab-isolated role selection and authentication screen
│   └── VendorDashboard.jsx  # Course creation form and "Recent Bookings" tracker
├── context/
│   └── AppContext.jsx       # Global state provider and cross-tab synchronization logic
├── App.jsx                  # Main layout, Header, and conditional routing logic
├── main.jsx                 # Entry point wrapping the app in AppProvider
└── index.css                # Global styles and Tailwind CSS v4 imports
```

## 🚀 How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Saksham-kotia/Power_up_WebAPP.git
   cd Power_up_WebAPP
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the App:**
   Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

## 🎭 How to test the "Live Showcase"

To experience the real-time syncing between a Vendor and a Learner:
1. Open [http://localhost:5173](http://localhost:5173) in your first tab, choose **Vendor**, enter a name, and log in.
2. Open [http://localhost:5173](http://localhost:5173) in a second tab, choose **Learner**, enter a different name, and log in.
3. Put both tabs side-by-side.
4. **Create a Course:** Fill out the creation form in the Vendor tab. Watch it appear instantly in the Learner tab!
5. **Book a Course:** Click "Book Lesson" in the Learner tab. Watch the "Recent Bookings" notification instantly update in the Vendor tab!
