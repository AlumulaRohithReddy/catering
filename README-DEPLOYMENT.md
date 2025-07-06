# Quick Deployment Guide

## 🚀 Deploy in 3 Steps

### 1. Backend (Railway)
1. Go to [Railway](https://railway.app)
2. Connect GitHub repo
3. Set root directory to `backend`
4. Add environment variables:
   ```
   NODE_ENV=production
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```
5. Deploy and copy the URL

### 2. Frontend (Vercel)
1. Go to [Vercel](https://vercel.com)
2. Import GitHub repo
3. Set root directory to `admin-frontend`
4. Update `vercel.json` with your Railway URL
5. Deploy

### 3. Update Configuration
1. Update `backend/server.js` with your Vercel domain
2. Test both applications

## 📁 Important Files
- `DEPLOYMENT.md` - Detailed deployment guide
- `backend/Procfile` - Railway deployment config
- `admin-frontend/vercel.json` - Vercel deployment config
- `backend/env.example` - Environment variables template

## 🔧 Quick Commands
```bash
# Setup deployment
chmod +x setup-deployment.sh
./setup-deployment.sh

# Test locally
cd backend && npm start
cd admin-frontend && npm start
```

## 📞 Need Help?
- Check `DEPLOYMENT.md` for detailed instructions
- Common issues and solutions are documented
- Environment variables reference included 