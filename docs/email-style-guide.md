# Minitrix Email Style Guide (Enterprise)

This guide documents the design system for our enterprise-grade notification emails. It is tailored for high compatibility across major email clients while maintaining a premium aesthetic.

## Brand
- **Site name**: `{{siteName}}` (from env)
- **Logo**: `{{logoUrl}}` (preferred width ~120px)
- **Animated brand heading**: gradient animated text matching site navbar
  - Gradient: `linear-gradient(45deg, #ffffff, #06b6d4, #3b82f6, #ffffff)`
  - Animation: `gradient-shift 3s ease infinite`
  - Fallback: in legacy Outlook, animation may not render; text remains visible.

## Color Palette
- **Primary**: `#0066CC`
- **Primary Deep**: `#004499`
- **Grays (light UI)**: `#F8F9FA`, `#E9ECEF`, body text `#718096`, headings `#2D3748`
- **Accent**: Use sparingly (cyan and blue gradients for brand heading)

## Typography
- **Font stack (email-safe)**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif`
- **Sizes**
  - H1: 24px, bold, color `#2D3748`
  - H2: 18px, semibold, color `#4A5568`
  - Body: 16px, regular, color `#718096`
- **Emphasis**: Bold for key data (Name, Email, Company)

## Spacing & Layout
- **Container**: max-width 680px, border-radius 14px, subtle shadow
- **Padding**: 24px container padding, 16px between elements within cards
- **Cards**: `border: 1px solid #E9ECEF`, radius 12px, white background
- **Sections**: Contact Info → Business Details → Message → Metadata → Actions

## Buttons (Bulletproof)
- Primary: blue background `#0066CC`, white text; 12–14px vertical padding; 10–12px radius
- Secondary: white background, `#004499` border and text
- Include VML fallbacks for Outlook with matching size and copy

## Badges
- NEW badge: background `#E6F0FF`, border `#CCE0FF`, text `#004499`

## Dark Mode
- `@media (prefers-color-scheme: dark)` overrides
  - Container/backgrounds: `#0F172A` or `#0B1220`
  - Borders: `#1E293B`
  - Text: `#E2E8F0`

## Imagery & Icons
- Use SVG or PNG logo at ~120px width
- Team/agent photo: 48px circle
- Avoid heavy imagery; prioritize fast loads

## Accessibility (WCAG 2.1 AA)
- Minimum font size: 16px for body, adequate contrast
- Alt text for all images
- Clear headings and reading order
- Meaning not conveyed by color alone

## Responsive
- Single column at ≤600px
- Buttons expand to 100% width on mobile
- Tables collapse to stacked rows for labels/values

## Variables used in templates
- Branding: `logoUrl, brandAddress, supportEmail, supportPhone, websiteUrl, linkedinUrl, twitterUrl, unsubscribeUrl`
- General: `siteName, year, tsHuman, FROM_EMAIL`
- Data fields vary by template (contact, chat lead)
