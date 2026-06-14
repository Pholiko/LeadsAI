const fs = require('fs');
let content = fs.readFileSync('src/components/LandingView.jsx', 'utf8');

// Text Colors
content = content.replace(/color: 'white'/g, "color: 'var(--text-primary)'");
content = content.replace(/color: 'rgba\\(255,255,255,0\\.9\\)'/g, "color: 'var(--text-primary)'");
content = content.replace(/color: 'rgba\\(255,255,255,0\\.7\\)'/g, "color: 'var(--text-secondary)'");
content = content.replace(/color: 'rgba\\(255,255,255,0\\.6\\)'/g, "color: 'var(--text-secondary)'");

// Borders
content = content.replace(/borderTop: '1px solid rgba\\(255,255,255,0\\.05\\)'/g, "borderTop: '1px solid var(--border-color)'");
content = content.replace(/borderBottom: '1px solid rgba\\(255,255,255,0\\.05\\)'/g, "borderBottom: '1px solid var(--border-color)'");
content = content.replace(/border: '1px solid rgba\\(255, 255, 255, 0\\.1\\)'/g, "border: '1px solid var(--border-color)'");
content = content.replace(/border: '1px solid rgba\\(255,255,255,0\\.1\\)'/g, "border: '1px solid var(--border-color)'");
content = content.replace(/borderLeft: '2px solid rgba\\(255,255,255,0\\.1\\)'/g, "borderLeft: '2px solid var(--border-color)'");
content = content.replace(/borderTop: '3px solid rgba\\(255,255,255,0\\.1\\)'/g, "borderTop: '3px solid var(--border-color)'");

// Backgrounds
content = content.replace(/background: 'rgba\\(255, 255, 255, 0\\.05\\)'/g, "background: 'var(--card-bg)'");
content = content.replace(/background: 'rgba\\(15, 23, 42, 0\\.75\\)'/g, "background: 'var(--nav-bg)'");

// Box shadow
content = content.replace(/boxShadow: '0 25px 50px rgba\\(0,0,0,0\\.5\\), 0 0 0 1px rgba\\(255,255,255,0\\.1\\)'/g, "boxShadow: '0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px var(--border-color)'");

// Specific overrides for dark text where we want to force it
content = content.replace(/color: 'var\\(--text-primary\\)'/g, "color: 'var(--text-primary)'");

fs.writeFileSync('src/components/LandingView.jsx', content);
console.log('Done replacing colors in LandingView.jsx');
