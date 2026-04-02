# 💬 Chatloop – Real-Time Chat Application

Chatloop is a full-stack real-time chat application built with modern web technologies. It provides a clean, responsive interface for users to communicate through personal chats and group conversations, along with an admin dashboard for managing users and activity.

## 🚀 Features

- 🔐 Authentication & Protected Routes
- 👤 User Profiles & Avatar Support
- 💬 One-to-One and Group Chats
- 📎 Attachments & Media Sharing
- 🔔 Notifications System
- 🔍 Search Functionality
- 📊 Admin Dashboard (Users, Chats, Messages)
- 📱 Fully Responsive UI

## 🏗️ Project Structure

### 📁 Client (Frontend)

Organized using a modular and scalable architecture:

- `components/`
  - `auth/` → Authentication & route protection
  - `dialogs/` → Modals like add member, delete confirmation
  - `layout/` → App layout (AdminLayout, Header, etc.)
  - `shared/` → Reusable UI components (AvatarCard, ChatItem, etc.)
  - `specific/` → Feature-specific components (Chats, Notifications, Profile, Search)

- `styles/` → Styled components and theme styling
- `constants/` → Static data & configuration
- `hooks/` → Custom React hooks
- `lib/` → Utility functions & features

### 🧠 Key Highlights

- Uses **component-based architecture** for scalability
- Clean separation of:
  - UI (components)
  - Logic (hooks, lib)
  - Data (constants)
- Admin panel with sidebar navigation:
  - Dashboard
  - Users
  - Chats
  - Messages

## 🎨 UI/UX

- Built with modern UI practices
- Consistent design system
- Responsive layout for all screen sizes
- Sidebar-based admin navigation

## 🛠️ Tech Stack

- Frontend: React.js
- Styling: MUI + Styled Components
- Routing: React Router
- State Management: (your choice — add if using Redux/Zustand/etc.)

## 📌 Future Improvements

- Real-time messaging with WebSockets
- Message reactions & read receipts
- Dark mode support
- File upload optimization

---

## 👩‍💻 Author

**Shivani Barman**
