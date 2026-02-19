# 🌊 Yamfall - Modern Social Stream Waterfall

A beautiful, modern waterfall display for social media messages. Originally designed for Yammer (now Viva Engage), this version works standalone with a sleek, responsive design.

## ✨ Features

- **Beautiful gradient background** with modern UI
- **Waterfall animation** - messages flow in smoothly
- **Responsive grid layout** - works on all devices
- **Pause/Resume** - control the message flow
- **Auto-cleanup** - keeps only the latest 50 messages
- **Zero dependencies** - pure HTML, CSS, and vanilla JavaScript

## 🚀 Deploy to GitHub Pages

### Quick Setup:

1. **Fork or clone this repo**
2. **Go to your repo settings** on GitHub
3. **Navigate to Pages** section
4. **Select Source**: Deploy from branch `main` (or `master`)
5. **Select folder**: `/ (root)`
6. **Save** and wait a few minutes

Your site will be live at: `https://YOUR-USERNAME.github.io/yamfall/`

### Alternative: Deploy from local

```bash
# From this directory
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/yamfall.git
git push -u origin main
```

Then enable GitHub Pages in your repo settings.

## 🎨 Customization

Edit `index.html` to customize:

- **Colors**: Change the gradient in the `body` CSS
- **Message timing**: Adjust `setInterval(createMessage, 3000)` at the bottom
- **Max messages**: Change `maxMessages = 50`
- **Sample data**: Edit `sampleNames` and `sampleMessages` arrays

## 🔌 Connect to Real Data

To connect to Viva Engage or another API:

1. **Register your app** with Microsoft to get API credentials
2. **Add authentication** using the Viva Engage SDK
3. **Replace the mock data** with real API calls

Example API integration:

```javascript
// Replace createMessage() with real API calls
async function fetchMessages() {
    const response = await fetch('YOUR_API_ENDPOINT');
    const data = await response.json();
    // Process and display messages
}
```

## 📱 Demo

Open `index.html` in any browser to see it in action!

## 🛠️ Tech Stack

- Pure HTML5
- Modern CSS3 with Grid & Flexbox
- Vanilla JavaScript (no frameworks needed!)

## 📝 License

MIT License - feel free to use and modify!

---

Made with ❤️ for beautiful social streams
