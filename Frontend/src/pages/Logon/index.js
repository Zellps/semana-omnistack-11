import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FiLogIn } from "react-icons/fi"

import api from "../../services/api"

import "./styles.css"

import heroesImg from "../../assets/heroes.png"
import logoImg from "../../assets/logo.svg"

//no react se usa className no lugar de class

export default function Logon() {
  const [id, setId] = useState("")

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await api.post("sessions", { id })
      console.log(response.data.name)
    } catch (err) {
      alert("Falha no Login, tente novamente")
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  )
}
