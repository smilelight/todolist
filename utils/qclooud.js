/*不同的应用平台fly.js的引入方式不同，同时fly的内部实现也略有不同
毕竟不同的平台js的引擎也不同，所以相关网络请求访问的底层实现也会有所不同
比如说浏览器环境中是构造XmlHttpRequest执行ajax调用
而微信小程序则是使用底层api：wx.request函数
node环境依赖http模块及net模块的底层实现
详情参见 https://wendux.github.io/dist/#/doc/flyio/readme
不同环境下文件引入实例：
具体文件自己去找，去下
浏览器环境
const Fly = require('./fly.umd.min')
微信小程序环境
const Fly = require('./fly')
node环境
const Fly=require("flyio/src/node")*/
const Fly = require('./fly')
const CryptoJS = require('./crypto');

function sortKeys(obj) {
    let newobj = {};
    Object.keys(obj).sort().forEach(value => newobj[value] = obj[value]);
    return newobj
}


function codeObj(obj) {
    let arr = [];
    for (let k in obj) {
        arr.push(k + '=' + obj[k])
    }
    return arr.join('&')
}


class QCloud {
    constructor(){
        this.config = {
            protocol:'https://',
            path:'/v2/index.php',
            method:'GET',
            region:'gz',
            domain:'.api.qcloud.com',
            requestClient:'SDK_PYTHON_2.0.13',
            signatureMethod:'HmacSHA1',
            secretId:'',
            secretKey:''
        }
        this.params = {}
    }
    init(config){
        Object.assign(this.config,config);
        this.fly = new Fly;
        this.fly.config.baseURL = this.config.protocol+this.config.module+this.config.domain
    }

    getParams() {
        return this.config.method+this.config.module+this.config.domain+
            this.config.path+'?'+codeObj(sortKeys(this.params))
    }

    getUrl(action,params){
        this.initParams();
        this.params.Action = action;
        Object.assign(this.params,params);
        this.sign();
        return this.config.protocol+this.config.module+this.config.domain+this.config.path+'?'+this.getParams()
    }
    use(action,params,fthen,fcatch){
        this.initParams();
        this.params.Action = action;
        Object.assign(this.params,params)
        this.sign()
        this.request(fthen,fcatch)
    }
    sign(){
        let pa = this.getParams();
        let signnature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(pa,this.config.secretKey));
        this.params.Signature = signnature
    }
    initParams(){
        this.params = {
            Region: this.config.region,
            Nonce: Math.floor(Math.random()*Number.MAX_SAFE_INTEGER),
            Timestamp: Math.floor(Date.now()/1000),
            RequestClient: this.config.requestClient,
            SignatureMethod: this.config.signatureMethod,
            SecretId: this.config.secretId,
        }
    }
    request(fthen,fcatch){
        this.fly.get(this.config.path,this.params).then(function(response){
          // console.log(response)
          fthen(response.data)
        }).catch(fcatch)
    }

}

module.exports = new QCloud();