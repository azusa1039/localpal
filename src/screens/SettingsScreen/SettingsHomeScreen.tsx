import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {List, Switch, Text} from 'react-native-paper';
import {observer} from 'mobx-react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {LanguageSelector} from '../../components';
import {useTheme} from '../../hooks';
import {uiStore} from '../../store';
import {L10nContext} from '../../utils';
import {ROUTES} from '../../utils/navigationConstants';
import {PersonaSettingsSheet} from '../../components/PersonaSettingsSheet';

export const SettingsHomeScreen = observer(() => {
  const theme = useTheme();
  const l10n = useContext(L10nContext);
  const navigation = useNavigation<NavigationProp<any>>();
  const [personasVisible, setPersonasVisible] = useState(false);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineSmall" style={styles.brand}>
          LocalPal
        </Text>
        <List.Section>
          <List.Item
            testID="settings-models"
            title={l10n.localpal.localModels}
            description={l10n.localpal.localModelsDescription}
            left={props => <List.Icon {...props} icon="view-grid-outline" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate(ROUTES.MODELS)}
          />
          <List.Item
            testID="settings-personas"
            title={l10n.localpal.personas}
            left={props => <List.Icon {...props} icon="account-outline" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => setPersonasVisible(true)}
          />
        </List.Section>
        <List.Section>
          <List.Item
            title={l10n.settings.darkMode}
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={uiStore.colorScheme === 'dark'}
                onValueChange={value =>
                  uiStore.setColorScheme(value ? 'dark' : 'light')
                }
              />
            )}
          />
          <List.Item
            title={l10n.settings.language}
            left={props => <List.Icon {...props} icon="translate" />}
            right={() => <LanguageSelector />}
          />
          <List.Item
            testID="settings-advanced"
            title={l10n.localpal.moreSettings}
            left={props => <List.Icon {...props} icon="tune-variant" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate(ROUTES.SETTINGS_ADVANCED)}
          />
        </List.Section>
      </ScrollView>
      {personasVisible && (
        <PersonaSettingsSheet
          isVisible
          onClose={() => setPersonasVisible(false)}
        />
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {padding: 16},
  brand: {padding: 16, fontWeight: '600'},
});
