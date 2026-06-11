import fs from 'fs';
import path from 'path';

async function run() {
  try {
    const baseUrl = 'https://25q6zyf5nm.onrender.com';
    let text = '';
    let fetchedSuccessfully = false;

    console.log(`[Remote Fetch] Fetching main page to resolve active asset name: ${baseUrl}/`);
    
    try {
      const mainRes = await fetch(baseUrl + '/', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
        }
      });
      
      if (mainRes.ok) {
        const htmlText = await mainRes.text();
        
        // Multi-strategy regex to match any Vite index.js bundle:
        // Strategy A: matches standard script src paths (e.g., /assets/index-DYzKjjEB.js, assets/index.123456.js, etc.)
        // Strategy B: matches modulepreload href links
        // Strategy C: fallback basic match anywhere in text
        const assetRegexes = [
          /src=["']([^"']*(?:assets\/index[-.][a-zA-Z0-9_-]+\.js|index[-.][a-zA-Z0-9_-]+\.js))["']/i,
          /href=["']([^"']*(?:assets\/index[-.][a-zA-Z0-9_-]+\.js|index[-.][a-zA-Z0-9_-]+\.js))["']/i,
          /(?:assets\/|(?<=['"/]))index[-.][a-zA-Z0-9_-]+\.js/i
        ];
        
        let matchedPath = '';
        for (const regex of assetRegexes) {
          const match = htmlText.match(regex);
          if (match) {
            // Take captured group if exists, or entire match
            matchedPath = match[1] || match[0];
            break;
          }
        }
        
        let jsUrl = '';
        if (matchedPath) {
          // Resolve URL dynamically (supporting both absolute and relative URLs)
          if (matchedPath.startsWith('http://') || matchedPath.startsWith('https://')) {
            jsUrl = matchedPath;
          } else if (matchedPath.startsWith('//')) {
            jsUrl = 'https:' + matchedPath;
          } else {
            // Build absolute URL using standard native URL class
            jsUrl = new URL(matchedPath, baseUrl).toString();
          }
          console.log(`[Remote Fetch] Resolved JS Asset URL dynamically: ${jsUrl}`);
        } else {
          console.log(`[Remote Fetch] Could not find dynamic index JS asset in HTML. Attempting default fallback path.`);
          jsUrl = `${baseUrl}/assets/index-DYzKjjEB.js`;
        }

        console.log(`[Remote Fetch] Fetching script: ${jsUrl}`);
        const res = await fetch(jsUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        });
        
        if (res.ok) {
          text = await res.text();
          console.log(`[Remote Fetch] Downloaded script (${text.length} characters)`);
          fetchedSuccessfully = true;
        } else {
          console.log(`[Remote Fetch] Script download failed with HTTP Status: ${res.status}`);
        }
      } else {
        console.log(`[Remote Fetch] Main page request failed with HTTP Status: ${mainRes.status}`);
      }
    } catch (fetchErr) {
      console.log(`[Remote Fetch] Network connection not available or blocked: ${fetchErr.message}`);
    }

    const results = [];

    if (fetchedSuccessfully && text) {
      console.log(`[Processing] Parsing minified production bundle for TWICE React components...`);
      // Parse minified functions block-by-block
      const regex = /function\s+([a-zA-Z0-9$_]+)\s*\(([^)]*)\)\s*\{/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        const idx = match.index;
        const fnName = match[1];
        
        // Match brackets to isolate function body
        let bracketCount = 1;
        let endIdx = idx + match[0].length;
        while (bracketCount > 0 && endIdx < text.length) {
          if (text[endIdx] === '{') bracketCount++;
          else if (text[endIdx] === '}') bracketCount--;
          endIdx++;
        }
        
        const fnBody = text.substring(idx, endIdx);
        const hasJSX = fnBody.includes('g.jsx') || fnBody.includes('g.jsxs') || fnBody.includes('.jsx') || fnBody.includes('.jsxs');
        const hasCustomText = /[\u4e00-\u9fa5]/.test(fnBody) || fnBody.includes('ONCE') || fnBody.includes('CANDYBONG') || fnBody.includes('READY TO BE');
        
        if (hasJSX && hasCustomText && fnBody.length > 200) {
          results.push(`=== FUNCTION ${fnName} (${match[0].length} chars + body length ${fnBody.length}) ===\n${fnBody}\n`);
        }
      }
    } else {
      console.log(`\n[Local Scanner] Active server is offline or unreachable. Initiating search in local components folder...`);
      const componentsDir = './src/components';
      
      if (fs.existsSync(componentsDir)) {
        const files = fs.readdirSync(componentsDir);
        for (const file of files) {
          if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
            const filePath = path.join(componentsDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            console.log(`[Local Scanner] Extracting custom components from: ${file}`);
            
            // Look for export functions, React components, hooks
            results.push(`=== FILE: ${file} (Local Source Extract) ===\n${fileContent}\n`);
          }
        }
      } else {
        console.log(`[Local Scanner] Error: Local components folder not found at ${componentsDir}`);
      }
    }

    fs.writeFileSync('twice-custom-components.js', results.join('\n\n'));
    console.log(`\n[Success] Process completed successfully!`);
    console.log(`Saved ${results.length} blocks to twice-custom-components.js`);
  } catch (err) {
    console.error(`[Error] Unhandled exception occurred:`, err);
  }
}

run();
