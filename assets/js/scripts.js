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

  const repoUpdatedElement = document.querySelector('#last-updated');
  const repoUpdatedFallback = '31/03/2026';
  const repoDateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Europe/London',
  });

  function formatRepoDate(isoDateString) {
    return repoDateFormatter.format(new Date(isoDateString));
  }

  async function updateRepoCommitDate() {
    if (!repoUpdatedElement) {
      return;
    }

    try {
      const response = await fetch('https://api.github.com/repos/brwnng/brwnng.github.io/commits?per_page=1', {
        headers: {
          Accept: 'application/vnd.github+json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`);
      }

      const commits = await response.json();
      const latestCommitDate = commits?.[0]?.commit?.committer?.date;

      if (!latestCommitDate) {
        throw new Error('Latest commit date not found');
      }

      repoUpdatedElement.textContent = formatRepoDate(latestCommitDate);
      repoUpdatedElement.dateTime = latestCommitDate;
    } catch (error) {
      console.error('Unable to load latest repo commit date.', error);
      repoUpdatedElement.textContent = repoUpdatedFallback;
    }
  }

  updateRepoCommitDate();
  
