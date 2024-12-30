import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// add a new Tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});
// get a tea with id

app.get(`/teas/:id`, (req, res) => {
  const { id } = req.params;
  const tea = teaData.find((t) => t.id === parseInt(id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

// LOGIC FOR PUT API

app.put("/teas/:id", (req, res) => {
  console.log("API call");
  const { id } = req.params;

  let tea = teaData?.find((t) => t.id === parseInt(id));
  console.log("Riii", tea, id);

  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  console.log("teaaa", tea, name, price);
  tea.name = name;
  tea.price = price;
  res.status(200).send("updates succesfully");
});

// delete tea
app.delete(`/teas/:id`, (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send(`Tea Not Found`);
  }
  teaData.splice(index, 1);
  res.status(200).send(`Deleted`);
});

app.listen(port, () => {
  console.log(`Server is running at port: http://127.0.0.1:${port}`);
});
