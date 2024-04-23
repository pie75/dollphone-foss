const parallaxScale = 0.5;
const easedAcceleration = {
  x: 0,
  y: 0,
  z: 0,
};
let lastAcceleration = {
  x: 0,
  y: 0,
  z: 0,
};
const easingRatio = 0.8;

const scrollScale = -0.5;
const lastScrollPosition = {
  x: 0,
  y: 0,
};
const easedScrollVelocity = {
  x: 0,
  y: 0,
};
const scrollEasingRatio = 0.95;
const maxScrollVelocity = 4;
document.addEventListener("DOMContentLoaded", () => {
  const els = document.querySelectorAll(".parallax");
  window.addEventListener("devicemotion", (e) => {
    console.log(e.acceleration);
    lastAcceleration = e.acceleration;
  });
  setInterval(() => {
    const scrollDeltaX = window.scrollX - lastScrollPosition.x;
    const scrollDeltaY = window.scrollY - lastScrollPosition.y;
    lastScrollPosition.x = window.scrollX;
    lastScrollPosition.y = window.scrollY;
    easedScrollVelocity.x = scrollEasingRatio * easedScrollVelocity.x +
        (1 - scrollEasingRatio) * scrollDeltaX;
    if (easedScrollVelocity.x > maxScrollVelocity) {easedScrollVelocity.x = maxScrollVelocity;}
    if (easedScrollVelocity.x < -maxScrollVelocity) {easedScrollVelocity.x = -maxScrollVelocity;}
    easedScrollVelocity.y = scrollEasingRatio * easedScrollVelocity.y +
    (1 - scrollEasingRatio) * scrollDeltaY;
    if (easedScrollVelocity.y > maxScrollVelocity) {easedScrollVelocity.y = maxScrollVelocity;}
    if (easedScrollVelocity.y < -maxScrollVelocity) {easedScrollVelocity.y = -maxScrollVelocity;}
    
    easedAcceleration.x =
      easingRatio * lastAcceleration.x +
      (1 - easingRatio) * easedAcceleration.x;
    easedAcceleration.y =
      easingRatio * lastAcceleration.y +
      (1 - easingRatio) * easedAcceleration.y;
    easedAcceleration.z =
      easingRatio * lastAcceleration.z +
      (1 - easingRatio) * easedAcceleration.z;
    els.forEach((el) => {
      const top = parseFloat(el.dataset.top);
      const left = parseFloat(el.dataset.left);
      const z = parseFloat(el.dataset.z);
      el.style.top = `${
        top +
        z *
          (easedAcceleration.y * parallaxScale +
            easedScrollVelocity.y * scrollScale)
      }em`;
      el.style.left = `${
        left +
        z *
          (easedAcceleration.x * parallaxScale +
            easedScrollVelocity.x * scrollScale)
      }em`;
      el.style.transform = `scale(${Math.pow(5, z * easedAcceleration.z)}}`;
    });
  }, 3);
});
