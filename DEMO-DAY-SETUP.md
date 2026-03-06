# 🚀 Demo Day Setup Guide - Viva Engage Live Wall

## What Is This?

A **customer-ready social wall** for displaying live Viva Engage activity on large screens at events, lobbies, or demo days. Built with Microsoft Fluent Design and Engage branding.

---

## 🎯 Quick Start (For Demo Day)

### 1. **Open the App**
```bash
open index.html
```
Or just double-click `index.html` in Finder.

### 2. **Choose Your Feed**
- **Campaign Feed (#)** - Enter a hashtag like `FHL`, `AIInnovation`, or `CustomerSuccess`
- **Community Feed (👥)** - Pick from the list of Engage communities

### 3. **Go Fullscreen**
- Click the fullscreen button (⛶) in the top-right
- Or press `F` key
- Perfect for large displays!

### 4. **Demo Mode**
The app currently uses **high-quality demo data** that looks realistic. This is perfect for:
- Customer demos
- Event displays
- Proof of concepts
- Demo day presentations

---

## 🎨 Design Features

### Microsoft Fluent Design
- **Acrylic materials** - Translucent backgrounds with blur
- **Depth & elevation** - Layered shadows and hover effects
- **Motion** - Smooth animations and transitions
- **Microsoft brand colors** - Engage purple (#8661c5), Microsoft blue (#0078d4)

### Large Screen Optimized
- **Responsive grid** - Adapts from 1080p to 4K displays
- **420px cards minimum** - Readable from across the room
- **High contrast text** - Easy to read on large screens
- **Fluent typography** - Segoe UI font system

### Social Wall Features
- **Live streaming** - Cards cascade in smoothly
- **Real-time stats** - Post count, reactions, comments
- **Featured posts** - Highlights popular content (20+ reactions)
- **Announcements** - Special styling for official posts

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Pause/Resume stream |
| `C` | Clear all cards |
| `R` | Restart (choose new source) |
| `F` | Toggle fullscreen |

---

## 🎬 Demo Day Script

### Opening
> "Let me show you how Viva Engage brings your community to life. This is our Live Wall - perfect for events, lobbies, or anywhere you want to showcase community energy."

### Choose Campaign
> "Let's say we're running a campaign around [topic]. I'll just enter the hashtag..."
- Enter: `FHL`, `Innovation`, `CustomerSuccess`
- Watch cards stream in

### Highlight Features
> "Notice how posts cascade in smoothly - this uses Microsoft Fluent Design. Featured posts with lots of engagement get highlighted. And we're seeing real-time stats at the top."

### Show Community Feed
> "Or we can switch to a specific community..."
- Press `R` to restart
- Choose a community from the list
- Show community activity

### Fullscreen Demo
> "This really shines on a big screen - let me show you fullscreen mode."
- Press `F`
- Let it run for 30 seconds
- Show the smooth animations

---

## 🔌 Connecting to Real Engage Data (Optional)

The app is designed to connect to Viva Engage via MCP (Model Context Protocol). To use real data:

### Option 1: Engage MCP Integration
If you have Engage MCP set up:

1. Update the MCP bridge functions in the HTML (lines ~900-910)
2. Connect to your Engage MCP server
3. The app will automatically fetch real posts

### Option 2: Engage GraphQL API
For direct API access:

1. Get an Engage API token
2. Replace the `mcpExecuteQuery` function with direct GraphQL calls
3. Endpoint: `https://www.yammer.com/api/v1/graphql`

### Demo Data vs Real Data
- **Demo data** is perfect for presentations and customer demos
- **Real data** is great for actual deployments and live events
- The app gracefully falls back to demo data if MCP isn't available

---

## 📊 Customization Options

### Change Communities List
Edit the `getDefaultCommunities()` function to add your communities:
```javascript
function getDefaultCommunities() {
  return [
    {name: "Your Community Name", id: "community-id"},
    // ... more communities
  ];
}
```

### Adjust Timing
Edit the `CONFIG` object at the top of the script:
```javascript
const CONFIG = {
  MAX_CARDS: 15,           // Max cards visible
  CARD_INTERVAL: 3500,     // Time between cards (ms)
  INITIAL_BURST: 3,        // Cards in initial burst
  BURST_DELAY: 600         // Delay between burst cards (ms)
};
```

### Brand Colors
Update CSS variables in `:root`:
```css
:root{
  --engage-purple:#8661c5;
  --engage-blue:#0078d4;
  /* ... */
}
```

---

## 🎪 Best Practices for Events

### Before the Event
1. **Test on the actual display** - Colors and sizing may vary
2. **Choose your feed source** - Pre-select campaign/community
3. **Check internet** - Demo data works offline, real data needs connection
4. **Go fullscreen early** - Set it up before people arrive

### During the Event
1. **Let it run** - The app is designed to loop continuously
2. **Pause if needed** - Use spacebar during presentations
3. **Monitor stats** - Show engagement numbers to highlight activity

### After the Event
1. **Restart for next session** - Fresh feed for each session
2. **Clear cards** - Start clean between different segments

---

## 🐛 Troubleshooting

### "No posts found"
- **Using demo data**: This shouldn't happen - contact support
- **Using real data**: Check your MCP connection or API token

### Cards not appearing
- Check browser console (F12) for errors
- Verify JavaScript is enabled
- Try refreshing the page

### Text getting cut off
- The design uses text-overflow with ellipsis
- This is intentional for large displays
- Full text would be visible in the actual Engage app

### Performance on large screens
- App is optimized for up to 4K displays
- For 8K displays, adjust card sizes in CSS
- Reduce `MAX_CARDS` if performance is slow

---

## 📱 Contact & Support

Created for Viva Engage Demo Day 2026

**Questions?** Check the main [CONTEXT.md](./CONTEXT.md) file for technical details.

---

## ✨ Pro Tips

1. **Preload before demo** - Open the page 2 minutes before presenting
2. **Use a stable hashtag** - Choose campaigns with consistent activity
3. **Show the setup** - Customers love seeing how easy it is
4. **Emphasize simplicity** - "Just open, click, done"
5. **Mention customization** - "This can match your brand colors"

---

**Good luck on Demo Day! 🎉**
