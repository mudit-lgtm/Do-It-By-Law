// ========================================
// ANALYTICS & EVENT TRACKING
// Google Analytics 4 Compatible
// ========================================

// Global event tracking function
window.trackEvent = function(eventName, ...params) {
  // Google Analytics 4
  if (typeof gtag === 'function') {
    gtag('event', eventName, {
      event_category: params[0] || 'general',
      event_label: params[1] || '',
      value: params[2] || 0
    });
  }
  
  // Console log for development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('📊 Event tracked:', eventName, params);
  }
};

// Track page views on load
document.addEventListener('DOMContentLoaded', function() {
  const pageName = document.title;
  const pagePath = window.location.pathname;
  
  if (window.trackEvent) {
    window.trackEvent('page_view', pageName, pagePath);
  }
  
  // Log page view in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('📄 Page view:', pageName, pagePath);
  }
});

// Track outbound links
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  
  if (link && link.href && !link.href.includes(window.location.hostname)) {
    if (window.trackEvent) {
      window.trackEvent('outbound_click', link.href);
    }
    
    // Log in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('🔗 Outbound click:', link.href);
    }
  }
});

// Track internal navigation clicks
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  
  if (link && link.href && link.href.includes(window.location.hostname)) {
    const linkText = link.textContent || link.innerText;
    const destination = link.getAttribute('href');
    
    if (window.trackEvent) {
      window.trackEvent('internal_click', linkText, destination);
    }
  }
});

// Track form interactions
document.addEventListener('submit', function(e) {
  const form = e.target;
  const formId = form.id || 'unknown_form';
  
  if (window.trackEvent) {
    window.trackEvent('form_submission', formId);
  }
  
  // Log in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('📝 Form submitted:', formId);
  }
});

// Track scroll depth
let scrollDepths = [25, 50, 75, 100];
let scrollTracked = [];

window.addEventListener('scroll', function() {
  const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
  
  scrollDepths.forEach(function(depth) {
    if (scrollPercentage >= depth && !scrollTracked.includes(depth)) {
      scrollTracked.push(depth);
      
      if (window.trackEvent) {
        window.trackEvent('scroll_depth', depth + '%');
      }
      
      // Log in development
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('📜 Scroll depth:', depth + '%');
      }
    }
  });
});

// Track time on page
let pageStartTime = Date.now();

window.addEventListener('beforeunload', function() {
  const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000); // seconds
  
  if (window.trackEvent && timeOnPage > 5) {
    window.trackEvent('time_on_page', document.title, timeOnPage);
  }
});

// Track FAQ interactions
document.addEventListener('click', function(e) {
  const faqItem = e.target.closest('.faq-item');
  
  if (faqItem) {
    const question = faqItem.querySelector('summary');
    const questionText = question ? question.textContent.trim() : 'unknown';
    const isOpening = !faqItem.hasAttribute('open');
    
    if (window.trackEvent && isOpening) {
      window.trackEvent('faq_opened', questionText);
    }
    
    // Log in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('❓ FAQ ' + (isOpening ? 'opened' : 'closed') + ':', questionText);
    }
  }
});

// Track CTA button clicks
document.addEventListener('click', function(e) {
  const button = e.target.closest('.btn');
  
  if (button) {
    const buttonText = button.textContent.trim();
    const buttonClass = button.className;
    
    if (window.trackEvent) {
      window.trackEvent('cta_click', buttonText, buttonClass);
    }
    
    // Log in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('🔘 Button clicked:', buttonText);
    }
  }
});

// Track state card clicks
document.addEventListener('click', function(e) {
  const stateCard = e.target.closest('.state-card');
  
  if (stateCard && !stateCard.classList.contains('coming-soon')) {
    const stateName = stateCard.querySelector('h3');
    const stateText = stateName ? stateName.textContent.trim() : 'unknown';
    
    if (window.trackEvent) {
      window.trackEvent('state_card_click', stateText);
    }
  }
});

// Performance monitoring
window.addEventListener('load', function() {
  // Check if Performance API is available
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    const domLoadTime = timing.domContentLoadedEventEnd - timing.navigationStart;
    
    // Track page load performance
    if (window.trackEvent && pageLoadTime > 0) {
      window.trackEvent('page_load_time', Math.round(pageLoadTime / 1000) + 's');
    }
    
    // Log in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('⚡ Page load time:', pageLoadTime + 'ms');
      console.log('⚡ DOM load time:', domLoadTime + 'ms');
    }
  }
});

// Error tracking
window.addEventListener('error', function(e) {
  if (window.trackEvent) {
    window.trackEvent('javascript_error', e.message, e.filename + ':' + e.lineno);
  }
  
  // Log in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.error('❌ JavaScript error:', e.message);
  }
});

// Track browser and device info
document.addEventListener('DOMContentLoaded', function() {
  const deviceType = window.innerWidth <= 768 ? 'mobile' : 'desktop';
  const browser = navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                 navigator.userAgent.includes('Firefox') ? 'Firefox' :
                 navigator.userAgent.includes('Safari') ? 'Safari' : 'Other';
  
  if (window.trackEvent) {
    window.trackEvent('device_info', deviceType, browser);
  }
  
  // Log in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('💻 Device:', deviceType);
    console.log('🌐 Browser:', browser);
  }
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { trackEvent: window.trackEvent };
}
