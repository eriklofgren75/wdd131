const menuButton = document.querySelector(".menu-button");
const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImg = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("hide");
}

function handleResize() {
    const menu = document.querySelector(".menu");
    if (window.innerWidth > 1000) {
        menu.classList.remove("hide");
    } else {
        menu.classList.add("hide")
    }
}

menuButton.addEventListener("click", toggleMenu);
window.addEventListener("resize", handleResize);
handleResize();

document.querySelectorAll(".gallery img").forEach((img) => {
  img.addEventListener("click", () => {
    const dialog = document.createElement("dialog");
    dialog.innerHTML = `
      <img src="${img.src}" alt="${img.alt}">
      <button class="close-viewer">X</button>
    `;
    document.body.appendChild(dialog);
    dialog.showModal();

    dialog.querySelector(".close-viewer").addEventListener("click", () => {
      dialog.close();
      dialog.remove();
    });
  });
});

gallery.addEventListener('click', (event) => {
  const clickedImg = event.target.closest('img');

  if (!clickedImg) return;

  const src = clickedImg.getAttribute('src');
  const alt = clickedImg.getAttribute('alt');

  const fullSrc = src.split('-')[0] + '-full.jpeg';

  modalImg.setAttribute('src', fullSrc);
  modalImg.setAttribute('alt', alt);

  modal.showModal();
});

closeButton.addEventListener('click', () => {
  modal.close();
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close();
  }
});