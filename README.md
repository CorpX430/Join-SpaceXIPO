# SpaceX IPO 2026 - Landing Page

A futuristic, high-impact landing page for a fictional SpaceX IPO offering. Built with vanilla HTML, Tailwind CSS, and Font Awesome icons.

## 🚀 Features

- **Stunning Visual Design**: Dark theme with red accents and animated starfield background
- **Live Countdown**: Real-time IPO allocation window timer
- **Dynamic Pricing**: Live stock price ticker ($SPX)
- **Interactive Modals**: Stock info and investment form modals
- **Responsive Design**: Fully mobile-friendly with Tailwind CSS
- **Smooth Animations**: Rocket launch animation, urgency pulse effects, and hover transitions
- **Modern UI Components**: Navigation bar, hero section, testimonials, and footer

## 📋 Sections

1. **Urgency Bar** - Real-time countdown and allocation status
2. **Navigation** - Fixed header with smooth scrolling links
3. **Hero Section** - Main call-to-action with launch imagery
4. **Mission Section** - Company stats and achievements
5. **IPO Details** - Pricing, timeline, and VIP benefits
6. **Investment Section** - Final CTA for allocation reservation
7. **Footer** - Compliance and branding

## 🛠️ Tech Stack

- HTML5
- Tailwind CSS (via CDN)
- Font Awesome Icons (via CDN)
- Vanilla JavaScript (no frameworks)

## 📁 File Structure

```
Join-SpaceXIPO/
├── index.html                    # Main landing page
├── README.md                     # This file
├── VERCEL_DEPLOYMENT.md         # Vercel deployment guide
└── vercel.json                  # Vercel configuration
```

## 🚀 Quick Start

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/CorpX430/Join-SpaceXIPO.git
cd Join-SpaceXIPO
```

2. Open `index.html` in your browser:
```bash
open index.html
# or
start index.html  # Windows
```

### Live Server (Recommended)

Using Python:
```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Via Vercel CLI**:
```bash
npm install -g vercel
vercel
```

2. **Via GitHub**:
   - Push to GitHub
   - Visit https://vercel.com/new
   - Import repository
   - Deploy

### Deploy to GitHub Pages

1. Push to `main` branch
2. Go to Settings → Pages
3. Select `main` branch as source
4. Your site will be live at `https://CorpX430.github.io/Join-SpaceXIPO`

### Deploy to Netlify

1. Connect GitHub repository
2. Build command: (leave empty for static HTML)
3. Publish directory: `/`
4. Deploy

## 🎨 Customization

### Colors

Edit the CSS variables in the `<style>` section:

```css
:root {
    --space-blue: #0ea5e9;  /* Change primary color */
}
```

### Text Content

All text is easily editable in the HTML. Key sections:
- Hero headline: Search for "THE LAST CHANCE"
- Pricing: Look for "$235 — $265"
- Countdown: Modify `startCountdown()` function

### Images

Images are loaded from `picsum.photos`. Replace with your own:

```html
<!-- Change this -->
<img src="https://picsum.photos/id/1015/800/900" alt="Starship Launch">

<!-- To this -->
<img src="https://your-image-url.com/image.jpg" alt="Your Title">
```

## 📊 Interactive Elements

### Countdown Timer
- Updates every 45 seconds
- Appears in urgency bar and hero section
- Customizable start time

### Stock Price
- Updates every 2.8 seconds
- Random fluctuations between +$1.20 and -$0.40
- Displays in navbar and modal

### Investment Form
- Modal-based reservation system
- Simple validation (name required)
- Confirmation alert on submission

## 🔧 JavaScript Functions

- `createStars()` - Generates starfield background
- `startCountdown()` - Manages countdown timer
- `updatePrice()` - Updates live stock price
- `navigateTo(section)` - Smooth scroll navigation
- `showStockModal()` / `hideStockModal()` - Stock info modal
- `showInvestmentForm()` / `hideInvestmentForm()` - Investment modal
- `submitFakeForm()` - Form validation and submission

## ⚖️ Legal Notice

**This is a fictional demonstration.** SpaceX has not gone public and this is not a real investment opportunity. For educational and portfolio purposes only.

## 📝 License

MIT License - Feel free to use and modify for your projects.

## 👤 Author

Created for demonstration purposes. Portfolio project showcasing modern web design and interactive UI.

## 📞 Support

For issues or questions:
1. Check the [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md)
2. Review the [FAQ](#faq) section below
3. Create an issue on GitHub

## ❓ FAQ

**Q: Can I use this for a real project?**  
A: Yes! But replace all SpaceX branding and content with your own company info.

**Q: How do I customize the colors?**  
A: Edit the CSS in the `<style>` section or modify Tailwind classes throughout the HTML.

**Q: Is this mobile responsive?**  
A: Yes! Built with Tailwind CSS and responsive design patterns.

**Q: Can I add a backend?**  
A: Absolutely. The form currently shows an alert. Connect to a backend API for real data collection.

---

**Last Updated**: June 17, 2026  
**Status**: Production Ready ✨