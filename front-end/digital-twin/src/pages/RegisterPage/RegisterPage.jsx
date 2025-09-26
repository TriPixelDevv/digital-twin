import { Link } from 'react-router-dom'

export default function RegisterPage() {
  return <>
    <h1>Bem Vindo à página de Registro</h1>
    <p>Preencha os campos para criar uma nova conta</p>
    <form action="">
        <div>
            <label htmlFor="username">Usuário:</label>
            <input type="text" id="username" name="username" />
        </div>
        <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
        </div>
        <div>
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" />
        </div>
    </form>
    <p>Já possui uma conta? <Link to="/login">Faça login</Link></p>
  </>;
}