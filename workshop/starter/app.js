const { useState } = React;

function Header() {
  return (
    <header className="card">
      <h1>Banco Vecinal</h1>
      <p>Fictional neighborhood banking prototype.</p>
    </header>
  );
}

function ServiceList({ services }) {
  return (
    <section className="card">
      <h2>Community Services</h2>
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
      <h2>Notice</h2>
      <p>{message}</p>
    </section>
  );
}

function App() {
  const [message] = useState("This is a static demo with no real accounts.");
  const services = [
    "Open a fictional savings profile",
    "View fictional micro-loan options",
    "Read community support resources"
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
