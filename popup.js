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
        const highlightedText = results[0]?.result || "No text highlighted.";
        document.getElementById("word-count").textContent = highlightedText;
      }
    );
  });
  
  // function to inject to retrieve highlighted text
  function getSelectedText() {
    return window.getSelection().toString().trim();
  }
  