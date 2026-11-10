import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';
import {Button, List} from 'react-native-paper';
import {observer} from 'mobx-react';

import {Sheet} from './Sheet';
import {PalSheet} from './PalsSheets';
import {chatSessionStore, palStore} from '../store';
import {L10nContext} from '../utils';
import {
  createNewAssistantPal,
  preparePalForEditing,
} from '../utils/pal-templates';
import type {Pal} from '../types/pal';

/** A local entry to existing persona persistence and system-prompt editing. */
export const PersonaSettingsSheet = observer(
  ({isVisible, onClose}: {isVisible: boolean; onClose: () => void}) => {
    const l10n = useContext(L10nContext);
    const [editing, setEditing] = useState<Partial<Pal> | null>(null);

    const select = async (palId: string | undefined) => {
      try {
        await chatSessionStore.setActivePal(palId);
        onClose();
      } catch (error) {
        Alert.alert(l10n.common.error, String(error));
      }
    };

    return (
      <>
        <Sheet
          isVisible={isVisible}
          onClose={onClose}
          title={l10n.localpal.personas}>
          <Sheet.ScrollView>
            <List.Item
              title={l10n.localpal.noPersona}
              onPress={() => select(undefined)}
              right={props =>
                !chatSessionStore.activePalId ? (
                  <List.Icon {...props} icon="check" />
                ) : null
              }
            />
            {palStore.pals.map(pal => (
              <List.Item
                key={pal.id}
                testID={`persona-${pal.id}`}
                title={pal.name}
                description={pal.description}
                onPress={() => select(pal.id)}
                left={props => (
                  <List.Icon
                    {...props}
                    icon={
                      chatSessionStore.activePalId === pal.id
                        ? 'check'
                        : 'account-outline'
                    }
                  />
                )}
                right={() => (
                  <Button onPress={() => setEditing(preparePalForEditing(pal))}>
                    {l10n.localpal.edit}
                  </Button>
                )}
              />
            ))}
            <Button
              testID="new-persona"
              icon="plus"
              onPress={() => setEditing(createNewAssistantPal())}>
              {l10n.localpal.newPersona}
            </Button>
          </Sheet.ScrollView>
        </Sheet>
        {editing && (
          <PalSheet isVisible pal={editing} onClose={() => setEditing(null)} />
        )}
      </>
    );
  },
);
