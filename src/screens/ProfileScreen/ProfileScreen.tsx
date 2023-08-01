import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import analytics from '@react-native-firebase/analytics';
import storage from '@react-native-firebase/storage';
import {observer} from 'mobx-react-lite';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  FlatList,
  GestureResponderEvent,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import ImagePicker, {
  Image as ImagePickerResultProps,
} from 'react-native-image-crop-picker';
import PushNotification from 'react-native-push-notification';
import {ExperiencesData, MoreSettings, ProfileTasks} from '../../assets';
import {
  Button,
  Card,
  CustomIcon,
  CustomIconNames,
  Label,
} from '../../components';
import {Constants, fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {Strings} from '../../i18n';
import {RootStoreContext} from '../../models';
import {checkPermission, RequiredPermissions} from '../../services';
import {ExperiencesDataItemType, MoreSettingItemType} from '../../types';
import {
  DeviceUtils,
  horizontalScale,
  LocaleUtils,
  verticalScale,
} from '../../utils';
import {ExperienceCard, ProfileHeader} from './components';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  ProfileStackParams,
  ProfileStackRoute,
} from '../../navigation/ProfileStack';
import {SvgWithCssUri} from 'react-native-svg';

enum MyImpactTabs {
  Reviews = 'Reviews',
  Photos = 'Photos',
}

const ProfileScreen = observer(() => {
  const {colors} = useThemeColor();
  const {auth, user} = useContext(RootStoreContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<ProfileStackParams>>();

  const [photoUploading, setPhotoUploading] = useState(false);
  const [profileImage, setProfileImage] = useState(user.photo);
  const [activeTab, setActiveTab] = useState<MyImpactTabs>(
    MyImpactTabs.Reviews,
  );
  const [showFullTasks, setShowFullTasks] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['25%'], []);

  const handlePresentModelPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleModelClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('HandleSheetChanges', index);
  }, []);

  const reference = storage().ref(user.id);

  const getImagePickerResultUrl = (result: ImagePickerResultProps) => {
    if (DeviceUtils.isIos && result.sourceURL) {
      return decodeURI(result.sourceURL);
    } else {
      return decodeURI(result.path);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
    });

    if (result) {
      setPhotoUploading(true);
      await reference
        .putFile(getImagePickerResultUrl(result))
        .then(res => {
          console.log('UPLAOD RES :_ ', res);
        })
        .catch(() =>
          Alert.alert(
            Strings.photoUpload.title,
            Strings.photoUpload.description,
          ),
        );
      setPhotoUploading(false);
    } else {
      Alert.alert(Strings.photoUpload.title, Strings.photoUpload.description);
    }
  };

  const pickFromCamera = async () => {
    const result = await ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true,
    });

    if (result) {
      setPhotoUploading(true);
      await reference.putFile(getImagePickerResultUrl(result)).then(res => {
        console.log('RES :_ ', res);
        setPhotoUploading(false);
      });
    } else {
      Alert.alert(Strings.photoUpload.title, Strings.photoUpload.description);
    }
  };

  const getImageUrl = async () => {
    const url = await storage().ref(user.id).getDownloadURL();
    if (url) {
      setProfileImage(url);
    }
  };

  useEffect(() => {
    user.getCurrentUser();
    getImageUrl();
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
          style={[
            styles.button,
            {borderColor: colors.buttonBorder},
            styles.impactButton,
          ]}>
          {Strings.profile.seeMore}
        </Button>
      </View>
    );
  };

  const impactActionItem = (
    label: string,
    active: boolean,
    onPress: (event: GestureResponderEvent) => void,
    style?: StyleProp<ViewStyle>,
  ) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.impactActionItem, style]}>
        <Label
          label={label}
          style={[
            {
              textAlign: 'left',
            },
            active ? fontStyles.b2_Medium : fontStyles.b2_Text_Regular,
          ]}
        />
      </TouchableOpacity>
    );
  };

  const renderImpactDateCard = (title: string, count: number) => {
    return (
      <Card style={[styles.impactCard]}>
        <Text>{title}</Text>
        <Text style={[fontStyles.b1_Text_Bold]}>{count}</Text>
      </Card>
    );
  };

  const renderMyImpact = () => {
    return (
      <View style={styles.myImpactSection}>
        <Text style={[fontStyles.b1_Text_Bold]}>
          {Strings.profile.myImpact.myImpact}
        </Text>
        <View style={styles.myImpactActionsRow}>
          {impactActionItem(
            Strings.profile.myImpact.reviews,
            activeTab === MyImpactTabs.Reviews,
            () => setActiveTab(MyImpactTabs.Reviews),
          )}
          {impactActionItem(
            Strings.profile.myImpact.photos,
            activeTab === MyImpactTabs.Photos,
            () => setActiveTab(MyImpactTabs.Photos),
            {paddingLeft: horizontalScale(10)},
          )}
        </View>

        <View>
          {activeTab === MyImpactTabs.Photos ? (
            <>
              <View style={styles.impactRowContainer}>
                {renderImpactDateCard(Strings.profile.myImpact.likesAllTime, 0)}
                {renderImpactDateCard(
                  Strings.profile.myImpact.viewsLast90Days,
                  0,
                )}
              </View>
              <Text
                style={[
                  fontStyles.b3_Text_Regular,
                  {color: colors.text},
                  styles.helperText,
                ]}>
                {Strings.profile.myImpact.photosHelperText}
              </Text>
              <Button
                mode={'outlined'}
                onPress={() => {}}
                style={[
                  styles.button,
                  {
                    borderColor: colors.buttonBorder,
                  },
                  styles.impactButton,
                ]}>
                {Strings.profile.myImpact.photosButtonText}
              </Button>
            </>
          ) : (
            <>
              <View style={styles.impactRowContainer}>
                {renderImpactDateCard(Strings.profile.myImpact.votesAllTime, 0)}
                {renderImpactDateCard(
                  Strings.profile.myImpact.viewsLast90Days,
                  0,
                )}
              </View>
              <Text
                style={[
                  fontStyles.b3_Text_Regular,
                  {color: colors.text},
                  styles.helperText,
                ]}>
                {Strings.profile.myImpact.reviewsHelperText}
              </Text>
              <Button
                mode={'outlined'}
                onPress={() => {}}
                style={[
                  styles.button,
                  {
                    borderColor: colors.buttonBorder,
                  },
                  styles.impactButton,
                ]}>
                {Strings.profile.myImpact.reviewsButtonText}
              </Button>
            </>
          )}
        </View>
      </View>
    );
  };

  const renderMyTasks = () => {
    return (
      <View style={styles.myTasksSection}>
        <View style={styles.tasksHeader}>
          <View>
            <Text style={[fontStyles.b1_Text_Bold]}>0/6 Completed</Text>
            <Text style={[fontStyles.b3_Text_Regular, {color: colors.text}]}>
              You're ready to unlock the basics
            </Text>
          </View>
          <SvgWithCssUri
            uri={Constants.NightLifeIconUrl}
            width={horizontalScale(50)}
            height={verticalScale(50)}
          />
        </View>
        <FlatList
          data={showFullTasks ? ProfileTasks : ProfileTasks.slice(0, 3)}
          renderItem={({item}) => (
            <View style={styles.profileTasksItem}>
              <CustomIcon name={item.icon} size={verticalScale(26)} />
              <View style={styles.profileTasksItemHeadings}>
                <Text style={[fontStyles.b2_Text_Bold]}>
                  {LocaleUtils.localizedText(item.title)}
                </Text>
                <Text
                  style={[fontStyles.b3_Text_Regular, {color: colors.text}]}>
                  {LocaleUtils.localizedText(item.description)}
                </Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={renderHorizontalLine}
          ListFooterComponent={() => (
            <Button
              mode={'outlined'}
              onPress={() => setShowFullTasks(!showFullTasks)}
              style={[
                styles.button,
                {
                  borderColor: colors.buttonBorder,
                },
                styles.impactButton,
              ]}>
              {showFullTasks ? 'See Less' : 'See More'}
            </Button>
          )}
        />
      </View>
    );
  };

  const renderHorizontalLine = (mode: 'line' | 'spacer') => {
    return (
      <View
        style={[
          styles.horizontalLine,
          mode === 'spacer' ? styles.spacerLine : null,
          {
            backgroundColor: colors.loaderBackground,
          },
        ]}
      />
    );
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

  const getRenderItemOnPres = (id: string) => {
    if (id === 'logout') {
      auth.signOut();
    } else if (id === 'contactus') {
      navigation.navigate(ProfileStackRoute.Contact);
    } else {
      getLocalNotification();
    }
  };

  const renderMoreSettingsItem = (
    props: ListRenderItemInfo<MoreSettingItemType>,
  ) => {
    const {item} = props;

    return (
      <TouchableOpacity
        style={styles.moreSetting}
        onPress={() => getRenderItemOnPres(item.id)}>
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
        ListHeaderComponentStyle={styles.listHeader}
        renderItem={renderMoreSettingsItem}
        ItemSeparatorComponent={renderHorizontalLine}
        contentContainerStyle={{
          marginHorizontal: horizontalScale(12),
        }}
      />
    );
  };

  const checkCameraPermission = async () => {
    await checkPermission(RequiredPermissions.Camera).then(res => {
      if (res) {
        pickFromCamera();
        handleModelClose();
      }
    });
  };

  const checkPhotoLibraryPermission = async () => {
    await checkPermission(RequiredPermissions.PhotoLibrary).then(res => {
      if (res) {
        pickImage();
        handleModelClose();
      }
    });
  };

  const renderBottomSheetActionButton = (
    text: string,
    icon: CustomIconNames,
    onPress: (event: GestureResponderEvent) => void,
  ) => {
    return (
      <TouchableOpacity style={styles.bottomSheetActionItem} onPress={onPress}>
        <CustomIcon name={icon} size={verticalScale(30)} color={colors.text} />
        <Text style={[fontStyles.b3_Text_Regular, {color: colors.text}]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderBottomSheetModal = () => {
    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.bottomSheetContentContainer}>
          {renderBottomSheetActionButton(
            Strings.uploadTypes.useCamera,
            CustomIconNames.Camera,
            checkCameraPermission,
          )}
          {renderBottomSheetActionButton(
            Strings.uploadTypes.useStorage,
            CustomIconNames.Image,
            checkPhotoLibraryPermission,
          )}
        </View>
      </BottomSheetModal>
    );
  };

  return (
    <BottomSheetModalProvider>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <SafeAreaView>
          <ProfileHeader
            email={user.email}
            image={profileImage ?? Constants.UserImageUrl}
            name={user.givenName ?? user.familyName + '' + user.name}
            imageOnPress={handlePresentModelPress}
            photoUploading={photoUploading}
            style={{
              marginHorizontal: horizontalScale(12),
            }}
          />
          {renderHorizontalLine('spacer')}
          {renderExperiences()}
          {renderHorizontalLine('spacer')}
          {renderMyImpact()}
          {renderHorizontalLine('spacer')}
          {renderMyTasks()}
          {renderHorizontalLine('spacer')}
          {renderMoreSettings()}
          {renderBottomSheetModal()}
        </SafeAreaView>
      </ScrollView>
    </BottomSheetModalProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(15),
  },
  spacerLine: {
    height: verticalScale(7),
    borderBottomWidth: 0,
  },
  experiencesSection: {
    marginVertical: verticalScale(15),
    marginHorizontal: horizontalScale(12),
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
  bottomSheetContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomSheetActionItem: {
    padding: verticalScale(20),
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  myImpactSection: {
    marginVertical: verticalScale(15),
    marginHorizontal: horizontalScale(12),
  },
  myImpactActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '40%',
  },
  impactActionItem: {
    paddingVertical: verticalScale(10),
    paddingRight: horizontalScale(10),
  },
  impactCard: {
    padding: verticalScale(20),
    borderRadius: verticalScale(5),
  },
  impactRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  helperText: {
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(5),
  },
  impactButton: {
    marginTop: verticalScale(10),
    paddingVertical: 9,
  },
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(15),
  },
  profileTasksItem: {
    flexDirection: 'row',
    marginVertical: verticalScale(10),
  },
  profileTasksItemHeadings: {
    marginHorizontal: horizontalScale(10),
  },
  myTasksSection: {
    marginBottom: verticalScale(15),
    marginHorizontal: horizontalScale(12),
  },
});

export {ProfileScreen};
