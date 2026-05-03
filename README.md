# Paired

A shared space app for couples and close friends. Users can create spaces together and share lists, calendars, and more.

## Tech Stack

- React 19 with TypeScript
- Supabase (database, auth, RLS)
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js
- A Supabase project

### Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root with your Supabase credentials:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. Start the dev server:

```bash
npm run dev
```

## Features

- Auth (register, login, sign out)
- Spaces — shared rooms scoped by `space_id`
- Space members with invite links
- Lists with composable components — mix todo items and free text in the same list, with optional deadline
- List management — creators can delete individual items or the entire list

## Project Structure

```
src/
  components/   # Reusable UI components
  context/      # Auth context
  pages/        # Route-level page components
  utils/        # Supabase client
```
