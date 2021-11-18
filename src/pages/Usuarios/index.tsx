import React from "react";
import { Title, Tabela, Formulario } from "./styles";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { api } from "../../services/api";

export const Usuarios: React.FC = () => {
  // tipo de dados do usuario
  interface IUser {
    id?: string; // objetos sendo ainda criados não tem id
    name: string;
    email: string;
    password: string;
    nickname: string;
    occupation: string;
  }

  // usuario atual do formulário - usuario selecionado na lista
  const [actualUser, setActualUser] = React.useState<IUser>({} as IUser);

  // vetor de usuarios
  const [users, setUsers] = React.useState<IUser[]>([]);

  // configuração do Bearer
  // precisa passar o token para consumiar a API - GET / POST / PUT / DELETE
  let config = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzYzOTU2NzEsImV4cCI6MTYzNjQ4MjA3MSwic3ViIjoiYTlmZWU3YTgtMjM4Zi00MWQ2LTk1MWEtMzQ1MDY5YjdjMGIwIn0.FnEyA_kb6Yps-kMt1bm7WZvnxAkm8nb-SBJ6CnrQhfI",
    },
  };

  // é executado quando o vetor users é alterado ou houver carregamento páginas
  React.useEffect(() => {
    try {
      // alimenta o vetor com os usuarios no banco de dados
      api
        .get<IUser[]>(`/users`, config)
        .then((response) => setUsers(response.data));
    } catch {
      alert(`Problema ao consultar Usuários`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  // função será chamada toda vez que tiver uma alteração em qualquer
  // um dos inputs
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // cria um objeto aux contendo os valor de actualUser
    // é associado já contendo a alteração necessária
    // e.target.name pode ser name, email ou etc
    // e.target.value será o valor do input
    const aux = Object.assign(actualUser, {
      [e.target.name]: e.target.value,
    });
    // atualiza os dados de usuario atual
    setActualUser(aux);
  }

  // chamado quando clica no botão
  // server para criar um usuario ou atualizar um usuario
  function addUser(): void {
    if (!actualUser.id) {
      // usuario não tem id, então vamos inserir
      try {
        api
          .post<IUser>(`/users`, actualUser, config) // insere com o token
          .then((response) => alert(`Usuário inserido com sucesso`)); // ok
      } catch {
        alert(`Problema ao inserir usuário`);
      }
      setActualUser({} as IUser); // zera o usuario atual
    } else {
      // usuario tem id - vamos atualizar o usuario
      let updateUser = {
        // os dados do usuario para atualizar não pode ter id, este vai na rota
        name: actualUser.name,
        description: actualUser.email,
        quantity: actualUser.password,
        pricecomp: actualUser.nickname,
        pricevend: actualUser.occupation,
      };
      try {
        api
          // passamos o id do usuario para atualizar, o usuario atualizado e o token
          .put<IUser>(`/users/${actualUser.id}`, updateUser, config)
          .then((response) => alert(`Atualizado com sucesso`));
        setActualUser({} as IUser);
      } catch {
        alert(`Problema ao atualizar usuário`);
      }
    }
  }

  // remove um usuario a partir do id
  function deleteUser(id: string | undefined): void {
    const resp = window.confirm(`Confirma a exclusão do usuario ${id}`);
    if (resp) {
      // caso queira remover
      try {
        api
          .delete<IUser>(`/users/${id}`, config) // passa o id do usuario para remover
          .then((response) => alert(`Usuário removido com sucesso `));
        setActualUser({} as IUser);
      } catch {
        alert(`Problema ao remover usuário`);
      }
    }
  }

  // ela coloca os dados escolhidos na lista para atualização no formulário
  function updateUser(user: IUser | undefined): void {
    if (user) {
      // usuario tem dados
      const aux = user;
      setActualUser(aux); // o usuario atual será o escolhido da lista
    }
  }

  return (
    <>
      <Title>Usuários</Title>
      <Formulario>
        <strong> Criar/Atualizar</strong>
        <div>
          <input
            name="name"
            value={actualUser.name}
            placeholder="Informe o nome do usuário"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="email"
            value={actualUser.email}
            placeholder="Informe o email"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="password"
            value={actualUser.password}
            placeholder="Informe a senha"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="nickname"
            value={actualUser.nickname}
            placeholder="Informe o apelido"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="occupation"
            value={actualUser.occupation}
            placeholder="Informe a ocupação"
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={addUser} type="submit">
            Salvar
          </button>
        </div>
      </Formulario>

      <Tabela>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Apelido</th>
            <th>Ocupação</th>
            <th>Remove</th>
            <th>Atualiza</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            // cria uma linha na tabela para cada usuario do vetor de usuarios
            <tr>
              {" "}
              {/* User representa um elemento do vetor */}
              <td> {user.name}</td>
              <td> {user.email}</td>
              <td> {user.nickname}</td>
              <td> {user.occupation}</td>
              <td>
                {" "}
                <button onClick={() => deleteUser(user.id)}>
                  {" "}
                  <AiFillDelete />{" "}
                </button>
              </td>
              <td>
                {" "}
                <button onClick={() => updateUser(user)}>
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
