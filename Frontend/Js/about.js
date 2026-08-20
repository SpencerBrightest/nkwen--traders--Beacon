/**
 * Nkwen Traders - About Page Interactivity
 * Handles the accordion toggle logic for the Frequently Asked Questions section.
 */

document.addEventListener('DOMContentLoaded', () => {
    initFaqAccordion();
});

/**
 * Initializes the FAQ accordion toggle functionality.
 * Allows users to expand/collapse questions to read answers.
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    // Edge case handling: ensure accordion items exist on page
    if (!faqItems || faqItems.length === 0) {
        return;
    }

    faqItems.forEach((item) => {
        const trigger = item.querySelector('.faq-trigger');

        if (!trigger) return;

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other open accordion items for clean UX
            faqItems.forEach((otherItem) => {
                otherItem.classList.remove('active');
                const otherTrigger = otherItem.querySelector('.faq-trigger');
                if (otherTrigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item state
            if (!isActive) {
                item.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });
}
