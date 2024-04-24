const { execSync } = require('child_process');
const fs = require('fs-extra');

// 执行 Vite 构建命令
try {
    console.log('Building with Vite...');
    execSync('vite build', { stdio: 'inherit' });
    console.log('Vite build completed successfully.');
} catch (error) {
    console.error('Vite build failed:', error);
    process.exit(1);
}

// 复制 api 文件夹到 dist 文件夹
try {
    console.log('Copying api folder to dist...');
    fs.copySync('api', 'dist/api');
    console.log('api folder copied successfully.');
} catch (error) {
    console.error('Error copying api folder:', error);
    process.exit(1);
}