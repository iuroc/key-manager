## 页面开发计划

1. 管理员生成卡密
2. 客户拿到卡密，输入卡密
3. 卡密校验通过，跳转到微信客服，自动提示：请发送卡密给我哦
4. 人工客服接待，校验卡密同时成功后就销毁卡密，卡密被标注为销毁，不需要删除
5. 将教程文档发送给客户

## 技术架构

PHP + MySQL + Van.js

## 快速开始

1. 前端打包
    ```bash
    npm install
    npm run build
    ```
2. 将 `dist` 目录设置为网站根目录
3. 创建数据库，并将数据库的配置信息写入到 `api/config.php`
4. 访问 `api/init.php` 进行初始化数据库
5. 访问站点根目录即可
