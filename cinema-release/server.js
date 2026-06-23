const express = require("express");

const app = express();

const assentos = require("./dados/assentos");

app.use(express.json());

app.use(express.static("public"));

//Rota para listar
app.get("/assentos", (req, res) => {
  res.json(assentos);
});

//Rota para comprar ingresso
app.post("/comprar", (req, res) => {
  const { numeroAssento } = req.body;

  const assento = assentos.find((item) => item.numero === numeroAssento);

  if (!assento) {
    return res.status(404).json({
      erro: "Assento não encontrado",
    });
  }

  if (assento.ocupado) {
    return res.status(400).json({
      erro: "Assento indisponível",
    });
  }

  assento.ocupado = true;

  res.status(201).json({
    mensagem: "Compra realizada com sucesso",
  });
});

//Cancelar a compra
app.post("/cancelar", (req, res) => {
  const { numeroAssento } = req.body;

  const assento = assentos.find((item) => item.numero === numeroAssento);

  if (!assento) {
    return res.status(404).json({
      erro: "Assento não encontrado",
    });
  }

  assento.ocupado = false;

  res.json({
    mensagem: "Compra cancelada",
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
