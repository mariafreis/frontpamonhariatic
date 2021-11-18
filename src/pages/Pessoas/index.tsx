import React from "react";
import { Title, Form, Tabela } from "./styles";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { api } from "../../services/api";

export const Pessoas: React.FC = () => {
  interface ICustomer {
    id?: string;
    name: string;
    cpf: string;
    celular: string;
    endereco: string;
  }
  interface IVendor {
    id?: string;
    name: string;
    cellphone: string;
    area: string;
  }

  const [actualCustomer, setActualCustomer] = React.useState<ICustomer>(
    {} as ICustomer
  );
  const [actualVendor, setActualVendor] = React.useState<IVendor>(
    {} as IVendor
  );

  const [customers, setCustomers] = React.useState<ICustomer[]>([]);
  const [vendors, setVendors] = React.useState<IVendor[]>([]);

  let config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzY1NjMyNDUsImV4cCI6MTYzNjY0OTY0NSwic3ViIjoiOGIwMDcwZWQtNTI3NS00NGYzLTlmYTctYmMxZTE5MGQyZmQwIn0.0L_Eln8NWSBwPYSFht7i6wUwjg9xhuLDPVvNo0uuiwM",
    },
  };

  React.useEffect(() => {
    try {
      api
        .get<IVendor[]>(`/vendors`, config)
        .then((response) => setVendors(response.data));
    } catch {
      alert(`Problema ao consultar vendedores`);
    }
  }, [vendors]);

  React.useEffect(() => {
    try {
      api
        .get<ICustomer[]>(`/customers`, config)
        .then((response) => setCustomers(response.data));
    } catch {
      alert(`Problema ao consultar clientes`);
    }
  }, [customers]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const aux = Object.assign(actualCustomer, {
      [e.target.name]: e.target.value,
    });

    setActualCustomer(aux);
  }

  async function handleChangev(e: React.ChangeEvent<HTMLInputElement>) {
    const auxv = Object.assign(actualVendor, {
      [e.target.name]: e.target.value,
    });

    setActualVendor(auxv);
  }

  function addCustomer(): void {
    if (!actualCustomer.name) {
      alert(`Problema ao adicionar cliente`);
    } else if (!actualCustomer.id) {
      try {
        api
          .post<ICustomer>(`/customers`, actualCustomer, config)
          .then((response) => alert(`Cliente inserido com sucesso!`));
        setActualCustomer({} as ICustomer);
      } catch {
        alert(`Problema ao inserir cliente`);
      }
    } else {
      let updateCustomer = {
        name: actualCustomer.name,
        cpf: actualCustomer.cpf,
        celular: actualCustomer.celular,
        endereco: actualCustomer.endereco,
      };
      try {
        api
          .put<ICustomer>(
            `/customers/${actualCustomer.id}`,
            updateCustomer,
            config
          )
          .then((response) => alert(`Cliente atualizado com sucesso`));
        setActualCustomer({} as ICustomer);
      } catch {
        alert(`Problema ao atualizar cliente`);
      }
    }
  }

  function addVendor(): void {
    if (!actualVendor.name) {
      alert(`Problema ao adicionar cliente`);
    } else if (!actualVendor.id) {
      try {
        api
          .post<IVendor>(`/vendors`, actualVendor, config)
          .then((response) => alert(`Vendedor inserido com sucesso`));
        setActualVendor({} as IVendor);
      } catch {
        alert(`Problema ao inserir vendedor`);
      }
    } else {
      let updateVendor = {
        name: actualVendor.name,
        cellphone: actualVendor.cellphone,
        area: actualVendor.area,
      };
      try {
        api
          .put<IVendor>(`/vendors/${actualVendor.id}`, updateVendor, config)
          .then((response) => alert(`Vendedor atualizado com sucesso`));
        setActualVendor({} as IVendor);
      } catch {
        alert(`Problema ao atualizar vendedor`);
      }
    }
  }

  function deleteCustomer(id: string | undefined): void {
    const resp = window.confirm(
      `Tem certeza que deseja realizar a exclusão desse cliente? ${id}`
    );
    if (resp) {
      try {
        api
          .delete<ICustomer>(`/customers/${id}`, config)
          .then((response) => alert(`Cliente removido com sucesso! `));
        setActualCustomer({} as ICustomer);
      } catch {
        alert(`Problema ao remover cliente`);
      }
    }
  }

  function deleteVendor(id: string | undefined): void {
    const resp = window.confirm(
      `Tem certeza que deseja realizar a exclusão desse vendedor? ${id}`
    );
    if (resp) {
      try {
        api
          .delete<IVendor>(`/vendors/${id}`, config)
          .then((response) => alert(`Vendedor removido com sucesso! `));
        setActualVendor({} as IVendor);
      } catch {
        alert(`Problema ao remover vendedor`);
      }
    }
  }

  function updateCustomer(customer: ICustomer | undefined): void {
    if (customer) {
      const aux = customer;
      setActualCustomer(aux);
    }
  }

  function updateVendor(vendor: IVendor | undefined): void {
    if (vendor) {
      const auxv = vendor;
      setActualVendor(auxv);
    }
  }

  return (
    <>
      <Title>Clientes</Title>
      <Form>
        <div>
          <input
            name="name"
            value={actualCustomer.name}
            placeholder="Nome do Cliente"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="cpf"
            value={actualCustomer.cpf}
            placeholder="Informe o cpf do cliente"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="celular"
            value={actualCustomer.celular}
            placeholder="Insira o celular do cliente"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="endereco"
            value={actualCustomer.endereco}
            placeholder="Informe o endereço do cliente"
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={addCustomer} type="submit">
            Salvar
          </button>
        </div>
      </Form>

      <Title>Vendedores</Title>
      <Form>
        <div>
          <input
            name="name"
            value={actualVendor.name}
            placeholder="Nome do vendedor"
            onChange={handleChangev}
          />
        </div>
        <div>
          <input
            name="cellphone"
            value={actualVendor.cellphone}
            placeholder="Informe o celular do vendedor"
            onChange={handleChangev}
          />
        </div>
        <div>
          <input
            name="area"
            value={actualVendor.area}
            placeholder="Informe os bairos que ele costuma passar"
            onChange={handleChangev}
          />
        </div>
        <div>
          <button onClick={addVendor} type="submit">
            Salvar
          </button>
        </div>
      </Form>
      <Tabela>
        <thead>
          <tr>
            <th> Nome </th>
            <th> CPF </th>
            <th> Telefone </th>
            <th> Endereço </th>
            <th> Remove </th>
            <th> Atualiza </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr>
              <td> {customer.name} </td>
              <td> {customer.cpf}</td>
              <td> {customer.celular}</td>
              <td> {customer.endereco}</td>
              <td>
                {" "}
                <button onClick={() => deleteCustomer(customer.id)}>
                  {" "}
                  <AiFillDelete />{" "}
                </button>
              </td>
              <td>
                {" "}
                <button onClick={() => updateCustomer(customer)}>
                  {" "}
                  <AiFillEdit />{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Tabela>

      <Tabela>
        <thead>
          <tr>
            <th> Nome </th>
            <th> Telefone </th>
            <th> Area </th>
            <th> Remove </th>
            <th> Atualiza </th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor, index) => (
            <tr>
              <td> {vendor.name} </td>
              <td> {vendor.cellphone}</td>
              <td> {vendor.area}</td>
              <td>
                {" "}
                <button onClick={() => deleteVendor(vendor.id)}>
                  {" "}
                  <AiFillDelete />{" "}
                </button>
              </td>
              <td>
                {" "}
                <button onClick={() => updateVendor(vendor)}>
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
