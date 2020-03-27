const connection = require('../src/database/connection')
const crypto = require('crypto');

const index = async (req, res) => {
    let listaOngs = await connection('userONGs').select('*');

    return res.json(listaOngs);
}

const criarOng = async (req, res) => {
    let {
        nome,
        email,
        whatsapp,
        cidade,
        uf
    } = req.body;
    let id = crypto.randomBytes(4).toString('HEX');

    await connection('userONGs').insert({
        id,
        nome,
        email,
        whatsapp,
        cidade,
        uf
    })

    return res.json({ id });
};

module.exports = {
    index,
    criarOng
}