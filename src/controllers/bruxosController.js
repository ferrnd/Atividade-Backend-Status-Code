import dados from "../models/dados.js";

const { bruxos } = dados;

const getAllBruxos = (req, res) => {
  const { casa } = req.query;
  let resultado = bruxos;

  if (casa) {
    resultado = resultado.filter(
      (c) => c.casa.toLowerCase() === casa.toLowerCase()
    );
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado,
    message: "Lista de bruxos(a) convocada com sucesso!",
  });
};

const getBruxosById = (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  const bruxo = bruxos.find((bruxo) => bruxo.id === id);

  if (bruxo) {
    res.status(200).json(bruxo);
  } else {
    return res.status(404).json({
      success: false,
      message: `Nenhum(a) bruxo(a) com o id ${id} foi encontrado(a) no Beco Diagonal! O id deve ser um número válido.`,
    });
  }
};

const createBruxos = (req, res) => {
  const { nome, modelo, ano, casa, varinha, status } = req.body;

  if (!nome) {
    return res.status(400).json({
      success: false,
      message: "Feitiço mal executado! O nome do(a) bruxo(a) é obrigatória!",
    });
  }

  if (!casa) {
    return res.status(400).json({
      success: false,
      message: "Feitiço mal executado! A casa do(a) bruxo(a) é obrigatória!",
    });
  }

  const nomeExiste = bruxos.some(
    (b) => b.nome.toLowerCase() === nome.toLowerCase()
  );

  if (nomeExiste) {
    return res.status(409).json({
      status: 409,
      success: false,
      message: "Já existe um bruxo com esse nome!",
      suggestions: ["Escolha outro nome para seu bruxo!"],
    });
  }

  const novosBruxos = {
    id: bruxos.length + 1,
    nome: nome,
    modelo: modelo,
    ano: ano,
    casa: casa,
    varinha: varinha,
    status: status,
  };

  bruxos.push(novosBruxos);

  res.status(201).json({
    success: true,
    message: "Novo(a) bruxo(a) matriculado(a) em Hogwarts!",
    bruxo: novosBruxos,
  });
};

const deleteBruxos = (req, res) => {
  const id = parseInt(req.params.id);

  const { admin } = req.body;
  if (!admin) {
    return res.status(403).json({
      success: false,
      message: "Você não é administrador!",
    });
  }
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Id do(a) bruxo(a) não é válido",
    });
  }

  const bruxosParaRemover = bruxos.find((bruxo) => bruxo.id === id);

  if (!bruxosParaRemover) {
    return res.status(404).json({
      success: false,
      message: `Bruxo(a) com o id ${id} não existe.`,
    });
  }

  const bruxosFiltrados = bruxos.filter((bruxos) => bruxos.id != id);

  bruxos.splice(0, bruxos.length, ...bruxosFiltrados);

  res.status(200).json({
    success: true,
    message: `Bruxo(a) com id ${id} foi expulso de Hogwarts com sucesso!`,
  });
};

const updateBruxos = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, modelo, ano, casa, varinha, status } = req.body;
  const idParaEditar = id;

  if (isNaN(idParaEditar)) {
    return res.status(400).json({
      success: false,
      message:
        "Nenhum bruxo foi encontrado no Beco Diagonal! O id deve ser um número válido.",
    });
  }

  const bruxoExiste = bruxos.find((bruxo) => bruxo.id === idParaEditar);
  if (!bruxoExiste) {
    return res.status(404).json({
      success: false,
      mesage: `Bruxo(a) com id ${id} não existe. Não é possível reparar o que não existe!`,
    });
  }

  const bruxosAualizados = bruxos.map((bruxos) =>
    bruxos.id === idParaEditar
      ? {
          ...bruxos,
          ...(nome && { nome }),
          ...(modelo && { modelo }),
          ...(ano && { ano: parseInt(ano) }),
          ...(casa && { casa }),
          ...(varinha && { varinha }),
          ...(status && { status }),
        }
      : bruxos
  );

  bruxos.splice(0, bruxos.length, ...bruxosAualizados);
  const bruxoEditado = bruxos.find((bruxo) => bruxo.id === idParaEditar);
  res.status(200).json({
    success: true,
    message: "Bruxo(a) atualizado(a) com sucesso!",
    carro: bruxoEditado,
  });
};

export {
  getAllBruxos,
  getBruxosById,
  createBruxos,
  deleteBruxos,
  updateBruxos,
};
