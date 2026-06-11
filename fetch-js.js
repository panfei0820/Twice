import fs from 'fs';

async function run() {
  try {
    const res = await fetch('https://25q6zyf5nm.onrender.com/assets/index-DYzKjjEB.js');
    const text = await res.text();
    
    // Custom TWICE components will render JSX (g.jsx or g.jsxs) AND contain Chinese characters or TWICE keywords like "Members", "ONCE", "CANDYBONG"
    const results = [];
    const regex = /function\s+([a-zA-Z0-9$_]+)\s*\(([^)]*)\)\s*\{/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const idx = match.index;
      const fnName = match[1];
      
      // Let's grab the function contents up to 40000 chars and match brackets
      let bracketCount = 1;
      let endIdx = idx + match[0].length;
      while (bracketCount > 0 && endIdx < text.length) {
        if (text[endIdx] === '{') bracketCount++;
        else if (text[endIdx] === '}') bracketCount--;
        endIdx++;
      }
      
      const fnBody = text.substring(idx, endIdx);
      
      // Check if it renders JSX and contains Chinese or TWICE keywords
      const hasJSX = fnBody.includes('g.jsx') || fnBody.includes('g.jsxs');
      const hasCustomText = /[\u4e00-\u9fa5]/.test(fnBody) || fnBody.includes('ONCE') || fnBody.includes('CANDYBONG') || fnBody.includes('READY TO BE');
      
      // Filter out library functions (which might contain some Chinese comments, very rare, but hasJSX helps)
      if (hasJSX && hasCustomText && fnBody.length > 200) {
        results.push(`=== FUNCTION ${fnName} (${match[0].length} chars + body length ${fnBody.length}) ===\n${fnBody}\n`);
      }
    }
    
    fs.writeFileSync('twice-custom-components.js', results.join('\n\n'));
    console.log(`Saved ${results.length} custom components to twice-custom-components.js`);
  } catch (err) {
    console.error(err);
  }
}

run();
