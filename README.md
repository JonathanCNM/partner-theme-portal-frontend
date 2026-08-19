# Theme Portal Frontend

Frontend application for the Theme Portal.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file with:
```
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

3. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Features

- Partner management (CRUD operations)
- Theme management with visual editor
- Color picker for theme colors
- Font configuration
- Real-time theme preview
- Authentication with Clerk
- Responsive design with Tailwind CSS

## Tech Stack

- React 18
- TypeScript
- Vite
- Zustand (state management)
- React Router
- Clerk (authentication)
- Tailwind CSS
- Axios
# partner-theme-portal-frontend
