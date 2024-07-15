// server/controllers/user.js

const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Função para registro de usuário
exports.register = async (req, res) => {
  // Lógica de registro de usuário
};

// Função para login de usuário
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Encontrar o usuário pelo nome de usuário
    const user = await User.findOne({ username });

    // Verificar se o usuário existe
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Se a senha estiver correta, enviar uma resposta de sucesso
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
