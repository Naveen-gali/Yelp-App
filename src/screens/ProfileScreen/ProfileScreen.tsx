import React from 'react';
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
import {
  ExperiencesData,
  ExperiencesDataItemType,
  MoreSettingItemType,
  MoreSettings,
} from '../../assets';
import {Button, CustomIcon} from '../../components';
import {fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {Strings} from '../../i18n';
import {LocaleUtils, horizontalScale, verticalScale} from '../../utils';
import {ExperienceCard, ProfileHeader} from './components';

const ProfileScreen = () => {
  const {colors} = useThemeColor();

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
          onPress={() => {}}
          mode="outlined"
          style={[styles.button, {borderColor: colors.buttonBorder}]}>
          See More
        </Button>
      </View>
    );
  };

  const renderHorizontalLine = () => {
    return <View style={styles.horizontalLine} />;
  };

  const renderMoreSettingsItem = (
    props: ListRenderItemInfo<MoreSettingItemType>,
  ) => {
    const {item} = props;

    return (
      <TouchableOpacity style={styles.moreSetting}>
        <CustomIcon name={item.icon} size={verticalScale(25)} />
        <Text style={[fontStyles.b2_Text_Regular, styles.settingsText]}>
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
        <ProfileHeader />
        {renderExperiences()}
        {renderMoreSettings()}
      </SafeAreaView>
    </ScrollView>
  );
};

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
    padding: verticalScale(10),
  },
  horizontalLine: {
    marginHorizontal: horizontalScale(10),
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
