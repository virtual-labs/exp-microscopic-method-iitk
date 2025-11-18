 

        document.addEventListener('DOMContentLoaded', function() {
            const stageometer = document.getElementById('sample-glass');
            const zoomInBtn = document.getElementById('zoom-in');
            const zoomOutBtn = document.getElementById('zoom-out');
            const navUpBtn = document.getElementById('nav-up');
            const navLeftBtn = document.getElementById('nav-left');
            const navCenterBtn = document.getElementById('nav-center');
            const navRightBtn = document.getElementById('nav-right');
            const navDownBtn = document.getElementById('nav-down');
            const nextBtn = document.getElementById('next-btn');

            // Zoom variables
            let currentScale = 1;
            const minScale = 0.5;
            const maxScale = 3;
            const scaleStep = 0.1;

            // Position variables
            let posX = 0;
            let posY = 0;
            const moveStep = 5; // pixels to move per button click

            // Apply initial styles for zoom and position functionality
            stageometer.style.transition = 'transform 0.3s ease';
            stageometer.style.transformOrigin = 'center center';

            function updateTransform() {
                stageometer.style.transform = `translate(${posX}px, ${posY}px) scale(${currentScale})`;
            }

            // Zoom in button
            zoomInBtn.addEventListener('click', function() {
                if (currentScale < maxScale) {
                    currentScale += scaleStep;
                    updateTransform();
                }
            });

            // Zoom out button
            zoomOutBtn.addEventListener('click', function() {
                if (currentScale > minScale) {
                    currentScale -= scaleStep;
                    updateTransform();
                }
            });

            // Navigation buttons
            navUpBtn.addEventListener('click', function() {
                posY -= moveStep;
                updateTransform();
            });

            navLeftBtn.addEventListener('click', function() {
                posX -= moveStep;
                updateTransform();
            });

            navCenterBtn.addEventListener('click', function() {
                // Reset position to center
                posX = 0;
                posY = 0;
                currentScale = 1;
                updateTransform();
            });

            navRightBtn.addEventListener('click', function() {
                posX += moveStep;
                updateTransform();
            });

            navDownBtn.addEventListener('click', function() {
                posY += moveStep;
                updateTransform();
            });

            // Add mouse wheel zoom support
            stageometer.addEventListener('wheel', function(e) {
                e.preventDefault(); // Prevent page scrolling

                if (e.deltaY < 0 && currentScale < maxScale) {
                    // Scroll up - zoom in
                    currentScale += scaleStep;
                    updateTransform();
                } else if (e.deltaY > 0 && currentScale > minScale) {
                    // Scroll down - zoom out
                    currentScale -= scaleStep;
                    updateTransform();
                }
            });

            // Add drag functionality
            let isDragging = false;
            let startX, startY;
            let startPosX, startPosY;

            stageometer.addEventListener('mousedown', function(e) {
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                startPosX = posX;
                startPosY = posY;
                stageometer.style.cursor = 'grabbing';
            });

            document.addEventListener('mousemove', function(e) {
                if (isDragging) {
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    posX = startPosX + dx;
                    posY = startPosY + dy;
                    updateTransform();
                }
            });

            document.addEventListener('mouseup', function() {
                isDragging = false;
                stageometer.style.cursor = 'grab';
            });

            // Initialize cursor style
            stageometer.style.cursor = 'grab';


            // // Welcome Overlay functionality
            // const welcomeOverlay = document.getElementById('welcome-overlay');
            // const startButton = document.getElementById('start-experiment');

            // // Show the welcome overlay when the page loads
            // welcomeOverlay.style.display = 'flex';

            // // Hide the welcome overlay when the start button is clicked
            // startButton.addEventListener('click', function() {
            //     welcomeOverlay.classList.add('hidden');

            //     // Remove the overlay from the DOM after the transition completes
            //     setTimeout(function() {
            //         welcomeOverlay.style.display = 'none';
            //     }, 500);
            // });
        });
    