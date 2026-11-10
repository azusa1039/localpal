import React from 'react';
import {fireEvent, render} from '../../../../jest/test-utils';
import {SettingsHomeScreen} from '../SettingsHomeScreen';
import {ROUTES} from '../../../utils/navigationConstants';

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({navigate: mockNavigate}),
}));

describe('LocalPal settings navigation', () => {
  beforeEach(() => jest.clearAllMocks());

  it('opens the existing model manager and advanced configuration', () => {
    const {getByTestId, queryByText} = render(<SettingsHomeScreen />);
    fireEvent.press(getByTestId('settings-models'));
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.MODELS);
    fireEvent.press(getByTestId('settings-advanced'));
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.SETTINGS_ADVANCED);
    expect(queryByText('PocketPal Plus')).toBeNull();
    expect(queryByText('Benchmark')).toBeNull();
  });
});
