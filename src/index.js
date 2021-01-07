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
      const { target, isIntersecting } = entry;
      if (isIntersecting) {
        loadImage(target.getAttribute('data-src'))
          .then(({ src }) => {
            target.src = src;
            window.requestAnimationFrame(() => {
              target.style.opacity = 1;
            });
          })
          .catch(() => {
            target.src = '';
            target.parentNode.classList.add('error');
          })
          .finally(() => {
            target.parentNode.classList.remove('loading');
            target.parentNode.classList.add('loaded');
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
    el.setAttribute('data-src', src || dataSrc);
    el.src = '';
    el.style.opacity = 0;
    el.style.transform = 'translate3d(0, 0, 0)';
    el.style.transition = 'all 1s ease';
    lazyImageObserver.observe(el);
  },
  mounted(el) {
    el.parentNode.classList.add('loading');
  },
  unmounted(el) {
    lazyImageObserver.unobserve(el);
  },
};
