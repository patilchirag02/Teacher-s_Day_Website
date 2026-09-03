# Teachers' Day 2026 — Deployment Guide

## Project Structure

```
teacher day/
├── index.html    ← main invitation page
├── styles.css    ← all styles & animations
├── script.js     ← JS: petals, music, transitions
└── DEPLOY.md     ← this file
```

No build step. No npm. No dependencies. Just three files.

---

## 1. Running Locally

You need a local server because browsers block Web Audio API on `file://` URLs.

### Option A — VS Code Live Server (easiest)
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Opens at `http://127.0.0.1:5500`

### Option B — Python (no install needed on most machines)
```bash
# Python 3
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

### Option C — Node.js
```bash
npx serve .
```
Then open the URL it prints.

---

## 2. Deploying for Free

### Option A — Netlify (recommended, fastest)

1. Go to [netlify.com](https://netlify.com) and sign in (free account)
2. Drag the entire **`teacher day`** folder onto the Netlify dashboard
3. Netlify gives you a live URL instantly, e.g. `https://amazing-newton-abc123.netlify.app`
4. Optional: click **"Change site name"** to get something like `tcet-teachersday2026.netlify.app`

No git, no config files, no CLI needed.

### Option B — GitHub Pages

1. Create a new GitHub repo (public)
2. Upload all three files (`index.html`, `styles.css`, `script.js`)
3. Go to repo **Settings → Pages**
4. Source: **Deploy from a branch** → branch: `main`, folder: `/ (root)`
5. Save. Your URL will be: `https://<your-username>.github.io/<repo-name>/`

### Option C — Vercel

1. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub
   (or drag-and-drop via Vercel CLI)
2. No config needed — Vercel detects static HTML automatically
3. Get a URL like `https://tcet-teachersday.vercel.app`

---

## 3. Getting a Shareable URL

After deploying on Netlify, your shareable link looks like:

```
https://tcet-teachersday2026.netlify.app
```

Share this link:
- In a WhatsApp group message
- As a college email to all faculty
- Embedded in a notice or circular as a hyperlink

---

## 4. Creating a QR Code (Free, No Account Needed)

### Method A — QR Code Generator (browser, instant)

1. Go to [qr-code-generator.com](https://www.qr-code-generator.com) or [goqr.me](https://goqr.me)
2. Paste your Netlify URL
3. Download the QR code as PNG
4. Print it on invitation cards, posters, or display it on a projector

### Method B — Google's API (no website needed)

Replace `YOUR_URL` and open in your browser — it downloads a QR PNG directly:

```
https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=YOUR_URL&choe=UTF-8
```

Example:
```
https://chart.googleapis.com/chart?chs=400x400&cht=qr&chl=https://tcet-teachersday2026.netlify.app&choe=UTF-8
```

### Method C — Python (offline, no internet needed after install)

```bash
pip install qrcode[pil]
python -c "import qrcode; qrcode.make('https://your-url.netlify.app').save('invite-qr.png')"
```

---

## Tips

- Test on a mobile phone before sharing — open the URL on your own phone first
- Music requires a user interaction (tap/click) to start due to browser autoplay rules — this is expected behaviour
- The petal animation is GPU-accelerated and tested to run smoothly on mid-range Android phones
- If a teacher opens it on a very old browser, the graceful fallback is: fonts load from system serif, no petals, no music — text invitation still fully readable
