### simple config preview
![](https://raw.githubusercontent.com/yenkos/PicGo/main/img/%E6%88%AA%E5%B1%8F2021-01-04%20%E4%B8%8B%E5%8D%889.20.16.png)
![](https://raw.githubusercontent.com/yenkos/PicGo/main/img/%E6%88%AA%E5%B1%8F2021-01-04%20%E4%B8%8B%E5%8D%889.20.46.png)

### browser support
- Edge 16+
- firefox 55+
- chrome 58+
- ios 12.2+
- android 6+

### describe
- Depend on IntersectionObserver API
- Auto Fallback
- Customize loading style
- Customize loaded error style

### example
```Javascript
import lazy from 'lazy-image-load';
const app = createApp({
  render() {
    return Vue.h('div', {})
  }
});
app.directive('lazy', lazy);

```

```html
<!-- support src or data-src -->
<img v-lazy src="[https://](https://avatars0.githubusercontent.com/u/69024391?s=60&v=4)">
<img v-lazy data-src="[https://](https://avatars0.githubusercontent.com/u/69024391?s=60&v=4)">

<!-- Customize loading and error -->
<span>
  <img v-lazy data-src="[https://](https://avatars0.githubusercontent.com/u/69024391?s=60&v=4)">
  <div class="loading-tips img-tips">
    show loading...
  </div>
  <div class="error-tips img-tips">
    show error
  </div>
</span>
```

```less
.img-tips {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(192, 196, 204);
  font-size: 12px;
  background: rgb(255, 255, 255);
  opacity: 0;
  transition: opacity 1s ease;
}
.loading {
  .loading-tips {
    opacity: 1;
  }
}
.error {
  .error-tips {
    opacity: 1;
  }
}
```