const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// 读取Excel文件并构建词汇数据
function buildVocabularyData() {
  const workbook = XLSX.readFile('KET_Vocabulary_with_IPA.xlsx');
  const vocabulary = [];
  const categories = new Map();
  let wordIdCounter = 1;

  // 处理每个sheet
  workbook.SheetNames.forEach(sheetName => {
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(`处理分类: ${sheetName}, 数据行数: ${data.length}`);
    
    data.forEach((row, rowIndex) => {
      // 处理第一列数据（英文、音标、中文）
      if (row['英文']) {
        const word = {
          id: `word_${wordIdCounter++}`,
          english: row['英文'],
          ipa: row['音标'],
          chinese: row['中文'],
          category: sheetName
        };
        vocabulary.push(word);
        
        // 添加到分类
        if (!categories.has(sheetName)) {
          categories.set(sheetName, []);
        }
        categories.get(sheetName).push(word);
      }
      
      // 处理第二列数据（如果有）
      if (row['__EMPTY']) {
        const word = {
          id: `word_${wordIdCounter++}`,
          english: row['__EMPTY'],
          ipa: row['__EMPTY_1'],
          chinese: row['__EMPTY_2'],
          category: sheetName
        };
        vocabulary.push(word);
        
        // 添加到分类
        if (!categories.has(sheetName)) {
          categories.set(sheetName, []);
        }
        categories.get(sheetName).push(word);
      }
    });
  });

  // 创建数据目录
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // 保存词汇数据
  fs.writeFileSync(
    path.join(dataDir, 'vocabulary.json'),
    JSON.stringify(vocabulary, null, 2)
  );

  // 保存分类数据
  const categoriesData = {};
  categories.forEach((words, category) => {
    categoriesData[category] = words;
  });
  
  fs.writeFileSync(
    path.join(dataDir, 'categories.json'),
    JSON.stringify(categoriesData, null, 2)
  );

  console.log(`\n成功构建 ${vocabulary.length} 个词汇数据`);
  console.log(`包含 ${categories.size} 个分类`);
  
  // 显示每个分类的词汇数量
  categories.forEach((words, category) => {
    console.log(`- ${category}: ${words.length} 个词汇`);
  });
  
  return { vocabulary, categories: categoriesData };
}


// 如果直接运行此脚本
if (require.main === module) {
  buildVocabularyData();
}

module.exports = { buildVocabularyData };