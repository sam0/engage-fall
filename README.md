# 🌊 Engage Fall - Live Social Wall for Viva Engage

**A beautiful, production-ready social wall for displaying live Viva Engage posts on large screens at events, lobbies, and conferences.**

Built with Microsoft Fluent Design, optimized for 1080p to 4K displays.

---

## ✨ Features

- 🔴 **Live streaming** - Real posts from your Viva Engage network
- 🎨 **Fluent Design** - Microsoft design system with acrylic effects
- 📺 **Big screen optimized** - Responsive grid adapts 1080p → 4K
- ⚡ **Smooth animations** - Waterfall effect with no flashing
- ⌨️ **Keyboard controls** - Space (pause), C (clear), R (restart), F (fullscreen)
- 🎯 **Campaign mode** - Stream any hashtag from your network
- 🏢 **Community mode** - Show posts from specific communities
- 🔄 **Auto-loop** - Posts recycle continuously
- 🎪 **Event-ready** - Perfect for demo days, town halls, conferences

---

## 🚀 Quick Deploy (For Companies)

### Option 1: Azure Static Web Apps (Recommended - FREE)

**Perfect if you have:**
- Microsoft 365 / Viva Engage
- Azure subscription

**Deploy in 10 minutes:**

1. **Click Deploy to Azure:**

   [![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.StaticApp)

2. **Get your Engage API token** (see [DEPLOYMENT.md](./DEPLOYMENT.md))

3. **Configure & Deploy**

4. **Done!** Get URL like: `yourcompany-wall.azurestaticapps.net`

👉 **[Full deployment guide →](./DEPLOYMENT.md)**

---

### Option 2: Local Development / Testing

**Test locally with demo data:**

```bash
# Just open the HTML file
open index.html

# Or with real data (requires Engage MCP):
node server.js
# Then open index.html
```

**Demo data mode:**
- Works offline
- No authentication needed
- Perfect for presentations and testing

---

## 🎯 Use Cases

### ✅ Perfect For:
- **Company events** - FHL, hackathons, town halls
- **Office lobbies** - Show community energy 24/7
- **Conferences** - Display live social buzz
- **Demo days** - Showcase product launches
- **Customer presentations** - Prove Engage engagement

### 💡 Real Examples:
- "Display all #FHL posts during Fix Hack Learn week"
- "Show #CustomerSuccess stories in the sales office"
- "Stream #Innovation posts at the innovation showcase"
- "Display Engineering community feed in the café"

---

## 📖 How It Works

### Architecture (Production)

```
Browser (index.html)
    ↓ HTTPS
Azure Function (/api/search)
    ↓ OAuth Token
Viva Engage GraphQL API
```

### What It Does

1. **User enters hashtag** (e.g., "FHL", "Innovation")
2. **Backend searches** Viva Engage for matching threads
3. **Enriches data** with author job titles via GraphQL
4. **Streams posts** with smooth waterfall animations
5. **Loops forever** - posts recycle when queue empties

---

## 🎨 Customization

### Brand Colors

Edit CSS variables in `index.html`:
```css
:root {
  --engage-purple: #8661c5;  /* Your brand color */
  --engage-blue: #0078d4;    /* Your brand color */
}
```

### Timing

Edit config in `index.html`:
```javascript
const CONFIG = {
  MAX_CARDS: 12,          // Cards on screen
  CARD_INTERVAL: 3500,    // Time between cards (ms)
  INITIAL_BURST: 3,       // Cards shown immediately
  BURST_DELAY: 600        // Delay between burst (ms)
};
```

### Communities List

Edit the communities array in `index.html`:
```javascript
const COMMUNITIES = [
  {name: "Your Community Name", id: "community-id"},
  // Add more...
];
```

---

## 🔒 Security

- ✅ **No tokens in code** - Environment variables only
- ✅ **Azure Key Vault** - Token encryption at rest
- ✅ **HTTPS only** - TLS 1.2+ enforced
- ✅ **No client-side secrets** - Backend handles all auth
- ✅ **Managed Identity** - Optional for Azure deployments

See [DEPLOYMENT.md](./DEPLOYMENT.md) for security best practices.

---

## 💰 Cost (Azure Static Web Apps)

### FREE Tier Includes:
- 100 GB bandwidth/month
- 100,000 requests/month
- Custom SSL certificates
- Global CDN

### Typical Usage:
- **Small event** (100 viewers): ~5k requests/day → **FREE** ✅
- **Medium event** (500 viewers): ~25k requests/day → **FREE** ✅
- **Large event** (2000 viewers): ~100k requests/day → **FREE** ✅

**Most social walls stay in the free tier!**

---

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Full deployment guide
- **[DEMO-DAY-SETUP.md](./DEMO-DAY-SETUP.md)** - Quick start for demos
- **[CONTEXT.md](./CONTEXT.md)** - Technical documentation

---

## 🐛 Troubleshooting

### "Could not connect to Engage API"
- Check Azure environment variable `ENGAGE_ACCESS_TOKEN` is set
- Verify token hasn't expired
- Test API endpoint: `/api/search?q=test`

### "No posts found"
- Try a different hashtag that exists in your network
- Verify user has permission to see posts
- Check hashtag spelling

### Cards flashing or jumping
- Clear browser cache
- Hard refresh (Cmd+Shift+R)
- Check browser supports CSS animations

---

## 🤝 Contributing

This is a production-ready app for companies using Viva Engage.

**To customize for your company:**
1. Fork this repo
2. Customize branding (colors, logo, etc.)
3. Deploy to your Azure subscription
4. Share with your team!

---

## 📄 License

Internal Microsoft tool. Check with your team before external distribution.

---

## 🎉 Credits

**Created for Viva Engage Demo Day 2026**

Built with:
- Microsoft Fluent Design System
- Viva Engage GraphQL API
- Azure Static Web Apps
- Lots of ❤️ for the Engage community

---

**Questions?** See [DEPLOYMENT.md](./DEPLOYMENT.md) or check [troubleshooting](#-troubleshooting) above.
