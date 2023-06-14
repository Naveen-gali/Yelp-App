import analytics from '@react-native-firebase/analytics';
import React, {useCallback, useContext, useEffect} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ExperiencesData, MoreSettings} from '../../assets';
import {Button, CustomIcon} from '../../components';
import {Constants, fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {Strings} from '../../i18n';
import {RootStoreContext} from '../../models';
import {ExperiencesDataItemType, MoreSettingItemType} from '../../types';
import {LocaleUtils, horizontalScale, verticalScale} from '../../utils';
import {ExperienceCard, ProfileHeader} from './components';
import {observer} from 'mobx-react-lite';
import PushNotification from 'react-native-push-notification';

const ProfileScreen = observer(() => {
  const {colors} = useThemeColor();
  const {auth, user} = useContext(RootStoreContext);

  useEffect(() => {
    user.getCurrentUser();
  });

  const onPressSeeMore = useCallback(async () => {
    await analytics().logEvent('selected_btn', {
      value: 'See More',
    });
  }, []);

  const renderExperiencesItem = (
    props: ListRenderItemInfo<ExperiencesDataItemType>,
  ) => {
    const {item} = props;

    return (
      <ExperienceCard
        logo={item.logo}
        title={LocaleUtils.localizedText(item.title)}
      />
    );
  };

  const renderExperiences = () => {
    return (
      <View style={styles.experiencesSection}>
        <Text style={fontStyles.b1_Text_Bold}>
          {Strings.profile.shareYourExperiences}
        </Text>
        <FlatList data={ExperiencesData} renderItem={renderExperiencesItem} />
        <Button
          onPress={onPressSeeMore}
          mode="outlined"
          style={[styles.button, {borderColor: colors.buttonBorder}]}>
          {Strings.profile.seeMore}
        </Button>
      </View>
    );
  };

  const renderHorizontalLine = () => {
    return <View style={styles.horizontalLine} />;
  };

  const getLocalNotification = () =>
    PushNotification.localNotification({
      channelId: 'yelp-app',
      priority: 'high',
      visibility: 'public',
      message: 'Local Notification from the RNPN',
      title: 'Notification title',
      largeIconUrl:
        'https://s3-media0.fl.yelpcdn.com/bphoto/TjSiQgUlKHalp3iC4Y2SYg/o.jpg',
      picture:
        'https://s3-media0.fl.yelpcdn.com/bphoto/TjSiQgUlKHalp3iC4Y2SYg/o.jpg',
    });

  const renderMoreSettingsItem = (
    props: ListRenderItemInfo<MoreSettingItemType>,
  ) => {
    const {item} = props;

    return (
      <TouchableOpacity
        style={styles.moreSetting}
        onPress={
          item.id === 'logout' ? auth.signOut : () => getLocalNotification()
        }>
        <CustomIcon
          name={item.icon}
          size={verticalScale(25)}
          color={colors.text}
        />
        <Text
          style={[
            styles.settingsText,
            fontStyles.b2_Text_Regular,
            {color: colors.text},
          ]}>
          {LocaleUtils.localizedText(item.label)}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMoreSettings = () => {
    return (
      <FlatList
        data={MoreSettings}
        ListHeaderComponent={renderHorizontalLine}
        ListHeaderComponentStyle={styles.listHeader}
        renderItem={renderMoreSettingsItem}
        ItemSeparatorComponent={renderHorizontalLine}
      />
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <SafeAreaView>
        <ProfileHeader
          email={user.email}
          image={user.photo ?? Constants.UserImageUrl}
          name={user.givenName ?? user.familyName + '' + user.name}
        />
        {renderExperiences()}
        {renderMoreSettings()}
      </SafeAreaView>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(12),
    marginTop: verticalScale(15),
  },
  experiencesSection: {
    marginTop: verticalScale(15),
  },
  button: {
    paddingHorizontal: verticalScale(15),
    paddingVertical: verticalScale(10),
    borderRadius: verticalScale(4),
    marginHorizontal: horizontalScale(3),
  },
  moreSetting: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
  },
  horizontalLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingsText: {
    marginLeft: horizontalScale(6),
  },
  listHeader: {
    marginVertical: verticalScale(10),
  },
});

export {ProfileScreen};
