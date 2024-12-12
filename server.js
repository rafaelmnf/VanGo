// DEPENDÊNCIAS
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config(); // Carregar variáveis de ambiente
const app = express();

// Importar serviços
const servico = require('./Public/JS/services/usuarioservice');
const servicoMotorista = require('./Public/JS/services/motoristaservice');

// Middleware para JSON e arquivos estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Public'))); // Servir arquivos estáticos (CSS, JS, imagens, etc.)

// VARIÁVEIS DE AMBIENTE
const PORT = process.env.PORT || 3000; // Usar a porta da Railway ou a padrão
const GMAIL_USER = process.env.conta_gmail; // Variável de ambiente para o e-mail
const GMAIL_PASS = process.env.senha_gmail; // Variável de ambiente para a senha

if (!GMAIL_USER || !GMAIL_PASS) {
  console.error('⚠️ Variáveis de ambiente "conta_gmail" e "senha_gmail" não configuradas.');
  process.exit(1); // Finaliza o servidor se as variáveis não estiverem configuradas
}

// CONFIGURAÇÃO DO NODEMAILER
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

// OBJETO TEMPORÁRIO PARA CÓDIGOS DE VERIFICAÇÃO
let verificationCodes = {};

// ROTAS
// Rota inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'index.html'));
});

// Outras rotas para HTML
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'login.html'));
});

app.get('/maps/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'maps.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'cadastro.html'));
});

app.get('/cadastro-usuario', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'cadastro-usuario.html'));
});

app.get('/cadastro-motorista', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'cadastro-motorista.html'));
});

app.get('/perfil/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'perfil.html'));
});

app.get('/contratos', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'contratos.html'));
});

app.get('/resultados', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'HTML', 'resultados-maps.html'));
});

// Rota para buscar usuário por ID
app.get('/buscar-por-id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const resultado = await servico.buscarUsuarioPorId(id);
    if (resultado) {
      res.json(resultado);
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

// Envio de código de verificação por e-mail
app.post('/send-verification', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'E-mail é obrigatório' });
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000); // Gera código de 6 dígitos

  transporter.sendMail({
    from: `Empresa <${GMAIL_USER}>`,
    to: email,
    subject: 'Seu código de verificação',
    text: `Seu código de verificação é: ${verificationCode}`,
  }, (error) => {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      return res.status(500).json({ message: 'Erro ao enviar o e-mail' });
    }
    verificationCodes[email] = verificationCode;
    res.status(200).json({ message: 'Código de verificação enviado!' });
  });
});

// Verificação do código de verificação
app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ message: 'E-mail e código são obrigatórios' });
  }

  if (verificationCodes[email] == code) {
    delete verificationCodes[email]; // Remove o código após a verificação
    res.status(200).json({ message: 'Verificação bem-sucedida!' });
  } else {
    res.status(400).json({ message: 'Código de verificação incorreto.' });
  }
});

// Criação de usuário
app.post('/criar-usuario', async (req, res) => {
  try {
    const resultado = await servico.criarUsuario(req.body);
    res.status(resultado.success ? 201 : 400).json(resultado);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

// Criação de motorista
app.post('/criar-motorista', async (req, res) => {
  try {
    const resultado = await servicoMotorista.criarMotorista(req.body);
    res.status(resultado.success ? 201 : 400).json(resultado);
  } catch (error) {
    console.error('Erro ao criar motorista:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

// Verificação de login
app.post('/verificar-login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const resultado = await servico.loginUsuario(email, senha);
    res.json(resultado);
  } catch (error) {
    console.error('Erro ao verificar login:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

// RODAR O SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
