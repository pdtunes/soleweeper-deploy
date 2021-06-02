export default function displayMessage(message, targetEl) {
  const el = document.querySelector(targetEl);
  el.innerHTML = `<div class="message">${message}</div>`;
}
