# 🌊 Engage Fall - Live Social Stream for Events

**The most stunning way to display your Viva Engage conversations at corporate events, campaigns, and on big screens worldwide.**

Transform your organization's social conversations into an eye-catching, dynamic waterfall display. Perfect for town halls, conferences, sales kickoffs, and anywhere you want to showcase the energy and engagement of your community.

## ✨ Features

### 🎨 Event-Ready Design
- **Stunning visuals** - Gradient backgrounds, particle effects, shimmer animations
- **Big screen optimized** - Looks incredible on TVs and projectors
- **Featured posts** - Highlight high-engagement messages in gold
- **Live engagement metrics** - Real-time message and engagement counters
- **Smooth animations** - 3D transforms and professional entrance effects

### ⚙️ Flexible Configuration
Connect to multiple data sources:
- **Demo Mode** - Beautiful sample data to test the experience
- **Entire Network** - All company messages
- **Community Feed** - Specific community or team
- **Event/Campaign** - Track a specific hashtag (e.g., #SalesKickoff2026)
- **Hashtag Feed** - Monitor any hashtag

### 🎮 Live Controls
- **Pause/Resume** - Control the flow during presentations
- **Clear** - Reset the display
- **Settings** - Configure on the fly
- **Keyboard shortcuts** - Space to pause, C to clear, S for settings

### 🔌 Real API Integration
Works with Viva Engage API:
- OAuth 2.0 authentication
- Multiple feed types supported
- Fallback to demo mode if API unavailable
- Configurable update intervals (3s - 30s)

## 🚀 Quick Start

### For Events (Demo Mode)
1. Open `index.html` in any browser
2. It works immediately with beautiful sample data!
3. Display on your big screen
4. Press Space to pause during key moments

### For Live Data
1. Open Settings (⚙️ button or press S)
2. Select your data source (Network/Community/Event/Hashtag)
3. Enter your Viva Engage API token
4. Configure your feed (Community ID or Hashtag)
5. Click "Save & Connect"
6. Watch your live conversations flow!

## 🌐 Deploy to GitHub Pages

1. **Upload to your repo:**
   - Go to https://github.com/sam0/Engaged
   - Upload `index.html` and `README.md`

2. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Select main branch, / (root)
   - Save

3. **Share the URL:**
   - Your live site: `https://sam0.github.io/Engaged/`
   - Share with event organizers and teams

## 🎯 Perfect For

- **Town Halls** - Show live employee questions and reactions
- **Conferences** - Display event hashtag conversations
- **Sales Kickoffs** - Celebrate wins and build energy
- **Campaigns** - Track campaign hashtags in real-time
- **Office TVs** - Keep the organization connected
- **All-Hands** - Showcase company-wide engagement

## 🎨 Customization

Edit `index.html` to customize:

- **Colors**: Change gradient in `body` style (line ~12)
- **Timing**: Adjust `config.updateInterval` (line ~752)
- **Max messages**: Change `maxMessages` (line ~746)
- **Particle effects**: Modify `createParticles()` (line ~749)

## 🔐 Getting Your API Token

1. Go to Viva Engage Developer Settings
2. Register your app (if needed)
3. Generate an OAuth 2.0 token
4. Copy the token into Settings

**Note:** For public events, demo mode is recommended. For internal events with proper authentication, use live API integration.

## 📱 Technical Details

- **Pure HTML/CSS/JavaScript** - No frameworks, no build steps
- **Responsive** - Works on desktop, tablet, mobile
- **Performant** - Smooth animations, optimized rendering
- **Accessible** - Keyboard shortcuts, semantic HTML
- **Cross-browser** - Works in all modern browsers

## 🎬 Keyboard Shortcuts

- **Space** - Pause/Resume
- **C** - Clear feed
- **S** - Open settings
- **Escape** - Close settings

## 📊 What Makes It Special

Unlike traditional social walls, Engage Fall is designed specifically for:
- **Professional environments** - Enterprise-grade design
- **Viva Engage integration** - Native support for Microsoft's platform
- **Live events** - Built for big screens and high-energy moments
- **Campaign tracking** - Perfect for marketing and internal campaigns

## 🛠️ Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with ES6+ support

## 📝 License

MIT License - Use it for your events, customize it, make it your own!

---

**Built for Microsoft Viva Engage**
*Making corporate conversations beautiful*

🌟 Star this repo if you use it at your events!
💬 Share your feedback and event photos!
