const pool = require('../data/appcontext');
async function criarMotorista(motoristaDto)
{
    const {nome, sobrenome, email, senha, cpf, placa, modeloVeiculo} = motoristaDto;
 
    try{
        const resultado = await pool.query(
            `INSERT INTO motorista(nome, sobrenome, email, cpf, senha, placa, modeloVeiculo)
            VALUES($1, $2, $3, $4, $5, $6, $7)`,
            [nome, sobrenome, email, cpf, senha, placa, modeloVeiculo]
        );
        return {sucess: true, mensagem: "Motorista Criado com sucesso"}
    }
        catch(error)
        {
            return {sucess: false, mensagem: 'Erro ao cadastrar motorista', error}
        }
}

module.exports = {
    criarMotorista
}