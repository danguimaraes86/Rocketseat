const connection = require('../src/database/connection');

const login = async (req, res) => {
    let { id } = req.body;

    let buscaOng = await connection('userONGs').where('id', id).select('nome').first();

    if(!buscaOng) {
        return res.status(400).json({ info: 'Ops! ID/Usuário não existe!'})
    }

    return res.json(buscaOng)
}

module.exports = {
    login
}
