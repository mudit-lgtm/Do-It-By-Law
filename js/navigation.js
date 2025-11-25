// ========================================
// NAVIGATION & UI INTERACTIONS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // Mobile Menu Toggle
  // ========================================
  
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Animate hamburger icon
      const spans = mobileMenuToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
      
      // Track event
      if (window.trackEvent) {
        window.trackEvent('mobile_menu_toggle', navLinks.classList.contains('active') ? 'open' : 'close');
      }
    });
    
    // Close mobile menu when clicking a link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          const spans = mobileMenuToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    });
  }
  
  // ========================================
  // Smooth Scrolling for Anchor Links
  // ========================================
  
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Don't prevent default for empty hash
      if (targetId === '#' || targetId === '') {
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset for sticky navbar
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL hash without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
        
        // Track anchor click
        if (window.trackEvent) {
          window.trackEvent('anchor_click', targetId);
        }
      }
    });
  });
  
  // ========================================
  // Active Navigation State
  // ========================================
  
  function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    navLinksItems.forEach(function(link) {
      const linkPage = link.getAttribute('href').split('/').pop();
      
      if (linkPage === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  updateActiveNav();
  
  // ========================================
  // Sticky Navbar on Scroll
  // ========================================
  
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow when scrolled
    if (scrollTop > 50) {
      navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // ========================================
  // Back to Top Button (Optional Enhancement)
  // ========================================
  
  // Create back to top button
  const backToTopButton = document.createElement('button');
  backToTopButton.innerHTML = '↑';
  backToTopButton.className = 'back-to-top';
  backToTopButton.setAttribute('aria-label', 'Back to top');
  backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-blue);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(backToTopButton);
  
  // Show/hide back to top button
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
  
  // Scroll to top on click
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    if (window.trackEvent) {
      window.trackEvent('back_to_top_click');
    }
  });
  
  // Hover effect for back to top button
  backToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.background = 'var(--primary-dark)';
  });
  
  backToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.background = 'var(--primary-blue)';
  });
  
  // ========================================
  // FAQ Accordion Animation Enhancement
  // ========================================
  
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(function(item) {
    const summary = item.querySelector('summary');
    
    if (summary) {
      summary.addEventListener('click', function() {
        // Close other FAQ items (optional accordion behavior)
        // Uncomment below to enable single-open accordion
        /*
        faqItems.forEach(function(otherItem) {
          if (otherItem !== item && otherItem.hasAttribute('open')) {
            otherItem.removeAttribute('open');
          }
        });
        */
      });
    }
  });
  
  // ========================================
  // Table of Contents Auto-Highlighting
  // ========================================
  
  const tocLinks = document.querySelectorAll('.table-of-contents a');
  
  if (tocLinks.length > 0) {
    const sections = [];
    tocLinks.forEach(function(link) {
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        sections.push({
          link: link,
          section: targetSection
        });
      }
    });
    
    function highlightTOC() {
      const scrollPosition = window.scrollY + 150;
      
      let currentSection = null;
      sections.forEach(function(item) {
        if (item.section.offsetTop <= scrollPosition) {
          currentSection = item;
        }
      });
      
      tocLinks.forEach(function(link) {
        link.classList.remove('active');
      });
      
      if (currentSection) {
        currentSection.link.classList.add('active');
      }
    }
    
    window.addEventListener('scroll', highlightTOC);
    highlightTOC(); // Initial call
  }
  
  // ========================================
  // External Link Indicator
  // ========================================
  
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  
  externalLinks.forEach(function(link) {
    if (!link.href.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
  
  // ========================================
  // Loading State Management
  // ========================================
  
  window.addEventListener('load', function() {
    // Hide loading spinner if exists
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.style.display = 'none';
    }
    
    // Show content with fade-in
    document.body.style.opacity = '1';
  });
  
  // ========================================
  // Form Input Validation Enhancement
  // ========================================
  
  const numberInputs = document.querySelectorAll('input[type="number"]');
  
  numberInputs.forEach(function(input) {
    input.addEventListener('input', function() {
      const min = parseInt(this.getAttribute('min'));
      const max = parseInt(this.getAttribute('max'));
      const value = parseInt(this.value);
      
      if (value < min) {
        this.value = min;
      }
      if (value > max) {
        this.value = max;
      }
    });
  });
  
  // ========================================
  // Keyboard Navigation Improvements
  // ========================================
  
  // Escape key to close mobile menu
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    }
  });
  
  // ========================================
  // Console Welcome Message
  // ========================================
  
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c🎨 Legal Age Authority - Phase 1', 'color: #2563eb; font-size: 18px; font-weight: bold;');
    console.log('%cDeveloped for Alabama tattoo age laws', 'color: #374151; font-size: 12px;');
    console.log('%cPhase 2 coming soon with more states!', 'color: #10b981; font-size: 12px;');
  }
});
