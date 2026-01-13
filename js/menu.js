// Helper function to handle both click and keyboard navigation
function handleNavigation(elementId, targetSelector) {
    const element = document.getElementById(elementId);

    const navigate = function() {
        const target = targetSelector ? document.querySelector(targetSelector) : null;
        window.scrollTo({
            top: target ? target.offsetTop - 80 : 0,
            behavior: 'smooth'
        });
    };

    element.addEventListener("click", navigate);
    element.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigate();
        }
    });
}

handleNavigation("menu-home", null);
handleNavigation("menu-about", ".about-me-container");
handleNavigation("menu-services", ".services-container");
handleNavigation("menu-projects", ".projects-container");
handleNavigation("menu-contact", ".contacts-container");
