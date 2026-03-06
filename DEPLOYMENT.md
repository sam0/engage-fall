# 🚀 Deployment Guide - Engage Fall

## Quick Deploy to Azure (Recommended)

**Total Time: 10 minutes**

### Prerequisites
- Azure subscription (companies with Microsoft 365/Viva Engage have this)
- GitHub account
- Viva Engage admin access

---

## Step 1: Get Viva Engage API Token (5 minutes)

### Option A: Using Azure AD App Registration (Recommended)

1. **Register an Azure AD App:**
   - Go to https://portal.azure.com
   - Navigate to **Azure Active Directory** → **App registrations** → **New registration**
   - Name: `Engage Wall App`
   - Supported account types: **Accounts in this organizational directory only**
   - Click **Register**

2. **Configure API Permissions:**
   - Go to **API permissions** → **Add a permission**
   - Select **Microsoft Graph** → **Delegated permissions**
   - Add: `User.Read`, `Group.Read.All`
   - Click **Grant admin consent** (requires admin)

3. **Create Client Secret:**
   - Go to **Certificates & secrets** → **New client secret**
   - Description: `Engage Wall Secret`
   - Expiration: **24 months** (or custom)
   - Copy the **Value** (this is your secret - save it!)

4. **Get Token:**
   ```bash
   # Use this endpoint to get access token
   POST https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token

   # Body:
   grant_type=client_credentials
   client_id={app-id}
   client_secret={secret}
   scope=https://graph.microsoft.com/.default
   ```

   Or use this Node.js script:
   ```javascript
   const fetch = require('node-fetch');

   async function getToken() {
     const response = await fetch(
       `https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token`,
       {
         method: 'POST',
         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
         body: new URLSearchParams({
           grant_type: 'client_credentials',
           client_id: '{CLIENT_ID}',
           client_secret: '{CLIENT_SECRET}',
           scope: 'https://graph.microsoft.com/.default'
         })
       }
     );
     const data = await response.json();
     console.log('Access Token:', data.access_token);
   }

   getToken();
   ```

### Option B: Using Personal Access Token (Quick Test)

1. Go to https://developer.yammer.com/docs/oauth-2
2. Generate a developer token for testing
3. **Note:** These expire after 30 days - not for production!

---

## Step 2: Deploy to Azure Static Web Apps (5 minutes)

### Method 1: Deploy Button (Easiest)

1. **Click the Deploy Button:**

   [![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.StaticApp)

2. **Fill in the form:**
   - **Subscription:** Your Azure subscription
   - **Resource Group:** Create new: `engage-wall-rg`
   - **Name:** `yourcompany-engage-wall`
   - **Region:** Choose closest to you
   - **Source:** GitHub
   - **Organization:** Your GitHub username
   - **Repository:** `yamfall-modern` (after you fork it)
   - **Branch:** `main`

3. **Configure Build:**
   - **App location:** `/`
   - **Api location:** `api`
   - **Output location:** `` (leave empty)

4. **Click Review + Create** → **Create**

5. **Add Environment Variable:**
   - After deployment, go to your Static Web App in Azure Portal
   - Navigate to **Configuration** → **Application settings**
   - Add new setting:
     - **Name:** `ENGAGE_ACCESS_TOKEN`
     - **Value:** (paste your token from Step 1)
   - Click **Save**

6. **Done!** Your wall is live at: `https://yourcompany-engage-wall.azurestaticapps.net`

---

### Method 2: Azure CLI (For Developers)

```bash
# Login to Azure
az login

# Create resource group
az group create --name engage-wall-rg --location eastus

# Create static web app
az staticwebapp create \
  --name yourcompany-engage-wall \
  --resource-group engage-wall-rg \
  --source https://github.com/YOUR_USERNAME/yamfall-modern \
  --location eastus \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --login-with-github

# Add the token (after deployment)
az staticwebapp appsettings set \
  --name yourcompany-engage-wall \
  --setting-names ENGAGE_ACCESS_TOKEN="your-token-here"
```

---

## Step 3: Test It Out

1. **Open your URL:** `https://yourcompany-engage-wall.azurestaticapps.net`
2. **Choose Campaign mode**
3. **Enter a hashtag** that's used in your Engage network (e.g., `FHL`, `Innovation`, `CustomerSuccess`)
4. **Watch real posts stream in!** 🎉

---

## Alternative Deployment Options

### Option B: Vercel (Very Easy)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd yamfall-modern
   vercel --prod
   ```

3. **Add Environment Variable:**
   - Go to https://vercel.com/dashboard
   - Select your project → **Settings** → **Environment Variables**
   - Add: `ENGAGE_ACCESS_TOKEN` = `your-token`
   - Redeploy

**Pros:** Super easy, great free tier
**Cons:** Not in Microsoft ecosystem

---

### Option C: Azure App Service (Traditional)

1. **Create App Service:**
   ```bash
   az webapp up --name yourcompany-engage-wall \
     --resource-group engage-wall-rg \
     --runtime "NODE|18-lts"
   ```

2. **Add Environment Variable:**
   ```bash
   az webapp config appsettings set \
     --name yourcompany-engage-wall \
     --resource-group engage-wall-rg \
     --settings ENGAGE_ACCESS_TOKEN="your-token"
   ```

**Pros:** Full control, can run complex backends
**Cons:** More expensive (~$13/month minimum)

---

### Option D: Railway/Render (Heroku Alternative)

**Railway:**
1. Go to https://railway.app
2. Connect GitHub repo
3. Add environment variable: `ENGAGE_ACCESS_TOKEN`
4. Deploy

**Render:**
1. Go to https://render.com
2. New Web Service → Connect repo
3. Add environment variable: `ENGAGE_ACCESS_TOKEN`
4. Deploy

**Pros:** Easy, generous free tiers, like Heroku
**Cons:** Not Microsoft ecosystem

---

## 🔒 Security Best Practices

### Token Management

1. **Never commit tokens to Git:**
   ```bash
   # Add to .gitignore
   echo ".env" >> .gitignore
   echo "local.settings.json" >> .gitignore
   ```

2. **Use Azure Key Vault (Production):**
   ```javascript
   // In Azure Function
   const { SecretClient } = require("@azure/keyvault-secrets");
   const { DefaultAzureCredential } = require("@azure/identity");

   const client = new SecretClient(
     "https://your-keyvault.vault.azure.net",
     new DefaultAzureCredential()
   );

   const token = await client.getSecret("engage-access-token");
   ```

3. **Rotate tokens regularly:**
   - Set calendar reminder to rotate every 6 months
   - Generate new token, update in Azure, delete old token

4. **Use Managed Identity (Advanced):**
   - Azure Functions can use Managed Identity
   - No tokens needed - Azure handles auth
   - Best for production

---

## 📊 Monitoring & Analytics

### Application Insights (Free with Azure)

1. **Enable in Azure Portal:**
   - Go to your Static Web App
   - Navigate to **Application Insights** → **Enable**

2. **View Metrics:**
   - Request counts
   - Response times
   - Errors
   - Usage patterns

3. **Set Alerts:**
   - High error rate
   - Slow response times
   - High usage (approaching limits)

---

## 💰 Cost Estimates

### Azure Static Web Apps (Recommended)

**Free Tier:**
- 100 GB bandwidth/month
- 100k requests/month
- **Perfect for most social walls**

**Standard Tier ($9/month):**
- Unlimited bandwidth
- Unlimited requests
- Custom domains with SSL
- SLA guarantee

**Typical Social Wall Usage:**
- ~1000 requests/day = 30k/month
- **Stays in FREE tier** ✅

### Traffic Estimates

- **Small event (100 viewers):** ~5k requests/day
- **Medium event (500 viewers):** ~25k requests/day
- **Large event (2000 viewers):** ~100k requests/day

All fit comfortably in the free tier!

---

## 🐛 Troubleshooting

### "Could not connect to Engage API"

**Check:**
1. Token is set correctly in Azure Portal → Configuration
2. Token hasn't expired (check expiration date)
3. Azure Function is deployed (check Functions tab)
4. API permissions are granted (check Azure AD app)

**Fix:**
```bash
# Test token manually
curl -X POST https://yourapp.azurestaticapps.net/api/search?q=test \
  -H "Content-Type: application/json"
```

### "No posts found"

**Check:**
1. Hashtag exists in your Engage network
2. Posts are recent (not archived)
3. User has permission to see posts

**Fix:** Try a different hashtag that you know exists

### "Function not found"

**Check:**
1. GitHub Actions deployment succeeded
2. `api` folder is committed to repo
3. Azure picked up the deployment

**Fix:**
```bash
# Trigger redeploy
git commit --allow-empty -m "Trigger redeploy"
git push
```

---

## 🎨 Customization for Companies

### 1. Brand Colors

Edit `index.html` CSS variables:
```css
:root {
  --engage-purple: #8661c5;  /* Change to company color */
  --engage-blue: #0078d4;    /* Change to company color */
}
```

### 2. Default Hashtags

Edit `index.html` placeholder:
```html
<input type="text" id="campaignQuery" placeholder="YourCampaign, TeamEvent">
```

### 3. Card Timing

Edit `CONFIG` in `index.html`:
```javascript
const CONFIG = {
  MAX_CARDS: 12,          // Number of visible cards
  CARD_INTERVAL: 3500,    // Milliseconds between cards
  INITIAL_BURST: 3,       // Cards shown immediately
  BURST_DELAY: 600        // Delay between burst cards
};
```

### 4. Custom Domain

In Azure Portal:
1. Go to Static Web App → **Custom domains**
2. Click **Add**
3. Enter: `wall.yourcompany.com`
4. Follow DNS configuration steps
5. SSL certificate auto-generated

---

## 📖 Support & Documentation

### For Companies Deploying:

**Quick Start Checklist:**
- [ ] Azure subscription active
- [ ] Viva Engage admin access
- [ ] Azure AD app registered
- [ ] API token obtained
- [ ] Forked GitHub repo
- [ ] Deployed to Azure Static Web Apps
- [ ] Environment variable set
- [ ] Tested with real hashtag

**Need Help?**
- Check troubleshooting section above
- Review Azure Static Web Apps docs: https://docs.microsoft.com/azure/static-web-apps
- Review Viva Engage API docs: https://learn.microsoft.com/en-us/viva/engage/integrate-yammer-into-your-app

---

## 🚀 Advanced: Auto-Refresh Tokens

For production, implement token refresh:

```javascript
// api/search/index.js
const { DefaultAzureCredential } = require("@azure/identity");

let cachedToken = null;
let tokenExpiry = null;

async function getToken() {
  if (cachedToken && tokenExpiry > Date.now()) {
    return cachedToken;
  }

  const credential = new DefaultAzureCredential();
  const tokenResponse = await credential.getToken(
    "https://graph.microsoft.com/.default"
  );

  cachedToken = tokenResponse.token;
  tokenExpiry = tokenResponse.expiresOnTimestamp;

  return cachedToken;
}
```

---

**Created with ❤️ for Viva Engage communities**
