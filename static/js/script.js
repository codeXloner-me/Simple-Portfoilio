const navLinks = document.querySelectorAll('nav a');
const contentArea = document.getElementById('content-area');
const downloadCVButton = document.getElementById('download-cv'); // Get the download button

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetPage = link.dataset.page;

        // 1. Remove active class from ALL links
        navLinks.forEach(navLink => navLink.classList.remove('active'));

        // 2. Add active class to the CLICKED link
        link.classList.add('active');

        // 3. Fade out current content (if any)
        contentArea.style.opacity = 0;

        // 4. Fetch and load the content with a delay for the fade-out
        setTimeout(() => {
            fetch(`/MIni-Portfolio-main/static/html/${targetPage}.html`)
              .then(response => response.text())
              .then(html => {
                    contentArea.innerHTML = html; // Load the HTML into the content area

                    // Fade in the new content
                    contentArea.style.opacity = 1;

                    // Optional: Scroll to top after content loads (good UX)
                    window.scrollTo(0, 0); // Scroll to top of the page
                })
              .catch(error => {
                    console.error("Error loading page:", error);
                    contentArea.innerHTML = "<p>Error loading page.</p>"; // Handle errors
                });
        }, 150); // Delay to allow fade-out

    });
});

    fetch('/MIni-Portfolio-main/static/html/love.html') // Load your default page on initial load
    .then(response => response.text())
    .then(html => {
        contentArea.innerHTML = html;
        document.querySelector('nav a[data-page="love"]').classList.add('active'); // Set the active class

        // *** Move the event listener here ***
        const downloadCVButton = document.getElementById('download-cv'); // Get the button AFTER it's loaded
        if (downloadCVButton) {
            downloadCVButton.addEventListener('click', () => {
                const resumeURL = '/MIni-Portfolio-main/static/image/resume.png'; // **IMPORTANT: Replace with your resume file path**
                const link = document.createElement('a');
                link.href = resumeURL;
                link.download = 'Suryansh_Niranjan_Resume.png';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
    });