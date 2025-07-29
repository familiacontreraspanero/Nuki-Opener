export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // O pon un dominio específico si lo necesitas
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Manejo de preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const TOKEN = "AQUÍ_TU_TOKEN_CORRECTO"; // reemplázalo
  const SMARTLOCK_ID = 1234567890; // reemplázalo

  try {
    const response = await fetch(`https://api.nuki.io/smartlock/${SMARTLOCK_ID}/action`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: 1 })
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ error: 'Error en la función: ' + err.message });
  }
}
