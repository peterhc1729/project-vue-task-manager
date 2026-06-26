# Vue Todo App

A full-stack task management application built with Vue.js and Supabase. Users can create an account, log in, and manage their personal to-do list with full CRUD functionality.

🔗 **Live Demo:** [https://peterhc1729.github.io/project-vue-task-manager/](https://peterhc1729.github.io/project-vue-task-manager/)

<br>

## Features

- **Authentication** — Sign up, sign in, and sign out via Supabase Auth.
- **Email confirmation** — New users receive a confirmation email before gaining access.
- **Task management** — Create, edit, delete, and mark tasks as complete or incomplete.
- **Persistent Session** — Authentication state is securely persisted using `pinia-plugin-persist`.
- **Component Library** — Beautiful and responsive UI built entirely with Vuetify components.
- **Protected routes** — Unauthenticated users are safely redirected via Vue Router Guards.

  <br>

## Tech Stack

| Layer                  | Technology / Framework            |
| :--------------------- | :-------------------------------- |
| **Framework**          | Vue.js 3 (Composition API)        |
| **UI Framework**       | Vuetify 4 & Material Design Icons |
| **Build Tool**         | Vite                              |
| **Router**             | Vue Router 4                      |
| **State Management**   | Pinia & Pinia Plugin Persist      |
| **Backend / Database** | Supabase (Auth + PostgreSQL)      |
| **Linting / Quality**  | ESLint                            |

<br>

## Project Structure

```
src/
├── App.vue              - Root component, main layout container (Vuetify)
├── main.js              - App entry point, registers plugins
├── supabase.js          - Supabase client initialization
├── assets/
│   └── ...              - Images and static assets
├── static/
│   └── main.css         - Global styles
├── components/
│   ├── AppHeader.vue    - Top bar (on auth page)
│   ├── Nav.vue          - Navigation bar (in dashboard)
│   ├── NewTask.vue      - Form to add a new task
│   ├── SignIn.vue       - Sign in form
│   ├── SignUp.vue       - Sign up form with validation
│   └── TaskItem.vue     - Single task with edit/delete/complete controls
├── pages/
│   ├── Auth.vue         - Auth page (hosts SignIn / SignUp)
│   └── Dashboard.vue    - Main app view for logged-in users
├── router/
│   └── index.js         - Route definitions with Navigation Guards
└── store/
    ├── user.js          - User auth state and actions
    └── task.js          - Task state, getters, and actions
```

<br>

## Getting Started

### Prerequisites

- Node.js (v18+)
- Yarn
- A Supabase account and project

**1. Clone the repository**

```bash
git clone https://github.com/peterhc1729/project-vue-task-manager.git
cd project-vue-task-manager
```

**2. Install dependencies**

```bash
yarn install
# or: npm install
```

**3. Configure environment variables**

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project under _Settings → API_.

**4. Set up the database**

In your Supabase project, create a `tasks` table with the following columns:

| Column        | Type        | Default          |
| :------------ | :---------- | :--------------- |
| `id`          | int8        | _auto-increment_ |
| `created_at`  | timestamptz | `now()`          |
| `title`       | text        | _None_           |
| `is_complete` | bool        | `false`          |
| `user_id`     | uuid        | `auth.uid()`     |

Make sure to enable Row Level Security (RLS) and add policies so users can only access their own tasks.

**5. Enable Email Auth**

In Supabase go to _Authentication → Providers → Email_ and ensure email signup is enabled.

**6. Run the development server**

```bash
yarn dev
```

The app will be available at http://localhost:5173.

<br>

## Deployment

This project is configured for easy deployment via _GitHub Pages_ using a GitHub Action or manual deploy. Because the app uses `createWebHashHistory()`, page refreshes will work flawlessly without 404 errors.

### Option 1: Automated Deployment via GitHub Actions (Recommended)

1. Go to your GitHub repository and click on _Settings → Pages_.
2. Under _Build and deployment_, change the _Source_ to _GitHub Actions_.
3. Create a workflow file at `.github/workflows/deploy.yml` (you can use the standard Vite deployment template).
4. Every time you push to the `main` branch, GitHub will automatically build and deploy your app.

### Option 2: Manual Deployment via `gh-pages` package

1. Install the deployment tool:

```bash
yarn add -D gh-pages
```

<br>

## User Stories

The application is built around the following BDD scenarios:

- A new user can register with email and password and receives a confirmation email
- A registered user can sign in and access their personal task list
- A logged-in user can sign out and is redirected to the auth page
- A logged-in user can add a new task
- A logged-in user can edit an existing task
- A logged-in user can mark a task as complete or incomplete
- A logged-in user can delete a task

  <br>

## License

This project was built as part of a frontend development course. Feel free to use it as a reference or starting point for your own projects.
