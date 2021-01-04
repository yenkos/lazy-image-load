### simple config preview
![](https://raw.githubusercontent.com/yenkos/PicGo/main/img/%E6%88%AA%E5%B1%8F2021-01-04%20%E4%B8%8A%E5%8D%889.52.36.png)

### usage
- get browser type and version
- checkout browser support
- show tips

### API check support and show tips(ESM)
```Javascript
import { BrowserVersionTool } from 'browser-version-tool-html';
// full config
new BrowserVersionTool({
  showTips: true,
  customTips: false,
  tips: {
    logo: 'https://img1.xxx.cn/assest/202007/SUPER5F0E785676F3B.png',
    url: 'https://www.xxxx.com/',
    copyright: '粤ICP备xxx',
    name: 'xxx公司/网站',
  },
  support: {
    'IE': 'none',
    'EDGE': '19',
    'Firefox': '67',
    'Chrome': '63', // android 5 last
    'Opera': '50',
    'Safari': '11', // IOS 11 last
    'Unkonwn': 'none',
  },
}).checkSupport();

// simple config
new BrowserVersionTool({
  support: {
    'IE': 'none',
    'EDGE': '19',
  },
}).checkSupport();
```

### API get version(ESM)
```Javascript
import { BrowserVersionTool } from 'browser-version-tool-html';
new BrowserVersionTool().getExplore(); // print { type: 'Chrome', version: '80', support: 'all' }
```

### API get version(UMD script)
```html
<script type="text/javascript" src="/js/browser-version-tool.umd.js"></script>
<script>
new window.GLWidget.BrowserVersionTool().getExplore(); // print { type: 'Chrome', version: '80', support: 'all' }
</script>
```
### config
```Javascript
interface Config {
  showTips?: boolean; // 是否显示html提示 is show html tips
  customTips?: string; // 自定义html提示 custom tips
  tips?: Tips; // 内置html提示的一些定制样式 default tips customization
  support?: Support; // 定义浏览器最小支持的版本 support last version
}

interface Tips {
  logo: string; // 默认提示的logo logo
  url: string; // 默认提示的url jump url
  copyright: string; // 默认提示的底部 copyright
  name: string; // 默认提示的底部显示名字 website name / company name
}

// 限定最低支持的版本
interface Support {
  IE?: string | number, // none | all | number(最小支持的版本 last version)
  EDGE?: string | number,
  Firefox?: string | number,
  Chrome?: string | number,
  Opera?: string | number,
  Safari?: string | number,
  Unkonwn?: string | number, // 其他厂商浏览器 other browser
}
```