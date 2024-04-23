const parallaxScale = 0.5;
// eased and stored in callback
const easedAcceleration = {
  z: 0,
};
// live-updated from events
let lastAcceleration = {
  z: 0,
};
let accelerationDelta = {
  z: 0,
}
const accelerationEasingRatio = 0.3;

// eased and stored in callback
const easedOrientation = { beta: 0, gamma: 0 };
// live-updated from events
let lastOrientation = { beta: 0, gamma: 0 };
let orientationDelta = {beta: 0, gamma: 0};
const orientationEasingRatio = 0.8;

const scrollScale = -0.8;
const lastScrollPosition = {
  x: 0,
  y: 0,
};
const easedScrollVelocity = {
  x: 0,
  y: 0,
};
const scrollEasingRatio = 0.9;
const maxScrollVelocity = 4;
document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  const els = document.querySelectorAll(".parallax");
  if (!prefersReducedMotion) {
    window.addEventListener("deviceorientation", (e) => {
      //console.log(e);
      lastOrientation = { beta: e.beta, gamma: e.gamma };
    });
    window.addEventListener("devicemotion", (e) => {
      //console.log(e.acceleration);
      lastAcceleration.z += e.acceleration.z;
    });
  } else {
    console.log("User prefers reduced motion! Device orientation and acceleration effects are turned off.");
  }
  setInterval(() => {
    const scrollDeltaX = Math.max(
      -maxScrollVelocity, Math.min(maxScrollVelocity,
        window.scrollX - lastScrollPosition.x
      )
    );
    const scrollDeltaY = Math.max(
      -maxScrollVelocity, Math.min(maxScrollVelocity,
        window.scrollY - lastScrollPosition.y
      )
    );
    
    lastScrollPosition.x = window.scrollX;
    lastScrollPosition.y = window.scrollY;
    easedScrollVelocity.x =
      scrollEasingRatio * easedScrollVelocity.x +
      (1 - scrollEasingRatio) * scrollDeltaX;
    easedScrollVelocity.y =
      scrollEasingRatio * easedScrollVelocity.y +
      (1 - scrollEasingRatio) * scrollDeltaY;
    if (easedScrollVelocity.y > maxScrollVelocity) {
      easedScrollVelocity.y = maxScrollVelocity;
    }
    if (easedScrollVelocity.y < -maxScrollVelocity) {
      easedScrollVelocity.y = -maxScrollVelocity;
    }

    if (!prefersReducedMotion) {
      accelerationDelta.z = lastAcceleration.z - easedAcceleration.z;
      easedAcceleration.z =
        accelerationEasingRatio * lastAcceleration.z +
        (1 - accelerationEasingRatio) * easedAcceleration.z;
  
      // why is this nan sometimes
      if (lastOrientation.beta === undefined || lastOrientation.gamma === undefined) {
        console.error("undefined beta and/or gamma");
      } else {
        //console.log(easedOrientation.beta, lastOrientation.beta);
        if (easedOrientation.beta !== easedOrientation.beta) {easedOrientation.beta = 0}
        if (easedOrientation.gamma !== easedOrientation.gamma) {easedOrientation.gamma = 0}
        orientationDelta = {
          beta: lastOrientation.beta - easedOrientation.beta,
          gamma: lastOrientation.gamma - easedOrientation.gamma
        }
        easedOrientation.beta =
        orientationEasingRatio * lastOrientation.beta +
        (1 - orientationEasingRatio) * easedOrientation.beta;
        easedOrientation.gamma =
        orientationEasingRatio * lastOrientation.gamma +
        (1 - orientationEasingRatio) * easedOrientation.gamma; 
      }
    }
    els.forEach((el) => {
      const top = parseFloat(el.dataset.top);
      const left = parseFloat(el.dataset.left);
      const z = parseFloat(el.dataset.z);
      el.style.top = `${
        top +
        z *
          (orientationDelta.beta * parallaxScale +
            easedScrollVelocity.y * scrollScale)
      }em`;
      el.style.left = `${
        left +
        z *
          (orientationDelta.gamma * parallaxScale +
            easedScrollVelocity.x * scrollScale)
      }em`;
      const scale = Math.pow(2, 0.2 * Math.max(-1.0, Math.min(-0.02 * accelerationDelta.z, 1.0)));
      el.style.transform = `scale(${scale})`;
    });
  }, 10);
});
