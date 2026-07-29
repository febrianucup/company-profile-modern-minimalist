function Services() {
  const services = ['Konsultasi', 'Pengembangan Web', 'Desain UI/UX']

  return (
    <section style={{ padding: '40px' }}>
      <h1>Layanan Kami</h1>
      <ul>
        {services.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export default Services