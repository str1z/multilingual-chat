const express = require("express");
const app = express();
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static("client/public"));

const pools = new Map();

app.get("/watch", (req, res) => {
  const room = req.query.room;
  // console.log("/watch", room);
  if (!room) return res.status(400).send({ error: "missing room url param" });
  const pool = pools.get(room);
  if (pool) pool.push(res);
  else pools.set(room, [res]);
});

app.post("/send", (req, res) => {
  const room = req.query.room;
  // console.log("/send", req.body, room);
  if (!room) return res.status(400).json({ error: "missing room url param" });
  const pool = pools.get(room);
  if (pool) for (let res of pool) res.json(req.body);
  res.json({ success: "message sent" });
  pools.delete(room);
});

app.get("/translate", async (req, res) => {
  try {
    const { lang = "en", text } = req.query;
    // console.log("/translate", lang, text);
    if (!text) return res.status(400).json({ error: "missing text url param" });
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURI(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json({ success: data[0][0][0] });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "something went wrong" });
  }
});

app.listen(8080, () => {
  console.log("App is listenning on port 8080");
});
