// KET词汇学习系统 - 功能测试脚本
const fs = require('fs');
const path = require('path');

console.log('🧪 KET词汇学习系统 - 功能测试开始...\n');

// 测试结果统计
const testResults = {
    passed: 0,
    failed: 0,
    tests: []
};

// 测试函数
function test(name, testFn) {
    try {
        testFn();
        testResults.passed++;
        testResults.tests.push({ name, status: '✅ 通过' });
        console.log(`✅ ${name}`);
    } catch (error) {
        testResults.failed++;
        testResults.tests.push({ name, status: '❌ 失败', error: error.message });
        console.log(`❌ ${name}: ${error.message}`);
    }
}

// 1. 测试数据文件存在性
test('数据文件存在性', () => {
    const vocabPath = path.join(__dirname, 'data', 'vocabulary.json');
    const categoriesPath = path.join(__dirname, 'data', 'categories.json');
    
    if (!fs.existsSync(vocabPath)) {
        throw new Error('vocabulary.json 文件不存在');
    }
    if (!fs.existsSync(categoriesPath)) {
        throw new Error('categories.json 文件不存在');
    }
    
    console.log(`  📁 vocabulary.json: ${fs.statSync(vocabPath).size} bytes`);
    console.log(`  📁 categories.json: ${fs.statSync(categoriesPath).size} bytes`);
});

// 2. 测试词汇数据格式
test('词汇数据格式', () => {
    const vocabPath = path.join(__dirname, 'data', 'vocabulary.json');
    const vocabulary = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
    
    if (!Array.isArray(vocabulary)) {
        throw new Error('词汇数据不是数组格式');
    }
    
    if (vocabulary.length === 0) {
        throw new Error('词汇数据为空');
    }
    
    // 检查第一个词汇的必需字段
    const firstWord = vocabulary[0];
    const requiredFields = ['id', 'english', 'ipa', 'chinese', 'category'];
    
    for (const field of requiredFields) {
        if (!firstWord[field]) {
            throw new Error(`缺少必需字段: ${field}`);
        }
    }
    
    console.log(`  📊 词汇总数: ${vocabulary.length}`);
    console.log(`  🔍 示例词汇: ${firstWord.english} - ${firstWord.chinese}`);
});

// 3. 测试分类数据格式
test('分类数据格式', () => {
    const categoriesPath = path.join(__dirname, 'data', 'categories.json');
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
    
    if (typeof categories !== 'object') {
        throw new Error('分类数据不是对象格式');
    }
    
    const categoryNames = Object.keys(categories);
    if (categoryNames.length === 0) {
        throw new Error('分类数据为空');
    }
    
    console.log(`  📂 分类数量: ${categoryNames.length}`);
    console.log(`  📝 分类列表: ${categoryNames.join(', ')}`);
    
    // 检查每个分类的词汇数量
    let totalWords = 0;
    for (const [category, words] of Object.entries(categories)) {
        if (!Array.isArray(words)) {
            throw new Error(`分类 ${category} 的词汇不是数组格式`);
        }
        totalWords += words.length;
        console.log(`  📚 ${category}: ${words.length} 个词汇`);
    }
    
    console.log(`  📊 总词汇数: ${totalWords}`);
});

// 4. 测试服务器配置
test('服务器配置', () => {
    const serverPath = path.join(__dirname, 'server.js');
    const packagePath = path.join(__dirname, 'package.json');
    
    if (!fs.existsSync(serverPath)) {
        throw new Error('server.js 文件不存在');
    }
    
    if (!fs.existsSync(packagePath)) {
        throw new Error('package.json 文件不存在');
    }
    
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const requiredDeps = ['express', 'cors', 'xlsx'];
    
    for (const dep of requiredDeps) {
        if (!packageJson.dependencies[dep]) {
            throw new Error(`缺少依赖: ${dep}`);
        }
    }
    
    console.log(`  🖥️  服务器文件: server.js`);
    console.log(`  📦 依赖包: ${requiredDeps.join(', ')}`);
});

// 5. 测试前端文件
test('前端文件', () => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    
    if (!fs.existsSync(indexPath)) {
        throw new Error('index.html 文件不存在');
    }
    
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // 检查关键元素
    const requiredElements = [
        'Vue',
        'flip-card',
        '艾宾浩斯',
        'speechSynthesis',
        'localStorage'
    ];
    
    for (const element of requiredElements) {
        if (!indexContent.includes(element)) {
            throw new Error(`缺少关键元素: ${element}`);
        }
    }
    
    console.log(`  🌐 前端文件: index.html`);
    console.log(`  📄 文件大小: ${fs.statSync(indexPath).size} bytes`);
});

// 6. 测试艾宾浩斯算法实现
test('艾宾浩斯算法实现', () => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    
    if (!fs.existsSync(indexPath)) {
        throw new Error('index.html 文件不存在');
    }
    
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // 检查关键函数/计算属性
    const requiredFunctions = [
        'calculateNextReview', // 检查计算下一个复习日期的函数
        'wordsForReview',      // 检查获取待复习单词的计算属性
        'markAsMastered'       // 检查标记为“已掌握”的函数
    ];
    
    for (const func of requiredFunctions) {
        if (!indexContent.includes(func)) {
            throw new Error(`前端实现中缺少关键逻辑: ${func}`);
        }
    }
    
    console.log(`  🧠 算法实现于: public/index.html`);
    console.log(`  ⚙️  关键逻辑: ${requiredFunctions.join(', ')}`);
});

// 8. 测试构建脚本
test('构建脚本', () => {
    const scriptPath = path.join(__dirname, 'scripts', 'build-vocabulary.js');
    
    if (!fs.existsSync(scriptPath)) {
        throw new Error('build-vocabulary.js 脚本不存在');
    }
    
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    
    // 检查关键函数
    const requiredFunctions = [
        'buildVocabularyData',
        'workbook.SheetNames',
        'XLSX.utils.sheet_to_json'
    ];
    
    for (const func of requiredFunctions) {
        if (!scriptContent.includes(func)) {
            throw new Error(`缺少函数: ${func}`);
        }
    }
    
    console.log(`  🔨 构建脚本: build-vocabulary.js`);
    console.log(`  🛠️  关键功能: ${requiredFunctions.join(', ')}`);
});

// 9. 测试数据一致性
test('数据一致性', () => {
    const vocabPath = path.join(__dirname, 'data', 'vocabulary.json');
    const categoriesPath = path.join(__dirname, 'data', 'categories.json');
    
    const vocabulary = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
    
    // 检查词汇总数是否一致
    let totalCategorizedWords = 0;
    for (const words of Object.values(categories)) {
        totalCategorizedWords += words.length;
    }
    
    if (vocabulary.length !== totalCategorizedWords) {
        throw new Error(`词汇数量不一致: 总词汇 ${vocabulary.length}, 分类词汇 ${totalCategorizedWords}`);
    }
    
    // 检查ID唯一性
    const ids = new Set();
    for (const word of vocabulary) {
        if (ids.has(word.id)) {
            throw new Error(`重复的词汇ID: ${word.id}`);
        }
        ids.add(word.id);
    }
    
    console.log(`  ✅ 词汇数量一致: ${vocabulary.length}`);
    console.log(`  ✅ ID唯一性: ${ids.size} 个唯一ID`);
});

// 10. 测试网络接口模拟
test('网络接口模拟', () => {
    const serverPath = path.join(__dirname, 'server.js');
    const serverContent = fs.readFileSync(serverPath, 'utf8');
    
    // 检查API端点
    const requiredEndpoints = [
        '/data/vocabulary.json',
        '/data/categories.json',
        '/api/progress'
    ];
    
    for (const endpoint of requiredEndpoints) {
        if (!serverContent.includes(endpoint)) {
            throw new Error(`缺少API端点: ${endpoint}`);
        }
    }
    
    console.log(`  🌐 API端点: ${requiredEndpoints.join(', ')}`);
});

// 测试结果总结
console.log('\n📊 测试结果总结:');
console.log('='.repeat(50));
testResults.tests.forEach(test => {
    console.log(`${test.status} ${test.name}`);
    if (test.error) {
        console.log(`     错误: ${test.error}`);
    }
});

console.log('\n📈 统计信息:');
console.log(`✅ 通过: ${testResults.passed}`);
console.log(`❌ 失败: ${testResults.failed}`);
console.log(`📊 总计: ${testResults.passed + testResults.failed}`);
console.log(`🎯 成功率: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);

if (testResults.failed === 0) {
    console.log('\n🎉 所有测试通过！系统已准备就绪。');
    console.log('🚀 您可以运行 "npm start" 启动应用。');
} else {
    console.log('\n⚠️  有测试失败，请修复问题后重新运行测试。');
}

// 使用说明
console.log('\n📖 使用说明:');
console.log('1. 确保已安装所有依赖: npm install');
console.log('2. 构建数据: node scripts/build-vocabulary.js');
console.log('3. 启动服务器: npm start');
console.log('4. 访问应用: http://localhost:3000');
console.log('5. 测试功能: 打开浏览器进行功能测试');

// 功能特性说明
console.log('\n🌟 系统特性:');
console.log('• 📚 524个KET词汇，17个分类');
console.log('• 🎯 抽认卡学习模式');
console.log('• 🧠 艾宾浩斯记忆曲线算法');
console.log('• 🔊 语音朗读功能');
console.log('• 📊 学习进度统计');
console.log('• 💾 本地数据存储');
console.log('• 📱 响应式设计');
console.log('• 🔄 数据导入导出');

module.exports = { testResults };