const pool = require('../data/appcontext');
async function criarUsuario(usuarioDto)
{
    const {nome, sobrenome, email, senha, cpf} = usuarioDto;
 
    try{
        const resultado = await pool.query(
            `INSERT INTO usuario(nome, sobrenome, email, cpf, senha)
            VALUES($1, $2, $3, $4, $5)`,
            [nome, sobrenome, email, cpf, senha]
        );
        return {sucess: true, mensagem: "Usuario Criado com sucesso"}
    }
        catch(error)
        {
            return {sucess: false, mensagem: 'Erro ao cadastrar usuario', error}
        }
}

module.exports = {
    criarUsuario
}