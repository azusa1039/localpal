import React from 'react';
import {render} from '../../../../jest/test-utils';
import {SidebarContent} from '../SidebarContent';
import {setShipOverride} from '../../../services/plus/shipOverride';

describe('LocalPal sidebar scope', () => {
  afterEach(() => setShipOverride([]));

  it('keeps local chat and settings entries while hiding upstream destinations', () => {
    setShipOverride(['handsFreeVoice']);
    const navigation = {navigate: jest.fn(), closeDrawer: jest.fn()};
    const {queryByTestId, getByTestId, queryByText} = render(
      <SidebarContent {...({navigation} as any)} />,
    );
    expect(getByTestId('drawer-item-new-chat')).toBeTruthy();
    expect(getByTestId('drawer-item-settings')).toBeTruthy();
    for (const entry of ['plus', 'pals', 'models', 'benchmark']) {
      expect(queryByTestId(`drawer-item-${entry}`)).toBeNull();
    }
    expect(queryByText('App Info')).toBeNull();
  });
});
