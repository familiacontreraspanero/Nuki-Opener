export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const TOKEN = "f81f953fab1d52ce7a6d264464d55aefcdbdda02e51282e19b5c2d5b97d3fd287181dcde09b601b6";
  const SMARTLOCK_ID = 9634589714;

  try {
    const response = await fetch(`https://api.nuki.io/smartlock/${SMARTLOCK_ID}/action`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: 1 })
    });

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error en la función: ' + err.message });
  }
}
