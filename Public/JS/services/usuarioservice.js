const pool = require('../data/appcontext');
const token = require('../jwt/jwtconfig');
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

async function buscarUsuarioPorId(id)
{
    try{
        const resultado = await pool.query(
            `SELECT * FROM usuario WHERE id = $1`,
            [id]
        )

        if(resultado.rows.length === 0)
            return null

        const usuarioData = resultado.rows[0];
        const usuario = new Usuario(
            usuarioData.id,
            usuarioData.nome,
            usuarioData.sobrenome,
            usuarioData.email,
            usuarioData.cpf
        );
        return usuario;
    }
    catch(error)
    {
        console.log('Errou ao buscar usuario');
        throw error
    }
}

async function loginUsuario(email, senha)
{
    try{
        const resultado = pool.query(
            `SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}'`
        )
        if((await resultado).rows.length < 1)
            return false
        else
        {
            const nome = (await resultado).rows[0]
            dadosUsuario = {
                nome
            }
            return token.gerarToken(dadosUsuario)
        }
    }
    catch(error) {
        console.log(error)
    }
}
module.exports = {
    criarUsuario,
    buscarUsuarioPorId,
    loginUsuario
}