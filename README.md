# Slack Clone

Welcome to the Slack Clone project! This application is a feature-rich, real-time messaging platform inspired by Slack. It is built with modern web technologies to ensure a fast, responsive, and interactive user experience.

## Features

- **Real-time Messaging**: Enjoy seamless, real-time communication powered by Socket.IO.
- **Authentication**: Secure login using Google Auth and Email Auth with Magic Link.
- **Channels & Direct Messages**: Organize conversations into channels or chat privately with direct messages.
- **Rich Text Editing**: Compose messages with rich text formatting using Tiptap React.
- **File Uploads**: Easily share files and documents using Uploadthing.
- **Customizable UI**: Tailored user interface built with Tailwind CSS and Shadcn UI components.

## Tech Stack

- **Next.js**: A powerful React framework for building fast and scalable applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Supabase**: An open-source Firebase alternative for authentication, storage, and real-time database services.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs without writing CSS.
- **Shadcn UI**: A collection of accessible, reusable components for building user interfaces.
- **Google Auth**: OAuth-based authentication for easy Google sign-in integration.
- **Email Auth with Magic Link**: Secure passwordless authentication using magic links sent to users' emails.
- **React Query**: Efficient data fetching and caching for server state management.
- **Tiptap React**: An extensible rich text editor built for modern web applications.
- **Zod**: TypeScript-first schema declaration and validation library.
- **React Hook Form**: Performant, flexible, and extensible forms with easy validation.
- **Socket.IO**: Enables real-time, bi-directional communication between clients and servers.
- **Zustand**: A small, fast state management library for React.
- **Uploadthing**: A file upload service for handling file storage and sharing.

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

Ensure you have the following installed on your development machine:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tonykyaw/slack.git
   cd slack
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and configure your environment variables:

   ```plaintext
    NEXT_PUBLIC_SUPABASE_URL=https://rtpagqbxwvdjdnlonloe.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0cGFncWJ4d3ZkamRubG9ubG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwODI2NTAsImV4cCI6MjAzODY1ODY1MH0.R35iz_WfYEM7wdNnXSlVBRcyzltH61z3bcI624P5D5Y
    NEXT_PUBLIC_CURRENT_ORIGIN=http://localhost:3000/
    UPLOADTHING_SECRET=sk_live_your-uploadthing-secret
    UPLOADTHING_APP_ID=your-uploadthing-app-id
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
