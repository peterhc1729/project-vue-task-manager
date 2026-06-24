Vue Todo App
A full-stack task management application built with Vue.js and Supabase. Users can create an account, log in, and manage their personal to-do list with full CRUD functionality.

Features

Authentication — Sign up, sign in, and sign out via Supabase Auth
Email confirmation — New users receive a confirmation email before gaining access
Task management — Create, edit, delete, and mark tasks as complete or incomplete
Persistent login — Session is preserved across page reloads using Pinia + localStorage
Reactive state — All UI updates instantly reflect changes via Pinia stores
Protected routes — Unauthenticated users are redirected to the auth page

Tech Stack
LayerTechnologyFrameworkVue.js 3 (Composition API)Build ToolViteRouterVue Router 4State ManagementPinia + pinia-plugin-persistedstateBackend / DatabaseSupabase (Auth + PostgreSQL)StylingCustom CSS

Project Structure
src/
├── App.vue # Root component, handles auth redirect on mount
├── main.js # App entry point, registers plugins
├── supabase.js # Supabase client initialization
├── assets/
│ └── logo.png
├── static/
│ └── main.css # Global styles
├── components/
│ ├── AppHeader.vue # Top bar (on start page)
│ ├── Nav.vue # Navigation bar (in dashboard)
│ ├── NewTask.vue # Form to add a new task
│ ├── SignIn.vue # Sign in form
│ ├── SignUp.vue # Sign up form with validation
│ └── TaskItem.vue # Single task with edit/delete/complete controls
├── pages/
│ ├── Auth.vue # Auth page (hosts SignIn / SignUp)
│ └── Dashboard.vue # Main app view for logged-in users
├── router/
│ └── index.js # Route definitions
└── store/
├── user.js # User auth state and actions
└── task.js # Task state, getters, and actions

Getting Started
Prerequisites

Node.js (v18+)
Yarn
A Supabase account and project

1. Clone the repository
   bashgit clone https://github.com/your-username/vue-todo-app.git
   cd vue-todo-app
2. Install dependencies
   bashyarn install
3. Configure environment variables
   Copy the example file and fill in your Supabase credentials:
   bashcp .env.example .env
   envVITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   You can find these values in your Supabase project under Settings → API.
4. Set up the database
   In your Supabase project, create a tasks table with the following columns:
   ColumnTypeDefaultidint8auto-incrementcreated_attimestamptznow()titletext—is_completeboolfalseuser_iduuidauth.uid()
   Make sure to enable Row Level Security (RLS) and add policies so users can only access their own tasks.
5. Enable Email Auth
   In Supabase go to Authentication → Providers → Email and ensure email signup is enabled.
6. Run the development server
   bashyarn dev
   The app will be available at http://localhost:5173.

Deployment
This app can be deployed on Netlify:

Push your repository to GitHub
Connect the repo to Netlify
Set the build command to yarn build and the publish directory to dist
Add your environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) in Netlify's site settings

User Stories
The application is built around the following BDD scenarios:

A new user can register with email and password and receives a confirmation email
A registered user can sign in and access their personal task list
A logged-in user can sign out and is redirected to the auth page
A logged-in user can add a new task
A logged-in user can edit an existing task
A logged-in user can mark a task as complete or incomplete
A logged-in user can delete a task

License
This project was built as part of a frontend development course. Feel free to use it as a reference or starting point for your own projects.
