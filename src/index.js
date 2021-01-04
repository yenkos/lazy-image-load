/**
 * Edge 16+
 * firefox 55+
 * chrome 58+
 * ios 12.2+
 * android 6+
 */

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      return resolve({
        src,
        img,
      });
    };
    img.onerror = () => {
      return reject();
    }
    img.src = src;
  })
}

const lazyImageObserver = (() => {
  if (!window.IntersectionObserver) {
    return null;
  }
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const { target, intersectionRatio } = entry;
      if (intersectionRatio > 0) {
        loadImage(target.getAttribute('data-src'))
          .then(({ src }) => {
            // requestAnimationFrame比IntersectionObserver支持更好，就不再检测了
            window.requestAnimationFrame(() => {
              target.src = src;
              target.style.transition = 'all 1s ease';
              target.style.opacity = 1;
              target.setAttribute('data-loaded', 'true');
            });
            target.style.opacity = 0;
          })
          .catch(() => {
            target.src = '';
            target.setAttribute('data-loaded', 'false');
            target.classList.add('img-error');
          })
          .finally(() => {
            target.classList.remove('img-loading');
          });
        lazyImageObserver.unobserve(target);
      }
    })
  });
})();

export default {
  beforeMount(el) {
    // 添加监听
    const src = el.getAttribute('src');
    const dataSrc = el.getAttribute('data-src');
    // 非图片元素
    if (el.tagName !== 'IMG') {
      return;
    }
    // 浏览器不支持，进行回退
    if (!window.IntersectionObserver) {
      if (!src && dataSrc) {
        el.setAttribute('src', dataSrc);
      }
      return;
    }
    // 没有设置图片src或data-src
    if (!src && !dataSrc) {
      return;
    }
    el.style.opacity = 1;
    el.setAttribute('data-src', src || dataSrc);
    el.setAttribute('src', '');
    el.classList.add('img-loading');
    lazyImageObserver.observe(el);
  },
};
