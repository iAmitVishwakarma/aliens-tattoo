// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    const floatWrap = document.querySelector('.float-wrap');
    const floatItems = floatWrap.querySelectorAll('.float:not(.is-clone)');
    const clones = floatWrap.querySelectorAll('.is-clone');
    
    // Check if the necessary elements exist before proceeding
    if (!floatWrap || floatItems.length === 0 || clones.length === 0) {
        console.error("Required elements for infinite scroll not found.");
        return;
    }

    let originalItemsHeight = 0;
    let clonesHeight = 0;
    let isJumping = false;

    // Calculate the height of the original content and the clones
    function calculateHeights() {
        originalItemsHeight = 0;
        clonesHeight = 0;
        floatItems.forEach(item => {
            originalItemsHeight += item.offsetHeight;
        });
        clones.forEach(clone => {
            clonesHeight += clone.offsetHeight;
        });
    }

    // Set the initial scroll position to the start of the original content
    function setInitialScrollPosition() {
        setTimeout(() => {
            floatWrap.scrollTop = clonesHeight;
        }, 10);
    }

    // The main function that handles the infinite loop on scroll
    function scrollUpdate() {
        if (isJumping) return;

        const scrollPosition = floatWrap.scrollTop;
        const maxScroll = floatWrap.scrollHeight - floatWrap.clientHeight;
        
        // Check if the user has scrolled to the bottom of the original content
        if (scrollPosition >= maxScroll) {
            isJumping = true;
            // Jump back to the top of the original content
            floatWrap.scrollTop = clonesHeight;
            setTimeout(() => {
                isJumping = false;
            }, 10); // Small delay to prevent flickering
        }
    }

    // Initialize the script and add event listeners
    function init() {
        calculateHeights();
        setInitialScrollPosition();

        floatWrap.addEventListener('scroll', () => {
            window.requestAnimationFrame(scrollUpdate);
        });

        // Recalculate heights on window resize to ensure responsiveness
        window.addEventListener('resize', () => {
            calculateHeights();
            setInitialScrollPosition();
        });
    }

    init();

});