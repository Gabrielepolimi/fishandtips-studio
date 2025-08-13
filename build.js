const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting static build for Sanity Studio...');

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Run static build instead of Sanity build
  console.log('🔨 Creating static build...');
  execSync('node static-build.js', { stdio: 'inherit' });
  
  console.log('✅ Static build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
