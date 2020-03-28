const connection = require('../src/database/connection');

const index = async (req, res) => {

    let { pagina = 1 } = req.query;

    let [totalCasos] = await connection('incidentCasos').count();

    let listaCasos = await connection('incidentCasos')
        .join('userONGs', 'userONGs.id', '=', 'incidentCasos.ong_id')
        .limit(5)
        .offset((pagina - 1) * 5)
        .select([
            'incidentCasos.*',
            'userONGs.nome',
            'userONGs.email',
            'userONGs.whatsapp',
            'userONGs.cidade',
            'userONGs.uf'
        ]);

    res.header('X-Total-Count', totalCasos['count(*)']);

    return res.json(listaCasos);
}

const criarCaso = async (req, res) => {
    let {titulo, descricao, valor} = req.body;
    let ong_id = req.headers.authorization;

    let [casoId] = await connection('incidentCasos').insert({
        titulo,
        descricao,
        valor,
        ong_id
    });

    return res.json({ casoId })
}

const deletarCaso = async (req, res) => {
    let { id } = req.params;
    let ongId = req.headers.authorization;

    let verificaCaso = await connection('incidentCasos').where('id', id).select('ong_id').first();

    if (verificaCaso.ong_id != ongId) {
        return res.status(401).json({ info: 'Ops! Você não está autorizado para esta operação!'})
    } 
    
    await connection('incidentCasos').where('id', id).delete();
    return res.status(204).send();
}

module.exports = {
    index,
    criarCaso,
    deletarCaso
}