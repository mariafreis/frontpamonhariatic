import React from 'react';
import { FiChevronRight} from 'react-icons/fi';

import { api  } from '../../services/api';
import { Title, Form, Products } from './styles';
import logo from '../../assets/logo.jpeg'

interface PamonhariaRepository{
  name: string;
  description: string;
  pricevend: number;
  quantity: number;
}
export const Dashboard: React.FC = () => {
  const [products, setProducts] = React.useState<PamonhariaRepository[]>([]);
  const [newProducts, setNewProducts] = React.useState('');

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void{
    setNewProducts(event.target.value);
  }

  async function handleAddProduct(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const response = await api.get<PamonhariaRepository>(`products/${newProducts}`);

    const repository = response.data;

    setProducts([...products, repository]);
    setNewProducts('');
  }

  return (
    <>
      <img src={logo} width="250px" alt="PamonhariaFrancana"  />
      <Title> Estoque </Title>

      <Form onSubmit={handleAddProduct}>
        <input placeholder=" Nome do Produto/Insumo" onChange={handleInputChange} />
        <button type="submit"> Buscar</button>
      </Form>

      <Products>
        {products.map(repository => (
          <a href="/repositories" key={repository.name}>
            <div>
              <strong>{repository.name}</strong>
              <p>{repository.description}
              {repository.pricevend}
              {repository.quantity}
              </p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Products>
    </>
  );
};
