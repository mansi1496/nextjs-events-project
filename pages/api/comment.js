export default function handler(req, res) {
  if (req.method === "POST") {
    const eventId = req.body.id;
    const email = req.body.email;
    const name = req.body.name;
    const comment = req.body.comment;

    res.status(201).json({
      message: "yayyy",
    });
  } else {
    res.status(200).json({
      message: "Ahhh",
    });
  }
}
