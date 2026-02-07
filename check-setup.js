// Quick diagnostic script
const fs = require('fs');
const path = require('path');

console.log('Checking project setup...\n');

// Check if app/page.tsx exists
const pagePath = path.join(__dirname, 'app', 'page.tsx');
if (fs.existsSync(pagePath)) {
  console.log('✅ app/page.tsx exists');
  const content = fs.readFileSync(pagePath, 'utf8');
  if (content.includes('export default')) {
    console.log('✅ page.tsx has default export');
  } else {
    console.log('❌ page.tsx missing default export');
  }
} else {
  console.log('❌ app/page.tsx NOT FOUND');
}

// Check if app/layout.tsx exists
const layoutPath = path.join(__dirname, 'app', 'layout.tsx');
if (fs.existsSync(layoutPath)) {
  console.log('✅ app/layout.tsx exists');
} else {
  console.log('❌ app/layout.tsx NOT FOUND');
}

// Check package.json
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log(`✅ Next.js version: ${pkg.dependencies.next || 'not found'}`);
}

// Check tsconfig
const tsconfigPath = path.join(__dirname, 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  console.log('✅ tsconfig.json exists');
}

console.log('\nSetup check complete!');
