import { useNavigate } from "react-router";

export default function DashBoard() {
    const navigate = useNavigate()

function handleLp() {
    navigate('/landing-page')
}
    return <>
        <h1>Dashboard</h1>
        <p>Bem-vindo ao Dashboard!</p>
        <p>Aqui você pode visualizar suas informações e métricas.</p>
        <button onClick={handleLp}>Retornar Landing Page</button>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
            <div  style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                Grafico 1
            </div>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                Grafico 2
            </div>
            <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                Grafico 3
            </div>
        </section>
    </>
}