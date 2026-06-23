# Aerospace & Astronomy Dashboard

A modern frontend application built to consume and visualize astronomical data using NASA's Open APIs. Designed with a component-based architecture and a futuristic UI.

## Features

- **Live Data Consumption:** Asynchronously fetches high-resolution space imagery and data from the NASA APOD API.
- **Robust Error Handling (Fallback Mechanism):** Implements a fallback mock data pattern to ensure UI stability and continuous user experience even during API gateway timeouts or 503 Service Unavailable errors.
- **Live Search & Filtering:** Client-side state management for instant data filtering without unnecessary DOM re-renders.
- **Responsive & Futuristic UI:** Styled with Tailwind CSS, featuring a dark aerospace theme optimized for all screen sizes.

## Tech Stack

- **Framework:** React + Vite
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **API:** NASA Open API (APOD)

## Local Installation & Setup

1. Clone the repository:
   ```
   git clone [https://github.com/sumeyyeberis/nasa-dashboard.git](https://github.com/sumeyyeberis/nasa-dashboard.git)
   ```
2. Navigate to the project directory:
   ```
   cd nasa-dashboard
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
Architecture & Data Flow
The application utilizes Zustand for global state management to prevent prop drilling. The data flow is decoupled from the UI components; useNasaStore handles all asynchronous fetch operations, error states, and data formatting (Adapter Pattern) before passing the clean payload to the presentation layer.

Developed by Sümeyye Beriş
