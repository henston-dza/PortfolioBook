import { defineConfig } from 'vite';
import { resolve, join } from 'path';
import fs from 'fs';

const componentsDir = resolve(__dirname, 'components');
const input = {
  main: resolve(__dirname, 'index.html'),
};

function scanComponents(dir) {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      const htmlFiles = fs.readdirSync(fullPath).filter(file => file.endsWith('.html'));
      
      if (htmlFiles.length > 0) {
        const relativeFolder = fullPath
          .replace(componentsDir + '\\', '')
          .replace(componentsDir + '/', '')
          .replace(/\\/g, '/');
        
        const keyBase = relativeFolder.replace(/\//g, '-');
        
        htmlFiles.forEach(htmlFile => {
          const filePath = join(fullPath, htmlFile);
          const nameName = htmlFile.replace('.html', '');
          input[`${keyBase}-${nameName}`] = filePath;
        });
      } else {
        scanComponents(fullPath);
      }
    }
  });
}

if (fs.existsSync(componentsDir)) {
  scanComponents(componentsDir);
}

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input
    }
  }
});
