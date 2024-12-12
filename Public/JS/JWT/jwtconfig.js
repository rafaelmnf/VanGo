const jwt = require('jsonwebtoken')

function gerarToken(dadosUsuario)
{
    const secretKey = "djashduioqwrhdiu23ogr312iuG&!#¨#T!@&¨#T&@!bhcasasas"
    const tempoExpira = "1h";
    const payload = {
        nome: dadosUsuario.nome,
        email: dadosUsuario.email,
        id: dadosUsuario.id
    }
    const token = jwt.sign(payload, secretKey, {expiresIn: tempoExpira})
    payloads = [
        payload.nome.id, 
        token
    ]
    return payloads 
}

module.exports = {
    gerarToken
}

