document.addEventListener("DOMContentLoaded", async () => {
    // find the currently selected tab
    // destructure the returned array to only get first tab object
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: getSelectedText,
      },
      (results) => {
        const highlightedText = results[0]?.result;
        let wordCount = 0; let charCount = 0;
        if (highlightedText) {
            wordCount = highlightedText.split(' ').length;
            charCount = highlightedText.trim().replaceAll(' ', '').length;
        }

        document.getElementById("word-count").textContent = "Word Count: " + wordCount;
        document.getElementById("char-count").textContent = "Character Count: " + charCount;
      }
    );
  });
  
  // function to inject to retrieve highlighted text
  function getSelectedText() {
    return window.getSelection().toString().trim();
  }
  