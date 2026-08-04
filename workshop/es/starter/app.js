const { useState } = React;

function Header() {
  return (
    <header className="card">
      <h1>Banco Vecinal</h1>
      <p>Prototipo ficticio de banca comunitaria.</p>
    </header>
  );
}

function ServiceList({ services }) {
  return (
    <section className="card">
      <h2>Servicios comunitarios</h2>
      <ul>
        {services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
    </section>
  );
}

function Notice({ message }) {
  return (
    <section className="card" aria-live="polite">
      <h2>Aviso</h2>
      <p>{message}</p>
    </section>
  );
}

function App() {
  const [message] = useState(
    "Esta es una demostración estática sin cuentas reales."
  );
  const services = [
    "Abrir un perfil de ahorro ficticio",
    "Ver opciones ficticias de microcrédito",
    "Consultar recursos de apoyo comunitario"
  ];

  return (
    <main className="page">
      <Header />
      <ServiceList services={services} />
      <Notice message={message} />
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
