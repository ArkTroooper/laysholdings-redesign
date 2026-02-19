/**
 * Animate elements when they come into view
 */
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        // Check if element is already in viewport on page load
        const rect = element.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        // If already in viewport, animate immediately
        if (isInViewport) {
            element.classList.add('animated');
        } else {
            // Otherwise, observe for scroll
            observer.observe(element);
        }
    });
}

// ===================================
// Expandable Info Facets
// ===================================

/**
 * Toggle expansion of info facet cards
 */
function initExpandableFacets() {
    const infoFacets = document.querySelectorAll('.info-facet');
    
    infoFacets.forEach(facet => {
        const expandBtn = facet.querySelector('.facet-expand-btn');
        const expandableContent = facet.querySelector('.facet-expandable-content');
        
        if (!expandBtn || !expandableContent) return;
        
        // Click on the button
        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFacet(facet);
        });
        
        // Click on the facet header (but not the highlights or description)
        const facetHeader = facet.querySelector('.facet-header');
        facetHeader.addEventListener('click', (e) => {
            if (!e.target.closest('.facet-expand-btn')) {
                toggleFacet(facet);
            }
        });
    });
}

/**
 * Toggle individual facet expansion
 */
function toggleFacet(facet) {
    const isExpanded = facet.getAttribute('data-expanded') === 'true';
    facet.setAttribute('data-expanded', String(!isExpanded));
}

// ===================================
// Initialization
// ===================================

function init() {
    animateOnScroll();
    initExpandableFacets();

    console.log('Lays Holdings website initialized successfully');
}

document.addEventListener('DOMContentLoaded', init);