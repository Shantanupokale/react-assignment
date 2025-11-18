# Course Learning Platform Assignment

A modern course learning platform built with React, Vite, and Tailwind CSS. Explore courses, track progress, and manage content with an intuitive admin interface.

## 🚀 Live Demo

**Live Site:** https://react-assignment-dusky-ten.vercel.app/

## 🛠️ Tech Stack

- **Frontend:** React + Vite + JavaScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Zustand
- **Storage:** localStorage
- **Deployment:** Vercel

## ✨ Features

- 📚 Interactive course explorer with sidebar navigation
- 📝 Markdown rendering with syntax highlighting
- ✅ Progress tracking with localStorage persistence
- 👨‍💼 Admin panel for course management
- 🔍 Search and filter courses/topics
- 📥📤 Import/export JSON data
- 📱 Fully responsive design

## 🚀 Quick Start

```bash
# Install dependencies
npm install
```
```bash
# Start development server
npm run dev
```
```bash
# Build for production
npm run build
```
## 📁 Project Structure

```
src/
├── components/            
│   ├── course/              # Components specific to the course view/management
│   │   ├── Breadcrumbs.jsx  
│   │   ├── EmptyState.jsx  
│   │   ├── MarkdownRenderer.jsx # Renders markdown
│   │   └── SearchInput.jsx 
│   └── ui/                 
│       └── sidebar.jsx      
├── data/                  
│   ├── courses.json         # All course data
│   └── users.json           # User/authentication data (mock)
├── pages/                  
│   ├── AdminPage.jsx        # Admin view
│   ├── CoursesPage.jsx      # Course list view
│   └── EditCoursePage.jsx   # Course editing view
├── store/                  
│   └── useCoursesStore.js   # Course-related state store
├── App.jsx                  # Main application component
└── main.jsx                 # Application entry point
```

## 🎯 Key Components

- **Course Explorer** - Hierarchical navigation with breadcrumbs
- **Markdown Renderer** - Code blocks, tables, and formatted content
- **Progress Tracking** - Completion states with percentages
- **Admin Interface** - Create, edit, import/export courses

## 🔧 Known Issues

- Missing unique IDs in course data structure
