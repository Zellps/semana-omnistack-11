const connection = require("../database/connection")

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query

    //retornar o total de casos... quando der send no GET LIST na pasta CASOS no Inomnia, o terminal do vs code vai retornar o total de casos
    const [count] = await connection("incidents").count() //botar count entre colchetes pra retornar o primeiro elemento do array
    console.log(count)

    const incidents = await connection("incidents") //aqui eu vou mostrar os incidentes. 5 por página
      .join("ongs", "ongs.id", "=", "incidents.ong_id") // .join relaciona dados de 2 tabelas
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf"
      ])

    response.header("X-Total-Count", count["count(*)"]) //no header do casos-get-list no insomnia vai dar pra ver o total de casos

    return response.json(incidents)
  },

  async create(request, response) {
    const { title, description, value } = request.body
    const ong_id = request.headers.authorization

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      ong_id
    })
    return response.json({ id })
  },

  async delete(request, response) {
    const { id } = request.params
    const ong_id = request.headers.authorization

    const incident = await connection("incidents")
      .where("id", id)
      .select("ong_id")
      .first()

    if (incident.ong_id !== ong_id) {
      return response
        .status(401)
        .json({ error: "operation not permitted feladaputa." })
    }

    await connection("incidents")
      .where("id", id)
      .delete()

    return response.status(204).send()
  }
}
