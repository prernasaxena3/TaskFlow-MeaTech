# TaskFlow - Task Management Application

A task management application built with React, TypeScript, and Mock Service Worker (MSW). This project demonstrates modern frontend development practices including authentication, CRUD operations, state management, and responsive design.

## Features

### Core Functionality
-  **User Authentication**: Secure login with JWT token simulation
-  **Task Management**: Complete CRUD operations (Create, Read, Update, Delete)
-  **Task Organization**: Organize tasks by status (To Do, In Progress, Done)
-  **Protected Routes**: Dashboard access restricted to authenticated users
-  **Persistent State**: Data persists across browser reloads using localStorage

### Technical Features
-  **Modern UI**: Beautiful, responsive design with Tailwind CSS
-  **State Management**: Zustand for efficient state management
-  **Mock API**: MSW (Mock Service Worker) simulates backend responses
-  **Mobile-Friendly**: Fully responsive design for all screen sizes
-  **Fast Development**: Vite for blazing-fast development experience
-  **Dark Mode Ready**: Built-in dark theme support

##  Technologies Used

| Category | Technology |
|----------|-----------|
| **Framework** | React 18 with TypeScript |
| **Build Tool** | Vite |
| **State Management** | Zustand |
| **Mock API** | Mock Service Worker (MSW) |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **HTTP Client** | Fetch API |
| **Routing** | React Router v6 |

##  Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

##  Demo Credentials

To access the application, use these credentials:

- **Username**: `prerna`
- **Password**: `saxena`

##  How the Mocking Works

This application uses **Mock Service Worker (MSW)** to simulate a backend API without requiring an actual server. Here's how it works:

### Mock API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/login` | POST | Authenticates user and returns JWT token |
| `/api/tasks` | GET | Fetches all tasks |
| `/api/tasks` | POST | Creates a new task |
| `/api/tasks/:id` | PUT | Updates an existing task |
| `/api/tasks/:id` | DELETE | Deletes a task |

### Implementation Details

1. **Service Worker Setup**: MSW intercepts network requests at the service worker level
2. **In-Memory Data Store**: Tasks are stored in memory and synced with localStorage
3. **Realistic Delays**: Artificial delays simulate real network latency
4. **JWT Simulation**: Mock JWT tokens for authentication flow
5. **Error Handling**: Simulates various error scenarios (401, 404, etc.)

### Key Files
- `src/mocks/handlers.ts` - Defines all mock API endpoints
- `src/mocks/browser.ts` - Configures MSW for the browser
- `public/mockServiceWorker.js` - MSW service worker file

##  Project Structure

```
taskflow/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── ProtectedRoute.tsx
│   │   ├── TaskCard.tsx
│   │   └── TaskDialog.tsx
│   ├── pages/              # Page components
│   │   ├── Login.tsx
│   │   └── Dashboard.tsx
│   ├── stores/             # Zustand stores
│   │   ├── authStore.ts
│   │   └── taskStore.ts
│   ├── mocks/              # MSW mock handlers
│   │   ├── handlers.ts
│   │   └── browser.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/
│   └── mockServiceWorker.js # MSW service worker
└── package.json
```

##  Design System

The application uses a carefully crafted design system with:

- **Color Palette**: Modern dark theme with blue and purple gradients
- **Typography**: Clean, hierarchical text styles
- **Components**: Custom-styled shadcn/ui components
- **Animations**: Smooth transitions and hover effects
- **Spacing**: Consistent spacing system
- **Responsive**: Mobile-first responsive design

##  Testing

The application includes comprehensive testing capabilities:

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch
```

##  Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Vite and configure the build
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

##  Libraries Used

- **zustand** - Lightweight state management
- **msw** - Mock Service Worker for API mocking
- **react-router-dom** - Client-side routing
- **tailwindcss** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **lucide-react** - Icon library
- **sonner** - Toast notifications

##  Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [MSW Documentation](https://mswjs.io)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

##  License

This project is created as a case study demonstration and is available for educational purposes.

---

