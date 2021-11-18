import React from "react";
import { Formulario, Title } from "./styles";
import { api } from "../../services/api";
import { useHistory } from "react-router-dom";

// cria um tipo de dado com email e senha
interface ILogin {
  email: string;
  password: string;
}

// componente funcional
export const Login: React.FC = () => {
  // cria o estado login com setLogin que é do tipo ILogin
  let [login, setLogin] = React.useState<ILogin>({} as ILogin);

  // estamos utilizando um Hook do ReactJS -> permite que mudemos de rota quando quisermos
  // pois o hook guarda o histórico de navegação
  let history = useHistory();

  // função é chamada toda vez que usuário digital algo em alguma caixa de texto
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // altera o respectivo campo (email, senha) com o respectivo valor
    const aux = Object.assign(login, {
      [e.target.name]: e.target.value,
    });
    // altera efetivamente os valores de login
    setLogin(aux);
  }

  return (
    <>
      <Formulario>
        <Title>Área de Login</Title>
        <div>
          <input
            name="email"
            placeholder="Insira seu email"
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Insira sua senha"
            onChange={handleChange}
          />
        </div>
        <button
          onClick={() => {
            try {
              // vamos tentar consumir a API para consultar se a senha é válida
              api
                .get<String>(`/users/${login.email}/${login.password}`)
                .then((response) => {
                  // quando recebermos a resposta
                  if (response.data === "Usuário OK") {
                    // senha está correta
                    history.push("/dashboard"); // direciona usuário para a rota /product
                  } else {
                    // mostra ao usuário o erro do servidor
                    alert(response.data); // Usuário/Senha inválido
                  }
                });
            } catch {
              // problema na consulta
              alert(`Problema ao consultar usuário/senha`);
            }
          }}
          type="button"
        >
          Entrar
        </button>
      </Formulario>
    </>
  );
};
