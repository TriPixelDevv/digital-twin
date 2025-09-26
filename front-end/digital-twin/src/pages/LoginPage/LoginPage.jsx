import { Link } from 'react-router-dom'

export default function LoginPage() {
  return <>
    <h1>Bem Vindo à página de Login</h1>
    <p>Preencha os campos para realizar o login</p>
    <form action="">
        <div>
            <label htmlFor="username">Usuário:</label>
            <input type="text" id="username" name="username" />
        </div>
        <div>
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" />
        </div>
    </form>
    <p>Não possui uma conta? <Link to="/register">Cadastre-se</Link></p>
  </>;
}