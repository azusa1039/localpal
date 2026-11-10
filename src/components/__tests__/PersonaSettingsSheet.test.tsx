import React from 'react';
import {Alert} from 'react-native';
import {render, fireEvent, waitFor} from '../../../jest/test-utils';
import {mockLocalPal} from '../../../jest/fixtures/pals';
import {PersonaSettingsSheet} from '../PersonaSettingsSheet';
import {PalSheet} from '../PalsSheets';
import {chatSessionStore, palStore} from '../../store';

jest.mock('../PalsSheets', () => ({
  PalSheet: jest.fn(() => null),
}));

describe('local persona integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    palStore.pals = [mockLocalPal];
  });

  it('applies the selected persona through the existing session store', async () => {
    const onClose = jest.fn();
    const {getByTestId} = render(
      <PersonaSettingsSheet isVisible onClose={onClose} />,
    );
    fireEvent.press(getByTestId(`persona-${mockLocalPal.id}`));
    await waitFor(() => expect(onClose).toHaveBeenCalled());
    expect(chatSessionStore.setActivePal).toHaveBeenCalledWith(mockLocalPal.id);
  });

  it('removes the selected persona through the same persistence path', async () => {
    const onClose = jest.fn();
    const {getByText} = render(
      <PersonaSettingsSheet isVisible onClose={onClose} />,
    );
    fireEvent.press(getByText('Default assistant'));
    await waitFor(() => expect(onClose).toHaveBeenCalled());
    expect(chatSessionStore.setActivePal).toHaveBeenCalledWith(undefined);
  });

  it('passes the existing prompt and description to the original editor', () => {
    const {getByText} = render(
      <PersonaSettingsSheet isVisible onClose={jest.fn()} />,
    );
    fireEvent.press(getByText('Edit'));
    expect(jest.mocked(PalSheet).mock.calls.at(-1)?.[0].pal).toMatchObject({
      id: mockLocalPal.id,
      description: mockLocalPal.description,
      systemPrompt: mockLocalPal.systemPrompt,
    });
  });

  it('starts new personas in the original local assistant editor', () => {
    const {getByTestId} = render(
      <PersonaSettingsSheet isVisible onClose={jest.fn()} />,
    );
    fireEvent.press(getByTestId('new-persona'));
    expect(jest.mocked(PalSheet).mock.calls.at(-1)?.[0].pal).toMatchObject({
      type: 'local',
      name: '',
      systemPrompt: '',
      useAIPrompt: false,
    });
  });

  it('shows persistence failures and keeps the selection open', async () => {
    jest
      .mocked(chatSessionStore.setActivePal)
      .mockRejectedValueOnce(new Error('save failed'));
    const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    const onClose = jest.fn();
    const {getByTestId} = render(
      <PersonaSettingsSheet isVisible onClose={onClose} />,
    );
    fireEvent.press(getByTestId(`persona-${mockLocalPal.id}`));
    await waitFor(() =>
      expect(alert).toHaveBeenCalledWith('Error', 'Error: save failed'),
    );
    expect(onClose).not.toHaveBeenCalled();
    alert.mockRestore();
  });
});
