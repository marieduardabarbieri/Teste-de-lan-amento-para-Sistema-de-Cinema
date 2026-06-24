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
    mensagem.innerText = "Status: Compra realizada";

    const assentoVisual = document.querySelector(
      `[data-assento="${numeroAssento}"]`,
    );

    if (assentoVisual) {
      assentoVisual.classList.add("ocupado");
    }
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

  mensagem.innerText = "Status: Compra cancelada";

  const assentoVisual = document.querySelector(
    `[data-assento="${numeroAssento}"]`,
  );

  if (assentoVisual) {
    assentoVisual.classList.remove("ocupado");
  }
});

//Atualização de cor dos assentos conforme  seleciona,c ompra ou cancela
const selectAssento = document.getElementById("assento");

const assentosVisuais = document.querySelectorAll(".assento");

function atualizarSelecao() {
  assentosVisuais.forEach((assento) => {
    assento.classList.remove("selecionado");

    if (assento.dataset.assento === selectAssento.value) {
      assento.classList.add("selecionado");
    }
  });
}

selectAssento.addEventListener("change", atualizarSelecao);

atualizarSelecao();
