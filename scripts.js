function copyEmail() {
    const emailElement = document.querySelector('.contact'); 
    const originalText = emailElement.textContent;
    const emailToCopy = "bnbrw@proton.me";
  
    
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(emailToCopy).catch((err) => {
        console.error("Failed to copy text:", err);
      });
    } else {
      
      const textArea = document.createElement('textarea');
      textArea.value = emailToCopy;
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Fallback: Unable to copy', err);
      }
      document.body.removeChild(textArea);
    }
  
    
    fadeText(emailElement, 'Copied to clipboard');
  
    
    setTimeout(() => {
      fadeText(emailElement, originalText);
    }, 6000);
  }
  
  
  function fadeText(element, newText) {
    
    element.classList.add('fade-out');
  
    
    element.addEventListener('transitionend', function handleFadeOut() {
      
      element.removeEventListener('transitionend', handleFadeOut);
  
      
      element.textContent = newText;
  
      
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
  
      
      element.addEventListener('transitionend', function handleFadeIn() {
        
        element.removeEventListener('transitionend', handleFadeIn);
        element.classList.remove('fade-in');
      });
    });
  }
  