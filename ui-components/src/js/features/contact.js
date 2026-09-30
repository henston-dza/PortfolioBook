import { triggerSubmitSuccess } from '../core/animations.js';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'yFS2XxfkIXd2_o8so';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_portfolio';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_portfolio';

export function initContactForm() {
  // Global submit event listener (delegated)
  document.addEventListener('submit', async (e) => {
    const form = e.target;
    if (!form || (form.id !== 'portfolioContactForm' && !form.matches('#portfolioContactForm'))) {
      return;
    }

    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Send Message';

    const firstName = (form.querySelector('#firstName')?.value || '').trim();
    const lastName = (form.querySelector('#lastName')?.value || '').trim();
    const email = (form.querySelector('#email')?.value || '').trim();
    const contactNo = (form.querySelector('#contactNo')?.value || '').trim();
    const message = (form.querySelector('#message')?.value || '').trim();

    if (!firstName || !lastName || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    // Set loading state on submit button
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending... <span class="spinner" style="display:inline-block; margin-left:6px;">⏳</span>';
    }

    const templateParams = {
      from_name: `${firstName} ${lastName}`,
      first_name: firstName,
      last_name: lastName,
      from_email: email,
      email: email,
      contact_no: contactNo,
      phone: contactNo,
      message: message,
      to_name: 'Henston'
    };

    let emailSent = false;

    try {
      if (window.emailjs) {
        // Ensure emailjs is initialized
        if (typeof window.emailjs.init === 'function') {
          window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        }

        // Send via EmailJS (supports sendForm or send with templateParams)
        try {
          await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
          emailSent = true;
        } catch (emailjsError) {
          console.warn('EmailJS send failed, attempting sendForm fallback:', emailjsError);
          try {
            await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
            emailSent = true;
          } catch (err) {
            console.error('EmailJS sendForm failed:', err);
          }
        }
      }
    } catch (err) {
      console.error('Error during email dispatch:', err);
    }

    // If EmailJS succeeded or if fallback mailto is needed
    if (emailSent) {
      form.reset();
      triggerSubmitSuccess();
    } else {
      // Fallback: If EmailJS service/template is not yet set up, launch mailto client so the mail is sent
      console.warn('EmailJS service ID or template ID might need configuration in EmailJS dashboard. Triggering mailto fallback...');
      const mailtoSubject = encodeURIComponent(`Portfolio Message from ${firstName} ${lastName}`);
      const mailtoBody = encodeURIComponent(
        `Name: ${firstName} ${lastName}\n` +
        `Email: ${email}\n` +
        `Phone: ${contactNo || 'N/A'}\n\n` +
        `Message:\n${message}`
      );
      
      window.location.href = `mailto:henstondsouza388@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      
      form.reset();
      triggerSubmitSuccess();
    }

    // Restore submit button state
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });

  // Global click event listener for success popup close button
  document.addEventListener('click', (e) => {
    if (e.target && (e.target.id === 'successCloseBtn' || e.target.closest('#successCloseBtn'))) {
      const successPopup = document.getElementById('successPopup');
      if (successPopup) {
        successPopup.classList.remove('show');
      }
    }
  });
}
