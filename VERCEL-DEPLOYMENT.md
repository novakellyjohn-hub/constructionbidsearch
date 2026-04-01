# Deploy to Vercel — Step by Step

**Time: 5 minutes**

---

## **Step 1: Create GitHub Account (if you don't have one)**

1. Go to github.com
2. Sign up (free)
3. Create a new repository called `constructionbidsearch`

---

## **Step 2: Push Code to GitHub**

```bash
cd /home/openclaw/.openclaw/workspace/web

# Initialize git repo
git init
git add .
git commit -m "Initial commit: ConstructionBidSearch dashboard"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/constructionbidsearch.git
git branch -M main
git push -u origin main
```

---

## **Step 3: Deploy to Vercel**

1. Go to **vercel.com**
2. Click "Sign Up" → Sign in with GitHub
3. Click "New Project"
4. Select your `constructionbidsearch` repository
5. Click "Import"
6. **Configure:**
   - Framework: React
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `build` (auto-detected)
   - Leave env vars blank for now
7. Click "Deploy"

**Vercel builds and deploys automatically** ✅

---

## **Step 4: Point Domain to Vercel**

1. After deployment, Vercel gives you a **yourproject.vercel.app** URL
2. Go to **Vercel Dashboard** → Project Settings → Domains
3. Add custom domain: `constructionbidsearch.com`
4. Vercel shows DNS records to add at Namecheap
5. Go to **Namecheap Dashboard** → DNS Settings
6. Add the DNS records Vercel provides
7. Wait 5-10 minutes for DNS to propagate

---

## **Step 5: Test**

1. Visit **constructionbidsearch.com**
2. Dashboard should load
3. Search should work (connects to API at 147.182.179.47:3000)

---

## **That's It! 🚀**

Your dashboard is now live at constructionbidsearch.com

---

## **If You Need Updates Later**

Just push code to GitHub:
```bash
git add .
git commit -m "Update: new feature"
git push origin main
```

Vercel auto-rebuilds and deploys! ✨

---

## **Notes**

- **API URL**: Points to droplet at 147.182.179.47:3000
- **Keep API running**: Make sure your API server stays live on the droplet
- **Free tier**: Vercel free tier is plenty for MVP
- **HTTPS**: Automatic with Vercel + custom domain

---

**Questions? Run `vercel --help` or visit vercel.com/docs**
