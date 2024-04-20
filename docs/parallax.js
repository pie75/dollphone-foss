const parallaxScale = 0.5;
const easedAcceleration = {
  x: 0,
  y: 0,
  z: 0,
}
let lastAcceleration = {
  x: 0,
  y: 0,
  z: 0,
}
const easingRatio = 0.2;
document.addEventListener("DOMContentLoaded", () => {
  const els = document.querySelectorAll(".parallax");
  window.addEventListener("devicemotion", (e) => {
    console.log(e.acceleration);
    lastAcceleration = e.acceleration;
  });
  setInterval(() => {
    easedAcceleration.x = easingRatio * lastAcceleration.x + (1 - easingRatio) * easedAcceleration.x;
    easedAcceleration.y = easingRatio * lastAcceleration.y + (1 - easingRatio) * easedAcceleration.y;
    easedAcceleration.z = easingRatio * lastAcceleration.z + (1 - easingRatio) * easedAcceleration.z;
    els.forEach((el) => {
      const top = parseFloat(el.dataset.top);
      const left = parseFloat(el.dataset.left);
      const z = parseFloat(el.dataset.z);
      el.style.top = `${top + z * easedAcceleration.y * parallaxScale}em`;
      el.style.left = `${left + z * -easedAcceleration.x * parallaxScale}em`;
      el.style.transform = `scale(${Math.pow(5, z * easedAcceleration.z)}}`;
    });
  }, 3);
});