import React from "react";
import { Title, Form, Tabela } from "./styles";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { api } from "../../services/api";

export const Financas: React.FC = () => {
  interface IFinance {
    id?: string;
    descricao: string;
    natureza: string;
    valor: number;
    parcelas: number;
  }

  const [actualFinance, setActualFinance] = React.useState<IFinance>(
    {} as IFinance
  );

  const [finances, setFinances] = React.useState<IFinance[]>([]);

  let config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzY1NjMyNDUsImV4cCI6MTYzNjY0OTY0NSwic3ViIjoiOGIwMDcwZWQtNTI3NS00NGYzLTlmYTctYmMxZTE5MGQyZmQwIn0.0L_Eln8NWSBwPYSFht7i6wUwjg9xhuLDPVvNo0uuiwM",
    },
  };

  React.useEffect(() => {
    try {
      api
        .get<IFinance[]>(`/finances`, config)
        .then((response) => setFinances(response.data));
    } catch {
      alert(`Problema ao consultar finanças`);
    }
  }, [finances]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const aux = Object.assign(actualFinance, {
      [e.target.name]: e.target.value,
    });

    setActualFinance(aux);
  }

  function addFinance(): void {
    if (!actualFinance.natureza) {
      alert(`Problema ao adicionar produtos`);
    } else if (!actualFinance.id) {
      try {
        api
          .post<IFinance>(`/finances`, actualFinance, config)
          .then((response) => alert(`Inserida com sucesso`));
        setActualFinance({} as IFinance);
      } catch {
        alert(`Problema ao inserir finança`);
      }
    } else {
      let updateFinance = {
        descricao: actualFinance.descricao,
        natureza: actualFinance.natureza,
        valor: actualFinance.valor,
        parcelas: actualFinance.parcelas,
      };
      try {
        api
          .put<IFinance>(`/finances/${actualFinance.id}`, updateFinance, config)
          .then((response) => alert(`Finança atualizada com sucesso`));
        setActualFinance({} as IFinance);
      } catch {
        alert(`Problema ao atualizar finança`);
      }
    }
  }

  function deleteFinance(id: string | undefined): void {
    const resp = window.confirm(
      `Tem certeza que deseja realizar a exclusão dessa finança? ${id}`
    );
    if (resp) {
      try {
        api
          .delete<IFinance>(`/finances/${id}`, config)
          .then((response) => alert(`Finança removida com sucesso! `));
        setActualFinance({} as IFinance);
      } catch {
        alert(`Problema ao remover finança`);
      }
    }
  }

  function updateFinance(financa: IFinance | undefined): void {
    if (financa) {
      const aux = financa;
      setActualFinance(aux);
    }
  }

  return (
    <>
      <Title>Finanças</Title>
      <Form>
        <div>
          <input
            name="descricao"
            value={actualFinance.descricao}
            placeholder="Descrição da finança"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="natureza"
            value={actualFinance.natureza}
            placeholder="Informe a natureza da operação: entrada\saida"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="valor"
            value={actualFinance.valor}
            placeholder="Informe o valor da finança"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="parcelas"
            value={actualFinance.parcelas}
            placeholder="Informe a quantidade de parcelas"
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={addFinance} type="submit">
            Salvar
          </button>
        </div>
      </Form>
      <Tabela>
        <thead>
          <tr>
            <th> Natureza </th>
            <th> Valor </th>
            <th> Descrição </th>
            <th> Parcelas </th>
            <th> Remove </th>
            <th> Atualiza </th>
          </tr>
        </thead>
        <tbody>
          {finances.map((finance, index) => (
            <tr>
              <td> {finance.natureza} </td>
              <td> {finance.valor}</td>
              <td> {finance.descricao}</td>
              <td> {finance.parcelas}</td>
              <td>
                {" "}
                <button onClick={() => deleteFinance(finance.id)}>
                  {" "}
                  <AiFillDelete />{" "}
                </button>
              </td>
              <td>
                {" "}
                <button onClick={() => updateFinance(finance)}>
                  {" "}
                  <AiFillEdit />{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Tabela>
    </>
  );
};
