import React from 'react';
import {runInAction} from 'mobx';
import {render} from '../../../../jest/test-utils';
import {derivedTextMessage} from '../../../../jest/fixtures';
import {assistant} from '../../../utils/chat';
import {ttsStore} from '../../../store';
import {AssistantTurnFooter} from '../AssistantTurnFooter';

it('keeps copy while hiding speech even when the saved voice preference is enabled', () => {
  const previous = ttsStore.userTTSOverride;
  runInAction(() => {
    ttsStore.userTTSOverride = true;
  });
  const message = {
    ...derivedTextMessage,
    id: 'localpal-footer',
    author: {id: assistant.id},
    text: 'Imported message for interface verification.',
    metadata: {copyable: true},
  };
  const result = render(<AssistantTurnFooter message={message} />);
  try {
    expect(result.getByTestId('playbutton-localpal-footer')).toBeTruthy();
    result.rerender(
      <AssistantTurnFooter message={message} enableVoice={false} />,
    );
    expect(result.queryByTestId('playbutton-localpal-footer')).toBeNull();
    expect(result.getByTestId('footer-copy')).toBeTruthy();
  } finally {
    result.unmount();
    runInAction(() => {
      ttsStore.userTTSOverride = previous;
    });
  }
});
