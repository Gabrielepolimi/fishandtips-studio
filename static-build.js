const fs = require('fs');
const path = require('path');

console.log('🚀 Creating static Sanity Studio build...');

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Create a simple HTML file that redirects to the local Sanity Studio
const htmlContent = `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FishandTips Studio</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #134D85 0%, #FBD874 100%);
            color: white;
        }
        .container {
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        h1 {
            margin-bottom: 1rem;
            font-size: 2.5rem;
        }
        p {
            margin-bottom: 2rem;
            font-size: 1.2rem;
            opacity: 0.9;
        }
        .button {
            display: inline-block;
            padding: 1rem 2rem;
            background: #FBD874;
            color: #134D85;
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: bold;
            transition: transform 0.2s;
        }
        .button:hover {
            transform: translateY(-2px);
        }
        .info {
            margin-top: 2rem;
            font-size: 0.9rem;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎣 FishandTips Studio</h1>
        <p>Il tuo CMS per la gestione dei contenuti di pesca</p>
        <a href="/auth.html" class="button">
            Accedi a Sanity Studio
        </a>
        <div class="info">
            <p>⚠️ Per utilizzare Sanity Studio, accedi tramite il link sopra</p>
            <p>Oppure esegui localmente: <code>npm run dev</code></p>
        </div>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent);

// Create auth page
const authHtmlContent = fs.readFileSync(path.join(__dirname, 'auth.html'), 'utf8');
fs.writeFileSync(path.join(distDir, 'auth.html'), authHtmlContent);

// Create a simple API endpoint for Vercel
const apiDir = path.join(distDir, 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

const apiContent = `export default function handler(req, res) {
  res.status(200).json({ 
    message: 'FishandTips Studio API',
    studio: 'https://fishandtips.sanity.studio/',
    status: 'active',
    projectId: '3nnnl6gi',
    dataset: 'production'
  });
}`;

fs.writeFileSync(path.join(apiDir, 'studio.js'), apiContent);

console.log('✅ Static build completed!');
console.log('📁 Files created in dist/ directory');
