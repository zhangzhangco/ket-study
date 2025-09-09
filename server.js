const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 获取词汇数据
app.get('/data/vocabulary.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'vocabulary.json'));
});

// 获取分类数据
app.get('/data/categories.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'categories.json'));
});

// 获取学习进度
app.get('/api/progress', (req, res) => {
    // 这里可以连接数据库或文件存储
    res.json({});
});

// 更新学习进度
app.post('/api/progress', (req, res) => {
    // 这里可以连接数据库或文件存储
    res.json({ success: true });
});

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器内部错误' });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log('数据目录:', path.join(__dirname, 'data'));
});

module.exports = app;