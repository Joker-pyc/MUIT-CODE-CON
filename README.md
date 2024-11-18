# 🚀 Code Con 2024 Website

![Code Con 2024 Banner](https://via.placeholder.com/800x200?text=Code+Con+2024)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub stars](https://img.shields.io/github/stars/Joker-pyc/CODE-CON?style=for-the-badge)](https://github.com/Joker-pyc/CODE-CON/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Joker-pyc/CODE-CON?style=for-the-badge)](https://github.com/Joker-pyc/CODE-CON/network/members)
[![GitHub issues](https://img.shields.io/github/issues/Joker-pyc/CODE-CON?style=for-the-badge)](https://github.com/Joker-pyc/CODE-CON/issues)

## 📋 Overview

Code Con 2024 is a cutting-edge tech event website that brings together developers, innovators, and tech enthusiasts for a 48-hour coding extravaganza. Featuring a modern, responsive design with interactive elements and smooth animations, this platform serves as the digital hub for our premier coding event.

### 🎉 Event Highlights

- **500+ Participants Expected**
- **48 Hours of Non-Stop Coding**
- **20+ Exciting Events**
- **Total Prize Pool: $11,000+**

### ✨ Website Features

- **Immersive UI/UX**
  - Parallax scrolling effects
  - Geometric background patterns
  - Glowing text animations
  - Responsive design across all devices

- **Interactive Elements**
  - Dynamic navigation system
  - Animated statistics
  - Smooth scroll transitions
  - Interactive competition cards

- **Competition Categories**
  - Tech Quiz ($1,000 Prize)
  - Coding Marathon ($2,000 Prize)
  - App Challenge ($3,000 Prize)
  - Innovation Showcase ($5,000 Prize)

## 🛠️ Technical Stack

- **Core Technologies**
  - HTML5 for structure
  - CSS3 for styling
  - Vanilla JavaScript for interactivity

- **External Libraries**
  - Font Awesome 6.0.0 for icons
  - Google Fonts (Orbitron & Inter)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Joker-pyc/CODE-CON.git
   ```

2. **Navigate to project directory**
   ```bash
   cd CODE-CON
   ```

3. **Open in browser**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using PHP
   php -S localhost:8000
   
   # Or simply open index.html in your browser
   ```

## 💻 Development

### Project Structure
```
CODE-CON/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
└── script.js          # JavaScript functionality
```

### Key Features Implementation

#### Responsive Navigation
```javascript
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});
```

#### Smooth Scroll
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
```

## 🎨 Color Palette

```css
:root {
  --primary-bg: #1a1a1a;
  --secondary-bg: #2d2d2d;
  --accent-color: #00ff9d;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
}
```

## 🤝 Contributing

We welcome contributions to improve Code Con's website! Here's how you can help:

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Event Features

- **Expert Workshops** - Learn from industry leaders
- **Tech Talks** - Gain insights from innovators
- **Networking** - Connect with tech enthusiasts
- **Career Opportunities** - Meet potential employers
- **Mentorship** - Get guidance from experts

## 📞 Contact & Support

For any queries or support:
- 📧 Email: muitcodecrew@gmail.com
- 🌐 Website: [codecon2024.com]([https://codecon2024.com](https://joker-pyc.github.io/CODE-CON/))


## 🙏 Acknowledgments

- All our amazing sponsors and community partners
- Contributors who help improve the website
- The tech community for their continuous support

---

<div align="center">

### ⭐ Star us on GitHub — it motivates us to keep improving!

Made with ❤️ by the Code Con Team | [Report Bug](https://github.com/Joker-pyc/CODE-CON/issues) | [Request Feature](https://github.com/Joker-pyc/CODE-CON/issues)

</div>
