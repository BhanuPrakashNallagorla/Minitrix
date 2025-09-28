# Blog System Images Directory

This directory contains all image assets for the enterprise blog system.

## Required Images

### Hero Images
- `hero-cybersecurity.jpg` - Main hero image for cybersecurity theme (1200x600px)
- `hero-cybersecurity-dark.jpg` - Dark variant of hero image

### Company Assets
- `minitrix-logo.png` - Company logo (240x80px)
- `minitrix-logo-dark.png` - Dark variant of logo
- `favicon.ico` - Website favicon (32x32px)

### Article Images
- `ai-security.jpg` - AI security concept image (400x300px)
- `compliance-framework.jpg` - Compliance framework image (400x300px)
- `cyber-threats.jpg` - Cyber threats landscape image (400x300px)
- `shadow-ai-infographic.jpg` - Shadow AI usage statistics infographic (800x600px)

### Author & Comments
- `author-photo.jpg` - Author profile photo (200x200px)
- `comment-avatar-1.jpg` - Commenter avatar 1 (80x80px)
- `comment-avatar-2.jpg` - Commenter avatar 2 (80x80px)

## Image Specifications

### Technical Requirements
- **Format**: JPEG for photos, PNG for logos/icons
- **Optimization**: Compressed for web (85% quality for JPEG)
- **Responsive**: Multiple sizes for different screen densities
- **Alt Text**: Descriptive alt text for accessibility

### Performance Considerations
- **Lazy Loading**: All images use `loading="lazy"` attribute
- **Preloading**: Critical images are preloaded in HTML
- **WebP Support**: Consider WebP format for better compression
- **CDN Ready**: Images should be optimized for CDN delivery

## Placeholder Images

For development and testing, you can use placeholder services:

### Hero Image
```
https://via.placeholder.com/1200x600/1a365d/ffffff?text=Cybersecurity+Data+Privacy
```

### Company Logo
```
https://via.placeholder.com/240x80/3182ce/ffffff?text=Minitrix
```

### Article Images
```
https://via.placeholder.com/400x300/2d3748/ffffff?text=AI+Security
https://via.placeholder.com/400x300/2d3748/ffffff?text=Compliance
https://via.placeholder.com/400x300/2d3748/ffffff?text=Cyber+Threats
```

### Infographic
```
https://via.placeholder.com/800x600/1a365d/ffffff?text=Shadow+AI+Statistics
```

### Author & Avatars
```
https://via.placeholder.com/200x200/3182ce/ffffff?text=Author
https://via.placeholder.com/80x80/2d3748/ffffff?text=SJ
https://via.placeholder.com/80x80/2d3748/ffffff?text=MC
```

## Image Optimization

### Recommended Tools
- **TinyPNG**: For PNG compression
- **ImageOptim**: For general image optimization
- **Squoosh**: Google's image optimization tool
- **WebP Converter**: For modern format support

### File Size Targets
- Hero images: < 200KB
- Article images: < 100KB
- Logos: < 50KB
- Avatars: < 20KB

## Accessibility

### Alt Text Guidelines
- **Hero images**: Descriptive of the visual content
- **Logos**: Company name and purpose
- **Article images**: Context of the content
- **Infographics**: Key statistics and data points
- **Avatars**: Person's name or role

### Example Alt Text
```html
<img src="hero-cybersecurity.jpg" 
     alt="Cybersecurity professionals analyzing data privacy threats on multiple screens" 
     loading="lazy">
```

## Copyright & Licensing

All images should be:
- **Original content** or properly licensed
- **Attributed** if required by license
- **High quality** and professional
- **Brand consistent** with company guidelines

## Future Enhancements

### Planned Features
- **WebP Support**: Modern image format
- **Responsive Images**: Multiple sizes
- **Lazy Loading**: Progressive enhancement
- **Image CDN**: Global delivery optimization
- **A/B Testing**: Different hero images
- **Analytics**: Image engagement tracking
