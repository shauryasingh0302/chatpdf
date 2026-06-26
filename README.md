# ChatPDF

ChatPDF is a full-stack AI-powered document chat application that allows users to upload PDF documents and interact with them through natural language conversations. Using Retrieval-Augmented Generation (RAG), the application retrieves the most relevant document context and generates accurate responses with modern large language models.

The project is built with Next.js, LangChain, Pinecone, Supabase, Clerk Authentication, Drizzle ORM, Stripe, and Google's Gemini models to provide a scalable and production-ready AI experience.

---

## Features

### AI-Powered PDF Conversations

* Upload PDF documents
* Ask questions in natural language
* Context-aware AI responses
* Retrieval-Augmented Generation (RAG)

### Authentication

* Clerk authentication
* Secure sign in and sign up
* User-specific chat history

### PDF Management

* Drag-and-drop uploads
* Cloud storage with Supabase
* Document viewer
* Multiple chat sessions

### Vector Search

* Automatic document chunking
* Embedding generation
* Pinecone vector database
* Semantic similarity search

### Subscription System

* Stripe Checkout integration
* Free and Pro plans
* Subscription management
* Premium feature access

### Modern UI

* Responsive design
* Landing page
* Chat interface
* Pricing page
* Dashboard
* Smooth animations

---

# Tech Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Shadcn UI
* React Query
* Axios
* Lucide Icons

## Backend

* Next.js App Router
* Server Actions
* Route Handlers

## AI

* Google Gemini
* LangChain
* AI SDK
* Groq SDK

## Database

* Neon PostgreSQL
* Drizzle ORM

## Vector Database

* Pinecone

## Authentication

* Clerk

## Storage

* Supabase Storage

## Payments

* Stripe

---

# Architecture

```
                User
                  │
                  ▼
         Next.js Frontend
                  │
      ┌───────────┼───────────┐
      │           │           │
      ▼           ▼           ▼
   Clerk      Supabase     Stripe
      │           │
      │           ▼
      │      PDF Storage
      │
      ▼
 Next.js API Routes
      │
      ▼
 PDF Processing
      │
      ▼
 Document Chunking
      │
      ▼
 Embedding Generation
      │
      ▼
 Pinecone Vector Store
      │
      ▼
 Relevant Context
      │
      ▼
 Google Gemini
      │
      ▼
 AI Response
```

---

# Project Structure

```
chatpdf/
│
├── app/
│   ├── api/
│   ├── chat/
│   ├── checkout/
│   ├── pricing/
│   └── sign-in/
│
├── components/
│   ├── ChatComponent
│   ├── ChatSidebar
│   ├── FileUpload
│   ├── PDFViewer
│   └── MessageList
│
├── sections/
│   ├── Hero
│   ├── Features
│   ├── Pricing
│   ├── Testimonials
│   └── CTA
│
├── lib/
│   ├── embeddings
│   ├── pinecone
│   ├── stripe
│   ├── subscription
│   └── db
│
├── public/
└── package.json
```

---

# Installation

Clone the repository

```bash
git clone https://github.com/your-username/chatpdf.git
```

Move into the project

```bash
cd chatpdf
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# Environment Variables

Create a `.env.local` file.

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

DATABASE_URL=

PINECONE_API_KEY=

GOOGLE_API_KEY=

OPENAI_API_KEY=

GROQ_API_KEY=

STRIPE_API_KEY=

STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL=
```

---

# How It Works

1. User uploads a PDF.
2. The file is stored in Supabase Storage.
3. The document is parsed and divided into smaller chunks.
4. Each chunk is converted into embeddings.
5. Embeddings are stored in Pinecone.
6. User submits a question.
7. Similar document chunks are retrieved.
8. Relevant context is sent to the language model.
9. The AI generates an accurate answer based on the uploaded document.

---

# Subscription Plans

## Free

* Upload up to 3 PDFs
* Basic AI chat
* 10 MB upload limit
* Standard response speed

## Pro

* Unlimited PDF uploads
* Unlimited AI conversations
* Larger upload limits
* Priority AI responses
* Latest AI models
* Priority support

---

# Future Improvements

* OCR support for scanned PDFs
* Multi-document conversations
* PDF annotations
* Chat export
* Team workspaces
* Shared documents
* Streaming AI responses
* Conversation search
* Mobile optimization
* Usage analytics

---

# Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm start
```

Starts the production server.

```bash
npm run lint
```

Runs ESLint.

---

# License

This project is intended for educational and portfolio purposes. You may modify and extend it according to your requirements.

---

# Author

**Shaurya Singh**
