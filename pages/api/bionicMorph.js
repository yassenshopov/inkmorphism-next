const fs = require('fs');

// Read the Markdown file
const markdownFilePath = './navigating-dark-mode-trend.md';
const newMarkdownFilePath = markdownFilePath.replace('.md', '-bionic.md');
const markdownContent = fs.readFileSync(markdownFilePath, 'utf-8');

// Function to bold the first letter(s) based on the word length
function boldFirstLetter(match, p1) {
  if (p1.length < 4) {
    return `**${p1.charAt(0)}**${p1.slice(1)}`;
  } else if (p1.length < 7) {
    return `**${p1.charAt(0)}${p1.charAt(1)}**${p1.slice(2)}`;
  } else {
    return `**${p1.charAt(0)}${p1.charAt(1)}${p1.charAt(2)}**${p1.slice(3)}`;
  }
}

// Process the Markdown content
const processedMarkdownContent = markdownContent.replace(/^(?!([!\-#])).*\b(\w+)\b/gm, (match, p1) => {
  return match.replace(/\b(\w+)\b/g, boldFirstLetter);
}).replace(/^(- \*\*[^:]+:\*\*)/gm, (match) => {
  return match.replace(/\b(\w+)\b/g, boldFirstLetter);
});

// Write the processed content back to the file
fs.writeFileSync(newMarkdownFilePath, processedMarkdownContent, 'utf-8');

console.log('Markdown file processed and updated.');
