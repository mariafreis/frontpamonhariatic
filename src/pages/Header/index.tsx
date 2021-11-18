import React from "react";
import { NavLink } from "react-router-dom";
import { Navegacao } from "./styles";
import perfil from "../../assets/perfil.png";
import logo from "../../assets/logo.jpeg";

export const Header: React.FC = () => {
  return (
    <>
      <Navegacao>
        <ul>
          <li>
            <NavLink to="/">
              {" "}
              <img src={logo} width="150px" alt="PamonhariaFrancana" />{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/estoque"> Estoque </NavLink>
          </li>
          <li>
            <NavLink to="/financas"> Finanças </NavLink>
          </li>
          <li>
            <NavLink to="/pessoas"> Pessoas </NavLink>
          </li>
          <li>
            <NavLink to="/usuarios"> Usuários </NavLink>
          </li>
          <li>
            <NavLink to="/"> Caixas </NavLink>
          </li>
          <li>
            <NavLink to="/"> Vendas </NavLink>
          </li>
          <li>
            <NavLink to="/"> Rastreamento </NavLink>
          </li>
          <div>
            <li>
              <NavLink to="/perfil">
                {" "}
                <img src={perfil} width="50px" alt="Perfil" />{" "}
              </NavLink>
            </li>
          </div>
        </ul>
      </Navegacao>
    </>
  );
};
