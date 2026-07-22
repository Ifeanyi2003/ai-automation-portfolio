// ============ ICON FALLBACK (Tech Stack) ============
function handleIconError(img) {
  const label = img.getAttribute('alt') || '?';
  const initials = label
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const badge = document.createElement('div');
  badge.className = 'stack-icon-fallback';
  badge.textContent = initials;

  img.replaceWith(badge);
}

// ============ NAVBAR: glass effect on scroll ============
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll);
handleNavbarScroll();

// ============ MOBILE MENU TOGGLE ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ============ TYPING ANIMATION ============
const typedTextEl = document.getElementById('typedText');

const roles = [
  'AI Automation Engineer',
  'Workflow Architect',
  'AI Systems Builder',
  'Business Automation Specialist',
  'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentRole = roles[roleIndex];

  if (isDeleting) { charIndex--; } else { charIndex++; }

  typedTextEl.textContent = currentRole.substring(0, charIndex);

  let speed = isDeleting ? 40 : 90;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 1400;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeLoop, speed);
}

typeLoop();

// ============ FLOATING BACKGROUND PARTICLES ============
const particlesContainer = document.getElementById('particles');
const PARTICLE_COUNT = 35;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const particle = document.createElement('span');
  particle.className = 'particle';

  const left = Math.random() * 100;
  const duration = 12 + Math.random() * 14;
  const delay = Math.random() * 14;
  const size = 2 + Math.random() * 2;

  particle.style.left = `${left}%`;
  particle.style.bottom = `-10px`;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `${delay}s`;

  particlesContainer.appendChild(particle);
}

// ============ ACTIVE NAV LINK ON SCROLL ============
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navAnchors.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ============ STAT COUNTER ANIMATION ============
const statNumbers = document.querySelectorAll('.stat-number');

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1400;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value + suffix;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target + suffix;
    }
  }

  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

statNumbers.forEach(stat => statObserver.observe(stat));

// ============ SLIDE-IN-FROM-LEFT REVEAL ============
const revealCards = document.querySelectorAll('.stat-card, .pillar-card, .system-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealCards.forEach(card => revealObserver.observe(card));

// ============ PROJECT CASE STUDY MODAL ============
const projectData = {
  gym: {
    title: 'Gym Membership Automation System',
    tags: ['n8n', 'Automation'],
    problem: "Titan Fitness Academy struggled to manually track member subscriptions and send renewal reminders on time. Staff spent hours every week on tasks that still resulted in members cancelling due to lack of follow-up.",
    solution: "I built a fully automated membership management system using n8n that tracks subscriptions, sends personalised renewal reminders, and automatically confirms reactivations — all without any manual work from staff.",
    results: [
      'Fully automated renewal reminders',
      'Zero manual staff intervention',
      'Reduced membership churn'
    ],
    images: [
      'images/gym-automation-1.png',
      'images/gym-automation-2.png',
      'images/gym-automation-3.png'
    ],
    video: null
  },
  oakwood: {
    title: 'AI WhatsApp Assistant — Oakwood International School',
    tags: ['n8n', 'Gemini', 'Pinecone', 'Twilio'],
    problem: "Oakwood International School was struggling to handle the high volume of daily enquiries from parents and prospective students via WhatsApp. Support agents were overwhelmed, response times were slow, and enquiries went unanswered when agents were busy — creating a poor first impression.",
    solution: "I built an AI-powered WhatsApp assistant using n8n, Google Gemini, Pinecone, and Twilio. It answers admissions, fee, and academic programme questions using a RAG knowledge base fed directly from the school's own Google Drive documents. When it can't answer, it hands off smoothly to a human agent and sends a Tally form to capture enquirer details, so no enquiry is ever lost. The system runs 24/7 with zero manual intervention.",
    results: [
      'No enquiry ever lost',
      '24/7 automated coverage',
      'Smooth AI-to-human handover'
    ],
    images: [
      'images/whatsapp-oakwood-1.png',
      'images/whatsapp-oakwood-2.png',
      'images/whatsapp-oakwood-3.png'
    ],
    video: null
  },
  mamatee: {
    title: "Mama Tee's Kitchen AI Voice Automation System",
    tags: ['Vapi', 'n8n', 'Airtable'],
    problem: "Mama Tee's Kitchen struggled with a high volume of routine phone calls during peak rush hours. Front-of-house staff were overwhelmed by calls about hours, reservations, and orders, leading to slow service and missed revenue. Manual logging on paper or spreadsheets caused transcription errors and no long-term customer tracking.",
    solution: "I built an end-to-end autonomous AI Voice Assistant using Vapi, n8n, and Airtable. The voice agent manages incoming calls, handles food orders, captures reservations, and filters customer care escalations 24/7 without human intervention — using AI transcription and structured data extraction to route clean records into Airtable, cross-referencing returning customers automatically.",
    results: [
      '24/7 autonomous call handling',
      'Zero transcription errors',
      'Automatic returning-customer recognition'
    ],
    images: [
      'images/voice-assistant-1.png',
      'images/voice-assistant-2.png',
      'images/voice-assistant-3.png',
      'images/voice-assistant-4.png',
      'images/voice-assistant-5.png',
      'images/voice-assistant-6.png'
    ],
    video: null
  },
  cvscreening: {
    title: 'AI-Powered CV Screening System — Recruitment Automation',
    tags: ['n8n', 'Lovable', 'Gemini', 'Google Sheets'],
    problem: "Recruiting teams are drowning in CVs. Applications flood in and someone spends days manually reading through hundreds of documents, with reviewer fatigue causing good candidates to be missed and rejected candidates left waiting weeks for a response.",
    solution: "I built an end-to-end CV screening system with two layers: a backend n8n automation pipeline that extracts candidate information, scores it against job requirements using Google Gemini, ranks it, and stores it in Google Sheets — zero manual input; and a frontend recruiter dashboard built on Lovable, where recruiters see every candidate pre-ranked with an AI summary and make a one-click Confirm or Reject decision that instantly notifies the candidate.",
    results: [
      'Shortlisting time cut from hours to minutes',
      'Zero CVs missed — every application processed',
      'Every candidate receives a response, no ghosting'
    ],
    images: [
      'images/cv-screening-1.png',
      'images/cv-screening-2.png',
      'images/cv-screening-3.png',
      'images/cv-screening-4.png',
      'images/cv-screening-5.png',
      'images/cv-screening-6.png',
      'images/cv-screening-7.png'
    ],
    video: 'videos/cv-screening-demo.mp4'
  }
};

const projectModal = document.getElementById('projectModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalTags = document.getElementById('modalTags');
const modalProblem = document.getElementById('modalProblem');
const modalSolution = document.getElementById('modalSolution');
const modalResultsList = document.getElementById('modalResultsList');
const modalVideo = document.getElementById('modalVideo');
const videoTabBtn = document.getElementById('videoTabBtn');

const galleryImage = document.getElementById('galleryImage');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const galleryCounter = document.getElementById('galleryCounter');
const galleryDots = document.getElementById('galleryDots');

const modalTabs = document.querySelectorAll('.modal-tab');
const modalPanels = document.querySelectorAll('.modal-panel');

let currentImages = [];
let currentIndex = 0;

function renderDots() {
  galleryDots.innerHTML = currentImages
    .map((_, i) => `<button class="gallery-dot${i === currentIndex ? ' active' : ''}" data-index="${i}" aria-label="Go to screenshot ${i + 1}"></button>`)
    .join('');

  galleryDots.querySelectorAll('.gallery-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.getAttribute('data-index'), 10);
      updateGallery();
    });
  });
}

function updateGallery() {
  galleryImage.src = currentImages[currentIndex];
  galleryCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  galleryPrev.disabled = currentImages.length <= 1;
  galleryNext.disabled = currentImages.length <= 1;
  renderDots();
}

function switchTab(tabName) {
  modalTabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
  });
  modalPanels.forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-${tabName}`);
  });

  if (tabName !== 'video') {
    modalVideo.pause();
  }
}

modalTabs.forEach(tab => {
  tab.addEventListener('click', () => switchTab(tab.getAttribute('data-tab')));
});

function openProjectModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  modalTitle.textContent = project.title;

  modalTags.innerHTML = project.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join('');

  modalProblem.textContent = project.problem;
  modalSolution.textContent = project.solution;

  modalResultsList.innerHTML = project.results
    .map(r => `<li><i class="fa-solid fa-check"></i> ${r}</li>`)
    .join('');

  currentImages = project.images;
  currentIndex = 0;
  updateGallery();

  if (project.video) {
    videoTabBtn.style.display = 'inline-block';
    modalVideo.src = project.video;
  } else {
    videoTabBtn.style.display = 'none';
    modalVideo.src = '';
  }

  switchTab('overview');

  projectModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModal.classList.remove('open');
  document.body.style.overflow = '';
  modalVideo.pause();
}

document.querySelectorAll('.system-card').forEach(card => {
  card.addEventListener('click', () => {
    const projectKey = card.getAttribute('data-project');
    openProjectModal(projectKey);
  });
});

modalClose.addEventListener('click', closeProjectModal);
modalBackdrop.addEventListener('click', closeProjectModal);

galleryPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateGallery();
});

galleryNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateGallery();
});

document.addEventListener('keydown', (e) => {
  if (!projectModal.classList.contains('open')) return;

  if (e.key === 'Escape') closeProjectModal();
  if (e.key === 'ArrowLeft') galleryPrev.click();
  if (e.key === 'ArrowRight') galleryNext.click();
});

// ============ CONTACT FORM (Formspree, AJAX submit) ============
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = "Message sent! I'll get back to you soon.";
        formStatus.classList.add('success');
        contactForm.reset();
      } else {
        formStatus.textContent = 'Something went wrong. Please try again or email me directly.';
        formStatus.classList.add('error');
      }
    } catch (error) {
      formStatus.textContent = 'Network error. Please check your connection and try again.';
      formStatus.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitText.textContent = 'Send Message';
    }
  });
}

// ============ FOOTER: dynamic year + back to top ============
const currentYearEl = document.getElementById('currentYear');
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============ ROI CALCULATOR (interactive demo) ============
const teamSizeInput = document.getElementById('teamSize');
const hoursPerWeekInput = document.getElementById('hoursPerWeek');
const hourlyCostInput = document.getElementById('hourlyCost');
const automationLevelInput = document.getElementById('automationLevel');

const teamSizeValue = document.getElementById('teamSizeValue');
const hoursPerWeekValue = document.getElementById('hoursPerWeekValue');
const hourlyCostValue = document.getElementById('hourlyCostValue');
const automationLevelValue = document.getElementById('automationLevelValue');

const hoursSavedMonthEl = document.getElementById('hoursSavedMonth');
const moneySavedMonthEl = document.getElementById('moneySavedMonth');
const moneySavedYearEl = document.getElementById('moneySavedYear');

function formatCurrency(num) {
  return '$' + Math.round(num).toLocaleString('en-US');
}

function calculateROI() {
  const teamSize = parseInt(teamSizeInput.value, 10);
  const hoursPerWeek = parseInt(hoursPerWeekInput.value, 10);
  const hourlyCost = parseInt(hourlyCostInput.value, 10);
  const automationLevel = parseInt(automationLevelInput.value, 10) / 100;

  // Update the live labels next to each slider
  teamSizeValue.textContent = teamSize;
  hoursPerWeekValue.textContent = hoursPerWeek;
  hourlyCostValue.textContent = hourlyCost;
  automationLevelValue.textContent = Math.round(automationLevel * 100);

  // Core calculation
  const totalWeeklyHours = teamSize * hoursPerWeek;
  const hoursAutomatedPerWeek = totalWeeklyHours * automationLevel;
  const hoursAutomatedPerMonth = hoursAutomatedPerWeek * 4.33; // avg weeks/month

  const moneySavedPerMonth = hoursAutomatedPerMonth * hourlyCost;
  const moneySavedPerYear = moneySavedPerMonth * 12;

  // Update result display
  hoursSavedMonthEl.textContent = Math.round(hoursAutomatedPerMonth).toLocaleString('en-US');
  moneySavedMonthEl.textContent = formatCurrency(moneySavedPerMonth);
  moneySavedYearEl.textContent = formatCurrency(moneySavedPerYear);
}

if (teamSizeInput) {
  [teamSizeInput, hoursPerWeekInput, hourlyCostInput, automationLevelInput].forEach(input => {
    input.addEventListener('input', calculateROI);
  });

  calculateROI(); // run once on load so numbers aren't blank
}