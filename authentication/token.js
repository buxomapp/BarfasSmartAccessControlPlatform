var jwt = require('jsonwebtoken')

function token() {
    var token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, '@mohammad@ali');
        return token
    }
function vtoken(token){
    var decoded = jwt.verify(token, '@mohammad@ali')
    return true
}
    

exports.token = token
exports.vtoken = vtoken