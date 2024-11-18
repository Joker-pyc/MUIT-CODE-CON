# 🚀 Code Con 2024 Website

![Code Con 2024 Banner](https://via.placeholder.com/800x200?text=Code+Con+2024)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 📋 Overview

Code Con 2024 is a dynamic and immersive tech event website showcasing a 48-hour coding marathon, competitions, and networking opportunities. The website features a modern, responsive design with interactive elements and smooth animations.

### ✨ Key Features

- **Responsive Navigation**: Hamburger menu for mobile devices with smooth transitions
- **Parallax Effects**: Engaging scrolling experience with geometric backgrounds
- **Interactive Sections**: 
  - Hero section with glowing text and statistics
  - Competition categories with prize information
  - Dynamic event schedule timeline
  - Sponsor and community partner showcases
- **Smooth Animations**: Intersection Observer implementation for scroll-based animations
- **Modern Design Elements**: 
  - Geometric patterns
  - Glowing effects
  - Custom fonts (Orbitron & Inter)

## 🛠️ Technical Stack

- **Frontend Framework**: Pure HTML5, CSS3, and JavaScript
- **Icons**: Font Awesome 6.0.0
- **Typography**: 
  - Orbitron (Logo & Headings)
  - Inter (Body Text)
- **Animations**: Custom CSS transitions and JavaScript-powered effects

## 📦 Dependencies

```json
{
  "external": {
    "fonts": {
      "google-fonts": ["Orbitron:400,700", "Inter:300,400,700"]
    },
    "css": {
      "font-awesome": "6.0.0"
    }
  }
}
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/code-con-2024.git
   ```

2. **Navigate to project directory**
   ```bash
   cd code-con-2024
   ```

3. **Open in browser**
   - Open `index.html` in your preferred browser
   - For development, use a local server:
     ```bash
     python -m http.server 8000
     # or
     php -S localhost:8000
     ```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 💻 Tablets (768px and up)
- 🖥️ Desktops (1024px and up)
- 🖥️ Large screens (1440px and up)

## 🎨 Color Scheme

```css
:root {
  --primary: #1a1a1a;
  --secondary: #2d2d2d;
  --accent: #00ff9d;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --glow-color: rgba(0, 255, 157, 0.5);
}
```

## 🔧 Site Structure

```
code-con-2024/
├── index.html
├── styles.css
├── assets/
│   ├── images/
│   │   └── ...
│   └── fonts/
│       └── ...
└── js/
    └── main.js
```

## 🎯 Features Implementation

### Navigation
- Smooth scroll implementation for navigation links
- Mobile-responsive hamburger menu
- Header transformation on scroll

### Animations
- Staggered animation for navigation links
- Intersection Observer for scroll-based animations
- Glowing effects on CTAs and text elements

### Interactive Elements
- Competition cards with hover effects
- Timeline visualization for event schedule
- Social media integration in footer

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Contributors and maintainers
- Event sponsors and community partners

## 📞 Contact & Support

- Website: [codecon2024.com](https://codecon2024.com)
- Email: support@codecon2024.com
- Twitter: [@CodeCon2024](https://twitter.com/CodeCon2024)
- Discord: [Code Con Community](https://discord.gg/codecon)

---

Made with ❤️ for the tech community | © 2024 Code Con
