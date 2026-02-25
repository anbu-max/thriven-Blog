# Vercel Deployment Guide

## Prerequisites
1. Create a [Vercel account](https://vercel.com/signup)
2. Install Vercel CLI: `npm i -g vercel`

## Environment Variables Setup

### Required Variables
Add these to your Vercel project settings:

```bash
MONGODB_URI=your_mongodb_uri
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

### Getting Your Blob Token
1. Go to your Vercel Dashboard
2. Navigate to Storage → Create Database → Blob
3. Copy the `BLOB_READ_WRITE_TOKEN` from the connection details

## Deployment Steps

### Option 1: Deploy via GitHub (Recommended)
1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your repository
4. Add environment variables
5. Deploy!

### Option 2: Deploy via CLI
```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

## Post-Deployment Checklist
- [ ] Verify MongoDB connection in deployment logs
- [ ] Test admin login at `your-domain.vercel.app/login`
- [ ] Upload a test blog post with images
- [ ] Verify images persist after redeployment

## Important Notes
- **Images are now stored in Vercel Blob** (not local filesystem)
- **First deployment** may take 2-3 minutes
- **Custom domain**: Configure in Vercel Dashboard → Settings → Domains
