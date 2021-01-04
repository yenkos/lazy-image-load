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

interface BrowerExplore {
  type: string;
  support: string | number;
  version?: string | number;
}

export class BrowserVersionTool {
  public config: Config;
  constructor(config: Config) {
    this.config = {
      showTips: true,
      customTips: '',
      tips: {
        logo: '',
        url: '',
        copyright: '',
        name: '',
      },
      support: {
        'IE': '',
        'EDGE': '',
        'Firefox': '',
        'Chrome': '',
        'Opera': '',
        'Safari': '',
        'Unkonwn': '',
      },
      ...config,
    };
  }

  getExplore(): BrowerExplore {
    const Sys: any = {};
    const ua = navigator.userAgent.toLowerCase();
    let s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    (s = ua.match(/msie ([\d\.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/edge\/([\d\.]+)/)) ? Sys.edge = s[1] :
    (s = ua.match(/firefox\/([\d\.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/chrome\/([\d\.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/version\/([\d\.]+).*safari/)) ? Sys.safari = s[1] : 0;

    const support = this.config.support || {};
    if (Sys.ie) return { type: 'IE', version: Sys.ie, support: support['IE'] || 'all' };
    if (Sys.edge) return { type: 'EDGE', version: Sys.edge, support: support['EDGE'] || 'all' };
    if (Sys.firefox) return { type: 'Firefox', version: Sys.firefox, support: support['Firefox'] || 'all' };
    if (Sys.chrome) return { type: 'Chrome', version: Sys.chrome, support: support['Chrome'] || 'all' };
    if (Sys.opera) return { type: 'Opera', version: Sys.opera, support: support['Opera'] || 'all' };
    if (Sys.safari) return { type: 'Safari', version: Sys.safari, support: support['Safari'] || 'all' };
    return { type: 'Unkonwn', support: support['Unkonwn'] || 'all' };
  }

  showNoSupportTips() {
    if (!this.config.showTips) {
      console.error('浏览器不兼容，请下载Chrome浏览器以获得更好体验');
      return;
    }
    const { logo, url, copyright, name } = this.config.tips || {};
    const { customTips } = this.config;
    document.body.innerHTML = customTips || `
      <div style="color: #666;">
        ${ logo ? `<img style="margin: 100px auto 0; display: block; width: 200px;" src="${logo}" />` : '' }
        <div style="padding: 0 0 64px; overflow: hidden;">
          <div style="position: relative; height: 200px; margin: 150px auto; display: flex; justify-content: center; align-items: center; max-width: 80%;">
            <div style="font-size: 14px; line-height: 2;">
              <p><span>使用当前浏览器访问，无法享受最佳体验，推荐升级到最新版本或使用<a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank"> Chrome </a> 浏览器进行访问。</span></p>
              <p><span>Use the current browser to access, you cant enjoy the best experience. It is recommended to upgrade your browser to latest version, or you can use<a href="https://www.google.com/chrome/" target="_blank"> Chrome </a> browser.</span></p>
            </div>
          </div>
        </div>
        <div style="padding-bottom: 20px; color: #999; text-align: center;">
          <div style="font-size: 12px;">
            ${ name ? `<p><a href="${url}" target="_blank">© ${name}</a></p>` : '' }
            ${ copyright ? `<p><a href="${url}" target="_blank">${copyright}</a></p>` : '' }
          </div>
        </div>
      </div>`
  }

  checkSupport() {
    const res = this.getExplore();
    if (res.support === 'all') {
      return;
    }
    // 不支持，或者获取不到版本
    if (res.support === 'none' || !res.version) {
      this.showNoSupportTips();
      return;
    }
    if (parseInt(res.support.toString()) > parseInt(res.version.toString())) {
      this.showNoSupportTips();
    }
  }
}