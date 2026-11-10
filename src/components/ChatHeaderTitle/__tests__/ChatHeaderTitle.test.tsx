import React from 'react';
import {
  render as renderBase,
  fireEvent,
  waitFor,
} from '../../../../jest/test-utils';
import {ChatHeaderTitle} from '../ChatHeaderTitle';
import {chatSessionStore, modelStore} from '../../../store';
import {runInAction} from 'mobx';
import {basicModel, downloadedModel} from '../../../../jest/fixtures/models';
import {ModelOrigin} from '../../../utils/types';

const render = (ui: React.ReactElement) =>
  renderBase(ui, {withNavigation: true});

describe('ChatHeaderTitle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    runInAction(() => {
      modelStore.inferencing = false;
      modelStore.isContextLoading = false;
      modelStore.isStreaming = false;
    });
  });

  it('renders "Chat" when no active session exists', () => {
    runInAction(() => {
      chatSessionStore.resetActiveSession();
      chatSessionStore.sessions = [];
    });
    const {getByText} = render(<ChatHeaderTitle />);
    expect(getByText('Chat')).toBeTruthy();
  });

  it('renders session title when active session exists', () => {
    const mockSession = {
      id: '123',
      title: 'Test Session',
      date: new Date().toISOString(),
      messages: [],
    };
    runInAction(() => {
      Object.assign(chatSessionStore, {
        activeSessionId: mockSession.id,
        sessions: [mockSession],
      });
    });

    const {getByText} = render(<ChatHeaderTitle />);
    expect(getByText('Test Session')).toBeTruthy();
  });

  it('renders model name when active model exists', () => {
    runInAction(() => {
      modelStore.models = [basicModel];
      modelStore.setActiveModel(basicModel.id);
    });

    const {getByText} = render(<ChatHeaderTitle />);
    expect(getByText('basic model')).toBeTruthy();
  });

  it('updates when active model changes', () => {
    // Initial model
    runInAction(() => {
      modelStore.models = [basicModel];
      modelStore.setActiveModel(basicModel.id);
    });

    const {getByText, rerender} = render(<ChatHeaderTitle />);
    expect(getByText('basic model')).toBeTruthy();

    // Change model
    runInAction(() => {
      modelStore.models = [downloadedModel];
      modelStore.setActiveModel(downloadedModel.id);
    });

    rerender(<ChatHeaderTitle />);
    expect(getByText('downloaded model')).toBeTruthy();
  });

  it('loads an installed local model through the existing store', async () => {
    runInAction(() => {
      modelStore.models = [downloadedModel];
      modelStore.activeModelId = undefined;
    });
    const {getByTestId} = render(<ChatHeaderTitle />);
    fireEvent.press(getByTestId('header-model-selector'));
    fireEvent.press(getByTestId(`header-model-${downloadedModel.id}`));
    await waitFor(() =>
      expect(modelStore.selectModel).toHaveBeenCalledWith(downloadedModel),
    );
  });

  it('keeps model management reachable with no installed models', () => {
    runInAction(() => {
      modelStore.models = [];
    });
    const {getByTestId} = render(<ChatHeaderTitle />);
    fireEvent.press(getByTestId('header-model-selector'));
    expect(getByTestId('header-manage-models')).toBeTruthy();
  });

  it('prevents changing models during generation', () => {
    runInAction(() => {
      modelStore.models = [downloadedModel];
      modelStore.inferencing = true;
    });
    const {getByTestId} = render(<ChatHeaderTitle />);
    fireEvent.press(getByTestId('header-model-selector'));
    fireEvent.press(getByTestId(`header-model-${downloadedModel.id}`));
    expect(modelStore.selectModel).not.toHaveBeenCalled();
  });

  it('does not list remote models', () => {
    const remote = {
      ...downloadedModel,
      id: 'remote',
      origin: ModelOrigin.REMOTE,
    };
    runInAction(() => {
      modelStore.models = [remote];
    });
    const {getByTestId, queryByTestId} = render(<ChatHeaderTitle />);
    fireEvent.press(getByTestId('header-model-selector'));
    expect(queryByTestId('header-model-remote')).toBeNull();
  });
});
