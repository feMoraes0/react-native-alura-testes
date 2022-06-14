import { formataMaiorLanceDoLeilao} from '../../../src/negocio/formatadores/lance';

describe('negocio/formatadores/lance', () => {
  describe('formataMaiorLanceDoLeilao', () => {
    it('deve retornar o valor inicial quando não houverem lances maiores na lista de lances', () => {
      const lances = [
        {valor: 1},
        {valor: 2},
        {valor: 3},
      ];
      const lanceInicial = 4;
      const resposta = formataMaiorLanceDoLeilao(lances, lanceInicial);
      expect(resposta).toBe(lanceInicial);
    });

    it('deve retornar o maior valor da lista de lances quando for maior que o lance inicial', () => {
      const lances = [
        {valor: 1},
        {valor: 2},
        {valor: 3},
      ];
      const lanceInicial = 2;
      const resposta = formataMaiorLanceDoLeilao(lances, lanceInicial);
      expect(resposta).toBe(3);
    });
  });
});
