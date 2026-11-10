import React, {useCallback, useRef} from 'react';
import {TouchableOpacity, type HostInstance} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import {claimPlusReturnFocus, releasePlusReturnFocus} from './plusReturnFocus';
import {ArrowLeftMdIcon, MenuIcon} from '../../assets/icons';
import {useTheme} from '../../hooks';

export const HeaderLeft: React.FC<{backTo?: string}> = ({backTo}) => {
  const theme = useTheme();
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const buttonRef = useRef<HostInstance>(null);

  useFocusEffect(
    useCallback(() => {
      const node = buttonRef.current;
      claimPlusReturnFocus(node);
      return () => releasePlusReturnFocus(node);
    }, []),
  );

  return (
    <TouchableOpacity
      ref={buttonRef}
      style={[styles.menuIcon]}
      testID="menu-button"
      accessibilityLabel={backTo ? 'Back' : 'Open drawer'}
      accessibilityRole="button"
      onPress={() =>
        backTo ? navigation.navigate(backTo) : navigation.openDrawer()
      }>
      {backTo ? (
        <ArrowLeftMdIcon stroke={theme.colors.primary} />
      ) : (
        <MenuIcon stroke={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );
};
