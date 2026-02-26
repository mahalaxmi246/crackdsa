# CrackDSA.in — Complete Launch Guide
# Do this in order. Takes ~3 hours total. You only do this once.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## STEP 1: Install Node.js (5 min)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Go to https://nodejs.org → Download "LTS" version → Install
2. Open terminal / command prompt
3. Run: node --version  (should show v18 or higher)
4. Navigate to this folder: cd path/to/crackdsa
5. Run: npm install   (installs all packages, takes 1-2 min)
6. Test locally: npm run dev   (opens at http://localhost:5173)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## STEP 2: Firebase Setup (10 min)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Go to https://console.firebase.google.com
2. Click "Add project"
   → Name: crackdsa
   → Disable Google Analytics (not needed)
   → "Create project"

3. In the project dashboard:
   → Click "</>" (Web app icon)
   → App nickname: crackdsa-web
   → Check "Also set up Firebase Hosting" (optional)
   → Click Register App
   → COPY the firebaseConfig object (you'll need it in Step 4)

4. Enable Email/Password Auth:
   → Build → Authentication → Get started
   → Sign-in method tab
   → Email/Password → Enable → Save

5. Create Firestore Database:
   → Build → Firestore Database → Create database
   → Select "Start in production mode"
   → Location: asia-south1 (Mumbai — fastest for India)
   → Enable

6. Set Firestore Security Rules:
   → Firestore → Rules tab
   → Replace ALL content with this:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null 
                         && request.auth.uid == userId;
    }
  }
}

   → Click "Publish"


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## STEP 3: Instamojo Setup (15 min)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Go to https://www.instamojo.com
2. Sign up with your email
3. Complete KYC:
   → Upload PAN card photo (yours or parent's)
   → Add your bank account (savings account fine)
   → Enter mobile number
   → Usually approved within 24-48 hours

4. After approval, create a Payment Link:
   → Dashboard → "Create a payment link"
   → Title: "CrackDSA — Lifetime Access"
   → Description: "21-week DSA roadmap for MNC interviews. 500+ problems, company-tagged weekly assessments."
   → Amount: 99
   → Currency: INR
   → Enable "Allow customers to pay any amount" → OFF
   → Enable quantity: OFF (each person pays once)
   → Redirect URL after payment: https://crackdsa.in (your domain)
   → Save

5. Copy your payment link URL
   → It looks like: https://imjo.in/XXXXX/crackdsa-lifetime
   → You'll paste this in Step 4

6. HOW PAYMENT WORKS:
   → User clicks "Pay ₹99" → Goes to Instamojo page
   → Pays via PhonePe / Google Pay / UPI / Card / Net Banking
   → Enters their UPI transaction ID in your app
   → App auto-approves (since ₹99 fraud risk is negligible)
   → If someone frauds, just set isPaid: false in Firebase console


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## STEP 4: Configure Environment Variables (5 min)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. In the crackdsa folder, create a file called: .env.local
   (copy from .env.example)

2. Fill in your values:

VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=crackdsa-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=crackdsa-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=crackdsa-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

VITE_INSTAMOJO_LINK=https://imjo.in/XXXXX/crackdsa-lifetime
VITE_PRICE=99
VITE_SUPPORT_EMAIL=youremail@gmail.com

3. Test locally again: npm run dev
   → Try registering an account
   → Check Firebase console → Authentication → should see your user
   → Check Firestore → should see your user document


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## STEP 5: Deploy on Vercel (5 min)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OPTION A: Deploy via GitHub (recommended, auto-deploys on changes)

1. Create GitHub account at github.com (free)
2. Create new repository: crackdsa (public or private)
3. Push your code:
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOURUSERNAME/crackdsa.git
   git push -u origin main

4. Go to https://vercel.com
   → Sign up with GitHub
   → "New Project" → Import your crackdsa repo
   → Framework: Vite (auto-detected)
   → Add Environment Variables (same as .env.local):
     - VITE_FIREBASE_API_KEY = your value
     - VITE_FIREBASE_AUTH_DOMAIN = your value
     - VITE_FIREBASE_PROJECT_ID = your value
     - VITE_FIREBASE_STORAGE_BUCKET = your value
     - VITE_FIREBASE_MESSAGING_SENDER_ID = your value
     - VITE_FIREBASE_APP_ID = your value
     - VITE_INSTAMOJO_LINK = your value
     - VITE_PRICE = 99
     - VITE_SUPPORT_EMAIL = your email
   → Click "Deploy"
   → Done! Your site is at: crackdsa-yourname.vercel.app

OPTION B: Deploy directly (no GitHub)
   npm run build
   npm install -g vercel
   vercel --prod
   (Follow the prompts — add env vars when asked)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## STEP 6: Buy Domain + Connect (30 min)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Buy crackdsa.in at https://www.godaddy.com
   → Search: crackdsa.in
   → Should be ~₹99-299/year for .in domain
   → Add to cart → Pay (UPI/card works)

2. In Vercel: Settings → Domains → Add "crackdsa.in"
   → Vercel gives you DNS records (A record + CNAME)

3. In GoDaddy: DNS Management
   → Add the A record and CNAME that Vercel gave you
   → DNS propagates in 10-60 minutes

4. Add Firebase authorized domain:
   → Firebase Console → Authentication → Settings → Authorized domains
   → Add: crackdsa.in
   → Add: www.crackdsa.in


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## STEP 7: Google Search Console (30 min, do after domain works)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Go to https://search.google.com/search-console
2. Add property → Domain → Enter: crackdsa.in
3. Verify ownership via DNS TXT record:
   → Copy the TXT record Google gives you
   → Add it to GoDaddy DNS
   → Click "Verify" in Google console
   → Takes 10-30 minutes

4. Submit sitemap:
   → Sitemaps → Add sitemap URL: https://crackdsa.in/sitemap.xml
   → (We'll create sitemap.xml — put it in the public/ folder)

5. Request indexing:
   → URL Inspection → Enter your URL → "Request Indexing"
   → Google will index within 3-7 days


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## STEP 8: How to Verify Payments Manually
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The app auto-approves payments (isPaid: true when user submits transaction ID).
This is fine for ₹99 — fraud risk is near zero.

TO DISABLE AUTO-APPROVE (more secure):
→ In src/components/PaywallModal.jsx, change:
   isPaid: true    →    isPaid: false
→ Then manually verify in:
   1. Instamojo Dashboard → Payments → Check transaction ID
   2. Firebase Console → Firestore → users → find user → set isPaid: true

TO FIND ALL PENDING PAYMENTS:
→ Firebase Console → Firestore → users collection
→ Filter: paymentStatus == "pending"
→ Cross-check transaction IDs with Instamojo
→ Set isPaid: true for verified payments


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## STEP 9: Get Your First 100 Users (Marketing)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

POST THIS ON THESE PLATFORMS (copy-paste ready):

--- REDDIT ---
Post on: r/developersIndia, r/cscareerquestions, r/leetcode, r/india

Title: "I built a structured 21-week DSA roadmap for MNC interviews (Amazon/Google/Microsoft) — free to try"

Body:
"I've been prepping for MNC interviews and couldn't find a structured week-by-week plan 
with company-specific problems. So I built one.

CrackDSA.in — 21-week roadmap, 500+ problems, each week has:
- 5-6 problems/day with difficulty tags
- Weekly mock assessments with Amazon, Google, Microsoft specific problems
- Company + year tags (e.g. 'Google 2024')
- Your progress saves to your account

First 8 weeks are completely free.

Weeks 1-5 are problems I'd already done (Two Pointers, Binary Search, Sliding Window etc)
Weeks 6-21 build on them systematically.

Would love feedback from people who are also prepping!"

--- LINKEDIN ---
"Built a free DSA interview prep tracker for Indian engineers targeting MNC companies.

21 weeks, 500+ problems, weekly company-specific assessments.
First 8 weeks free.

Link: crackdsa.in

Tagging: #DSA #SDE #MNCInterview #LeetCode #PlacementPrep"

--- WHATSAPP/TELEGRAM ---
Forward to every placement group you're in!
"Free DSA roadmap for MNC prep — crackdsa.in — 21 weeks structured plan with Amazon/Google specific problems"

--- QUORA ---
Answer DSA-related questions and link to your site as a resource.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## FIREBASE FREE TIER LIMITS (you're safe for a long time)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Firebase Spark (free) gives you:
- Authentication: Unlimited users ✅
- Firestore: 1 GB storage, 50,000 reads/day, 20,000 writes/day
- At 1000 users with daily usage: ~10,000 reads/day → WELL within limits
- Only upgrade when you have 5000+ daily active users

Vercel free tier:
- 100 GB bandwidth/month
- Unlimited deployments
- Custom domain: ✅


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## REVENUE PROJECTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Conservative estimates for a focused 3-month push:

Month 1: 50 users → 10 paid → ₹1,000 - ₹900 (Instamojo fee) = ₹900
Month 2: 200 users → 40 paid → ₹4,000 - fees = ₹3,760  
Month 3: 500 users → 100 paid → ₹10,000 - fees = ₹9,700

If you get featured on a big DSA YouTube channel or Reddit post goes viral:
1000 users in a week → 200 paid → ₹20,000 in one week

Keys to conversions:
- Free users MUST feel genuine value before hitting paywall (weeks 1-8 free does this)
- Price at ₹99 = no-brainer for a student spending 3 months prepping
- Certificate gives them a reason to complete AND share on LinkedIn


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SITEMAP (create public/sitemap.xml)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create file: public/sitemap.xml

<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://crackdsa.in/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
