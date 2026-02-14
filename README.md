# Tasks Generator – AI Product Planning Tool

A production-ready web application that helps product managers and developers generate comprehensive product specifications using Google's Gemini AI. The tool allows users to describe a feature idea and automatically generates detailed specifications including overview, user stories, engineering tasks, risks, and unknowns.

## Features

### ✅ Implemented Features

- **Feature Input Form**: Comprehensive form with:
  - Feature Title
  - Goal description
  - Target Users
  - Constraints
  - Template Type (Web App / Mobile App / Internal Tool)
  
- **AI-Powered Specification Generation**: Automatically generates:
  - Comprehensive overview
  - User stories with titles and descriptions
  - Engineering tasks grouped by category (Frontend, Backend, DevOps, Testing)
  - Risk assessment
  - Unknowns identification
  
- **Interactive Task Management**:
  - Edit all generated content (overview, user stories, tasks, risks, unknowns)
  - Reorder tasks using up/down buttons
  - Change task groups/categories
  - Add new tasks, user stories, risks, and unknowns
  - Delete any item
  
- **Export Functionality**:
  - Copy to clipboard as Markdown
  - Download as Markdown (.md) file
  
- **History Management**:
  - View last 5 generated specifications
  - Quick access to previous projects
  - Automatic cleanup (keeps only last 5 specs)
  
- **System Health Monitoring**:
  - Status page showing backend health
  - Database connection status
  - Gemini API connection status
  - Real-time health indicators

### 🚧 Known Limitations

- Maximum 5 specifications stored in database (automatic cleanup)
- No user authentication (single-user mode)
- No real-time collaboration features
- No advanced search or filtering

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ORM
- **AI**: Google Generative AI SDK (Gemini)
- **Styling**: Tailwind CSS (Dark theme with modern glassmorphism design)
- **Architecture**: Modular, scalable folder structure

## Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- Google Gemini API key

## Installation & Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd Aggroso
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Windows (PowerShell)
New-Item .env

# Mac/Linux
touch .env
```

Add the following environment variables:

```env
MONGODB_URI=mongodb://localhost:27017/tasks-generator
GEMINI_API_KEY=your_gemini_api_key_here
```

**Getting your API keys:**

- **MongoDB URI**: 
  - Local: `mongodb://localhost:27017/tasks-generator`
  - MongoDB Atlas: Get connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  
- **Gemini API Key**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)

### 4. Run the application

#### Development Mode

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

#### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
Aggroso/
├── app/
│   ├── api/
│   │   ├── generate/          # POST endpoint for generating specs
│   │   ├── specs/             # GET endpoint for fetching specs list
│   │   │   └── [id]/          # GET/PUT endpoints for individual specs
│   │   └── status/             # GET endpoint for system health
│   ├── spec/[id]/             # Spec detail page
│   ├── history/               # History page
│   ├── status/                # Status page
│   ├── page.tsx               # Home page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── FeatureForm.tsx        # Feature input form
│   ├── SpecViewer.tsx         # Spec display and editing
│   ├── TaskEditor.tsx         # Engineering tasks editor
│   ├── HistoryList.tsx        # History list component
│   ├── ExportButtons.tsx      # Export functionality
│   └── StatusCard.tsx         # Status display
├── lib/
│   ├── db.ts                  # MongoDB connection
│   ├── gemini.ts              # Gemini AI integration
│   └── validators.ts          # Form validation
├── models/
│   └── Spec.ts                # Mongoose model
├── types/
│   └── spec.ts                # TypeScript type definitions
├── utils/
│   ├── formatMarkdown.ts      # Markdown formatter
│   └── errorHandler.ts        # Error handling utilities
├── README.md
├── AI_NOTES.md
├── PROMPTS_USED.md
└── ABOUTME.md
```

## API Endpoints

- `POST /api/generate` - Generate specification from feature idea
- `GET /api/specs` - Get last 5 specifications
- `GET /api/specs/:id` - Get single specification by ID
- `PUT /api/specs/:id` - Update specification
- `GET /api/status` - Health check for backend, database, and Gemini API

## Usage

1. **Generate a Specification**:
   - Fill in the feature form on the home page
   - Click "Generate Specification"
   - Wait for AI to generate the spec

2. **Edit Specification**:
   - Review the generated overview
   - Edit user stories
   - Modify engineering tasks (change groups, reorder, delete, add)
   - Update risks and unknowns

3. **Export**:
   - Click "Copy to Clipboard" to copy the spec as Markdown
   - Click "Download as Markdown" to download a .md file

4. **View History**:
   - Navigate to the History page
   - Click on any spec to view or edit it

5. **Check Status**:
   - Navigate to the Status page
   - Monitor backend, database, and AI API health

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `GEMINI_API_KEY`
4. Deploy

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `MONGODB_URI`: Your MongoDB connection string
- `GEMINI_API_KEY`: Your Gemini API key

## Database Management

The application automatically keeps only the last 5 specifications. When a new spec is created:
- If there are more than 5 specs, the oldest ones are automatically deleted
- This ensures the database doesn't grow indefinitely

## Troubleshooting

### MongoDB Connection Error
- **Local MongoDB**: Make sure MongoDB service is running
- **MongoDB Atlas**: Check your connection string, password, and IP whitelist settings

### Gemini API Error
- Verify your API key is correct
- Check if you have API quota remaining
- Ensure you have internet connectivity

### Build Errors
- Clear `.next` folder and rebuild
- Delete `node_modules` and reinstall dependencies
- Check TypeScript version compatibility

## What is Done

✅ Complete Next.js App Router setup with TypeScript
✅ MongoDB integration with Mongoose
✅ Gemini AI integration with structured JSON output
✅ Full CRUD operations for specifications
✅ Interactive task editing with reordering
✅ Export functionality (clipboard and Markdown download)
✅ History management (last 5 specs)
✅ System status monitoring
✅ Responsive dark theme UI with Tailwind CSS (glassmorphism design with cyan/blue accents)
✅ Error handling and validation
✅ Automatic Gemini model discovery with fallback logic
✅ Modular, scalable architecture
✅ Production-ready code structure

## What is Not Done

- User authentication (currently single-user)
- Multiple users/teams support
- Advanced search and filtering
- Spec templates
- Collaboration features
- Version history
- Comments and annotations
- Integration with project management tools

## License

MIT

## Author

See [ABOUTME.md](./ABOUTME.md) for author information.
