### 包含功能
- 获取浏览器类型以及版本号
- 检测浏览器是否支持指定版本的浏览器
- 输出提示

### API 浏览器检测
示例：指定支持ESM的浏览器才能打开，否则输出提示
```Javascript
new BrowserTips({
  tips: {
    logo: 'https://img1.xxx.cn/assest/202007/SUPER5F0E785676F3B.png',
    url: 'https://www.xxxx.com/',
    copyright: '粤ICP备xxx',
    name: 'xxx',
  },
  support: {
    'IE': 'none',
    'EDGE': '19',
    'Firefox': '67',
    'Chrome': '63', // 安卓5以上
    'Opera': '50',
    'Safari': '11', // IOS 11以上
    'Unkonwn': 'none',
  },
}).check();
```

### API 获取浏览器版本号
示例：指定支持ESM的浏览器才能打开，否则输出提示
```Javascript
new BrowserTips().getExplore();
// 输出 { type: 'Chrome', version: '80', support: 'all' }
```

### 完整config
```Javascript
interface Config {
  showTips?: boolean; // 是否显示html提示
  customTips?: string; // 自定义html提示
  tips?: Tips;
  support?: Support;
}

interface Tips {
  logo: string; // 默认提示的logo
  url: string; // 默认提示的url
  copyright: string; // 默认提示的底部copyright
  name: string; // 默认提示的底部显示名字
}

// 限定最低支持的版本
interface Support {
  IE?: string | number, // none | all | minSupportVersion
  EDGE?: string | number,
  Firefox?: string | number,
  Chrome?: string | number, // 安卓5以上
  Opera?: string | number,
  Safari?: string | number, // IOS 11以上
  Unkonwn?: string | number, // 其他厂商浏览器，一般也是多核的，会被chrome捕获
}
```