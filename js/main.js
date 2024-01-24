const microscope = document.querySelector("#microscope");
const stageMicrometerContainer = document.querySelector("#stage-micrometer");
const stirer = document.querySelector("#stirer");
const view = document.querySelector(".view");

const stageMicrometer = document.querySelector("#stage-micrometer > img");
const salt = document.querySelector("#salt");
const stage = document.querySelector(".view > .stage");
const eyePiece = document.querySelector(".eye-piece");
const blackoutCanvas = document.querySelector("#blackout");
const blackoutCtx = blackoutCanvas.getContext("2d");

let beakerClicked = false;

startAndResetAnimation();

// accordian
function toggleAccordion(element) {
  const content = element.nextElementSibling;
  content.style.display = content.style.display === "block" ? "none" : "block";
}

function startAndResetAnimation() {
  stirer.addEventListener("click", stir);
  stageMicrometerContainer.addEventListener(
    "click",
    moveStageMicrometerContainer,
    {
      once: true,
    }
  );
}

function moveStageMicrometerContainer() {
  const microscopeCords = microscope.getBoundingClientRect();
  const stageMicrometerContainerCords =
    stageMicrometerContainer.getBoundingClientRect();

  stageMicrometerContainer.animate(
    [
      {},
      {
        transform: `translate( ${
          microscopeCords.left - stageMicrometerContainerCords.left
        }px, 0)`,
      },
      {
        transform: `translate( ${
          microscopeCords.left + 90 - stageMicrometerContainerCords.left
        }px, 20px) rotateX(70deg) rotateZ(50deg)`, // without outer div y -> 20px now its -20px
        width: `${150 * 0.7}px`,
      },
    ],
    {
      id: "placeOnMicrosocpe",
      duration: 1000,
      fill: "forwards",
    }
  ).onfinish = () => {
    microscope.addEventListener("click", startMicroscope);
    stageMicrometerContainer.addEventListener(
      "click",
      () => {
        stageMicrometerContainer.animate(
          [
            {},
            {
              transform: "translate(0,100px) rotateX(30deg)",
              width: "150px",
            },
          ],
          {
            duration: 1000,
            fill: "forwards",
          }
        ).onfinish = () => {
          stageMicrometerContainer.addEventListener("click", () => {
            console.log(microscope.getAnimations());

            stageMicrometerContainer.animate(
              [
                {},
                {
                  transform: `translate( ${
                    microscopeCords.left +
                    90 -
                    stageMicrometerContainerCords.left
                  }px, 20px) rotateX(70deg) rotateZ(50deg)`,
                },
              ],
              { duration: 1000, fill: "forwards" }
            );
          });
        };
      },
      { once: true }
    );
  };
}

function startMicroscope() {
  view.style.visibility = "visible";

  if (beakerClicked) {
    blackoutCanvas.style.visibility = "visible";
    stage.style.background = "none";
    // stage.style.transform = "translateX(-250px)";
    stageCanvas.width *= 2;
    stageCanvas.style.background = "rgba(189, 195, 199, 0.6)";
    stageCanvas.style.transform = "translateX(-300px)";

    stageContext.clearRect(0, 0, stageCanvas.width, stageCanvas.height);
    stage.style.borderRadius = "0";

    // add particles
    var img = new Image();
    img.onload = function () {
      stageContext.drawImage(img, 0, 0, stageCanvas.width, stageCanvas.height);
      blackoutCanvas.width = window.innerWidth * 2;
      blackoutCanvas.height = window.innerHeight * 2;
      blackoutCanvas.style.position = "absolute";
      blackoutCanvas.style.zIndex = "1000";
      blackoutCanvas.style.top = "-50%";
      blackoutCanvas.style.left = "-50%";

      blackoutCtx.fillStyle = "rgba(0, 0, 0, 0.9)";
      blackoutCtx.fillRect(0, 0, blackoutCanvas.width, blackoutCanvas.height);

      const eyePieceRect = eyePiece.getBoundingClientRect();
      const radius = eyePieceRect.width / 2;
      const centerX = (eyePieceRect.left + radius) * 2;
      const centerY = (eyePieceRect.top + radius) * 2;

      // Create a circular clipping path
      blackoutCtx.beginPath();
      blackoutCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      blackoutCtx.closePath();

      // Apply the clipping path
      blackoutCtx.clip();

      // Clear the region inside the clipping path to make it transparent
      blackoutCtx.clearRect(
        centerX - radius,
        centerY - radius,
        2 * radius,
        2 * radius
      );

      controls(blackoutCanvas);
      // window.addEventListener("keydown", (e) => {})
    };

    img.src = "./images/dust-particles.png";
  }
}

function stir() {
  stirer.animate(
    [
      {},
      {
        transform: `rotate(-5deg)`,
      },
      {},
    ],
    {
      duration: 1000,
      iterations: 2,
    }
  );
}
