# SMTP2GO Setup Instructions

## Quick Setup Guide

### 1. Get SMTP2GO API Key
1. Go to [SMTP2GO](https://www.smtp2go.com/) and create an account
2. Navigate to Settings → API Keys
3. Create a new API key with "Send Email" permissions
4. Copy the API key

### 2. Configure Netlify Environment Variables
1. Go to your Netlify site dashboard
2. Navigate to Site settings → Environment variables
3. Add these variables:
   ```
   SMTP2GO_API_KEY = your_api_key_here
   FROM_EMAIL = noreply@autoservisth.sk
   TO_EMAIL = alexander.hidv@gmail.com
   ```

### 3. Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: (leave empty for static site)
3. Set publish directory: `.` (root directory)
4. Deploy the site

### 4. Test the Contact Form
1. Visit your deployed site
2. Fill out the contact form
3. Check if emails are received at alexander.hidv@gmail.com
4. Check Netlify function logs for any errors

## File Structure
```
autoservis-th/
├── netlify/functions/contact.js  # SMTP2GO email handler
├── js/contact-form.js           # Client-side form handling
├── netlify.toml                 # Netlify configuration
├── .env.example                 # Environment variables template
└── index.html                   # Updated form with correct field names
```

## Email Template
- Professional HTML email with Autoservis TH branding
- Red (#e50914) and black color scheme matching website
- Includes all form fields: name, email, phone, message
- Responsive design for mobile email clients

## Troubleshooting

### Form not working?
1. Check Netlify function logs
2. Verify environment variables are set
3. Ensure SMTP2GO API key has correct permissions

### Emails not being received?
1. Check spam folder
2. Verify TO_EMAIL environment variable
3. Check SMTP2GO dashboard for sent emails

### Function errors?
1. Check console for JavaScript errors
2. Verify form field names match (name, email, phone, message)
3. Check network tab for failed API calls

## Security Notes
- Never commit API keys to repository
- Use environment variables for all sensitive data
- SMTP2GO API key should have minimal required permissions
- Form includes validation and sanitization