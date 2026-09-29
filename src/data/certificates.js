/**
 * =========================================================================
 * CERTIFICATES DATA CONFIGURATION
 * =========================================================================
 * Centralized data store for certifications and credentials.
 *
 * HOW TO ADD YOUR REAL CERTIFICATES:
 * 1. Replace the placeholder objects below with your real certificates.
 * 2. Place certificate images or PDFs in `src/assets/certificates/` (or any public URL).
 * 3. Set `image` to your thumbnail image path (PNG, JPG, WEBP, or SVG).
 * 4. Set `file` to your full-resolution image or PDF file path (optional, falls back to `image`).
 * 5. Set `verificationUrl` to your public verification URL (optional, leave empty if none).
 * 6. Set `isPlaceholder: false` once real certificate details are filled in.
 */

export const certificates = [
  {
    id: "cert-1",
    title: "Career Essentials in Generative AI by Microsoft and LinkedIn",
    issuer: "Microsoft and LinkedIn",
    year: "2025",
    date: "October 20, 2025",
    image: "/src/assets/certificates/cert-1.jpeg", // Path to thumbnail image (e.g. '/src/assets/certificates/cert-1.png') or leave empty for scrapbook illustration
    file: "",  // Path to high-res image or PDF (e.g. '/src/assets/certificates/cert-1.pdf')
    description: "Career Essentials in Generative AI — A foundational course by Microsoft and LinkedIn covering generative AI concepts, applications, responsible AI practices, and how AI is transforming modern workplaces and careers",
    verificationUrl: "https://www.linkedin.com/learning/certificates/829666d63abd18ff8a138f112314751d8b568c85c987ebb63d837a5e9c204ee3/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BFhi4S8ryRc2pK%2Fxz7tWWyw%3D%3D", // e.g. "https://www.coursera.org/verify/..." (Leave empty if none)
    badgeText: "Verified",
    isPlaceholder: false
  },
  {
    id: "cert-2",
    title: "[Certificate Title 2 - e.g. Machine Learning & AI Foundations]",
    issuer: "[Issuing Organization - e.g. DeepLearning.AI / Stanford Online]",
    year: "2024",
    date: "[Issue Date - e.g. July 2024]",
    image: "",
    file: "",
    description: "[Placeholder Description: Core principles of supervised & unsupervised learning, deep neural network architectures, model evaluation metrics, and practical machine learning deployment.]",
    verificationUrl: "",
    badgeText: "Verified",
    isPlaceholder: true
  },
  {
    id: "cert-3",
    title: "Software Engineer Intern",
    issuer: "HackerRank",
    year: "2026",
    date: "26 Jul 2026",
    image: "/src/assets/certificates/cert-3.png",
    file: "",
    description: "Achieved an average score of 90% across all tracks in the HackerRank Coding Challenge, demonstrating proficiency in data structures, algorithms, problem-solving, and software engineering best practices.",
    verificationUrl: "https://www.hackerrank.com/certificates/91c3342a54f9",
    badgeText: "Honors",
    isPlaceholder: false
  },
  {
    id: "cert-4",
    title: "Introduction to MongoDB",
    issuer: "MongoDB",
    year: "2024",
    date: "Nov 2024",
    image: "/src/assets/certificates/cert-4.png",
    file: "",
    description: "Explore the fundamentals of MongoDB and learn how to design and build document databases for real-world applications",
    verificationUrl: "https://ti-user-certificates.s3.us-east-1.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/07580716-0b1f-4dc0-8d12-5995e7654290-henston-dsouza-c4a1bd17-bb91-4060-9f93-c1fedfa3c423-certificate.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAJPREDE4LLNE2GD6Q%2F20260918%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260918T125741Z&X-Amz-Expires=900&X-Amz-Signature=4f9728b739c66f53a56a2dd880ec44beaaaa8aaa9e981b746c3a12d9beee3d7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
    badgeText: "Certified",
    isPlaceholder: false
  },
  {
    id: "cert-5",
    title: "Artificial Intelligence for All",
    issuer: "Infosys Springboard",
    year: "2026",
    date: "12 Feb 2026",
    image: "/src/assets/certificates/cert-5.png",
    file: "",
    description: "Artificial Intelligence for All — An introductory program by Infosys Springboard that demystifies AI concepts, explores real-world applications, and introduces responsible AI practices",
    verificationUrl: "https://verify.onwingspan.com/",
    badgeText: "Certified",
    isPlaceholder: false
  }
];

/**
 * Generates an authentic-looking physical SVG certificate preview
 * used when no custom image file has been uploaded yet.
 * Styled with traditional ornate borders, gold seal, and calligraphy details.
 */
export function generateCertificateSvg(cert, options = { width: 800, height: 560 }) {
  const { width, height } = options;
  const isPlaceholder = cert.isPlaceholder;
  const title = cert.title.replace(/^\[|\]$/g, '');
  const issuer = cert.issuer.replace(/^\[|\]$/g, '');
  const date = cert.date.replace(/^\[|\]$/g, '');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" class="cert-svg-graphic" style="display:block; background:#fcfaf5;">
      <defs>
        <!-- Paper Texture Filter -->
        <filter id="certPaperNoise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feColorMatrix type="matrix" values="1 0 0 0 0.98  0 1 0 0 0.96  0 0 1 0 0.92  0 0 0 0.08 0" />
          <feBlend in="SourceGraphic" mode="multiply" />
        </filter>
        <!-- Linear Gold Gradient for Seal -->
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b" />
          <stop offset="50%" stop-color="#fbbf24" />
          <stop offset="100%" stop-color="#b45309" />
        </linearGradient>
        <!-- Guilloche Pattern Border -->
        <pattern id="guillochePattern" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="8" fill="none" stroke="#e2d9c8" stroke-width="0.75" />
        </pattern>
      </defs>

      <!-- Background Paper -->
      <rect x="0" y="0" width="${width}" height="${height}" fill="#fbf8f1" />
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#guillochePattern)" opacity="0.35" />

      <!-- Ornate Double Outer Borders -->
      <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="none" stroke="#2c2824" stroke-width="3" />
      <rect x="28" y="28" width="${width - 56}" height="${height - 56}" fill="none" stroke="#b45309" stroke-width="1.2" stroke-dasharray="4,2" />
      <rect x="34" y="34" width="${width - 68}" height="${height - 68}" fill="none" stroke="#2c2824" stroke-width="1" />

      <!-- Corner Ornaments -->
      <g stroke="#2c2824" stroke-width="1.5" fill="none">
        <!-- Top-Left -->
        <path d="M 28 50 L 50 28 M 28 60 L 60 28 M 38 38 L 48 48" />
        <!-- Top-Right -->
        <path d="M ${width - 28} 50 L ${width - 50} 28 M ${width - 28} 60 L ${width - 60} 28 M ${width - 38} 38 L ${width - 48} 48" />
        <!-- Bottom-Left -->
        <path d="M 28 ${height - 50} L 50 ${height - 28} M 28 ${height - 60} L 60 ${height - 28} M 38 ${height - 38} L 48 ${height - 48}" />
        <!-- Bottom-Right -->
        <path d="M ${width - 28} ${height - 50} L ${width - 50} ${height - 28} M ${width - 28} ${height - 60} L ${width - 60} ${height - 28} M ${width - 38} ${height - 38} L ${width - 48} ${height - 48}" />
      </g>

      <!-- Certificate Header -->
      <text x="${width / 2}" y="85" text-anchor="middle" font-family="'Architects Daughter', cursive, sans-serif" font-size="16" letter-spacing="4" fill="#854d0e" font-weight="bold">
        OFFICIAL CREDENTIAL &amp; MERIT RECORD
      </text>

      <text x="${width / 2}" y="125" text-anchor="middle" font-family="'Georgia', serif" font-size="28" letter-spacing="2" fill="#1c1917" font-weight="bold">
        CERTIFICATE OF ACHIEVEMENT
      </text>

      <line x1="${width / 2 - 120}" y1="140" x2="${width / 2 + 120}" y2="140" stroke="#b45309" stroke-width="1.5" />
      <circle cx="${width / 2}" cy="140" r="3.5" fill="#b45309" />

      <!-- Presentation Text -->
      <text x="${width / 2}" y="175" text-anchor="middle" font-family="'Inter', sans-serif" font-size="14" fill="#57534e" font-style="italic">
        This certificate is proudly awarded in recognition of successfully completing
      </text>

      <!-- Certificate Title -->
      <text x="${width / 2}" y="225" text-anchor="middle" font-family="'Architects Daughter', 'Inter', cursive, sans-serif" font-size="23" font-weight="bold" fill="#18181b">
        ${title}
      </text>
      <line x1="120" y1="245" x2="${width - 120}" y2="245" stroke="#d6d3d1" stroke-width="1" />

      <!-- Issuing Organization Text -->
      <text x="${width / 2}" y="280" text-anchor="middle" font-family="'Inter', sans-serif" font-size="13" fill="#78716c">
        AUTHORIZED &amp; ISSUED BY
      </text>

      <text x="${width / 2}" y="315" text-anchor="middle" font-family="'Georgia', serif" font-size="20" font-weight="bold" fill="#292524">
        ${issuer}
      </text>

      <!-- Gold Wax Seal (Bottom Left Center) -->
      <g transform="translate(140, 410)">
        <!-- Ribbon Tails -->
        <path d="M -15 25 L -25 75 L 0 60 L 25 75 L 15 25 Z" fill="#b45309" opacity="0.85" />
        <circle cx="0" cy="0" r="42" fill="url(#goldGradient)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))" />
        <circle cx="0" cy="0" r="36" fill="none" stroke="#78350f" stroke-width="1.5" stroke-dasharray="3,2" />
        <polygon points="0,-18 5,-5 19,-5 8,4 12,18 0,9 -12,18 -8,4 -19,-5 -5,-5" fill="#78350f" />
        <text x="0" y="24" text-anchor="middle" font-family="'Inter', sans-serif" font-size="8" font-weight="bold" fill="#78350f" letter-spacing="1">VERIFIED</text>
      </g>

      <!-- Signature & Date Section (Right) -->
      <g transform="translate(${width - 240}, 410)">
        <!-- Signature Line -->
        <path d="M -70 -10 Q -30 -35 0 -5 T 50 -20 T 70 -5" fill="none" stroke="#1c1917" stroke-width="1.8" />
        <line x1="-80" y1="5" x2="80" y2="5" stroke="#78716c" stroke-width="1" />
        <text x="0" y="22" text-anchor="middle" font-family="'Inter', sans-serif" font-size="11" fill="#78716c">
          Authorized Signature
        </text>
        <!-- Date Line -->
        <text x="0" y="44" text-anchor="middle" font-family="'Architects Daughter', cursive" font-size="13" font-weight="bold" fill="#1c1917">
          Date: ${date || '2024'}
        </text>
      </g>

      ${isPlaceholder ? `
      <!-- Placeholder Banner Notification -->
      <g transform="translate(${width / 2}, ${height - 55})">
        <rect x="-180" y="-14" width="360" height="24" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,2" />
        <text x="0" y="2" text-anchor="middle" font-family="'Inter', sans-serif" font-size="10.5" font-weight="600" fill="#92400e">
          ✎ PLACEHOLDER ENTRY — Replace in certificates.js
        </text>
      </g>
      ` : ''}
    </svg>
  `.trim();
}
