const themeSelector = document.querySelector('#theme-selector');

function changeTheme() {
  const theme = themeSelector.value;

  const body = document.body;
  const logo = document.querySelector('#logo');

  if (theme === 'light') {
    body.classList.remove('dark');
    logo.src = 'images/byui-logo_blue.webp';

  } else {
    body.classList.add('dark');
    logo.src = 'images/byui-logo_white.webp';
  }
}

themeSelector.addEventListener('change', changeTheme);