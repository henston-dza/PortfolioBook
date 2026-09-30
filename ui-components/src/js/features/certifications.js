import { certificates, generateCertificateSvg } from '../../data/certificates.js';

let activeCertId = certificates.length > 0 ? certificates[0].id : null;
let isCertInitialized = false;

/**
 * Returns thumbnail media markup for a certificate.
 * Uses custom image if provided, else generates the authentic physical SVG certificate preview.
 */
export function getCertificateThumbnailMarkup(cert) {
  if (cert.image && cert.image.trim() !== '') {
    return `<img src="${cert.image}" alt="${escapeHtml(cert.title)}" loading="lazy" />`;
  }
  return generateCertificateSvg(cert, { width: 480, height: 330 });
}

/**
 * Returns large media preview markup for a certificate (used in right page and modal).
 */
export function getCertificateLargeMediaMarkup(cert) {
  if (cert.file && cert.file.trim().endsWith('.pdf')) {
    return `<iframe src="${cert.file}#toolbar=0" title="${escapeHtml(cert.title)}"></iframe>`;
  }
  if (cert.file && cert.file.trim() !== '') {
    return `<img src="${cert.file}" alt="${escapeHtml(cert.title)}" loading="lazy" />`;
  }
  if (cert.image && cert.image.trim() !== '') {
    return `<img src="${cert.image}" alt="${escapeHtml(cert.title)}" loading="lazy" />`;
  }
  return generateCertificateSvg(cert, { width: 800, height: 550 });
}

/**
 * Renders the scrapbook cards gallery for the left page.
 */
export function renderCertificatesGallery() {
  return certificates.map((cert, index) => {
    const isActive = cert.id === activeCertId;
    
    let attachmentMarkup = '';
    if (index % 2 === 0) {
      attachmentMarkup = '<div class="scrapbook-tape tape-yellow" aria-hidden="true"></div>';
    } else {
      attachmentMarkup = '<div class="scrapbook-tape tape-pink" aria-hidden="true"></div>';
    }

    const titleDisplay = cert.title.replace(/^\[|\]$/g, '');
    const issuerDisplay = cert.issuer.replace(/^\[|\]$/g, '');

    return `
      <div class="cert-scrapbook-card ${isActive ? 'active' : ''}" 
           data-cert-id="${cert.id}" 
           tabindex="0" 
           role="button" 
           aria-pressed="${isActive}"
           aria-label="Inspect ${escapeHtml(titleDisplay)} from ${escapeHtml(issuerDisplay)}">
        ${attachmentMarkup}
        <div class="cert-thumb-preview">
          ${getCertificateThumbnailMarkup(cert)}
        </div>
        <div class="cert-card-info">
          <h4 class="cert-card-title">${escapeHtml(titleDisplay)}</h4>
          <div class="cert-card-meta">
            <span class="cert-card-issuer" title="${escapeHtml(issuerDisplay)}">${escapeHtml(issuerDisplay)}</span>
            <span class="cert-card-year">${escapeHtml(cert.year)}</span>
          </div>
          <div class="cert-card-click-hint">
            <span>Inspect</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 17l9.2-9.2M17 17V8H8"/>
            </svg>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Renders the selected certificate preview for the right page.
 */
export function renderCertificatePreview(cert) {
  if (!cert) return '';

  const titleDisplay = cert.title.replace(/^\[|\]$/g, '');
  const issuerDisplay = cert.issuer.replace(/^\[|\]$/g, '');
  const dateDisplay = cert.date.replace(/^\[|\]$/g, '');
  const descDisplay = cert.description.replace(/^\[|\]$/g, '');

  const hasVerifyUrl = cert.verificationUrl && cert.verificationUrl.trim() !== '';

  return `
    <div class="cert-preview-board">
      <div class="tape-top-left" aria-hidden="true"></div>
      <div class="tape-top-right" aria-hidden="true"></div>

      <!-- Large Interactive Certificate Frame -->
      <div class="cert-large-preview-frame" 
           data-cert-id="${cert.id}" 
           title="Click to view full certificate in lightbox"
           role="button"
           tabindex="0"
           aria-label="Click to enlarge ${escapeHtml(titleDisplay)}">
        ${getCertificateLargeMediaMarkup(cert)}
        <div class="cert-zoom-overlay">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <span>Enlarge</span>
        </div>
      </div>

      <!-- Details Content -->
      <div class="cert-detail-body">
        <h3 class="cert-detail-title">${escapeHtml(titleDisplay)}</h3>
        
        <div class="cert-detail-meta-row">
          <span class="cert-pill cert-pill-issuer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
            ${escapeHtml(issuerDisplay)}
          </span>

          <span class="cert-pill cert-pill-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${escapeHtml(dateDisplay)}
          </span>

          ${cert.badgeText ? `
            <span class="cert-pill cert-pill-badge">
              ★ ${escapeHtml(cert.badgeText)}
            </span>
          ` : ''}
        </div>

        <div class="cert-detail-desc">
          ${escapeHtml(descDisplay)}
        </div>

        <div class="cert-actions-row">
          <button type="button" 
                  class="cert-view-btn" 
                  id="certViewModalBtn" 
                  data-cert-id="${cert.id}"
                  aria-label="Open full certificate in lightbox">
            <span>View Certificate</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </button>

          ${hasVerifyUrl ? `
            <a href="${escapeHtml(cert.verificationUrl)}" 
               target="_blank" 
               rel="noopener noreferrer" 
               class="cert-verify-link"
               aria-label="Verify credential externally">
              <span>Verify Credential</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </a>
          ` : ''}
        </div>
      </div>

      <!-- Scrapbook Decorative Official Stamp -->
      <div class="cert-stamp-badge" aria-hidden="true">
        <span>AUTHENTIC</span>
        <span style="font-size: 0.8rem; margin: 2px 0;">★ ★ ★</span>
        <span>RECORD</span>
      </div>
    </div>
  `;
}

/**
 * Injects dynamically generated HTML into the certifications templates
 * so they are immediately ready for portfolio book page-turns and mobile layout.
 */
export function populateCertTemplates() {
  const leftTpl = document.getElementById('certifications-left-template');
  const rightTpl = document.getElementById('certifications-right-template');

  if (leftTpl) {
    leftTpl.innerHTML = `
      <div class="portfolio-page cert-left-page">
        <div class="cert-header-area">
          <h2 class="section-title">CERTIFICATIONS</h2>
          <p class="cert-subtitle">Proof of continuous learning</p>
        </div>
        <div class="cert-gallery-grid" id="certGalleryGrid">
          ${renderCertificatesGallery()}
        </div>
        <div class="cert-scrapbook-note">
          <span class="note-pin">📌</span>
          <span class="note-text">Select any certificate thumbnail to inspect details &amp; verify credential.</span>
        </div>
      </div>
    `;
  }

  if (rightTpl) {
    const initialCert = certificates.find(c => c.id === activeCertId) || certificates[0];
    rightTpl.innerHTML = `
      <div class="portfolio-page cert-right-page">
        <div class="cert-right-header">
          <h2 class="section-title">CREDENTIAL DETAILS</h2>
        </div>
        <div class="cert-preview-board-container" id="certPreviewBoard">
          ${renderCertificatePreview(initialCert)}
        </div>
      </div>
    `;
  }
}

/**
 * Updates the right page preview board with subtle paper transition.
 */
export function selectCertificate(certId) {
  const cert = certificates.find(c => c.id === certId);
  if (!cert) return;

  activeCertId = certId;

  // Update active state on thumbnail cards
  document.querySelectorAll('.cert-scrapbook-card').forEach(card => {
    const isTarget = card.dataset.certId === certId;
    card.classList.toggle('active', isTarget);
    card.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
  });

  // Update right preview containers
  const previewBoards = document.querySelectorAll('.cert-preview-board-container, #certPreviewBoard');
  previewBoards.forEach(board => {
    board.style.opacity = '0.35';
    board.style.transition = 'opacity 0.18s ease-in-out';
    setTimeout(() => {
      board.innerHTML = renderCertificatePreview(cert);
      board.style.opacity = '1';
      if (window.lucide) window.lucide.createIcons();
    }, 180);
  });
}

/**
 * Opens the high-resolution lightbox modal.
 */
export function openCertificateModal(certId) {
  const cert = certificates.find(c => c.id === certId) || certificates[0];
  if (!cert) return;

  const modal = document.getElementById('certModal');
  const modalBody = document.getElementById('certModalBody');
  const modalTitle = document.getElementById('certModalTitle');
  const modalMeta = document.getElementById('certModalMeta');
  const modalActions = document.getElementById('certModalActions');

  if (!modal || !modalBody) return;

  const titleDisplay = cert.title.replace(/^\[|\]$/g, '');
  const issuerDisplay = cert.issuer.replace(/^\[|\]$/g, '');
  const dateDisplay = cert.date.replace(/^\[|\]$/g, '');

  modalTitle.textContent = titleDisplay;
  modalMeta.textContent = `${issuerDisplay} • ${dateDisplay}`;

  modalBody.innerHTML = `
    <div class="cert-modal-media-wrapper">
      ${getCertificateLargeMediaMarkup(cert)}
    </div>
  `;

  // Render actions in modal footer
  if (modalActions) {
    let actionsHTML = '';
    if (cert.verificationUrl && cert.verificationUrl.trim() !== '') {
      actionsHTML += `
        <a href="${escapeHtml(cert.verificationUrl)}" target="_blank" rel="noopener noreferrer" class="cert-verify-link" style="padding: 0.4rem 0.9rem; font-size: 0.82rem;">
          Verify Credential ↗
        </a>
      `;
    }
    if (cert.file && cert.file.trim() !== '') {
      actionsHTML += `
        <a href="${escapeHtml(cert.file)}" target="_blank" download class="cert-view-btn" style="padding: 0.4rem 0.9rem; font-size: 0.82rem;">
          Download / Open ↗
        </a>
      `;
    }
    modalActions.innerHTML = actionsHTML;
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('cert-modal-locked');

  // Focus the close button for accessibility
  const closeBtn = document.getElementById('certModalClose');
  if (closeBtn) closeBtn.focus();
}

/**
 * Closes the lightbox modal.
 */
export function closeCertificateModal() {
  const modal = document.getElementById('certModal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('cert-modal-locked');
}

/**
 * Global event delegation setup.
 * Handles card clicks, preview enlargement, modal open/close, and ESC key.
 */
export function initCertifications() {
  if (isCertInitialized) return;
  isCertInitialized = true;

  // Delegated click handler
  document.addEventListener('click', (e) => {
    // 1. Click on a certificate scrapbook thumbnail
    const card = e.target.closest('.cert-scrapbook-card');
    if (card) {
      const certId = card.dataset.certId;
      if (certId) {
        selectCertificate(certId);
      }
      return;
    }

    // 2. Click "View Certificate" button or the large preview image
    const viewTrigger = e.target.closest('#certViewModalBtn, .cert-large-preview-frame, .cert-modal-trigger');
    if (viewTrigger) {
      const certId = viewTrigger.dataset.certId || activeCertId;
      openCertificateModal(certId);
      return;
    }

    // 3. Click Modal Close button or Modal Backdrop
    if (e.target.closest('#certModalClose') || e.target.closest('#certModalBackdrop')) {
      closeCertificateModal();
      return;
    }
  });

  // Delegated keyboard handling (Enter / Space to select or open, ESC to close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('certModal');
      if (modal && modal.classList.contains('open')) {
        closeCertificateModal();
      }
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      const activeElement = document.activeElement;
      if (activeElement && activeElement.classList.contains('cert-scrapbook-card')) {
        e.preventDefault();
        const certId = activeElement.dataset.certId;
        if (certId) selectCertificate(certId);
      } else if (activeElement && activeElement.classList.contains('cert-large-preview-frame')) {
        e.preventDefault();
        const certId = activeElement.dataset.certId || activeCertId;
        openCertificateModal(certId);
      }
    }
  });
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
