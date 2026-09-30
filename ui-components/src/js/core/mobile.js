
export function initMobileLayout() {
  const mobileContainer = document.getElementById('mobileContainer');
  const mobileSheetsList = document.getElementById('mobileSheetsList');
  if (!mobileContainer || !mobileSheetsList) return;

  mobileSheetsList.innerHTML = '';
  const sections = [
    { id: 'mobile-sec-home', title: 'PROFILE SKETCH', templates: ['home-left-template', 'home-right-template'] },
    { id: 'mobile-sec-skills', title: 'CORE SKILLSETS', templates: ['skills-left-template', 'skills-right-template'] },
    { id: 'mobile-sec-experience', title: 'EXPERIENCE & EDUCATION', templates: ['experience-left-template', 'experience-right-template'] },
    { id: 'mobile-sec-projects', title: 'SELECTED PROJECTS & SHOWCASE', templates: ['projects-left-template', 'projects-right-template'] },
    { id: 'mobile-sec-contact', title: 'CONNECT WITH ME', templates: ['contact-left-template', 'contact-right-template'] }
  ];

  sections.forEach(sec => {
    const sheet = document.createElement('div');
    sheet.className = 'mobile-paper-sheet';
    sheet.id = sec.id;
    
    const margin = document.createElement('div');
    margin.className = 'mobile-paper-sheet-margin-line';
    sheet.appendChild(margin);
    
    const content = document.createElement('div');
    content.className = 'page-content';
    
    let hasTitle = false;
    sec.templates.forEach(t => {
      const tpl = document.getElementById(t);
      if (tpl && tpl.innerHTML.includes('section-title')) hasTitle = true;
    });

    if (!hasTitle && sec.id !== 'mobile-sec-home') {
      const title = document.createElement('h2');
      title.className = 'mobile-sheet-header';
      title.textContent = sec.title;
      content.appendChild(title);
    }
    
    sec.templates.forEach((t, i) => {
      const tpl = document.getElementById(t);
      if (tpl) {
        const wrap = document.createElement('div');
        wrap.innerHTML = tpl.innerHTML;
        content.appendChild(wrap);
        
        if (i < sec.templates.length - 1) {
          const div = document.createElement('div');
          div.className = 'mobile-sheet-divider';
          content.appendChild(div);
        }
      }
    });
    
    sheet.appendChild(content);
    mobileSheetsList.appendChild(sheet);
  });

  const mobileNavDropdown = document.getElementById('mobileNavDropdown');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  
  if (mobileMenuBtn && mobileNavDropdown) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavDropdown.classList.toggle('show');
    });
  }

  // Sync scroll with nav
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const page = id.replace('mobile-sec-', '');
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
          link.classList.toggle('active', link.dataset.page === page);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  document.querySelectorAll('.mobile-paper-sheet').forEach(el => observer.observe(el));
  
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const page = e.target.dataset.page;
      const target = document.getElementById(`mobile-sec-${page}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        if (mobileNavDropdown) mobileNavDropdown.classList.remove('show');
      }
    });
  });
}
