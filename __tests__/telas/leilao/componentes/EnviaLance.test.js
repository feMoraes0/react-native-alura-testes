import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import EnviaLance from "../../../../src/telas/Leilao/componentes/EnviaLance";
import { ENVIADO, NAO_ENVIADO } from '../../../../src/negocio/constantes/estadosLance';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('telas/Leilao/componentes/EnviaLance', () => {
  it('deve enviar o lance quando o botão for pressionado', async () => {
    const enviaLance = jest.fn(() => new Promise(
      resolve => resolve(ENVIADO)
    ));

    const wrapper = render(<EnviaLance enviaLance={enviaLance} cor="blue" />);
    const input = wrapper.getByPlaceholderText('R$');
    const botao = wrapper.getByA11yHint('Enviar lance');
    
    fireEvent.changeText(input, '10');
    fireEvent.press(botao);

    expect(enviaLance).toHaveBeenCalledTimes(1);
    expect(enviaLance).toHaveBeenCalledWith("10");

    await waitFor(() => {
      const text = wrapper.getByText(ENVIADO);
      expect(text).toBeTruthy();
    });

    expect(() => wrapper.getByText(NAO_ENVIADO)).toThrow();
  });
});
