export default async function handler(req, res) {
  const url =
    'https://docs.google.com/spreadsheets/d/1_Ms7p7rRJPSwbsmfmdsEnYPyGl71k3gCu9ZNFRIres4/export?format=csv&gid=1487060119';

  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error('Upstream HTTP ' + r.status);
    const csv = await r.text();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    res.status(200).send(csv);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
}
