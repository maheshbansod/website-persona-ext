document.addEventListener('DOMContentLoaded', () => {
  const personaList = document.getElementById('persona-list');
  const resetButton = document.getElementById('reset-button');

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

  // Function to apply styles to the current tab
  function applyStyles(styles) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: setStyles,
          args: [styles]
        });
  function setStyles(styles) {
    const styleElement = document.createElement('style');
    styleElement.id = 'persona-styles';
    let styleString = '';
    for (const property in styles) {
      styleString += `${property}: ${styles[property]} !important;\n`;
    }
    styleElement.textContent = `body {\n${styleString}\n}`;
    document.head.appendChild(styleElement);
  }

      document.head.appendChild(styleElement);
  })


  // Function to reset styles
  function resetStyles() {
    chrome.scripting.executeScript({
      target: { tabId: chrome.tabs.getCurrent().id },
      function: clearStyles
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: clearStyles
        });
      });
          styleElement.remove();
      }
  }

  // Populate persona list
  for (const personaName in personas) {
    const personaButton = document.createElement('button');
    personaButton.classList.add('persona-button');
    personaButton.textContent = personaName;
    personaButton.addEventListener('click', () => {
      applyStyles(personas[personaName]);
    });
    personaList.appendChild(personaButton);
  }

  // Reset button functionality
  resetButton.addEventListener('click', () => {
    resetStyles();
  });
});