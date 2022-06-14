import { formataBrasileiroParaDecimal, formataDecimalParaReal } from '../../../src/negocio/formatadores/moeda';

describe('negocio/formatadores/moeda', () => {
  describe('formataBrasileiroParaDecimal', () => {
    it('deve retornar 8.59 quando o valor for \'8,59\'', () => {
      const resposta = formataBrasileiroParaDecimal('8,59');
      expect(resposta).toBe(8.59);
    });
  });

  describe('formataDecimalParaReal', () => {
    it('deve retornar R$ 8,59 quando o valor for 8.59', () => {
      const resposta = formataDecimalParaReal(8.59);
      expect(resposta).toMatch(/R\$\s8,59/);
    });
  });
});
