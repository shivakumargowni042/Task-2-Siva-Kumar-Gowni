/* ==========================================================================
   FLORAMIND AI - CORE APPLICATION LOGIC & INTERACTIVE PLUGINS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initTheme();
  initAuth();
  initKeywordSlider();
  initHoloCanvas();
  initStatusTerminal();
  initStatsCounter();
  initDatasetTabs();
  initClassifierSandbox();
  initContactForm();
  initScrollReveal();
  initMobileMenu();
  initDashboard();
  // Single-source split transition (avoid duplicated definitions)
  initSplitTransition();
});


/* ==========================================================================
   THEME MANAGER (LIGHT & DARK MODES)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Set default theme: light (bright & colorful)
  let currentTheme = localStorage.getItem('floramind-theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  themeToggleBtn.addEventListener('click', () => {
    currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('floramind-theme', currentTheme);
    
    // Dispatch event to notify canvas or other components that need redrawing
    window.dispatchEvent(new CustomEvent('themechanged', { detail: currentTheme }));
  });
}

/* ==========================================================================
   CINEMATIC STARTUP EXPERIENCE (SPLASH SCREEN)
   ========================================================================== */
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  const splashTitle = document.getElementById('splash-title');
  const splashSubtitle = document.getElementById('splash-subtitle');
  const pulseRing = document.getElementById('pulse-ring');
  const logoContainer = document.querySelector('.splash-logo-container');
  const mainApp = document.getElementById('main-app');

  // Step 1: Fragment Assembly (triggers almost instantly)
  setTimeout(() => {
    splash.classList.add('active-assembly');
    splashSubtitle.textContent = "Assembling neural core...";
  }, 400);

  // Step 2: Slow rotation and core reveal
  setTimeout(() => {
    logoContainer.classList.add('slow-rotate');
    splashSubtitle.textContent = "Calibrating systems...";
  }, 2200);

  // Step 3: Energy ring activation & light pulse
  setTimeout(() => {
    pulseRing.classList.add('pulse-expand');
    splashSubtitle.textContent = "Botanical Synapse synced.";
    
    // Add lighting flash effect on splash background
    splash.style.transition = "background-color 0.8s ease";
    splash.style.backgroundColor = "#0e1320"; // Momentary colorful glow
  }, 3200);

  // Step 4: Typing Title Reveal
  setTimeout(() => {
    splashTitle.classList.add('visible');
    typeText(splashSubtitle, "FLORAMIND AI ONLINE v2.0", 35);
  }, 3800);

  // Step 5: Transition to Landing Page
  setTimeout(() => {
    splash.style.opacity = '0';
    splash.style.pointerEvents = 'none';
    
    // Reveal main landing page
    mainApp.classList.add('revealed');
    
    // Trigger terminal initialization and stats counts once visible
    startTerminalTyping();
    startStatsAnimate();
  }, 5800);
}

// Utility function to type text into an element
function typeText(element, text, speed, callback) {
  element.textContent = "";
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) {
      callback();
    }
  }
  typing();
}

/* ==========================================================================
   MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('mobile-nav');
  const links = document.querySelectorAll('.mobile-link');
  
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
  });
  
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

/* ==========================================================================
   SPLIT TRANSITION ANIMATION (LANDING TO AI LAB)
   ========================================================================== */
function initSplitTransition() {
  const startButtons = document.querySelectorAll('.start-exploration-btn');
  const splitOverlay = document.getElementById('split-transition-overlay');
  const transitionFlash = document.querySelector('.transition-flash');
  const landingView = document.getElementById('landing-view');
  const aiLabView = document.getElementById('ai-lab-view');
  const floatingNavbar = document.querySelector('.floating-navbar');

  // Prevent double-trigger / rapid re-clicks
  let isTransitioning = false;

  startButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      performSplitTransition();
    });
  });

  function performSplitTransition() {
    if (!splitOverlay || !landingView || !aiLabView) return;
    if (isTransitioning) return;
    isTransitioning = true;

    // Premium background blur during transition
    document.body.classList.add('is-transitioning-lab');

    // Step 1: Activate split overlay
    splitOverlay.classList.add('active');

    // Step 2: Start split animation
    setTimeout(() => {
      splitOverlay.classList.add('splitting');

      // Step 3: Hide navbar during transition
      if (floatingNavbar) {
        floatingNavbar.style.opacity = '0';
        floatingNavbar.style.pointerEvents = 'none';
      }

      // Step 4: Flash + peak glow timing
      setTimeout(() => {
        if (transitionFlash) transitionFlash.classList.add('flash');
        splitOverlay.classList.add('peak');
      }, 650);

      // Step 5: Defer view switch until the split animation completes
      setTimeout(() => {
        // Switch views AFTER halves fully travel away
        landingView.classList.remove('active-view');
        landingView.classList.add('inactive-view');

        aiLabView.classList.remove('inactive-view');
        aiLabView.classList.add('active-view');

        // Initialize AI Lab view once
        initAILab();

        // Smooth reveal for lab workspace
        aiLabView.classList.add('lab-fade-in');
        setTimeout(() => aiLabView.classList.remove('lab-fade-in'), 900);

        // Step 6: Cleanup overlay
        setTimeout(() => {
          splitOverlay.classList.remove('splitting');
          splitOverlay.classList.remove('peak');

          if (transitionFlash) transitionFlash.classList.remove('flash');

          setTimeout(() => {
            splitOverlay.classList.remove('active');
            document.body.classList.remove('is-transitioning-lab');
            isTransitioning = false;
          }, 420);
        }, 650);
      }, 1350);

    }, 120);
  }
}


/* ==========================================================================
   AI LAB INITIALIZATION
   ========================================================================== */
function initAILab() {
  // Initialize lab classification (idempotent via per-component guards)
  initLabClassification();
  initLabParticles();
  initLabTabs();
  initLabTerminal();
  initLabPredictionHistory();

  // Back-to-landing handler for lab close button
  const labCloseBtn = document.getElementById('lab-close-btn');
  const landingView = document.getElementById('landing-view');
  const aiLabView = document.getElementById('ai-lab-view');
  const floatingNavbar = document.querySelector('.floating-navbar');
  if (labCloseBtn) {
    labCloseBtn.addEventListener('click', () => {
      aiLabView.classList.remove('active-view');
      aiLabView.classList.add('inactive-view');
      landingView.classList.remove('inactive-view');
      landingView.classList.add('active-view');
      if (floatingNavbar) {
        floatingNavbar.style.opacity = '1';
        floatingNavbar.style.pointerEvents = 'auto';
      }
    });
  }

  // Set neutral state instead of auto-classifying
  if (initAILab._ran) return;
  initAILab._ran = true;
  setTimeout(() => {
    const speciesEl = document.getElementById('lab-result-species');
    const confidenceEl = document.getElementById('lab-result-confidence');
    const emojiEl = document.getElementById('lab-result-emoji');
    const flowerImg = document.getElementById('lab-result-flower-img');
    if (speciesEl) speciesEl.textContent = 'Awaiting Input...';
    if (confidenceEl) confidenceEl.textContent = '--';
    if (emojiEl) { emojiEl.textContent = '🔬'; emojiEl.style.color = 'var(--text-muted)'; }
    if (flowerImg) flowerImg.src = 'setosa.png';

    ['prob-val-setosa', 'prob-val-versicolor', 'prob-val-virginica'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '0%';
    });
    ['prob-bar-setosa', 'prob-bar-versicolor', 'prob-bar-virginica'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.width = '0%';
    });

    document.querySelectorAll('.lab-tree-node').forEach(n => n.classList.remove('active-node'));
    document.querySelectorAll('.lab-tree-connector').forEach(c => c.classList.remove('active-branch'));
  }, 350);
}


/* ==========================================================================
   LAB CLASSIFICATION SYSTEM
   ========================================================================== */
function initLabClassification() {
  const sliders = [
    { slider: document.getElementById('lab-sepal-len'), num: document.getElementById('num-sepal-len') },
    { slider: document.getElementById('lab-sepal-wid'), num: document.getElementById('num-sepal-wid') },
    { slider: document.getElementById('lab-petal-len'), num: document.getElementById('num-petal-len') },
    { slider: document.getElementById('lab-petal-wid'), num: document.getElementById('num-petal-wid') }
  ];

  // Sync sliders with number inputs
  sliders.forEach(item => {
    if (item.slider && item.num) {
      item.slider.addEventListener('input', () => {
        item.num.value = item.slider.value;
      });
      item.num.addEventListener('input', () => {
        item.slider.value = item.num.value;
        runLabClassification();
      });
    }
  });

  // Preset buttons
  const presetBtns = document.querySelectorAll('.lab-preset-btn');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const values = btn.getAttribute('data-values').split(',').map(parseFloat);
      document.getElementById('lab-sepal-len').value = values[0];
      document.getElementById('lab-sepal-wid').value = values[1];
      document.getElementById('lab-petal-len').value = values[2];
      document.getElementById('lab-petal-wid').value = values[3];
      document.getElementById('num-sepal-len').value = values[0];
      document.getElementById('num-sepal-wid').value = values[1];
      document.getElementById('num-petal-len').value = values[2];
      document.getElementById('num-petal-wid').value = values[3];
      runLabClassification();
    });
  });

  // Reset button
  const resetBtn = document.getElementById('btn-reset-lab');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const defaults = [5.8, 3.0, 3.8, 1.2];
      ['lab-sepal-len', 'lab-sepal-wid', 'lab-petal-len', 'lab-petal-wid'].forEach((id, i) => {
        const slider = document.getElementById(id);
        if (slider) slider.value = defaults[i];
      });
      ['num-sepal-len', 'num-sepal-wid', 'num-petal-len', 'num-petal-wid'].forEach((id, i) => {
        const num = document.getElementById(id);
        if (num) num.value = defaults[i];
      });
      runLabClassification();
    });
  }

  // Classify button with animation
  const classifyBtn = document.getElementById('btn-classify-lab');
  if (classifyBtn) {
    classifyBtn.addEventListener('click', () => {
      const scanningOverlay = document.getElementById('lab-scanning-overlay');
      if (scanningOverlay) {
        scanningOverlay.classList.add('active');
        setTimeout(() => {
          scanningOverlay.classList.remove('active');
          runLabClassification();
        }, 1500);
      }
    });
  }
}

function runLabClassification() {
  const sepalLen = parseFloat(document.getElementById('lab-sepal-len')?.value || 5.8);
  const sepalWid = parseFloat(document.getElementById('lab-sepal-wid')?.value || 3.0);
  const petalLen = parseFloat(document.getElementById('lab-petal-len')?.value || 3.8);
  const petalWid = parseFloat(document.getElementById('lab-petal-wid')?.value || 1.2);

  // Reset tree paths
  document.querySelectorAll('.lab-tree-node').forEach(n => n.classList.remove('active-node'));
  document.querySelectorAll('.lab-tree-connector').forEach(c => c.classList.remove('active-branch'));

  let prediction = '';
  let confidence = 0;
  let probs = { setosa: 0, versicolor: 0, virginica: 0 };
  const activeNodes = ['lab-node-root'];
  const activeConnectors = [];

  // Decision Tree Logic
  if (petalLen < 2.45) {
    prediction = 'Iris Setosa';
    activeNodes.push('lab-node-setosa');
    activeConnectors.push('lab-con-root-l');
    const dist = 2.45 - petalLen;
    confidence = 90 + Math.min(dist * 8, 9.8);
    probs.setosa = confidence;
    probs.versicolor = Math.max(0, 4 - dist * 3);
    probs.virginica = Math.max(0, 6 - dist * 4);
  } else {
    activeNodes.push('lab-node-right-branch');
    activeConnectors.push('lab-con-root-r');

    if (petalWid < 1.75) {
      activeNodes.push('lab-node-petal-len-branch');
      activeConnectors.push('lab-con-node2-l');

      if (petalLen < 4.95) {
        prediction = 'Iris Versicolor';
        activeNodes.push('lab-node-versicolor-final');
        activeConnectors.push('lab-con-node3-l');
        const d1 = 4.95 - petalLen;
        const d2 = 1.75 - petalWid;
        confidence = 80 + Math.min((d1 + d2) * 6, 18.2);
        probs.versicolor = confidence;
        probs.virginica = Math.max(0, 20 - d1 * 5);
        probs.setosa = Math.max(0, 5 - d1 * 2);
      } else {
        prediction = 'Iris Virginica';
        activeNodes.push('lab-node-virginica-final');
        activeConnectors.push('lab-con-node3-r');
        const d1 = petalLen - 4.95;
        confidence = 80 + Math.min(d1 * 7, 16.5);
        probs.virginica = confidence;
        probs.versicolor = Math.max(0, 20 - d1 * 4);
        probs.setosa = 2;
      }
    } else {
      prediction = 'Iris Virginica';
      activeNodes.push('lab-node-virginica-direct');
      activeConnectors.push('lab-con-node2-r');
      const dist = petalWid - 1.75;
      confidence = 92 + Math.min(dist * 9, 7.8);
      probs.virginica = confidence;
      probs.versicolor = Math.max(0, 8 - dist * 4);
      probs.setosa = 1;
    }
  }

  // Update tree visualization
  activeNodes.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('active-node');
  });
  activeConnectors.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('active-branch');
  });

  // Update result panel
  const speciesEl = document.getElementById('lab-result-species');
  const confidenceEl = document.getElementById('lab-result-confidence');
  const emojiEl = document.getElementById('lab-result-emoji');
  const flowerImg = document.getElementById('lab-result-flower-img');

  if (speciesEl) speciesEl.textContent = prediction;
  if (confidenceEl) confidenceEl.textContent = confidence.toFixed(1) + '%';

  if (emojiEl) {
    if (prediction === 'Iris Setosa') {
      emojiEl.textContent = '🌸';
      emojiEl.style.color = '#ff007f';
    } else if (prediction === 'Iris Versicolor') {
      emojiEl.textContent = '💠';
      emojiEl.style.color = '#00b4d8';
    } else {
      emojiEl.textContent = '🌿';
      emojiEl.style.color = '#8338ec';
    }
  }

  if (flowerImg) {
    if (prediction === 'Iris Setosa') {
      flowerImg.src = 'setosa.png';
    } else if (prediction === 'Iris Versicolor') {
      flowerImg.src = 'versicolor.png';
    } else {
      flowerImg.src = 'virginica.png';
    }
  }

  // Update probability breakdown
  const probSetosa = document.getElementById('prob-val-setosa');
  const probVersicolor = document.getElementById('prob-val-versicolor');
  const probVirginica = document.getElementById('prob-val-virginica');
  const barSetosa = document.getElementById('prob-bar-setosa');
  const barVersicolor = document.getElementById('prob-bar-versicolor');
  const barVirginica = document.getElementById('prob-bar-virginica');

  const total = probs.setosa + probs.versicolor + probs.virginica;
  const pSetosa = (probs.setosa / total * 100).toFixed(1);
  const pVersicolor = (probs.versicolor / total * 100).toFixed(1);
  const pVirginica = (probs.virginica / total * 100).toFixed(1);

  if (probSetosa) { probSetosa.textContent = pSetosa + '%'; barSetosa.style.width = pSetosa + '%'; }
  if (probVersicolor) { probVersicolor.textContent = pVersicolor + '%'; barVersicolor.style.width = pVersicolor + '%'; }
  if (probVirginica) { probVirginica.textContent = pVirginica + '%'; barVirginica.style.width = pVirginica + '%'; }

  // Add to history
  addToPredictionHistory(sepalLen, sepalWid, petalLen, petalWid, prediction, confidence);
}

/* ==========================================================================
   LAB PARTICLES VISUALIZATION
   ========================================================================== */
function initLabParticles() {
  const canvas = document.getElementById('lab-particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  const particles = [];
  const particleCount = 30;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    width = canvas.width;
    height = canvas.height;
  }

  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      color: Math.random() > 0.5 ? '#00b4d8' : '#ff007f',
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  let rafId = null;
  function draw() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });

    rafId = requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('beforeunload', () => {
    if (rafId) cancelAnimationFrame(rafId);
  });
}

/* ==========================================================================
   LAB TABS NAVIGATION
   ========================================================================== */
function initLabTabs() {
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const tabPanes = document.querySelectorAll('.tab-pane');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      const tabId = link.getAttribute('data-tab');

      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      tabPanes.forEach(pane => {
        if (pane.id === tabId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   LAB TERMINAL
   ========================================================================== */
function initLabTerminal() {
  const terminalOutput = document.getElementById('lab-terminal-output');
  if (!terminalOutput) return;

  const messages = [
    { text: 'FloraMind AI Lab Engine v2.0.1 initialized', type: 'info' },
    { text: 'Decision Tree Classifier loaded', type: 'success' },
    { text: 'Dataset: 150 Iris samples (3 classes)', type: 'info' },
    { text: 'Features: Sepal Length, Sepal Width, Petal Length, Petal Width', type: 'info' },
    { text: 'Train/Test Split: 80/20', type: 'info' },
    { text: 'Model Accuracy: 96.67%', type: 'success' },
    { text: 'System ready for classification', type: 'success' }
  ];

  messages.forEach((msg, i) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = `terminal-line ${msg.type}`;
      line.textContent = `> ${msg.text}`;
      terminalOutput.appendChild(line);
    }, i * 300);
  });
}

function addLabTerminalMessage(text, type = 'info') {
  const terminalOutput = document.getElementById('lab-terminal-output');
  if (!terminalOutput) return;

  const line = document.createElement('div');
  line.className = `terminal-line ${type}`;
  line.textContent = `> ${text}`;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

/* ==========================================================================
   PREDICTION HISTORY (PER-USER WITH LOCALSTORAGE)
   ========================================================================== */
function initLabPredictionHistory() {
  const tbody = document.getElementById('lab-history-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const currentUser = getCurrentUser();
  if (!currentUser) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:1.5rem;font-family:var(--font-mono);font-size:0.8rem;">Sign in to save your prediction history.</td></tr>';
    return;
  }

  const history = getUserHistory(currentUser.username);
  history.forEach(row => {
    addHistoryRow(row);
  });

  if (history.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = '<td colspan="7" style="text-align:center;color:var(--text-muted);padding:1.5rem;font-family:var(--font-mono);font-size:0.8rem;">No predictions yet. Use the classifier above.</td>';
    tbody.appendChild(emptyRow);
  }
}

function addToPredictionHistory(sl, sw, pl, pw, species, confidence) {
  const tbody = document.getElementById('lab-history-tbody');
  if (!tbody) return;

  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const now = new Date();
  const time = now.toTimeString().split(' ')[0];

  const row = {
    time,
    sl: sl.toFixed(1),
    sw: sw.toFixed(1),
    pl: pl.toFixed(1),
    pw: pw.toFixed(1),
    species,
    confidence: confidence.toFixed(1)
  };

  // Save to localStorage
  const history = getUserHistory(currentUser.username);
  history.unshift(row);
  if (history.length > 50) history.length = 50;
  localStorage.setItem(`floramind_history_${currentUser.username}`, JSON.stringify(history));

  // Remove empty state if present
  const emptyRow = tbody.querySelector('td[colspan]');
  if (emptyRow) tbody.innerHTML = '';

  addHistoryRow(row);

  // Update terminal
  addLabTerminalMessage(`Classification complete: ${species} (${confidence.toFixed(1)}%)`, 'success');
}

function addHistoryRow(row) {
  const tbody = document.getElementById('lab-history-tbody');
  if (!tbody) return;

  // Remove empty placeholder if present
  const existingEmpty = tbody.querySelector('td[colspan]');
  if (existingEmpty) tbody.innerHTML = '';

  const tr = document.createElement('tr');
  const speciesClass = row.species.toLowerCase().replace(/\s+/g, '-');
  tr.innerHTML = `
    <td>${row.time}</td>
    <td>${row.sl}</td>
    <td>${row.sw}</td>
    <td>${row.pl}</td>
    <td>${row.pw}</td>
    <td><span class="species-tag ${speciesClass}">${row.species}</span></td>
    <td>${row.confidence}%</td>
  `;

  tbody.insertBefore(tr, tbody.firstChild);

  // Keep only last 10 entries
  while (tbody.children.length > 10) {
    tbody.removeChild(tbody.lastChild);
  }
}

function getUserHistory(username) {
  try {
    const data = localStorage.getItem(`floramind_history_${username}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/* ==========================================================================
   AUTHENTICATION MODULE (LOGIN / REGISTER / FORGOT / LOGOUT)
   ========================================================================== */
function initAuth() {
  updateAuthUI();
  setupAuthModal();
  setupAuthForms();
  setupProfileDropdown();
  setupWelcomeToast();
}

function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36);
}

function getUsers() {
  try {
    const data = localStorage.getItem('floramind_users');
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function saveUsers(users) {
  localStorage.setItem('floramind_users', JSON.stringify(users));
}

function getCurrentUser() {
  try {
    let data = localStorage.getItem('floramind_session');
    if (!data) data = sessionStorage.getItem('floramind_session');
    if (!data) return null;
    const session = JSON.parse(data);
    const users = getUsers();
    return users.find(u => u.username === session.username) || null;
  } catch { return null; }
}

function setSession(username, rememberMe = true) {
  const session = { username, loginTime: new Date().toISOString() };
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem('floramind_session', JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem('floramind_session');
}

function updateAuthUI() {
  const user = getCurrentUser();
  const authBtn = document.getElementById('auth-btn');
  const profileContainer = document.getElementById('user-profile-container');
  const profileTrigger = document.getElementById('profile-trigger-btn');
  const dropdownName = document.getElementById('dropdown-user-name');
  const dropdownEmail = document.getElementById('dropdown-user-email');

  if (user) {
    if (authBtn) authBtn.classList.add('hidden');
    if (profileContainer) {
      profileContainer.classList.add('logged-in');
      if (profileTrigger) profileTrigger.textContent = user.username.charAt(0).toUpperCase();
      if (dropdownName) dropdownName.textContent = user.username;
      if (dropdownEmail) dropdownEmail.textContent = user.email;
    }
  } else {
    if (authBtn) authBtn.classList.remove('hidden');
    if (profileContainer) profileContainer.classList.remove('logged-in');
  }
}

function setupAuthModal() {
  const authBtn = document.getElementById('auth-btn');
  const overlay = document.getElementById('auth-modal-overlay');
  const closeBtn = document.getElementById('auth-close-btn');

  if (!authBtn || !overlay) return;

  authBtn.addEventListener('click', () => {
    showAuthForm('login');
    overlay.classList.add('show');
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('show');
  });
}

function showAuthForm(formName) {
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.getElementById(`auth-${formName}-form`)?.classList.add('active');
  document.querySelectorAll('.auth-error-msg').forEach(el => el.textContent = '');
  document.querySelectorAll('.auth-input-group').forEach(g => {
    g.classList.remove('has-error', 'is-valid');
  });
  document.querySelectorAll('.auth-input').forEach(input => {
    if (input.type !== 'checkbox') input.value = '';
  });
}

function setupAuthForms() {
  // Switch between forms
  document.getElementById('show-register-link')?.addEventListener('click', (e) => {
    e.preventDefault(); showAuthForm('register');
  });
  document.getElementById('show-login-link')?.addEventListener('click', (e) => {
    e.preventDefault(); showAuthForm('login');
  });
  document.getElementById('show-forgot-link')?.addEventListener('click', (e) => {
    e.preventDefault(); showAuthForm('forgot');
  });
  document.getElementById('back-to-login-link')?.addEventListener('click', (e) => {
    e.preventDefault(); showAuthForm('login');
  });

  // Login
  document.getElementById('login-btn')?.addEventListener('click', handleLogin);
  document.getElementById('login-password')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
  });

  // Register
  document.getElementById('register-btn')?.addEventListener('click', handleRegister);
  document.getElementById('reg-password')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleRegister();
  });
  document.getElementById('reg-confirm-password')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleRegister();
  });

  // Forgot
  document.getElementById('forgot-btn')?.addEventListener('click', handleForgotPassword);
  document.getElementById('forgot-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleForgotPassword();
  });
}

function clearFieldValidation() {
  document.querySelectorAll('.auth-input-group').forEach(g => {
    g.classList.remove('has-error', 'is-valid');
  });
}

function markFieldValid(id) {
  const group = document.getElementById(id)?.closest('.auth-input-group');
  if (group) { group.classList.remove('has-error'); group.classList.add('is-valid'); }
}

function markFieldInvalid(id) {
  const group = document.getElementById(id)?.closest('.auth-input-group');
  if (group) { group.classList.remove('is-valid'); group.classList.add('has-error'); }
}

function handleLogin() {
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  const errorEl = document.getElementById('login-error');
  const rememberMe = document.getElementById('remember-me').checked;

  clearFieldValidation();

  const identifier = emailInput.value.trim();
  const password = passInput.value;

  if (!identifier || !password) {
    errorEl.textContent = 'Please fill in all fields.';
    if (!identifier) markFieldInvalid('login-email');
    if (!password) markFieldInvalid('login-password');
    return;
  }

  const users = getUsers();
  const user = users.find(u =>
    (u.username.toLowerCase() === identifier.toLowerCase() || u.email.toLowerCase() === identifier.toLowerCase())
  );

  if (!user) {
    errorEl.textContent = 'No account found with that email/username. Please register first.';
    markFieldInvalid('login-email');
    return;
  }

  if (user.password !== hashPassword(password)) {
    errorEl.textContent = 'Incorrect password. Try again or use "Forgot Password?".';
    markFieldInvalid('login-password');
    return;
  }

  markFieldValid('login-email');
  markFieldValid('login-password');

  setSession(user.username, rememberMe);
  updateAuthUI();
  document.getElementById('auth-modal-overlay').classList.remove('show');
  showWelcomeToast(`Welcome back, ${user.username}!`);
  emailInput.value = ''; passInput.value = '';
  initLabPredictionHistory();
}

function handleRegister() {
  const usernameInput = document.getElementById('reg-username');
  const emailInput = document.getElementById('reg-email');
  const passInput = document.getElementById('reg-password');
  const confirmInput = document.getElementById('reg-confirm-password');
  const errorEl = document.getElementById('register-error');

  clearFieldValidation();

  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passInput.value;
  const confirm = confirmInput.value;

  if (!username || !email || !password || !confirm) {
    errorEl.textContent = 'Please fill in all fields.';
    if (!username) markFieldInvalid('reg-username');
    if (!email) markFieldInvalid('reg-email');
    if (!password) markFieldInvalid('reg-password');
    if (!confirm) markFieldInvalid('reg-confirm-password');
    return;
  }

  if (username.length < 3) {
    errorEl.textContent = 'Username must be at least 3 characters.';
    markFieldInvalid('reg-username');
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    errorEl.textContent = 'Please enter a valid email address.';
    markFieldInvalid('reg-email');
    return;
  }

  if (password.length < 6) {
    errorEl.textContent = 'Password must be at least 6 characters.';
    markFieldInvalid('reg-password');
    return;
  }

  if (password !== confirm) {
    errorEl.textContent = 'Passwords do not match.';
    markFieldInvalid('reg-confirm-password');
    return;
  }

  const users = getUsers();

  if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
    errorEl.textContent = 'Username already taken. Please choose another.';
    markFieldInvalid('reg-username');
    return;
  }

  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    errorEl.textContent = 'Email already registered. Please sign in.';
    markFieldInvalid('reg-email');
    return;
  }

  markFieldValid('reg-username');
  markFieldValid('reg-email');
  markFieldValid('reg-password');
  markFieldValid('reg-confirm-password');

  const newUser = {
    username,
    email,
    password: hashPassword(password),
    registeredAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  setSession(username);
  updateAuthUI();
  document.getElementById('auth-modal-overlay').classList.remove('show');
  showWelcomeToast(`Welcome to FloraMind, ${username}! Your account is ready.`);
  usernameInput.value = ''; emailInput.value = ''; passInput.value = ''; confirmInput.value = '';
  initLabPredictionHistory();
}

function handleForgotPassword() {
  const input = document.getElementById('forgot-input');
  const resultEl = document.getElementById('forgot-result');

  clearFieldValidation();

  const identifier = input.value.trim();
  if (!identifier) {
    resultEl.textContent = 'Please enter your email or username.';
    markFieldInvalid('forgot-input');
    return;
  }

  const users = getUsers();
  const user = users.find(u =>
    (u.username.toLowerCase() === identifier.toLowerCase() || u.email.toLowerCase() === identifier.toLowerCase())
  );

  if (!user) {
    resultEl.textContent = 'No account found. Please register first.';
    markFieldInvalid('forgot-input');
    return;
  }

  markFieldValid('forgot-input');
  resultEl.style.color = 'var(--accent-emerald)';
  const tempPass = Math.random().toString(36).slice(2, 10);
  user.password = hashPassword(tempPass);
  saveUsers(users);
  resultEl.innerHTML = `Password reset successful. Your temporary password is: <strong>${tempPass}</strong><br><small style="opacity:0.6">Change it in your dashboard after signing in.</small>`;
}

function handleLogout() {
  clearSession();
  updateAuthUI();

  const labTbody = document.getElementById('lab-history-tbody');
  if (labTbody) {
    labTbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:1.5rem;font-family:var(--font-mono);font-size:0.8rem;">Sign in to see your prediction history.</td></tr>';
  }

  const dashTbody = document.getElementById('dash-history-tbody');
  if (dashTbody) {
    dashTbody.innerHTML = '<tr><td colspan="7" class="dash-empty-state">Sign in to see your prediction history.</td></tr>';
  }

  document.getElementById('profile-dropdown')?.classList.remove('show');
  showWelcomeToast('You have been signed out.');
}

function setupProfileDropdown() {
  const trigger = document.getElementById('profile-trigger-btn');
  const dropdown = document.getElementById('profile-dropdown');
  const logoutBtn = document.getElementById('logout-btn');

  if (!trigger || !dropdown) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && e.target !== trigger) {
      dropdown.classList.remove('show');
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
}

function setupWelcomeToast() {
  const toast = document.getElementById('welcome-toast');
  if (!toast) return;

  toast.addEventListener('click', () => {
    toast.classList.remove('show');
  });
}

function showWelcomeToast(message) {
  const toast = document.getElementById('welcome-toast');
  const msgEl = document.getElementById('toast-message');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove('show');

  // Force reflow for animation restart
  void toast.offsetWidth;
  toast.classList.add('show');

  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   USER DASHBOARD
   ========================================================================== */
function initDashboard() {
  const dashNavBtn = document.getElementById('dash-nav-btn');
  const dashBackBtn = document.getElementById('dashboard-back-btn');
  const dashLogoutBtn = document.getElementById('dashboard-logout-btn');
  const landingView = document.getElementById('landing-view');
  const aiLabView = document.getElementById('ai-lab-view');
  const dashView = document.getElementById('dashboard-view');
  const floatingNavbar = document.querySelector('.floating-navbar');

  function showDashboard() {
    [landingView, aiLabView].forEach(v => {
      if (v) { v.classList.remove('active-view'); v.classList.add('inactive-view'); }
    });
    if (dashView) { dashView.classList.remove('inactive-view'); dashView.classList.add('active-view'); }
    if (floatingNavbar) {
      floatingNavbar.style.opacity = '0';
      floatingNavbar.style.pointerEvents = 'none';
    }
    populateDashboard();
  }

  function hideDashboard() {
    if (dashView) { dashView.classList.remove('active-view'); dashView.classList.add('inactive-view'); }
    if (landingView) { landingView.classList.remove('inactive-view'); landingView.classList.add('active-view'); }
    if (floatingNavbar) {
      floatingNavbar.style.opacity = '1';
      floatingNavbar.style.pointerEvents = 'auto';
    }
  }

  if (dashNavBtn) {
    dashNavBtn.addEventListener('click', () => {
      document.getElementById('profile-dropdown')?.classList.remove('show');
      showDashboard();
    });
  }
  if (dashBackBtn) {
    dashBackBtn.addEventListener('click', hideDashboard);
  }
  if (dashLogoutBtn) {
    dashLogoutBtn.addEventListener('click', () => {
      handleLogout();
      hideDashboard();
    });
  }

  // Quick action cards
  document.getElementById('dash-go-lab')?.addEventListener('click', () => {
    hideDashboard();
    // Trigger split transition to lab
    const btn = document.querySelector('.start-exploration-btn');
    if (btn) btn.click();
  });
  document.getElementById('dash-go-classifier')?.addEventListener('click', () => {
    hideDashboard();
    setTimeout(() => {
      document.getElementById('classification')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  });
  document.getElementById('dash-go-home')?.addEventListener('click', hideDashboard);

  // Settings save handlers
  setupDashboardSettings();
}

function populateDashboard() {
  const user = getCurrentUser();
  if (!user) return;

  document.getElementById('dashboard-avatar').textContent = user.username.charAt(0).toUpperCase();
  document.getElementById('dashboard-user-name').textContent = user.username;
  document.getElementById('dashboard-user-email').textContent = user.email;

  const registered = user.registeredAt ? new Date(user.registeredAt) : new Date();
  document.getElementById('dashboard-member-since').textContent = `Member since ${registered.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;

  const ageMs = Date.now() - registered.getTime();
  const ageDays = Math.floor(ageMs / 86400000);
  document.getElementById('dash-stat-account-age').textContent = ageDays < 30 ? `${ageDays}d` : ageDays < 365 ? `${Math.floor(ageDays / 30)}mo` : `${Math.floor(ageDays / 365)}y`;

  // Pre-fill edit fields
  document.getElementById('dash-edit-username').value = user.username;
  document.getElementById('dash-edit-email').value = user.email;

  // Load history & stats
  const history = getUserHistory(user.username);
  document.getElementById('dash-stat-predictions').textContent = history.length;

  if (history.length > 0) {
    const avgConf = history.reduce((sum, r) => sum + parseFloat(r.confidence || 0), 0) / history.length;
    document.getElementById('dash-stat-accuracy').textContent = avgConf.toFixed(1) + '%';

    const speciesCounts = {};
    history.forEach(r => {
      const s = r.species || '';
      speciesCounts[s] = (speciesCounts[s] || 0) + 1;
    });
    const topSpecies = Object.entries(speciesCounts).sort((a, b) => b[1] - a[1])[0];
    document.getElementById('dash-stat-top-species').textContent = topSpecies ? topSpecies[0].replace('Iris ', '') : '--';
  }

  // Populate history table
  const tbody = document.getElementById('dash-history-tbody');
  tbody.innerHTML = '';
  if (history.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="dash-empty-state">No predictions yet. Head to the AI Lab to start classifying!</td></tr>';
  } else {
    history.slice(0, 20).forEach(row => {
      const tr = document.createElement('tr');
      const speciesClass = (row.species || '').toLowerCase().replace(/\s+/g, '-');
      tr.innerHTML = `
        <td>${row.time || '--'}</td>
        <td>${row.sl || '--'}</td>
        <td>${row.sw || '--'}</td>
        <td>${row.pl || '--'}</td>
        <td>${row.pw || '--'}</td>
        <td><span class="species-tag ${speciesClass}">${row.species || '--'}</span></td>
        <td>${row.confidence || '--'}%</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

function setupDashboardSettings() {
  document.getElementById('dash-save-username')?.addEventListener('click', () => {
    const user = getCurrentUser();
    if (!user) return;
    const newName = document.getElementById('dash-edit-username').value.trim();
    const msg = document.getElementById('dash-username-msg');
    if (newName.length < 3) { msg.textContent = 'Min 3 characters'; msg.className = 'dash-field-msg error'; return; }
    const users = getUsers();
    const existing = users.find(u => u.username.toLowerCase() === newName.toLowerCase() && u.username !== user.username);
    if (existing) { msg.textContent = 'Username taken'; msg.className = 'dash-field-msg error'; return; }
    const idx = users.findIndex(u => u.username === user.username);
    users[idx].username = newName;
    saveUsers(users);
    setSession(newName);
    updateAuthUI();
    document.getElementById('dashboard-user-name').textContent = newName;
    document.getElementById('dashboard-avatar').textContent = newName.charAt(0).toUpperCase();
    msg.textContent = 'Username updated!'; msg.className = 'dash-field-msg success';
    initLabPredictionHistory();
  });

  document.getElementById('dash-save-email')?.addEventListener('click', () => {
    const user = getCurrentUser();
    if (!user) return;
    const newEmail = document.getElementById('dash-edit-email').value.trim();
    const msg = document.getElementById('dash-email-msg');
    if (!newEmail.includes('@') || !newEmail.includes('.')) { msg.textContent = 'Invalid email'; msg.className = 'dash-field-msg error'; return; }
    const users = getUsers();
    const idx = users.findIndex(u => u.username === user.username);
    users[idx].email = newEmail;
    saveUsers(users);
    document.getElementById('dashboard-user-email').textContent = newEmail;
    msg.textContent = 'Email updated!'; msg.className = 'dash-field-msg success';
  });

  document.getElementById('dash-save-password')?.addEventListener('click', () => {
    const user = getCurrentUser();
    if (!user) return;
    const newPass = document.getElementById('dash-edit-password').value;
    const msg = document.getElementById('dash-password-msg');
    if (newPass.length < 6) { msg.textContent = 'Min 6 characters'; msg.className = 'dash-field-msg error'; return; }
    const users = getUsers();
    const idx = users.findIndex(u => u.username === user.username);
    users[idx].password = hashPassword(newPass);
    saveUsers(users);
    document.getElementById('dash-edit-password').value = '';
    msg.textContent = 'Password changed!'; msg.className = 'dash-field-msg success';
  });

  // Clear messages on input
  ['dash-edit-username', 'dash-edit-email', 'dash-edit-password'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', function() {
      const msgId = id.replace('dash-edit-', 'dash-') + '-msg';
      const msgEl = document.getElementById(msgId);
      if (msgEl) { msgEl.textContent = ''; msgEl.className = 'dash-field-msg'; }
    });
  });
}

/* ==========================================================================
   ROTATING KEYWORDS SLIDER
   ========================================================================== */
function initKeywordSlider() {
  const keywords = document.querySelectorAll('.keyword-box .keyword');
  let currentIndex = 0;
  
  setInterval(() => {
    // Current keyword exit
    const current = keywords[currentIndex];
    current.classList.remove('active');
    current.classList.add('exit');
    
    // Next keyword enter
    currentIndex = (currentIndex + 1) % keywords.length;
    const next = keywords[currentIndex];
    next.classList.remove('exit');
    next.classList.add('active');
  }, 2500);
}

/* ==========================================================================
   RIGHT SIDE HERO: HOLOGRAPHIC 3D IRIS CANVAS
   ========================================================================== */
function initHoloCanvas() {
  const canvas = document.getElementById('holo-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  // Coordinates panels UI
  const coordX = document.getElementById('holo-coord-x');
  const coordY = document.getElementById('holo-coord-y');
  const coordZ = document.getElementById('holo-coord-z');
  
  let width = canvas.width;
  let height = canvas.height;
  
  // 3D Scene parameters
  let pitch = -0.25; // Pitch angle
  let yaw = 0.0;    // Yaw angle
  let zoom = 1.6;
  const distance = 400; // Camera distance
  
  // Mouse interactions
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let pitchOffset = 0;
  let yawOffset = 0;
  let targetPitchOffset = 0;
  let targetYawOffset = 0;
  
  // Particle system
  const particles = [];
  const maxParticles = 45;
  for (let i = 0; i < maxParticles; i++) {
    particles.push(resetParticle({}));
  }
  
  function resetParticle(p) {
    p.x = (Math.random() - 0.5) * 40;
    p.y = 10 + Math.random() * 20; // Start near bottom/core
    p.z = (Math.random() - 0.5) * 40;
    p.vx = (Math.random() - 0.5) * 0.6;
    p.vy = -(0.5 + Math.random() * 1.2); // Rise up
    p.vz = (Math.random() - 0.5) * 0.6;
    p.life = 1.0;
    p.decay = 0.008 + Math.random() * 0.012;
    p.size = 1 + Math.random() * 2;
    // Glow color variant
    p.colorVariant = Math.random() > 0.4 ? 'cyan' : 'pink';
    return p;
  }
  
  // Canvas resizing
  function resize() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    width = canvas.width;
    height = canvas.height;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  
  window.addEventListener('resize', resize);
  resize();
  setTimeout(resize, 100); // Back-up resize
  
  // Mouse track
  window.addEventListener('mousemove', (e) => {
    if (isDragging) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    // Normalized coordinates (-0.5 to 0.5)
    const normX = (mx / rect.width) - 0.5;
    const normY = (my / rect.height) - 0.5;
    
    targetYawOffset = normX * 0.6;
    targetPitchOffset = normY * 0.4;
    
    // Update UI numbers
    if (coordX && coordY) {
      coordX.textContent = `X: ${normX.toFixed(2)}`;
      coordY.textContent = `Y: ${(-normY).toFixed(2)}`;
    }
  });
  
  // Drag rotation behavior
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
  });
  
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    
    yaw += dx * 0.007;
    pitch += dy * 0.007;
    
    // Clamp pitch to avoid turning completely upside down
    pitch = Math.max(-Math.PI/2 + 0.1, Math.min(Math.PI/2 - 0.1, pitch));
    
    startX = e.clientX;
    startY = e.clientY;
  });
  
  window.addEventListener('mouseup', () => {
    isDragging = false;
  });
  
  // Touch support for mobile
  canvas.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    
    yaw += dx * 0.007;
    pitch += dy * 0.007;
    
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  
  window.addEventListener('touchend', () => {
    isDragging = false;
  });
  
  // Colors dependent on theme
  let accentCyan = '#00b4d8';
  let accentPink = '#ff007f';
  let accentPurple = '#8338ec';
  
  function updateColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      accentCyan = '#00f0ff';
      accentPink = '#ff007f';
      accentPurple = '#a239ca';
    } else {
      accentCyan = '#00b4d8';
      accentPink = '#ff007f';
      accentPurple = '#8338ec';
    }
  }
  
  window.addEventListener('themechanged', updateColors);
  updateColors();
  
  // 3D projection formulas
  function project(x, y, z) {
    // Apply pitch and yaw rotation matrices
    const totalYaw = yaw + yawOffset;
    const totalPitch = pitch + pitchOffset;
    
    // Rotate Yaw (around Y axis)
    const x1 = x * Math.cos(totalYaw) - z * Math.sin(totalYaw);
    const z1 = x * Math.sin(totalYaw) + z * Math.cos(totalYaw);
    
    // Rotate Pitch (around X axis)
    const y2 = y * Math.cos(totalPitch) - z1 * Math.sin(totalPitch);
    const z2 = y * Math.sin(totalPitch) + z1 * Math.cos(totalPitch);
    
    // Zoom scaling
    const scale = zoom * distance / (distance + z2);
    
    const displayWidth = canvas.width / window.devicePixelRatio;
    const displayHeight = canvas.height / window.devicePixelRatio;
    
    return {
      x: displayWidth / 2 + x1 * scale,
      y: displayHeight / 2 + y2 * scale,
      depth: z2,
      visible: z2 > -distance
    };
  }
  
  // Loop runner
  let rafId = null;
  function draw() {
    const displayWidth = canvas.width / window.devicePixelRatio;
    const displayHeight = canvas.height / window.devicePixelRatio;
    
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    
    // Smoothly transition mouse tracking parallax offsets
    yawOffset += (targetYawOffset - yawOffset) * 0.08;
    pitchOffset += (targetPitchOffset - pitchOffset) * 0.08;
    
    // Slow auto rotation if not dragging
    if (!isDragging) {
      yaw += 0.004;
    }
    
    if (coordZ) {
      const displayAngle = ((yaw * 180 / Math.PI) % 360).toFixed(0);
      coordZ.textContent = `ROT: ${displayAngle}°`;
    }
    
    // Draw 3D Parametric Iris Petals
    const numPetals = 6;
    const meshes = []; // Store lines for sorted depth drawing
    
    for (let p = 0; p < numPetals; p++) {
      const petalAngle = (p * Math.PI * 2) / numPetals;
      const isStandard = p % 2 === 1; // Alternating Standards (up) and Falls (down)
      
      const uSegments = 16;
      const vSegments = 8;
      
      for (let u = 0; u <= uSegments; u++) {
        const uRatio = u / uSegments;
        
        // Setup coordinates for lateral widths
        const pts = [];
        for (let v = 0; v <= vSegments; v++) {
          const vRatio = (v / vSegments) * 2 - 1; // -1 to 1
          
          let px = 0, py = 0, pz = 0;
          
          if (isStandard) {
            // Standard: Curves upwards and inwards
            const length = 110;
            const heightFactor = Math.pow(uRatio, 1.2);
            py = -length * heightFactor;
            
            // Width bulge in middle
            const width = 24 * Math.sin(Math.PI * uRatio);
            
            // Radial curve in
            const radius = 18 * Math.sin(Math.PI * uRatio);
            
            // Standard coordinates formulation
            px = (radius + 6) * Math.cos(petalAngle) + vRatio * width * Math.sin(petalAngle);
            pz = (radius + 6) * Math.sin(petalAngle) - vRatio * width * Math.cos(petalAngle);
            
            // Curve inward at the top tip
            px -= 12 * Math.pow(uRatio, 3) * Math.cos(petalAngle);
            pz -= 12 * Math.pow(uRatio, 3) * Math.sin(petalAngle);
          } else {
            // Fall: Curves downwards and outwards (drooping)
            const length = 120;
            py = 15 + length * Math.pow(uRatio, 2.2) * 0.45;
            
            // Wide flare in outer half
            const width = 38 * Math.sin(Math.PI * uRatio) * (0.4 + uRatio * 0.6);
            const radius = length * uRatio * (1.1 - uRatio * 0.3);
            
            px = radius * Math.cos(petalAngle) + vRatio * width * Math.sin(petalAngle);
            pz = radius * Math.sin(petalAngle) - vRatio * width * Math.cos(petalAngle);
          }
          
          const screenPt = project(px, py, pz);
          pts.push(screenPt);
        }
        
        // Push line segments to mesh array
        for (let i = 0; i < pts.length - 1; i++) {
          const ptA = pts[i];
          const ptB = pts[i + 1];
          if (ptA.visible && ptB.visible) {
            const avgDepth = (ptA.depth + ptB.depth) / 2;
            meshes.push({
              type: 'line',
              x1: ptA.x,
              y1: ptA.y,
              x2: ptB.x,
              y2: ptB.y,
              depth: avgDepth,
              color: isStandard ? accentPurple : accentCyan,
              opacity: 0.16 + (1 - uRatio) * 0.28 // Fades near tips
            });
          }
        }
      }
      
      // Longitudinal rib lines (Base to tip)
      for (let v = 0; v <= vSegments; v += 2) {
        const vRatio = (v / vSegments) * 2 - 1;
        const pts = [];
        for (let u = 0; u <= uSegments; u++) {
          const uRatio = u / uSegments;
          let px = 0, py = 0, pz = 0;
          
          if (isStandard) {
            const length = 110;
            py = -length * Math.pow(uRatio, 1.2);
            const width = 24 * Math.sin(Math.PI * uRatio);
            const radius = 18 * Math.sin(Math.PI * uRatio);
            px = (radius + 6) * Math.cos(petalAngle) + vRatio * width * Math.sin(petalAngle);
            pz = (radius + 6) * Math.sin(petalAngle) - vRatio * width * Math.cos(petalAngle);
            px -= 12 * Math.pow(uRatio, 3) * Math.cos(petalAngle);
            pz -= 12 * Math.pow(uRatio, 3) * Math.sin(petalAngle);
          } else {
            const length = 120;
            py = 15 + length * Math.pow(uRatio, 2.2) * 0.45;
            const width = 38 * Math.sin(Math.PI * uRatio) * (0.4 + uRatio * 0.6);
            const radius = length * uRatio * (1.1 - uRatio * 0.3);
            px = radius * Math.cos(petalAngle) + vRatio * width * Math.sin(petalAngle);
            pz = radius * Math.sin(petalAngle) - vRatio * width * Math.cos(petalAngle);
          }
          
          pts.push(project(px, py, pz));
        }
        
        for (let i = 0; i < pts.length - 1; i++) {
          const ptA = pts[i];
          const ptB = pts[i + 1];
          if (ptA.visible && ptB.visible) {
            const avgDepth = (ptA.depth + ptB.depth) / 2;
            meshes.push({
              type: 'line',
              x1: ptA.x,
              y1: ptA.y,
              x2: ptB.x,
              y2: ptB.y,
              depth: avgDepth,
              color: isStandard ? accentPurple : accentCyan,
              opacity: 0.22
            });
          }
        }
      }
    }
    
    // Core digital nodes
    const coreNodeCount = 18;
    for (let i = 0; i < coreNodeCount; i++) {
      const angle = (i * Math.PI * 2) / coreNodeCount;
      const radius = 14 + Math.sin(i * 3 + yaw * 2) * 3;
      const px = radius * Math.cos(angle);
      const py = Math.cos(i * 5) * 5;
      const pz = radius * Math.sin(angle);
      const pt = project(px, py, pz);
      
      if (pt.visible) {
        meshes.push({
          type: 'circle',
          x: pt.x,
          y: pt.y,
          r: 2.5,
          depth: pt.depth,
          fill: '#ffffff',
          stroke: accentCyan,
          opacity: 0.9
        });
      }
    }
    
    // Concentric glowing core lines
    for (let r = 8; r <= 32; r += 12) {
      const pts = [];
      const steps = 24;
      for (let i = 0; i <= steps; i++) {
        const angle = (i * Math.PI * 2) / steps;
        const px = r * Math.cos(angle);
        const py = 0;
        const pz = r * Math.sin(angle);
        pts.push(project(px, py, pz));
      }
      for (let i = 0; i < pts.length - 1; i++) {
        const ptA = pts[i];
        const ptB = pts[i + 1];
        if (ptA.visible && ptB.visible) {
          meshes.push({
            type: 'line',
            x1: ptA.x,
            y1: ptA.y,
            x2: ptB.x,
            y2: ptB.y,
            depth: (ptA.depth + ptB.depth)/2,
            color: accentPink,
            opacity: 0.4
          });
        }
      }
    }
    
    // Update and draw Particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.z += p.vz;
      p.life -= p.decay;
      
      if (p.life <= 0) {
        resetParticle(p);
      }
      
      const pt = project(p.x, p.y, p.z);
      if (pt.visible) {
        meshes.push({
          type: 'particle',
          x: pt.x,
          y: pt.y,
          r: p.size * (0.4 + p.life * 0.6),
          depth: pt.depth,
          color: p.colorVariant === 'cyan' ? accentCyan : accentPink,
          opacity: p.life * 0.8
        });
      }
    });
    
    // Sort meshes by depth (painters algorithm) to ensure correct layering
    meshes.sort((a, b) => b.depth - a.depth);
    
    // Render sorted elements
    meshes.forEach(item => {
      ctx.globalAlpha = item.opacity;
      if (item.type === 'line') {
        ctx.beginPath();
        ctx.moveTo(item.x1, item.y1);
        ctx.lineTo(item.x2, item.y2);
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      } else if (item.type === 'circle') {
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
        ctx.fillStyle = item.fill;
        ctx.strokeStyle = item.stroke;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
      } else if (item.type === 'particle') {
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
        ctx.fillStyle = item.color;
        
        // Add subtle radial glow filter on canvas for particle elements
        ctx.shadowColor = item.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        
        // Reset shadows to avoid canvas slowdown
        ctx.shadowBlur = 0;
      }
    });
    
    ctx.globalAlpha = 1.0;
    rafId = requestAnimationFrame(draw);
  }
  
  draw();
  initAmbientPetals();

  window.addEventListener('beforeunload', () => {
    if (rafId) cancelAnimationFrame(rafId);
  });
}

// Background Floating Petals & Particles generator
function initAmbientPetals() {
  const container = document.getElementById('background-particles');
  if (!container) return;
  
  const petalCount = 14;
  for (let i = 0; i < petalCount; i++) {
    createPetal(container);
  }
}

function createPetal(container) {
  const petal = document.createElement('div');
  petal.classList.add('ambient-petal');
  
  // Random configurations
  const startX = Math.random() * 100;
  const startY = -10 - Math.random() * 20; // Start offscreen
  const size = 10 + Math.random() * 18;
  const opacity = 0.3 + Math.random() * 0.5;
  const duration = 12 + Math.random() * 20;
  const delay = Math.random() * -20;
  
  petal.style.left = `${startX}vw`;
  petal.style.top = `${startY}vh`;
  petal.style.width = `${size}px`;
  petal.style.height = `${size * 1.5}px`;
  petal.style.opacity = opacity;
  
  // Custom drift path
  const driftX = (Math.random() - 0.5) * 200; // Drift left or right
  
  petal.animate([
    { transform: `translate(0, 0) rotate(0deg)` },
    { transform: `translate(${driftX}px, 115vh) rotate(${360 + Math.random() * 360}deg)` }
  ], {
    duration: duration * 1000,
    delay: delay * 1000,
    iterations: Infinity,
    easing: 'linear'
  });
  
  container.appendChild(petal);
}

/* ==========================================================================
   AI STARTUP STATUS TERMINAL
   ========================================================================== */
const terminalLines = [
  { text: "Initializing FloraMind AI Sandbox Engine...", class: "" },
  { text: "System Kernel: Botanical Neural Core v2.0.4-LTS loaded", class: "success" },
  { text: "Connecting dataset interface: Fischer 1936 Archive (150 samples)", class: "" },
  { text: "Mapping dimensional inputs: [Sepal L, Sepal W, Petal L, Petal W]", class: "" },
  { text: "Compiling decision tree splitting thresholds...", class: "" },
  { text: "Training decision tree classifier model: ENTROPY criterion active", class: "" },
  { text: "Accuracy metrics: Hold-out set validation = 96.67%", class: "success" },
  { text: "Status Sync complete: Systems synchronized", class: "" },
  { text: "System Ready ✓", class: "success" }
];

let terminalIndex = 0;
let isTerminalTyping = false;

function initStatusTerminal() {
  // Setup placeholder
  const terminalContent = document.getElementById('terminal-content');
  if (terminalContent) {
    terminalContent.innerHTML = '<div class="terminal-line">Waiting for startup sync...</div>';
  }
}

function startTerminalTyping() {
  if (isTerminalTyping) return;
  isTerminalTyping = true;
  
  const terminalContent = document.getElementById('terminal-content');
  if (!terminalContent) return;
  
  terminalContent.innerHTML = "";
  terminalIndex = 0;
  
  typeNextTerminalLine();
}

function typeNextTerminalLine() {
  if (terminalIndex >= terminalLines.length) {
    return; // Complete
  }
  
  const terminalContent = document.getElementById('terminal-content');
  const lineData = terminalLines[terminalIndex];
  
  const lineEl = document.createElement('div');
  lineEl.className = 'terminal-line';
  if (lineData.class) {
    lineEl.classList.add(lineData.class);
  }
  terminalContent.appendChild(lineEl);
  
  // Scroll terminal to bottom
  const terminalBody = document.querySelector('.terminal-body');
  if (terminalBody) {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
  
  // Type characters
  typeText(lineEl, lineData.text, 22, () => {
    terminalIndex++;
    // Pause briefly before next line
    setTimeout(typeNextTerminalLine, 400 + Math.random() * 300);
  });
}

/* ==========================================================================
   STATS COUNTERS
   ========================================================================== */
function initStatsCounter() {
  // Counters initialized to 0. Animate once visible.
  document.getElementById('count-samples').textContent = "0";
  document.getElementById('count-species').textContent = "0";
  document.getElementById('count-accuracy').textContent = "0%";
}

function startStatsAnimate() {
  animateCounter('count-samples', 150, 2000, '');
  animateCounter('count-species', 3, 1500, '');
  animateCounter('count-accuracy', 96, 2500, '%');
  
  // Set animations active classes on stat cards to trigger CSS fills
  setTimeout(() => {
    document.querySelectorAll('.stat-card').forEach(card => {
      card.classList.add('animate-in');
    });
  }, 100);
}

function animateCounter(id, target, duration, suffix) {
  const element = document.getElementById(id);
  if (!element) return;
  
  let start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(easeProgress * target);
    
    element.textContent = currentValue + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target + suffix;
    }
  }
  
  requestAnimationFrame(update);
}

/* ==========================================================================
   DATASET SPECIMEN EXPLORER
   ========================================================================== */
function initDatasetTabs() {
  const tabs = document.querySelectorAll('.specimen-tab');
  const cards = document.querySelectorAll('.specimen-detail-card');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const species = tab.getAttribute('data-species');
      
      // Toggle tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Toggle detail cards
      cards.forEach(card => {
        card.classList.remove('active');
        if (card.id === `specimen-${species}-info`) {
          card.classList.add('active');
        }
      });
    });
  });
}

/* ==========================================================================
   BOTANICAL DECISION TREE CLASSIFIER (SANDBOX ENGINE)
   ========================================================================== */
function initClassifierSandbox() {
  const sliderSepalLen = document.getElementById('slide-sepal-len');
  const sliderSepalWid = document.getElementById('slide-sepal-wid');
  const sliderPetalLen = document.getElementById('slide-petal-len');
  const sliderPetalWid = document.getElementById('slide-petal-wid');
  
  if (!sliderSepalLen) return;
  
  // Update numerical indicators
  const valSepalLen = document.getElementById('val-sepal-len');
  const valSepalWid = document.getElementById('val-sepal-wid');
  const valPetalLen = document.getElementById('val-petal-len');
  const valPetalWid = document.getElementById('val-petal-wid');
  
  const sliders = [sliderSepalLen, sliderSepalWid, sliderPetalLen, sliderPetalWid];
  const indicators = [valSepalLen, valSepalWid, valPetalLen, valPetalWid];
  
  sliders.forEach((slider, idx) => {
    slider.addEventListener('input', () => {
      indicators[idx].textContent = parseFloat(slider.value).toFixed(1);
      runDecisionTreeModel();
    });
  });
  
  // Preset buttons
  const presetButtons = document.querySelectorAll('.preset-btn');
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const values = btn.getAttribute('data-preset').split(',').map(parseFloat);
      
      sliderSepalLen.value = values[0];
      sliderSepalWid.value = values[1];
      sliderPetalLen.value = values[2];
      sliderPetalWid.value = values[3];
      
      valSepalLen.textContent = values[0].toFixed(1);
      valSepalWid.textContent = values[1].toFixed(1);
      valPetalLen.textContent = values[2].toFixed(1);
      valPetalWid.textContent = values[3].toFixed(1);
      
      runDecisionTreeModel();
    });
  });
  
  // Set neutral initial state instead of auto-classifying
  resetTreePaths();
  document.getElementById('prediction-title').textContent = 'Awaiting Input...';
  document.getElementById('outcome-symbol').textContent = '🔬';
  document.getElementById('confidence-bar').style.width = '0%';
  document.getElementById('confidence-text').textContent = '--';
  document.getElementById('audit-trail-logs').innerHTML = '<div class="log-row" style="color:var(--text-muted);font-style:italic;">Adjust the sliders or click a preset to begin classification.</div>';

  ['prob-bar-setosa', 'prob-bar-versicolor', 'prob-bar-virginica'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.width = '0%';
  });
  ['prob-val-setosa', 'prob-val-versicolor', 'prob-val-virginica'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '0%';
  });
}

function runDecisionTreeModel() {
  // 1. Gather values
  const sepalLen = parseFloat(document.getElementById('slide-sepal-len').value);
  const sepalWid = parseFloat(document.getElementById('slide-sepal-wid').value);
  const petalLen = parseFloat(document.getElementById('slide-petal-len').value);
  const petalWid = parseFloat(document.getElementById('slide-petal-wid').value);
  
  const logContainer = document.getElementById('audit-trail-logs');
  const timeStr = new Date().toTimeString().split(' ')[0];
  
  let logs = [];
  logs.push(`[${timeStr}] MORPHOLOGY RECEIVED: [SL:${sepalLen}, SW:${sepalWid}, PL:${petalLen}, PW:${petalWid}]`);
  
  // 2. Traversal path markers reset
  resetTreePaths();
  
  let prediction = "";
  let confidence = 0;
  let themeColor = "";
  
  // Node path list
  const activeNodes = ['node-root'];
  const activeConnectors = [];
  
  // 3. Tree Traversal Algorithm
  if (petalLen < 2.45) {
    // Branch LEFT -> Setosa
    prediction = "Iris Setosa";
    activeNodes.push('node-setosa');
    activeConnectors.push('con-root-l');
    
    logs.push(`[${timeStr}] SPLIT ROOT: Petal Length (${petalLen}) < 2.45 cm -> Path LEFT`);
    logs.push(`[${timeStr}] CLASSIFIED: Iris Setosa (Linear Separable Cluster)`);
    
    // Confidence based on distance to 2.45 split
    const distance = 2.45 - petalLen;
    confidence = 90 + Math.min(distance * 8, 9.8);
    themeColor = "pink";
  } else {
    // Branch RIGHT -> Node 2
    activeNodes.push('node-right-branch');
    activeConnectors.push('con-root-r');
    logs.push(`[${timeStr}] SPLIT ROOT: Petal Length (${petalLen}) >= 2.45 cm -> Path RIGHT`);
    
    if (petalWid < 1.75) {
      // Node 2 LEFT -> Node 3
      activeNodes.push('node-petal-len-branch');
      activeConnectors.push('con-node2-l');
      logs.push(`[${timeStr}] SPLIT NODE 2: Petal Width (${petalWid}) < 1.75 cm -> Path LEFT`);
      
      if (petalLen < 4.95) {
        // Node 3 LEFT -> Versicolor
        prediction = "Iris Versicolor";
        activeNodes.push('node-versicolor-final');
        activeConnectors.push('con-node3-l');
        
        logs.push(`[${timeStr}] SPLIT NODE 3: Petal Length (${petalLen}) < 4.95 cm -> Path LEFT`);
        logs.push(`[${timeStr}] CLASSIFIED: Iris Versicolor`);
        
        // Confidence calculation based on boundaries (4.95 and 1.75)
        const d1 = 4.95 - petalLen;
        const d2 = 1.75 - petalWid;
        confidence = 80 + Math.min((d1 + d2) * 6, 18.2);
        themeColor = "cyan";
      } else {
        // Node 3 RIGHT -> Virginica
        prediction = "Iris Virginica";
        activeNodes.push('node-virginica-final');
        activeConnectors.push('con-node3-r');
        
        logs.push(`[${timeStr}] SPLIT NODE 3: Petal Length (${petalLen}) >= 4.95 cm -> Path RIGHT`);
        logs.push(`[${timeStr}] CLASSIFIED: Iris Virginica`);
        
        const d1 = petalLen - 4.95;
        confidence = 80 + Math.min(d1 * 7, 16.5);
        themeColor = "purple";
      }
    } else {
      // Node 2 RIGHT -> Virginica (Direct)
      prediction = "Iris Virginica";
      activeNodes.push('node-virginica-direct');
      activeConnectors.push('con-node2-r');
      
      logs.push(`[${timeStr}] SPLIT NODE 2: Petal Width (${petalWid}) >= 1.75 cm -> Path RIGHT`);
      logs.push(`[${timeStr}] CLASSIFIED: Iris Virginica (Robust Cluster)`);
      
      const distance = petalWid - 1.75;
      confidence = 92 + Math.min(distance * 9, 7.8);
      themeColor = "purple";
    }
  }
  
  // 4. Update SVG styling based on traversal
  activeNodes.forEach(nodeId => {
    const el = document.getElementById(nodeId);
    if (el) el.classList.add('active-node');
  });
  
  activeConnectors.forEach(conId => {
    const el = document.getElementById(conId);
    if (el) el.classList.add('active-branch');
  });
  
  // 5. Update Results panel UI
  const outcomeTitle = document.getElementById('prediction-title');
  const outcomeSymbol = document.getElementById('outcome-symbol');
  const confidenceBar = document.getElementById('confidence-bar');
  const confidenceText = document.getElementById('confidence-text');
  
  outcomeTitle.textContent = prediction;
  confidenceText.textContent = `${confidence.toFixed(1)}%`;
  confidenceBar.style.width = `${confidence}%`;
  
  // Avatar emoji matching
  if (prediction === "Iris Setosa") {
    outcomeSymbol.textContent = "🌸";
    outcomeSymbol.style.textShadow = "0 0 20px rgba(255, 0, 127, 0.4)";
    confidenceBar.style.background = "linear-gradient(90deg, var(--accent-pink), var(--accent-purple))";
  } else if (prediction === "Iris Versicolor") {
    outcomeSymbol.textContent = "💠";
    outcomeSymbol.style.textShadow = "0 0 20px rgba(0, 240, 255, 0.4)";
    confidenceBar.style.background = "linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))";
  } else {
    outcomeSymbol.textContent = "🌿";
    outcomeSymbol.style.textShadow = "0 0 20px rgba(162, 57, 202, 0.4)";
    confidenceBar.style.background = "linear-gradient(90deg, var(--accent-purple), var(--accent-blue))";
  }
  
  // 6. Write logs to audit display panel
  if (logContainer) {
    logContainer.innerHTML = "";
    logs.forEach(log => {
      const logRow = document.createElement('div');
      logRow.classList.add('log-row');
      if (log.includes("CLASSIFIED") || log.includes("Morphoneural")) {
        logRow.classList.add(themeColor);
      }
      logRow.textContent = log;
      logContainer.appendChild(logRow);
    });
    // Scroll logs to bottom
    logContainer.scrollTop = logContainer.scrollHeight;
  }
}

function resetTreePaths() {
  const allNodes = document.querySelectorAll('.tree-node');
  const allConnectors = document.querySelectorAll('.tree-connector');
  
  allNodes.forEach(node => node.classList.remove('active-node'));
  allConnectors.forEach(con => con.classList.remove('active-branch'));
}

/* ==========================================================================
   SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const items = document.querySelectorAll(
    '.reveal-slide-up, .reveal-scale, .reveal-card, .reveal-card-glow'
  );
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Wait custom delay duration if defined
        const delay = entry.target.getAttribute('data-delay');
        if (delay) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, parseInt(delay) * 150);
        } else {
          entry.target.classList.add('active');
        }
        
        // Stop observing once active to prevent layout jittering on scroll back
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  items.forEach(item => observer.observe(item));
}

/* ==========================================================================
   CONTACT FORM SUBMISSION PORTAL
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const overlay = document.getElementById('form-feedback-overlay');
  const closeBtn = document.getElementById('close-feedback-btn');
  const syncRefId = document.getElementById('sync-ref-id');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Extract actual user-entered data
    const nameVal = document.getElementById('form-name').value.trim();
    const emailVal = document.getElementById('form-email').value.trim();
    const subjectVal = document.getElementById('form-subject').value.trim();
    const messageVal = document.getElementById('form-message').value.trim();
    
    if (!nameVal || !emailVal || !subjectVal || !messageVal) return;
    
    // Bind to feedback receipt card elements
    document.getElementById('receipt-name').textContent = nameVal;
    document.getElementById('receipt-email').textContent = emailVal;
    document.getElementById('receipt-subject').textContent = subjectVal;
    document.getElementById('receipt-message').textContent = messageVal;
    
    // Generate synchronization reference code
    const refCode = "FLM-" + Math.floor(10000 + Math.random() * 90000);
    syncRefId.textContent = refCode;
    
    // Submit to configured API endpoint (e.g., Formspree, EmailJS)
    const endpoint = window.__FLORAMIND_ENDPOINT__ || '';
    if (endpoint) {
      try {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: nameVal, email: emailVal, subject: subjectVal, message: messageVal, refCode }),
        });
      } catch {
        console.log('Contact form endpoint unavailable — data logged locally.');
      }
    }
    
    // Display submission overlay screen
    overlay.classList.add('show');
  });
  
  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
    form.reset();
  });
}




