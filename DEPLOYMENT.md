# Deployment Guide: Vercel (Frontend) + Railway (Backend)

## Prerequisites
- GitHub account
- Vercel account (free)
- Railway account (free tier available)
- MongoDB Atlas account (free tier available)

## Step 1: Deploy Backend to Railway

### 1.1 Prepare MongoDB Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`)

### 1.2 Deploy to Railway
1. Go to [Railway](https://railway.app) and sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set the root directory to `backend`
5. Add environment variables in Railway dashboard:
   ```
   NODE_ENV=production
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-super-secret-jwt-key-here
   ```
6. Deploy the project
7. Copy the generated URL (e.g., `https://your-app-name.railway.app`)

### 1.3 Test Backend
Visit `https://your-app-name.railway.app/api/health` to verify the backend is working.

## Step 2: Deploy Frontend to Vercel

### 2.1 Update Configuration
1. Update `admin-frontend/vercel.json`:
   - Replace `your-railway-backend-url.railway.app` with your actual Railway URL

2. Update `backend/server.js`:
   - Replace `your-frontend-domain.vercel.app` with your actual Vercel domain

### 2.2 Deploy to Vercel
1. Go to [Vercel](https://vercel.com) and sign up with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Set the root directory to `admin-frontend`
5. Configure build settings:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
6. Add environment variables (if needed):
   ```
   REACT_APP_API_URL=https://your-railway-backend-url.railway.app
   ```
7. Deploy

## Step 3: Update API Configuration

### 3.1 Update Frontend API Calls
If your frontend makes API calls, ensure they point to your Railway backend URL.

### 3.2 Update CORS Settings
In your Railway backend, update the CORS origin to include your Vercel domain:
```javascript
origin: ['https://your-app-name.vercel.app']
```

## Step 4: Test Your Deployment

1. **Backend Health Check**: Visit `https://your-app-name.railway.app/api/health`
2. **Frontend**: Visit your Vercel URL
3. **Test Features**: Try logging in, creating menus, etc.

## Troubleshooting

### Common Issues:

1. **CORS Errors**: 
   - Ensure Railway backend CORS settings include your Vercel domain
   - Check that API calls use the correct Railway URL

2. **Environment Variables**:
   - Verify all environment variables are set in Railway dashboard
   - Check that JWT_SECRET is properly set

3. **Database Connection**:
   - Ensure MongoDB Atlas IP whitelist includes Railway's IPs
   - Verify connection string format

4. **Build Errors**:
   - Check that all dependencies are in package.json
   - Ensure build commands are correct

### Useful Commands:

```bash
# Test backend locally
cd backend
npm install
npm start

# Test frontend locally
cd admin-frontend
npm install
npm start
```

## Environment Variables Reference

### Backend (Railway):
```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Frontend (Vercel):
```
REACT_APP_API_URL=https://your-railway-backend-url.railway.app
```

## Cost Estimation
- **Vercel**: Free tier includes 100GB bandwidth/month
- **Railway**: Free tier includes $5 credit/month
- **MongoDB Atlas**: Free tier includes 512MB storage

## Next Steps
1. Set up custom domains (optional)
2. Configure SSL certificates (automatic with Vercel/Railway)
3. Set up monitoring and logging
4. Configure CI/CD pipelines 