export default function handler(req, res) {
  if (req.method === 'GET') {
    const response = {
      message: "Hello from Express server",
    };
    res.status(200).json(response);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
