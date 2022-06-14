import { obtemLeiloes } from '../../src/repositorio/leilao';
import apiLeiloes from '../../src/servicos/apiLeiloes';

jest.mock('../../src/servicos/apiLeiloes');

const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilão',
    descrição: 'Descrição do leilão'
  }
];

const mockRequisicao = (resposta) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: resposta,
      });
    }, 200);
  });
}

const mockRequisicaoErro = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject();
    }, 200);
  });
}

describe('repositorio/leilao', () => {
  describe('obtemLeiloes', () => {
    beforeEach(() => {
      apiLeiloes.get.mockClear();
    });

    it('deve retornar uma lista de leilões', async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicao(mockLeiloes));
      const leiloes = await obtemLeiloes();
      expect(leiloes).toEqual(mockLeiloes);
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
    });

    it('deve retornar uma lista vazia de leilões quando a requisição falhar', async () => {
      apiLeiloes.get.mockImplementation(() => mockRequisicaoErro());
      const leiloes = await obtemLeiloes();
      expect(leiloes).toEqual([]);
      expect(apiLeiloes.get).toHaveBeenCalledTimes(1);
      expect(apiLeiloes.get).toHaveBeenCalledWith('/leiloes');
    });
  });
});
