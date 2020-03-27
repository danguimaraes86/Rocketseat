const connection = require('../src/database/connection');

const index = async (req, res) => {
    let ong_id = req.headers.authorization;

    let listarCasosOng = await connection('incidentCasos').where('ong_id', ong_id).select('*');

    return res.json(listarCasosOng);
}

module.exports = {
    index
}