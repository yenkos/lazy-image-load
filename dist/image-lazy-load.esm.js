var t=window.IntersectionObserver?new IntersectionObserver((function(e){e.forEach((function(e){var r,n=e.target;e.intersectionRatio>0&&((r=n.getAttribute("data-src"),new Promise((function(t,e){var n=new Image;n.onload=function(){return t({src:r,img:n})},n.onerror=function(){return e()},n.src=r}))).then((function(t){var e=t.src;window.requestAnimationFrame((function(){n.src=e,n.style.transition="all 1s ease",n.style.opacity=1,n.setAttribute("data-loaded","true")})),n.style.opacity=0})).catch((function(){n.src="",n.setAttribute("data-loaded","false"),n.classList.add("img-error")})).finally((function(){n.classList.remove("img-loading")})),t.unobserve(n))}))})):null,e={beforeMount:function(e){var r=e.getAttribute("src"),n=e.getAttribute("data-src");"IMG"===e.tagName&&(window.IntersectionObserver?(r||n)&&(e.style.opacity=1,e.setAttribute("data-src",r||n),e.setAttribute("src",""),e.classList.add("img-loading"),t.observe(e)):!r&&n&&e.setAttribute("src",n))},unmounted:function(e){t.unobserve(e)}};export default e;
