# PINGAS Development Guide

## Running the Development Server

### Option 1: Basic Development (Frontend Only)
```bash
npm run dev
```
- Runs Vite development server on http://localhost:5173
- Sweet AI will run in development mode with basic responses
- All data stored in localStorage

### Option 2: Full Development with AI (Recommended)
```bash
# Install dependencies (if not already done)
npm install

# Install Vercel CLI globally (if not already done)
npm install -g vercel

# Run both frontend and API server
npm run dev:full
```
- Runs Vercel dev server on http://localhost:3000 (API endpoints)
- Runs Vite dev server on http://localhost:5173 (Frontend)
- Sweet AI will connect to real Claude AI API
- Uses environment variables from `.env.local`

### Option 3: API Server Only
```bash
npm run dev:vercel
```
- Runs only the Vercel development server with API endpoints
- Access at http://localhost:3000

## Environment Variables

Make sure your `.env.local` file contains:
```
CLAUDE_API_KEY=your_claude_api_key_here
```

## Features Available in Each Mode

### Development Mode (Basic)
- ✅ Supplement tracking and regime management
- ✅ Stats display with boosts from supplements  
- ✅ Personal profile management
- ✅ Basic Sweet AI responses for common questions
- ✅ All data stored locally

### Full Mode (with AI)
- ✅ All development mode features
- ✅ **Full Claude AI integration** - Sweet can answer complex health questions
- ✅ **Personalized recommendations** based on your regime and goals
- ✅ **Intelligent analysis** of your supplement stack
- ✅ **Natural conversation** about health optimization
- ✅ Database integration (if configured)

## Sweet AI Capabilities (Full Mode)

With the Claude AI integration, Sweet can:
- Provide detailed supplement recommendations
- Analyze drug interactions and contraindications  
- Give personalized advice based on your health goals
- Answer complex questions about nutrition and longevity
- Suggest timing and dosage optimizations
- Explain the science behind different supplements
- Help troubleshoot health issues with supplement solutions

## Troubleshooting

### Sweet AI shows "Development Mode"
- Check that `.env.local` has the correct `CLAUDE_API_KEY`
- Make sure you're running `npm run dev:full` not just `npm run dev`
- Verify the Vercel dev server is running on port 3000

### API errors
- Check the console for specific error messages
- Verify your Claude API key is valid and has credits
- Make sure both servers (Vite and Vercel) are running

### Database issues
- Database features require Vercel KV setup
- In development, data falls back to localStorage