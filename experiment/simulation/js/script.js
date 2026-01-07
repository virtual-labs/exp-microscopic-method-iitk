// Track experiment progress globally so it's accessible to all functions
let experimentState = {
    stageometerPlaced: false,
    singlePiecePlaced: false,
    samplePrepared: false,
    slidePlaced: false,
    pucki: false,
    nextButton: false,
    nextButton1: false    
};

document.addEventListener("DOMContentLoaded", function() {

              // Function to update instruction text with animation
              function updateInstruction(text) {
                  const instructionText = document.getElementById("instruction");
                  const instructionPanel = document.getElementById("instruction-panel");

                  // Reset animation
                  instructionText.style.animation = "none";

                  // Force reflow to restart animation
                  void instructionText.offsetWidth;

                  // Update text and restart animation
                  instructionText.textContent = text;
                  instructionText.style.animation = "fadeIn 0.5s ease-in-out";

                  // Add pulse animation to the panel
                  instructionPanel.style.animation = "none";
                  void instructionPanel.offsetWidth;
                  instructionPanel.style.animation = "pulse 1.5s";

                  // Add voice
                  const utterance = new SpeechSynthesisUtterance(text);
                  speechSynthesis.speak(utterance);
              }

              const welcomeOverlay = document.getElementById('welcome-overlay');
              const startButton = document.getElementById('start-experiment');

              // play the audio when the page loads
              // const audio = new Audio('audio/startSimulation2.mp3');
            setTimeout(function() {
                 const text = "Welcome to this Pharmacy laboratory experiment Particle Size Distribution by Microscopic Method ";
                 const utterance = new SpeechSynthesisUtterance(text);
                 speechSynthesis.speak(utterance);
               },0);

               setTimeout(function() {
                 const text = "lets click on the start to start experiment ";
                 const utterance = new SpeechSynthesisUtterance(text);
                 speechSynthesis.speak(utterance);
               }, 6000);

                //    const msg = new SpeechSynthesisUtterance();
                //    msg.text = "नमस्ते, आप कैसे हैं?";
                //    msg.lang = "hi-IN"; // Try to force Hindi
                //    const voices = window.speechSynthesis.getVoices();

                //    // Try to find a Hindi voice
                //    const hindiVoice = voices.find(voice => voice.lang.includes("hi"));
                //    if (hindiVoice) {
                //      msg.voice = hindiVoice;
                //    }

                //  window.speechSynthesis.speak(msg);

              // Show the welcome overlay when the page loads
              welcomeOverlay.style.display = 'flex';


              // Hide the welcome overlay when the start button is clicked
              startButton.addEventListener('click', function() {
                welcomeOverlay.classList.add('hidden');

                 // Update instruction using our new function
                 updateInstruction("Click on the Eyepiece to put on microscope");


                // Remove the overlay from the DOM after the transition completes
                setTimeout(function() {
                  welcomeOverlay.style.display = 'none';
                }, 500);
              });


         const singlepiece = document.getElementById("single-piece");

        //  // Add click event for eyepiece
        //  eyepiece.addEventListener("click", () => {
        //      // Update instruction
        //      updateInstruction("Moving eyepiece to microscope...");

        //      const timeline = gsap.timeline();

        //      timeline.to(eyepiece, {
        //          duration: 1.5,
        //          bottom: "30%",
        //          ease: "power2.out"
        //      }).to(eyepiece, {
        //          duration: 1.5,
        //          left: "31%",
        //          ease: "power2.out"
        //      }).to(eyepiece, {
        //          duration: 1,
        //          bottom: "35%",
        //          ease: "power2.out",
        //          onComplete: function() {
        //              // Mark eyepiece as placed
        //              experimentState.eyepiecePlaced = true;
        //              updateInstruction("Eyepiece attached. Now click on the stageometer scale");
        //          }
        //      });
        //  });

             // Update instruction text based on user interactions
             singlepiece.addEventListener("click", () => {
                // // Check if eyepiece and stageometer have been placed first
                // if (!experimentState.eyepiecePlaced) {
                //     updateInstruction("You need to place the eyepiece on the microscope first. Click on the eyepiece.");
                //     return;
                // }

                // if (!experimentState.stageometerPlaced) {
                //     updateInstruction("You need to place the stageometer scale first. Click on the stageometer scale.");
                //     return;
                // }

                // Update instruction
                updateInstruction("Moving Eye piece to microscope...");

                // Initial animation to move the piece up
                const timeline = gsap.timeline();
                // Add click event to animate the piece

                    timeline.to(singlepiece, {
                        duration: 1,
                       bottom:"54%",
                        ease: "power2.out",
                    }).to(singlepiece, {
                        duration: 1,
                        left:"31.5%",
                        ease: "power2.out"
                    }).to(singlepiece, {
                        duration: 1,
                        bottom:"53%",
                        ease: "power2.out",
                        onComplete: function() {
                            // Mark single piece as placed
                            experimentState.singlePiecePlaced = true;
                            updateInstruction("Eye piece attached. Now click on the stageometer to prepare the calibrate eyepiece");
                        }
                    });
                  });



                const stageometerScale = document.getElementById("stageometer-scale");

stageometerScale.addEventListener("click", () => {
    // Check if eyepiece has been placed first
    if (!experimentState.singlePiecePlaced) {
        updateInstruction("You need to place the eyepiece on the microscope first. Click on the eyepiece.");
        return;
    }

    // Update instruction when stageometer scale is clicked
    updateInstruction("Moving stageometer scale to microscope...");

    const timeline = gsap.timeline();

    timeline.to(stageometerScale, {
        duration: 1,
        bottom:"14%",
        scale:.7,
        ease: "power2.out",
    }).to(stageometerScale, {
        duration: 2 ,
        left:"29%",
        ease: "power2.out"
    }).to(stageometerScale, {
        duration: 1,
        scale:.4,
        ease: "power2.out"
    })
    .to(stageometerScale, {
        duration: 1,
        bottom:"16%",
        ease: "power2.out",
        onComplete: function() {
            // Mark stageometer as placed
            experimentState.stageometerPlaced = true;
            updateInstruction("Now click on the single piece to attach it to the microscope");
        }
    });

});

const next1 = document.getElementById("next-btn1");

next1.addEventListener("click", () => {
      if (!experimentState.stageometerPlaced) {
          updateInstruction("You need to place the eyepiece on the microscope first. Click on the eyepiece.");
          return;
     }

     if (!experimentState.stageometerPlaced) {
        updateInstruction("You need to place the stageometer scale first. Click on the stageometer scale.");
         return;
     }
    //  function nextPage() {
    // // Check if all steps have been completed
    // if (!experimentState.slidePlaced) {
    //     alert("Please complete all the steps before proceeding to the next page.");
    //      updateInstruction("You need to complete all steps before proceeding. Make sure to place the eyepiece, stageometer scale, single piece, and prepare the sample with the slide.");
    //      return;
    //    }
    //  }
     // If all steps are completed, proceed to the next page

    
    const section1 = document.getElementById('section-1');
    const section2 = document.getElementById('section-2');

    section1.style.display = 'none';
    section2.style.display = 'block';

    console.log("1is clicked")
    // Mark nextbutton as placed
    experimentState.nextButton = true;

    const next2 = document.getElementById("next-btn2");
    
    next2.style.display = 'flex'
   })


    const nextsecondtime = document.getElementById('next-btn');

    // Add event listener for the Next button
    nextsecondtime.addEventListener('click', function() {
        const section1 = document.getElementById('section-1');
        const section2 = document.getElementById('section-2');
        // Navigate back to section1
         section1.style.display = 'block';
         section2.style.display = 'none';

         console.log("hello")
    });

const pucki = document.getElementById("pucki");
// const drop = document.getElementById("drop");
// const drop2 = document.getElementById("drop2");
// const glass = document.getElementById("glass");
// const glass2 = document.getElementById("glass2");



pucki.addEventListener("click", () => {
    // Check if previous steps have been completed

    if (!experimentState.singlePiecePlaced) {
        updateInstruction("You need to attach the eyepiece first. Click on the eyepiece.");
        return;
    }

    if (!experimentState.stageometerPlaced) {
        updateInstruction("You need to place the stageometer scale first. Click on the stageometer scale.");
        return;
    }

    if (!experimentState.nextButton) {
        updateInstruction("You need to calibrate stagometer first. Click on the Next button.");
        return;
    }

    // Update instruction when pucki is clicked
    updateInstruction("Preparing sample for microscopic analysis...");

    const timeline = gsap.timeline();

    timeline.to(pucki, {
        duration: 2,
        bottom:"25%",
        rotate:-45,
        ease: "power2.out",
    }).to(pucki, {
        duration: 2.5,
        left:"55%",
        rotate:-45,
        ease: "power2.out",
    }).to(pucki, {
        duration: .5,
        bottom:"15%",
        rotate:-85,
        ease: "power2.out",
    }).to(pucki, {
        duration: .5,
        bottom:"25%",
        rotate:-45,
        ease: "power2.out",
        delay:1,
        onComplete: function() {
            updateInstruction("Adding sample to the glass slide...");
        }
    }).to(pucki, {
        duration: .5,
        left:"44.5%",
        rotate:-45,
        ease: "power2.out",
    }).to(drop, {
        display:"block",
        duration: .5,
        bottom:"7%",
        ease: "power2.out",
    }).to(drop2, {
        display:"block",
        ease: "power2.out",
    }).to(drop, {
        duration:0,
        display:"none",
    }).to(drop2, {
        display:"none",
        ease: "power2.out",
   }) .to(glass2, {
     display:"block",
     scale:0.999,
        ease: "power2.out",
        onComplete: function() {
            // Mark sample as prepared
            experimentState.pucki = true;
            updateInstruction("Sample added to slide. Click on the slide to place it on the microscope");
        }
    }).to(glass, {
     display:"none",
    }).to(pucki, {
        duration: 2,
        left:"80%",
        ease: "power2.out",
     }).to(pucki, {
         duration: 2,
         bottom:"5%",
          rotate:0,
         ease: "power2.out",
     })
});

const previousglass = document.getElementById("glass");

previousglass.addEventListener("click", () =>{

    if (!experimentState.singlePiecePlaced) {
        updateInstruction("You need to attach the single piece first. Click on the single piece.");
        return;
    } 

    if (!experimentState.stageometerPlaced) {
        updateInstruction("You need to place the stageometer scale first. Click on the stageometer scale.");
        return;
    }

    if (!experimentState.nextButton) {
        updateInstruction("You need to calibrate stagometer first. Click on the Next button.");
        return;
    } 

    if (!experimentState.pucki) {
        updateInstruction("You need to click on tube to prepare sample. Click on the pucki.");
         return;
     }

    if (!experimentState.samplePrepared) {
        updateInstruction("You need to prepare the sample first. Click on the pucki.");
        return;
    }
  
});

glass2.addEventListener("click", () => {
    // Check if previous steps have been completed
    
    console.log("heooooooo");

    if (!experimentState.singlePiecePlaced) {
        updateInstruction("You need to attach the single piece first. Click on the single piece.");
        return;
    } 

    if (!experimentState.stageometerPlaced) {
        updateInstruction("You need to place the stageometer scale first. Click on the stageometer scale.");
        return;
    }

    if (!experimentState.pucki) {
        updateInstruction("You need to prepare the sample first. Click on the pucki.");
        return;
    }

    // Update instruction when glass slide is clicked
    updateInstruction("Moving glass slide to microscope...");

    const timeline = gsap.timeline();

    timeline.to(glass2, {
        display:"block",
        duration: 2,
        bottom:"14%",
        ease: "power2.out",
    }).to(glass2, {
        duration: 1,
        left:"29.1%",
        ease: "power2.out",
        display:"block"
    }).to(glass2, {
        duration: 1,
        scale:.4,
        ease: "power2.out",
        display:"block"
    })
    .to(glass2, {
        duration: 1,
        bottom:"16%",
        ease: "power2.out",
        display:"block",
        onComplete: function() {
            // Mark slide as placed
            experimentState.samplePrepared = true;
            experimentState.nextButton1 = true;
            updateInstruction("Calibration complete! Click 'next' to continue to the next step");
        }
    });
});

const next2 = document.getElementById("next-btn2");
    next2.addEventListener("click", ()=>{
          // Check if previous steps have been completed

      if (!experimentState.stageometerPlaced) {
          updateInstruction("You need to place the eyepiece on the microscope first. Click on the eyepiece.");
          return;
     }

     if (!experimentState.stageometerPlaced) {
        updateInstruction("You need to place the stageometer scale first. Click on the stageometer scale.");
         return;
     }

     if (!experimentState.pucki) {
        updateInstruction("You need to click on tube to prepare sample. Click on the pucki.");
         return;
     }

     if (!experimentState.samplePrepared) {
        updateInstruction("You need to place sample first. Click on the sample.");
         return;
     }

     function nextPage() {
    // Check if all steps have been completed
    if (!experimentState.slidePlaced) {
        alert("Please complete all the steps before proceeding to the next page.");
         updateInstruction("You need to complete all steps before proceeding. Make sure to place the eyepiece, stageometer scale, single piece, and prepare the sample with the slide.");
         return;
       }
     }
     // If all steps are completed, proceed to the next page

    
    const section1 = document.getElementById('section-1');
    const section2 = document.getElementById('section-2');
    const sampleInMicroscope = document.getElementById('sample-glass');
    const stageometerInMicroscope = document.getElementById('stageometer');



    section1.style.display = 'none';
    section2.style.display = 'block';

    sampleInMicroscope.style.display = 'block';
    stageometerInMicroscope.style.display = 'none';

    });

const img = document.getElementById('stageometer');

img.addEventListener('mouseenter', () => {
  img.style.transform = 'scale(1.5)';
});

img.addEventListener('mouseleave', () => {
  img.style.transform = 'scale(1)';
});
// End of DOMContentLoaded event
});

// function nextPage() {
//     // Check if all steps have been completed
//     if (!experimentState.slidePlaced) {
//         alert("Please complete all the steps before proceeding to the next page.");
//         updateInstruction("You need to complete all steps before proceeding. Make sure to place the eyepiece, stageometer scale, single piece, and prepare the sample with the slide.");
//         return;
//     }

//     // If all steps are completed, proceed to the next page
//     window.location.href = 'index-1.html';
// 