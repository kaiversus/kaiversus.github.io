(function() {
  const toggleBtn = document.getElementById('web-term-toggle');
  const termWindow = document.getElementById('web-term-window');
  const closeBtn = document.getElementById('web-term-close');
  const outputEl = document.getElementById('web-term-output');
  const inputEl = document.getElementById('web-term-input');
  const promptTxt = document.getElementById('web-term-prompt-txt');
  const termBody = document.getElementById('web-term-body');

  if (!toggleBtn || !termWindow) return;

  // Toggle logic
  toggleBtn.addEventListener('click', () => {
    termWindow.style.display = termWindow.style.display === 'none' ? 'flex' : 'none';
    if (termWindow.style.display === 'flex') {
      inputEl.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    termWindow.style.display = 'none';
  });

  termBody.addEventListener('click', () => {
    inputEl.focus();
  });

  // Filesystem simulation
  const fs = window.FS_DATA || {
    'home': {
      'kai': {
        'focus.txt': 'Reverse Engineering · Binary Exploitation · Malware Analysis',
        'README.txt': 'Welcome to my blog terminal. Type "kai --help" to see available commands.'
      }
    }
  };

  let currentPath = ['home', 'kai'];
  const pathParts = window.location.pathname.split('/').filter(p => p.length > 0);
  if (pathParts.length > 0) {
    const mainDirs = ['courses', 'writeups', 'projects', 'blogs', 'cheatsheet', 'reports'];
    if (mainDirs.includes(pathParts[0].toLowerCase())) {
      currentPath.push(pathParts[0].toLowerCase());
    }
  }
  
  function getDir(pathArray) {
    let curr = fs;
    for (let p of pathArray) {
      if (curr[p] !== undefined) {
        curr = curr[p];
      } else {
        return null;
      }
    }
    return curr;
  }

  function getPromptStr() {
    let p = '/' + currentPath.join('/');
    if (p === '/home/kai') p = '~';
    else if (p.startsWith('/home/kai/')) p = '~/' + currentPath.slice(2).join('/');
    return `kaiversus@blog:${p}$ `;
  }

  function printLn(text, isHtml = false) {
    const line = document.createElement('div');
    if (isHtml) line.innerHTML = text;
    else line.textContent = text;
    outputEl.appendChild(line);
    termBody.scrollTop = termBody.scrollHeight;
  }

  function handleCommand(cmdStr) {
    const args = cmdStr.trim().split(' ').filter(x => x.length > 0);
    if (args.length === 0) return;
    
    const cmd = args[0].toLowerCase();
    
    switch(cmd) {
      case 'kai':
        if (args[1] === '--help' || args[1] === '-h') {
          printLn('Available commands:');
          printLn('  kai --help - show this help message');
          printLn('  ls         - list directory contents');
          printLn('  cd         - change directory');
          printLn('  pwd        - print working directory');
          printLn('  cat        - read file content');
          printLn('  whoami     - print effective user id');
          printLn('  clear      - clear terminal output');
          printLn('  date       - print system date');
          printLn('  echo       - display a line of text');
        } else {
          printLn('Usage: kai --help');
        }
        break;
      case 'help':
        printLn('Command not found. Try "kai --help"');
        break;
      case 'whoami':
        printLn('kaiversus');
        break;
      case 'pwd':
        printLn('/' + currentPath.join('/'));
        break;
      case 'date':
        printLn(new Date().toString());
        break;
      case 'clear':
        outputEl.innerHTML = '';
        break;
      case 'echo':
        printLn(args.slice(1).join(' '));
        break;
      case 'ls':
        const dir = getDir(currentPath);
        if (typeof dir === 'object') {
          let out = [];
          for (let key in dir) {
            if (typeof dir[key] === 'object') {
              out.push(`<span style="color: #569cd6;">${key}</span>`); // blue for dir
            } else {
              out.push(key);
            }
          }
          if (out.length > 0) printLn(out.join('  '), true);
        } else {
          printLn('ls: not a directory');
        }
        break;
      case 'cd':
        if (args.length < 2) {
          currentPath = ['home', 'kai'];
        } else {
          let target = args[1];
          if (target === '~') {
            currentPath = ['home', 'kai'];
          } else if (target === '..') {
            if (currentPath.length > 0) currentPath.pop();
          } else if (target === '/') {
            currentPath = [];
          } else {
            let newPath = [...currentPath];
            // extremely basic path resolution (no nested like a/b/c)
            let tDir = getDir(newPath);
            if (tDir && tDir[target] && typeof tDir[target] === 'object') {
              newPath.push(target);
              currentPath = newPath;
              // Auto-navigate if it's a main directory
              const mainDirs = ['courses', 'writeups', 'projects', 'blogs', 'cheatsheet', 'reports'];
              if (mainDirs.includes(target)) {
                printLn(`Navigating to /${target}/...`);
                setTimeout(() => { window.location.href = `/${target}/`; }, 500);
              }
            } else {
              printLn(`cd: ${target}: No such file or directory`);
            }
          }
        }
        break;
      case 'cat':
        if (args.length < 2) {
          printLn('cat: missing file operand');
        } else {
          let f = args[1];
          let d = getDir(currentPath);
          if (d && d[f] !== undefined) {
            if (typeof d[f] === 'string') {
              printLn(d[f]);
            } else {
              printLn(`cat: ${f}: Is a directory`);
            }
          } else {
            printLn(`cat: ${f}: No such file or directory`);
          }
        }
        break;
      default:
        printLn(`${cmd}: command not found`);
    }
  }

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value;
      
      // Print prompt + command
      const escapedVal = val.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const pLine = document.createElement('div');
      pLine.innerHTML = `<span style="color: var(--green, #3fb950);">${getPromptStr()}</span> ${escapedVal}`;
      outputEl.appendChild(pLine);
      
      handleCommand(val);
      
      inputEl.value = '';
      promptTxt.textContent = getPromptStr();
      termBody.scrollTop = termBody.scrollHeight;
    }
  });

  // initial prompt
  promptTxt.textContent = getPromptStr();

  // Auto-run 'kai --help' on startup
  const initCmd = 'kai --help';
  const initLine = document.createElement('div');
  initLine.innerHTML = `<span style="color: var(--green, #3fb950);">${getPromptStr()}</span> ${initCmd}`;
  outputEl.appendChild(initLine);
  handleCommand(initCmd);

})();
