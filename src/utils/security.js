/**
 * Security utility for anti-copy and anti-debug measures.
 */
export function initSecurity() {
  if (typeof window === 'undefined') return;

  // 1. Disable Right-Click
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // 2. Block Shortcuts (F12, Cmd+Option+I, Cmd+S, Cmd+C)
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') e.preventDefault();
    
    // Cmd/Ctrl + Shift + I/J/C (DevTools)
    if ((e.metaKey || e.ctrlKey) && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
      e.preventDefault();
    }
    
    // Cmd/Ctrl + S (Save)
    if ((e.metaKey || e.ctrlKey) && e.key.toUpperCase() === 'S') {
      e.preventDefault();
    }

    // Cmd/Ctrl + U (View Source)
    if ((e.metaKey || e.ctrlKey) && e.key.toUpperCase() === 'U') {
      e.preventDefault();
    }
  });

  // 3. Disable Text Selection via CSS if not already done
  document.documentElement.style.userSelect = 'none';
  document.documentElement.style.webkitUserSelect = 'none';

  // 4. Anti-Debug: Detective DevTools opening
  // Reduced frequency and improved message
  let devtoolsOpen = false;
  const threshold = 160;
  
  const check = () => {
    const widthDiff = window.outerWidth - window.innerWidth > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;
    
    if (widthDiff || heightDiff) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        console.clear();
        console.log('%c检测到开发者工具已打开', 'color: red; font-size: 20px; font-weight: bold;');
      }
    } else {
      devtoolsOpen = false;
    }
  };

  // Check on resize instead of high-frequency interval
  window.addEventListener('resize', check);
  // Periodic check but less frequent (every 3 seconds)
  setInterval(check, 3000);
}
