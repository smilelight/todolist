const QCloud = require('./qclooud')
QCloud.init({
  module: 'wenzhi',
  secretId: 'AKIDujTEsMDuthKn7UrIVjny4ziFajXFot7D',
  secretKey: 'IEJSXTTEH6vc7Wnv1yoV4SrcIn2A6qUx'
})

/**
 * 具体参数及其用法参见https://cloud.tencent.com/document/api/271
 */

/**
 * 情感分析
 * params: {content:String,eg:"李亚鹏挺王菲：加油！孩他娘。"}
 * fthen:成功时回调函数，下同
 * fcatch:异常时回调函数，下同
 */
const TextSentiment = function(params,fthen,fcatch){
  QCloud.use('TextSentiment', params,fthen,fcatch)
}

/**
 * 文本抓取
 * params: {url:String,eg:'http://www.iamlightsmile.com'}
 */
const ContentGrab = function (params, fthen, fcatch) {
  QCloud.use('ContentGrab', params, fthen, fcatch)
}

/**
 * 内容转码
 * params:{url:String,eg:'http://www.iamlightsmile.com',
 *         to_html:0/1,eg:1}
 */
const ContentTranscode = function (params, fthen, fcatch) {
  QCloud.use('ContentTranscode', params, fthen, fcatch)
}

/**
 * 分词、词性标注、命名实体识别
 * params：{
    'text':String,eg: "我爱洗澡",
    'code':Number,eg: 0x00200000, #0x00200000表示utf-8
    'type':Number,eg: 0 #取值 0 或 1，默认为 0。 0 为基础粒度版分词，倾向于将句子切分的更细，在搜索场景使用为佳。 1 为混合粒度版分词，倾向于保留更多基本短语不被切分开。
}
 */

const LexicalAnalysis = function (params, fthen, fcatch) {
  QCloud.use('LexicalAnalysis', params, fthen, fcatch)
}

/**
 * 文本纠错
 * params = {
    'text': String,eg:'人生苦短，我用Python！哼哼哈嘿！巴啦巴啦小魔仙！'
}
 */
const LexicalCheck = function (params, fthen, fcatch) {
  QCloud.use('LexicalCheck', params, fthen, fcatch)
}

/**
 * 同义词
 * params = {
    'text':String,eg: '人生苦短，我用Python。我爱自然语言处理和知识图谱！'
}
 */
const LexicalSynonym = function (params, fthen, fcatch) {
  QCloud.use('LexicalSynonym', params, fthen, fcatch)
}

/**
 * 文本分类
 * params = {
    'content':String,eg:'人生苦短，please Python。太祖、刘邦、朱元璋哪个更厉害？！'
}
 */
const TextClassify = function (params, fthen, fcatch) {
  QCloud.use('TextClassify', params, fthen, fcatch)
}

/**
 * 句法分析
 * params = {
    'content':String,eg: '我爱自然语言处理'
}
 */
const TextDependency = function (params, fthen, fcatch) {
  QCloud.use('TextDependency', params, fthen, fcatch)
}

/**
 * 关键词提取
 * params = {
    'title': String，eg：'自然语言处理',
    'content': String，eg：'''自然语言处理（英语：natural language processing，缩写作 NLP）是人工智能和语言学领域的分支学科。此领域探讨如何处理及运用自然语言；自然语言认知则是指让电脑“懂”人类的语言。
自然语言生成系统把计算机数据转化为自然语言。自然语言理解系统把自然语言转化为计算机程序更易于处理的形式。'''
}
 */
const TextKeywords = function (params, fthen, fcatch) {
  QCloud.use('TextKeywords', params, fthen, fcatch)
}

/**
 * 敏感信息识别
 * params = {
    'content': "中共统治！压迫，人民！续一秒！",
    'type': 2
}
 */

const TextSensitivity = function (params, fthen, fcatch) {
  QCloud.use('TextSensitivity', params, fthen, fcatch)
}

module.exports = {
  textSentiment: TextSentiment,
  contentGrab: ContentGrab,
  contentTranscode: ContentTranscode,
  lexicalAnalysis: LexicalAnalysis,
  lexicalCheck: LexicalCheck,
  lexicalSynonym: LexicalSynonym,
  textClassify: TextClassify,
  textDependency: TextDependency,
  textKeywords: TextKeywords,
  textSensitivity: TextSensitivity
}