import React, {useContext, useState} from 'react';
import {ActivityIndicator, Alert, Pressable, View} from 'react-native';
import {observer} from 'mobx-react';
import {Text} from 'react-native-paper';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {styles} from './styles';
import {chatSessionStore, modelStore} from '../../store';
import {L10nContext} from '../../utils';
import {Model, ModelOrigin} from '../../utils/types';
import {ROUTES} from '../../utils/navigationConstants';
import {useTheme} from '../../hooks';
import {ChevronDownIcon} from '../../assets/icons';
import {Menu} from '../Menu';

export const ChatHeaderTitle: React.FC = observer(() => {
  const l10n = useContext(L10nContext);
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();
  const [visible, setVisible] = useState(false);
  const activeSessionId = chatSessionStore.activeSessionId;
  const activeSession = chatSessionStore.sessions.find(
    session => session.id === activeSessionId,
  );
  const activeModel = modelStore.activeModel;
  const models = modelStore.availableModels.filter(
    model => model.origin !== ModelOrigin.REMOTE,
  );
  const busy =
    modelStore.isContextLoading ||
    modelStore.inferencing ||
    modelStore.isStreaming;

  const selectModel = async (model: Model) => {
    setVisible(false);
    if (busy || model.id === modelStore.activeModelId) {
      return;
    }
    try {
      await modelStore.selectModel(model);
      if (modelStore.modelLoadError) {
        Alert.alert(l10n.common.error, modelStore.modelLoadError.message);
      }
    } catch (error) {
      Alert.alert(l10n.common.error, String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text numberOfLines={1} variant="titleSmall">
        {activeSession?.title || l10n.components.chatHeaderTitle.defaultTitle}
      </Text>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchorPosition="bottom"
        selectable
        anchor={
          <Pressable
            testID="header-model-selector"
            accessibilityRole="button"
            accessibilityLabel={l10n.components.headerRight.model}
            accessibilityState={{expanded: visible, busy}}
            onPress={() => setVisible(true)}
            style={styles.modelButton}>
            <Text
              numberOfLines={1}
              variant="bodySmall"
              style={styles.modelName}>
              {modelStore.isContextLoading
                ? `${l10n.components.chatEmptyPlaceholder.loading} ${modelStore.loadingModel?.name ?? ''}`
                : activeModel?.name || l10n.components.headerRight.model}
            </Text>
            {modelStore.isContextLoading ? (
              <ActivityIndicator size="small" color={theme.colors.onSurface} />
            ) : (
              <ChevronDownIcon
                width={14}
                height={14}
                stroke={theme.colors.onSurfaceVariant}
              />
            )}
          </Pressable>
        }>
        {models.map(model => (
          <Menu.Item
            key={model.id}
            testID={`header-model-${model.id}`}
            label={model.name}
            selected={model.id === modelStore.activeModelId}
            disabled={busy}
            onPress={() => selectModel(model)}
          />
        ))}
        <Menu.Separator />
        <Menu.Item
          testID="header-manage-models"
          label={l10n.screenTitles.models}
          onPress={() => {
            setVisible(false);
            navigation.navigate(ROUTES.MODELS);
          }}
        />
      </Menu>
    </View>
  );
});
