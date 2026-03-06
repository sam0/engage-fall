# 🔄 Resume Session - Quick Start

## Where We Left Off (March 6, 2026)

**Status:** Everything deployed and configured. Ready to test Yammer API integration.

---

## ✅ What's Working

1. **App is live:** https://salmon-hill-07569fb10.4.azurestaticapps.net
2. **GitHub repo:** https://github.com/sam0/engage-fall
3. **Azure deployment:** Auto-deploys from GitHub
4. **Yammer API token:** Added to Azure environment variables
5. **UI fixed:** Smooth animations, no flashing, button states working

---

## 🎯 What to Do Next

### Test Real Engage Data

1. **Open:** https://salmon-hill-07569fb10.4.azurestaticapps.net
2. **Click:** "Campaign" button
3. **Enter:** A hashtag or keyword from your test tenant
4. **Expected:** Real posts from Viva Engage!

### If It Works ✅
- Test different hashtags
- Verify author names, titles, reactions showing correctly
- Document for other companies to use

### If It Fails ❌
1. **Check browser console** (F12) for errors
2. **Check Azure Function logs:**
   - Azure Portal → Search "engage-fall-test"
   - Click Static Web App → Functions → search → Monitor
3. **Token might be expired** (they expire in ~1 hour):
   ```bash
   cd ~/Desktop/yamfall-modern
   node get-yammer-token.js
   # Copy new token to Azure Configuration
   ```

---

## 🛠️ Useful Commands

**Get new Yammer token:**
```bash
cd ~/Desktop/yamfall-modern
node get-yammer-token.js
```

**Push code updates:**
```bash
cd ~/Desktop/yamfall-modern
git add .
git commit -m "Your update message"
git push
# Deploys automatically in ~2 minutes
```

**Run locally with Engage MCP (for demos):**
```bash
cd ~/Desktop/yamfall-modern
node server.js
# Then open index.html in browser
```

---

## 📝 Key Info

**Azure AD App:** "Engage Fall"
- App ID: `cfe4928b-5e53-41cf-96b1-e3e9b3e2e6b6`
- Tenant ID: `c31fac81-72ee-4339-8f91-de35e1bdadc3`
- Permissions: Yammer API (access_as_user, user_impersonation, Community.*, EngagementConversation.*)

**Azure Static Web App:** engage-fall-test
- Resource Group: engage-wall-test
- Region: East US 2
- Environment Variable: `ENGAGE_ACCESS_TOKEN`

**GitHub Repo:** sam0/engage-fall
- Branch: main
- Auto-deploys via GitHub Actions

---

## 🐛 Known Issues

1. **Token expires in 1 hour** - Need to regenerate for extended testing
2. **Demo data only shows generic posts** - Real data requires Yammer token
3. **Search might be slow first time** - Azure Function cold start

---

## 📚 Full Documentation

- **CONTEXT.md** - Technical details
- **DEPLOYMENT.md** - Full deployment guide
- **README.md** - User-facing documentation
- **DEMO-DAY-SETUP.md** - Quick demo setup

---

**Ready to test! Good luck! 🚀**
