const express = require("express");

const app = express();

const seats = require("./data/seats");

app.use(express.json());
app.use(express.static("public"));

//Rota para listar assentos
app.get("/seats", (req, res) => {
  res.json(seats);
});

//Rota para cadastrar/comprar assento
app.post("/buy", (req, res) => {
  const { seatId } = req.body;

  const seat = seats.find((s) => s.id === seatId);

  if (!seat) {
    return res.status(404).json({
      error: "Assento não encontrado",
    });
  }

  if (seat.sold) {
    return res.status(400).json({
      error: "Assento indisponível",
    });
  }

  seat.sold = true;

  res.status(201).json(seat);
});
