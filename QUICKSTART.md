# ⚡ Quick Start Guide - DesignSpec Ltd

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- A Clerk account (free tier works)
- A Supabase account (free tier works)

## Step 1: Install Dependencies (2 minutes)

```bash
cd Designspec
npm install
```

## Step 2: Set Up Clerk (1 minute)

1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application
3. Copy your API keys from the dashboard
4. Keep them handy for the next step

## Step 3: Set Up Supabase (1 minute)

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Wait for it to initialize (~2 minutes)
4. Go to Settings → API and copy your keys

## Step 4: Configure Environment (30 seconds)

```bash
# Copy the example file
cp .env.example .env.local

# Open .env.local in your editor
# Paste your Clerk and Supabase keys
```

Your `.env.local` should look like:

```env
# Clerk (paste your actual keys)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase (paste your actual keys)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Step 5: Set Up Database (1 minute)

1. Open Supabase Dashboard → SQL Editor
2. Copy the SQL from `SETUP.md` (starting from line 103)
3. Paste and click "Run"
4. Wait for success message

## Step 6: Run the App! (10 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎉 You're Done!

You should see a beautiful landing page with:
- Hero section
- Services showcase
- Company stats
- Portfolio preview
- Call-to-action

## Next Steps

1. **Test Authentication:**
   - Click "Get Started" to create an account
   - Complete sign-up
   - You'll be redirected to the dashboard

2. **Explore the Code:**
   - Check `src/app/(marketing)/page.tsx` for the landing page
   - See `src/components/marketing/` for all sections
   - Review `src/types/` for TypeScript definitions

3. **Build More Features:**
   - Follow `IMPLEMENTATION.md` to see what's done
   - Check `README.md` for full documentation
   - Use `SETUP.md` for detailed configuration

## 🆘 Troubleshooting

### "Module not found" errors?
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Clerk not working?
- Double-check your keys in `.env.local`
- Make sure there are no extra spaces
- Restart the dev server

### Supabase connection issues?
- Verify your project is active in Supabase dashboard
- Check that you ran the SQL migration
- Confirm your keys are correct

### Build errors?
```bash
# Check for TypeScript errors
npm run type-check

# Check for linting issues
npm run lint
```

## 📚 Documentation

- **Full Setup:** See `SETUP.md`
- **Implementation Details:** See `IMPLEMENTATION.md`
- **Complete Guide:** See `README.md`

## 🚀 Production Deployment

When ready to deploy:

1. Push code to GitHub
2. Connect to Vercel (or your preferred platform)
3. Add all environment variables
4. Deploy!

---

**Need Help?**

- 📖 Read the docs: `README.md`, `SETUP.md`
- 🐛 Check for issues: Run `npm run type-check`
- 💬 Review the code: Everything is documented

---

**Built by the DesignSpec Development Team**