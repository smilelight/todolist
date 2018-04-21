const QCloud = require('./qclooud')
QCloud.init({
    module:'wenzhi',
    secretId: 'AKIDujTEsMDuthKn7UrIVjny4ziFajXFot7D',
    secretKey:'IEJSXTTEH6vc7Wnv1yoV4SrcIn2A6qUx'
})

let params = {
    'content':'人生苦短，please Python。太祖、刘邦、朱元璋哪个更厉害？！'
}

QCloud.use('TextClassify',params,function (responce) {
    console.log(responce.data)
},function (error) {
    console.log(error)
})