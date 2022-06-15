import { renderHook, act } from '@testing-library/react-hooks';
import useListaLeiloes from '../../src/hooks/useListaLeiloes';
import { obtemLeiloes } from '../../src/repositorio/leilao';

jest.mock('../../src/repositorio/leilao');

const mockLeiloes = [
  {
    id: 1,
    nome: 'Leilão',
    descrição: 'Descrição do leilão'
  }
];

const mockLeiloesAtualizada = [
  {
    id: 1,
    nome: 'Leilão',
    descrição: 'Descrição do leilão'
  },
  {
    id: 2,
    nome: 'Leilão 2',
    descrição: 'Descrição do leilão 2'
  }
];

describe('hooks/useListLeiloes', () => {
  it('deve retornar uma lista de leiloes e uma função para atualizar', async () => {
    obtemLeiloes.mockImplementation(() => mockLeiloes);
    const { waitForNextUpdate, result } = renderHook(() => useListaLeiloes());
    expect(result.current[0]).toEqual([]);
    await waitForNextUpdate();
    expect(result.current[0]).toEqual(mockLeiloes);

    obtemLeiloes.mockImplementation(() => mockLeiloesAtualizada);
    await act(() => result.current[1]());
    expect(result.current[0]).toEqual(mockLeiloesAtualizada);
  });
});
