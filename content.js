// content.js
chrome.storage.sync.get(['defaultPersona'], (result) => {
  const defaultPersona = result.defaultPersona;
  if (defaultPersona) {
    const personas = {
      'Monospace Lowercase': {
        'text-transform': 'lowercase',
        'font-family': 'monospace'
      },
      'Uppercase': {
        'text-transform': 'uppercase'
      },
      'Serif Italic': {
        'font-family': 'serif',
        'font-style': 'italic'
      }
    };

    const styles = personas[defaultPersona];
    if (styles) {
      const styleElement = document.createElement('style');
      styleElement.id = 'default-persona-styles';
      let styleString = '';
      for (const property in styles) {
        styleString += `${property}: ${styles[property]} !important;\n`;
      }
      styleElement.textContent = `body {\n${styleString}\n}`;
      document.head.appendChild(styleElement);
    }
  }
});
