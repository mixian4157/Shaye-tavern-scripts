import { createApp } from 'vue';
import app from './app.vue';

// 加载 FontAwesome 图标库
function loadFontAwesome() {
  return new Promise<void>(resolve => {
    // 检查是否已经加载
    if (document.querySelector('link[href*="font-awesome"]') || document.querySelector('link[href*="fontawesome"]')) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==';
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';

    link.onload = () => {
      console.info('FontAwesome 图标库加载成功');
      resolve();
    };
    link.onerror = () => {
      console.warn('FontAwesome 图标库加载失败，图标可能不显示');
      resolve(); // 即使加载失败也继续
    };

    document.head.appendChild(link);
  });
}

// 兼容独立打开和酒馆环境
async function init() {
  try {
    // 先加载 FontAwesome
    await loadFontAwesome();

    // 挂载 Vue 应用
    createApp(app).mount('#app');
    console.info('莎夜健康状态界面加载成功');
  } catch (error) {
    console.error('莎夜界面加载失败:', error);
    const appElement = document.getElementById('app');
    if (appElement) {
      appElement.innerHTML = `
        <div style="padding: 20px; color: red; background: #f0f0f0; border-radius: 8px;">
          <h3>加载错误</h3>
          <p>${error instanceof Error ? error.message : String(error)}</p>
          <p style="font-size: 12px; color: #666; margin-top: 10px;">请检查浏览器控制台获取更多信息</p>
        </div>
      `;
    }
  }
}

// 检查是否在酒馆环境中（有 jQuery 和 errorCatched）
if (typeof $ !== 'undefined' && typeof errorCatched !== 'undefined') {
  $(() => {
    errorCatched(init)();
  });
} else if (typeof $ !== 'undefined') {
  // 只有 jQuery，没有 errorCatched
  $(() => {
    init();
  });
} else {
  // 独立打开，使用 DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}
