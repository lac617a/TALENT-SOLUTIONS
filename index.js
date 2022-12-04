const handlePlainContent = (result) => {
  const main = document.querySelector('main');
  const form = document.querySelector('.ts-article-form')
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('template').content;

  result.forEach((item) => {
    const { id, title, content, button: b, img: image } = item;
    const p = document.createElement('p');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const button = document.createElement('button');
    const ts_section = template.querySelectorAll('.ts-section');
    ts_section.forEach(node => node.innerHTML = '');
    
    h2.textContent = title;
    p.innerHTML = content;
    button.textContent = b;
    img.src = image;
    img.alt = `${id}-${title}`;
    
    const resize = window.innerWidth;
    if (resize >= 768) {
      if (id % 2 === 0) {
        img.setAttribute('dir', 'ltr');
        img.classList.add('is-right');
        ts_section.item(0).appendChild(img);
        ts_section.item(1).append(h2, p, button);
      } else {
        img.setAttribute('dir', 'rtl');
        img.classList.add('is-left');
        ts_section.item(0).append(h2, p, button);
        ts_section.item(1).appendChild(img);
      }
    } else {
      img.setAttribute('dir', 'ltr');
      img.classList.add('is-right');
      ts_section.item(0).append(h2, p, button);
      ts_section.item(1).appendChild(img);
    }
    
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });
  main.append(fragment, form);
}


const optionRoot = {
  root: document,
  rootMargin: '0px',
  threshold: 0
}


const useElementOnScreen = (node, style, option = optionRoot) => {
  const callback = entries => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      node.classList.add(style);
    } else {
      node.classList.remove(style);
    }
  }

  const observer = new IntersectionObserver(callback, option)
  if (node) {
    observer.observe(node);
  } else {
    observer.unobserve(node);
  }
}

const animated = () => {
  const btn = document.querySelectorAll('.ts-section button');
  const ts_section = document.querySelectorAll('.ts-section img');

  ts_section.forEach(node => {
    if (node.getAttribute('dir') == 'ltr') {
      useElementOnScreen(node, 'is-animate-left');
    } else {
      useElementOnScreen(node, 'is-animate-right');
    }

  });

  btn.forEach(node => {
    useElementOnScreen(node, 'is-animate');
  });
}

const handleData = () => {
  fetch('content.json')
  .then(data =>
    data.json().then(result => handlePlainContent(result))
  )
  .then(animated)
  .catch(e => console.error(e));
}


document.addEventListener('DOMContentLoaded', () => {
  handleData();

  const btnMenu = document.querySelector('.ts-menu-btn');
  const headerNavbar = document.querySelector('.ts-header-navbar');
  btnMenu.addEventListener('click', () => {
    headerNavbar.classList.toggle('show');
    btnMenu.classList.toggle('open');
  })
});

