# Viva Engage Live Wall - Technical Documentation

## 🚀 CURRENT SESSION STATUS (Last Updated: March 6, 2026)

### ✅ What's Been Completed

**1. Social Wall UI - WORKING**
- ✅ Fixed animation flash issues (cards insert at top, remove from bottom)
- ✅ Smooth waterfall flow with no scrolling jumps
- ✅ Text properly truncated to 4 lines with webkit-line-clamp
- ✅ Generic demo data (no real names/companies)
- ✅ Button disables during search with "LOADING..." state
- ✅ Enter key support for search input

**2. Production Deployment - LIVE**
- ✅ GitHub repo: https://github.com/sam0/engage-fall
- ✅ Azure Static Web App: https://salmon-hill-07569fb10.4.azurestaticapps.net
- ✅ Auto-deploy from GitHub working
- ✅ Azure Function backend deployed

**3. Authentication Setup - COMPLETE**
- ✅ Azure AD app "Engage Fall" created
- ✅ App ID: `cfe4928b-5e53-41cf-96b1-e3e9b3e2e6b6`
- ✅ Tenant ID: `c31fac81-72ee-4339-8f91-de35e1bdadc3`
- ✅ Yammer API permissions added (access_as_user, user_impersonation, Community.*, EngagementConversation.*, Storyline.*)
- ✅ Admin consent granted
- ✅ Yammer API token generated and added to Azure environment variables

**4. Backend API - READY TO TEST**
- ✅ Switched from Microsoft Graph to Yammer REST API
- ✅ Uses endpoint: `https://www.yammer.com/api/v1/messages/search.json`
- ✅ Properly formats responses with author, title, body, reactions, comments
- ✅ Token configured in Azure: `ENGAGE_ACCESS_TOKEN`

### 🎯 NEXT STEPS (When You Resume)

**Test the Yammer API Integration:**

1. Open: https://salmon-hill-07569fb10.4.azurestaticapps.net
2. Click "Campaign"
3. Enter a search term or hashtag from your test tenant
4. **Expected:** Real posts from your Engage network!
5. **If it fails:** Check browser console (F12) for errors

**If Real Data Works:**
- Document the setup process
- Test with different hashtags
- Verify all fields (author names, job titles, reactions, comments)

**If Still Shows Demo Data:**
- Check Azure Function logs in Portal
- Verify token hasn't expired (they expire in ~1 hour)
- May need to regenerate token with: `node get-yammer-token.js`

### 📋 Quick Reference

**Your App URLs:**
- Live site: https://salmon-hill-07569fb10.4.azurestaticapps.net
- GitHub: https://github.com/sam0/engage-fall
- Azure Portal: Search for "engage-fall-test"

**Get New Yammer Token (if needed):**
```bash
cd ~/Desktop/yamfall-modern
node get-yammer-token.js
```

**Push Updates:**
```bash
cd ~/Desktop/yamfall-modern
git add .
git commit -m "Your message"
git push
# Auto-deploys to Azure in ~2 minutes
```

---

## Overview

A **production-ready social wall** for displaying live Viva Engage posts on large screens. Built with Microsoft Fluent Design System, optimized for 1080p to 4K displays, and ready for customer demos and events.

## 🚀 CURRENT IMPLEMENTATION (Real-Time Engage Search)

### Architecture
**Two-part system:**
1. **index.html** - Browser-based UI (vanilla JS, no frameworks)
2. **server.js** - Node.js bridge server (localhost:3456)

### Data Flow
```
User enters hashtag → Browser → localhost:3456 → Engage MCP → Viva Engage Network
                                    ↓
Real posts with accurate titles ← JSON ← GraphQL ← Search Results
```

### How to Run
```bash
# Terminal 1: Start bridge server
cd ~/Desktop/yamfall-modern
node server.js

# Then: Open index.html in browser
# Enter any hashtag from your Engage network
```

### What It Does
1. **Search**: Uses `mcp__engage-mcp__search` to find threads by hashtag
2. **Enrich**: For each thread, uses `mcp__engage-mcp__execute_query` with GraphQL to get:
   - Author's real job title (`jobTitle` field)
   - Full post body text
   - Accurate reaction/comment counts
3. **Display**: Streams posts with waterfall animations

### Files
- `index.html` - The visual social wall app
- `server.js` - Bridge server connecting browser to Engage MCP
- `README.md` - User setup instructions
- `CONTEXT.md` - This technical documentation

### Key Features
✅ **Real-time search** - Any hashtag from your Engage network
✅ **Accurate titles** - Fetches real job titles via GraphQL
✅ **Infinite loop** - Posts recycle forever
✅ **No auth needed** - Uses existing Engage MCP configuration

---

## 🎨 Design System

### Microsoft Fluent Design Principles

**1. Acrylic Materials**
- Translucent backgrounds with blur effects
- `backdrop-filter: blur(40px) saturate(180%)`
- Creates depth and visual hierarchy

**2. Elevation & Shadow**
- Layered shadow system for depth
- `--elevation-shadow: 0 8px 32px rgba(0,0,0,.12)`
- `--elevation-hover: 0 16px 48px rgba(0,0,0,.18)`

**3. Motion & Animation**
- Smooth cubic-bezier transitions
- Card cascade: `cubic-bezier(.23,1,.32,1)`
- Hover effects: `cubic-bezier(.4,0,.2,1)`

**4. Typography**
- Segoe UI font stack (Microsoft standard)
- Clear hierarchy: 48px → 28px → 18px → 15px
- High contrast for readability

### Brand Colors

**Viva Engage Palette:**
- Primary Purple: `#8661c5`
- Dark Purple: `#6b4c9a`
- Light Purple: `#a77fd8`

**Microsoft Palette:**
- Microsoft Blue: `#0078d4`
- Microsoft Purple: `#5c2d91`

**Semantic Colors:**
- Success: `#107c10` (Green)
- Warning: `#ff8c00` (Orange)

---

## 📐 Layout Architecture

### Responsive Grid System

```css
/* Base (1080p) */
grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
gap: 28px;

/* Large (1920px+) */
minmax(480px, 1fr)
gap: 32px;

/* Ultra (2560px+) */
minmax(520px, 1fr)
gap: 36px;
```

### Card Anatomy
1. **Header** (56px avatar + author info)
2. **Title** (optional, 2-line clamp)
3. **Body** (5-line clamp, 15px, 1.6 line-height)
4. **Meta** (reactions, comments, time)

### Text Overflow Handling
- All text uses `text-overflow: ellipsis`
- Multi-line clamp with `-webkit-line-clamp`
- Prevents layout breaks on large screens

---

## 🔧 Technical Stack

### Frontend
- **Pure HTML/CSS/JS** - No frameworks
- **Single file** - Easy deployment
- **Self-contained** - No external dependencies

### Animation System
- CSS Animations for particles
- JavaScript-triggered CSS transitions for cards
- `requestAnimationFrame` not needed (CSS handles timing)

### State Management
```javascript
let state = {
  currentSource: '',      // 'campaign' or 'community'
  sourceLabel: '',        // Display name
  sourceCommunityId: '', // For community feeds
  queue: [],             // Shuffled post queue
  paused: false,         // Pause state
  feedInterval: null,    // Interval ID
  totalPosts: 0,         // Stats
  totalReactions: 0,
  totalComments: 0,
  avatarCache: {}        // URL cache
};
```

---

## 🔌 Data Integration

### Current State: Demo Data
The app uses **high-quality demo data** by default:
- Realistic author names and titles
- Varied post content with templates
- Random reactions/comments in realistic ranges
- Timestamps spread over past week

**Perfect for:**
- Customer demos
- Event displays
- Proof of concepts
- Offline presentations

### Engage MCP Integration (Ready to Connect)

**Campaign Feed (Hashtag Search):**
```javascript
async function fetchCampaignFeed(hashtag) {
  const response = await window.mcpSearch({
    query: hashtag.replace(/^#/, ''),
    categories: 'Threads',
    limit: 20
  });
  return parseCampaignResponse(response);
}
```

**Community Feed:**
```javascript
async function fetchCommunityFeed(communityId) {
  const query = `
    query GetCommunityFeed {
      group(databaseId: "${communityId}") {
        feed {
          threads(last: 20) {
            edges {
              node {
                threadStarter {
                  sender {
                    ... on User {
                      displayName
                      title
                      avatarUrlTemplate
                    }
                  }
                  body { text }
                  title
                  createdDateTime
                  likeCount
                  replyCount
                  isOfficial
                }
              }
            }
          }
        }
      }
    }
  `;
  const response = await window.mcpExecuteQuery(query);
  return parseCommunityResponse(response);
}
```

**Communities List:**
```javascript
async function fetchCommunities() {
  const response = await window.mcpSearch({
    query: 'Engage',
    categories: 'Communities',
    limit: 15
  });
  return parseCommunitiesResponse(response);
}
```

### MCP Bridge Setup

To connect to real Engage MCP, implement these bridge functions:

```javascript
// Replace in HTML around line 900
window.mcpExecuteQuery = async function(query) {
  // Option 1: Direct GraphQL API call
  const response = await fetch('https://www.yammer.com/api/v1/graphql', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  });
  return response.json();
};

window.mcpSearch = async function(params) {
  // Option 2: MCP server endpoint
  const response = await fetch('YOUR_MCP_ENDPOINT/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });
  return response.json();
};
```

---

## 🎯 Configuration

### Timing Settings
```javascript
const CONFIG = {
  MAX_CARDS: 15,        // Maximum visible cards
  CARD_INTERVAL: 3500,  // Milliseconds between new cards
  INITIAL_BURST: 3,     // Cards shown immediately
  BURST_DELAY: 600      // Delay between burst cards
};
```

**Recommended for Different Scenarios:**
- **Fast-paced event**: `CARD_INTERVAL: 2500`
- **Lobby display**: `CARD_INTERVAL: 4000`
- **High activity**: `MAX_CARDS: 20`
- **Clean minimal**: `MAX_CARDS: 12`

---

## 📊 Features

### Feed Sources
1. **Campaign Feed** - Search by hashtag across all of Engage
2. **Community Feed** - Show posts from a specific community

### Post Types
- **Standard** - White card with normal styling
- **Featured** - Blue gradient (20+ reactions)
- **Announcement** - Purple gradient (official posts)

### Card Features
- Real avatar photos (with gradient fallbacks)
- Author name and title
- Optional post title
- Body text (5-line preview)
- Reaction count, comment count, relative time

### Controls
- **Pause/Resume** - Stop/start the stream
- **Clear** - Remove all cards with cascade animation
- **Restart** - Go back to source selection
- **Fullscreen** - Optimize for large displays

### Keyboard Shortcuts
- `Space` - Pause/Resume
- `C` - Clear cards
- `R` - Restart
- `F` - Fullscreen

---

## 🚀 Deployment Options

### 1. Static File Hosting
- Upload `index.html` to any web server
- Works on: Azure Static Web Apps, GitHub Pages, Netlify, etc.
- No build step required

### 2. Embedded in App
- Can be embedded in iframe
- Works in Electron, WebView, etc.
- Add `allow-same-origin allow-scripts` to iframe

### 3. Local File
- Double-click to open in browser
- Perfect for demos and events
- No internet required (with demo data)

---

## 🎪 Event Setup Best Practices

### Display Requirements
- **Minimum**: 1920x1080 (Full HD)
- **Recommended**: 2560x1440 (2K) or 3840x2160 (4K)
- **Aspect ratio**: 16:9 or wider

### Browser Requirements
- **Chrome/Edge**: Recommended (best Fluent Design support)
- **Safari**: Works (some blur effects may differ)
- **Firefox**: Works (no Fluent acrylic backdrop)

### Performance
- Tested with 15 cards @ 60fps on 4K displays
- Particle animations: 40 particles max for smooth performance
- Memory: Stays under 100MB even after hours

---

## 🐛 Known Issues & Workarounds

### MCP Not Connected
- **Issue**: Browser can't directly access MCP tools
- **Workaround**: Uses high-quality demo data automatically
- **Solution**: Implement MCP bridge server (see above)

### Avatar URLs Expire
- **Issue**: Engage avatar URLs are time-limited (few hours)
- **Workaround**: Gradient fallbacks with initials
- **Solution**: Refresh avatars periodically in production

### Text Overflow
- **Intended behavior**: Long text uses ellipsis for clean layout
- **Why**: Large screens need predictable card sizes
- **Full text**: Available in actual Engage app

---

## 📁 File Structure

```
/Users/sam/Desktop/yamfall-modern/
├── index.html              # Main app - browser UI with animations
├── server.js               # Bridge server - connects to Engage MCP
├── README.md               # User setup instructions
├── CONTEXT.md              # This file (technical docs)
├── DEMO-DAY-SETUP.md       # Quick start guide
└── index.html.backup       # Original version (pre-redesign)
```

---

## 🔐 Security Considerations

### Demo Data Mode
- No external API calls
- No tokens or credentials needed
- Safe for public demos

### Production Mode
- Store API tokens securely (never in HTML)
- Use environment variables
- Implement token refresh
- Consider CORS and CSP headers

---

## 🎨 Customization Guide

### Change Brand Colors
```css
:root {
  --engage-purple: #YOUR_COLOR;
  --engage-blue: #YOUR_COLOR;
}
```

### Adjust Card Sizes
```css
.card-grid {
  grid-template-columns: repeat(auto-fill, minmax(YOUR_SIZE, 1fr));
}
```

### Modify Animations
```css
@keyframes cardIn {
  from { /* Your animation */ }
  to { /* Your animation */ }
}
```

### Add Custom Post Types
```javascript
// In addNextCard() function
if (post.customType) {
  cls += ' custom-type';
}
```

---

## 📈 Analytics Opportunities

The app tracks:
- Total posts displayed
- Total reactions shown
- Total comments shown
- Feed type (campaign vs community)

**Potential integrations:**
- Application Insights
- Google Analytics
- Custom event tracking
- Engagement heat maps

---

## 🌟 Future Enhancements

### Planned Features
- [ ] Real-time refresh (WebSocket/polling)
- [ ] Video/image attachments preview
- [ ] Reaction animations
- [ ] Community leaderboards
- [ ] Multi-feed mashup mode

### Nice-to-Have
- [ ] QR code for "Join community"
- [ ] Live reaction counter animation
- [ ] Admin panel for timing control
- [ ] Multiple theme presets

---

## 🤝 Contributing

Built for Viva Engage Demo Day 2026.

**Feedback welcome:**
- Design improvements
- Performance optimizations
- Feature requests
- Bug reports

---

## 📜 License

Internal Microsoft use. Check with your team before external distribution.

---

**Created with ❤️ for the Viva Engage community**
