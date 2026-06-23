const mensagem = document.getElementById("mensagem");

//Compra
document.getElementById("comprar").addEventListener("click", async () => {
  const numeroAssento = document.getElementById("assento").value;

  const resposta = await fetch("/comprar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      numeroAssento,
    }),
  });

  const dados = await resposta.json();

  if (resposta.ok) {
    mensagem.innerText = "Compra realizada";
  } else {
    mensagem.innerText = dados.erro;
  }
});

//Cancelamento
document.getElementById("cancelar").addEventListener("click", async () => {
  const numeroAssento = document.getElementById("assento").value;

  await fetch("/cancelar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      numeroAssento,
    }),
  });

  mensagem.innerText = "Compra cancelada";
});
