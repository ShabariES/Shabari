# Portfolio Setup & Deployment Instructions

Congratulations on your new premium portfolio! Here’s how to get it fully functional and live.

## 1. Finalizing the Contact Form
I have integrated **Formspree** into your contact form. It handles the backend so you receive emails directly.

**Action Required:**
1.  Open `index.html`.
2.  Find the `<form>` tag: `action="https://formspree.io/f/shabaries2866@gmail.com"`.
3.  Once you deploy the site, send a test message through the form yourself.
4.  Check your inbox for an activation email from Formspree and click the button to confirm.
5.  *Tip:* To remove the Formspree branding or use advanced features, you can create a free account at [formspree.io](https://formspree.io) and replace the email in the action URL with your unique "Form ID".

## 2. Deployment

### Option A: GitHub Pages (Recommended)
1.  Create a new repository on GitHub.
2.  Upload `index.html`, `style.css`, and `script.js`.
3.  Go to **Settings** > **Pages**.
4.  Under **Branch**, select `main` (or `master`) and click **Save**.
5.  Your site will be live at `https://yourusername.github.io/reponame`.

### Option B: Netlify (Fastest)
1.  Go to [Netlify.com](https://www.netlify.com/).
2.  Drag and drop the folder containing your three files into the deployment box.
3.  Netlify will instantly give you a live link.

## 3. Recommended Customizations
- **Photos:** Replace the Unsplash URLs in the `portfolio` section with your actual project screenshots.
- **Social Links:** Update the `#` in the `social-links` section with your LinkedIn and GitHub profiles.
- **Resume:** You can add a button in the hero or about section to download your PDF resume.
