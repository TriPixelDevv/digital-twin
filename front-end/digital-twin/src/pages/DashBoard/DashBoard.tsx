import { useNavigate } from "react-router";
export default function DashBoard() {
  const navigate = useNavigate();

  function handleLp() {
    navigate("/landing-page");
  }
  const metricas = [
    { nome: "Pressão Arterial", valor: "120/80 mmHg", risco: "Baixo" },
    { nome: "Frequência Cardíaca", valor: "72 bpm", risco: "Baixo" },
    { nome: "Nível de Colesterol", valor: "190 mg/dL", risco: "Alto" },
    { nome: "Índice de Massa Corporal (IMC)", valor: "24.5", risco: "Baixo" },
    { nome: "Glicemia em Jejum", valor: "95 mg/dL", risco: "Baixo" },
    { nome: "Nível de Stresse", valor: "Moderado", risco: "Médio" },
  ];

  const getRiskClassName = (risco: string) => {
    return `risco-${risco.toLowerCase()}`;
  };

  return (
  <>
    <div className="dashboard-container">
        <header className="dashboard-header">
            <h1>Painel de Acompanhamento de Saúde</h1>
            <p> Métricas vitais para o seu acompanhamento e prevenção de riscos.</p>
        </header>
        <button onClick={handleLp}>Voltar para Página Inicial</button>

        <section className="metrics-list">
            {metricas.map((metrica, index) => (
                <div key={index} className="metric-card">
                    <h3>{metrica.nome}</h3>
                    <p className="metric-value">{metrica.valor}</p>
                    <p className={`metric-risk ${getRiskClassName(metrica.risco)}`}>
                        Risco: {metrica.risco}</p>
                </div>
            ))}            
        </section>
    </div>
  </>
  );
}
