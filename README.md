# 玲辉门&家具厂 - 产品展示官网

福建省泉州市晋江市英林镇 | 铝合金门窗·家具定制

## 文件说明

```
├── index.html         # 首页
├── products.html      # 产品中心
├── cases.html         # 工程案例
├── about.html         # 关于我们
├── inquiry.html       # 在线询价
├── css/               # 样式
├── js/                # 脚本
├── assets/images/     # 图片资源
├── robots.txt         # SEO
├── sitemap.xml        # 站点地图
└── favicon.svg        # 网站图标
```

## 使用说明

### 修改联系方式
在所有 HTML 文件中搜索 `13800000000` 替换为真实电话号码

### 修改产品
编辑 `js/products.js` 中的 `products` 数组

### 修改案例
编辑 `js/cases.js` 中的 `cases` 数组

### 替换微信二维码
1. 准备一张微信二维码图片（命名为 `wechat-qr.png`）
2. 放入 `assets/images/` 目录
3. 在所有 HTML 文件中找到 `.qr-placeholder` 区域，替换为 `<img src="assets/images/wechat-qr.png" alt="微信二维码" style="width:200px;height:200px;">`

### 替换产品图片
在 `js/products.js` 中每个产品的 `image` 字段填入实际图片路径

### 部署到 Gitee Pages
1. 注册 Gitee 账号 (https://gitee.com)
2. 创建仓库，推送代码
3. 服务 → Gitee Pages → 开启
4. 获得免费域名 `username.gitee.io`

### 后续接入后端
编辑 `js/inquiry.js` 中的 `CONFIG.endpoint`，填入后端 API 地址，询价数据将自动 POST 到服务器。

---

© 2026 玲辉门&家具厂
