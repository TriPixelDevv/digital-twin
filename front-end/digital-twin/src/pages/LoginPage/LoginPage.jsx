import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/landing-page')
  }

  return <>
    <h1>Bem Vindo à página de Login</h1>
    <p>Preencha os campos para realizar o login</p>
    <form onSubmit={handleLogin}>
        <div>
            <label htmlFor="username">Usuário:</label>
            <input type="text" id="username" name="username" />
        </div>
        <div>
            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Login</button>
    </form>
    <p>Não possui uma conta? <Link to="/register">Cadastre-se</Link></p>
  </>;
}