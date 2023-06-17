import {Alert} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';
import {Strings} from '../../i18n';
import {DeviceUtils} from '../../utils';
import {RequiredPermissions} from './PermissionService.types';

const getPermissionBasedOnPlatform = (permission: RequiredPermissions) => {
  if (permission === RequiredPermissions.Camera) {
    return DeviceUtils.isIos
      ? PERMISSIONS.IOS.CAMERA
      : PERMISSIONS.ANDROID.CAMERA;
  } else if (permission === RequiredPermissions.PhotoLibrary) {
    return DeviceUtils.isIos
      ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
      : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
  }
  throw new Error(Strings.locationService.invalidPermission);
};

let shouldRequestPermission = true;

const checkPermission = async (permission: RequiredPermissions) => {
  const permissionStatus = await check(
    getPermissionBasedOnPlatform(permission),
  );
  let hasPermission = false;

  switch (permissionStatus) {
    case RESULTS.UNAVAILABLE:
      Alert.alert(
        Strings.locationService.notAvailable,
        Strings.locationService.notAvailable,
      );
      hasPermission = false;
      break;
    case RESULTS.DENIED:
      if (!shouldRequestPermission) {
        const requestStatus = await request(
          getPermissionBasedOnPlatform(permission),
        );
        if (requestStatus === RESULTS.GRANTED) {
          hasPermission = true;
        } else {
          Alert.alert(
            Strings.locationService.denied,
            Strings.locationService.deniedDescription,
            [
              {
                text: Strings.locationService.goToSettings,
                onPress: async () => await openSettings(),
              },
              {
                text: Strings.locationService.cancel,
              },
            ],
          );
          hasPermission = false;
        }
      }
      shouldRequestPermission = false;
      hasPermission = false;
      break;
    case RESULTS.LIMITED:
      hasPermission = true;
      break;
    case RESULTS.GRANTED:
      hasPermission = true;
      break;
    case RESULTS.BLOCKED:
      Alert.alert(
        Strings.locationService.blocked,
        Strings.locationService.blockedPermission,
        [
          {
            text: Strings.locationService.goToSettings,
            onPress: async () => await openSettings(),
          },
          {
            text: Strings.locationService.cancel,
          },
        ],
      );
      hasPermission = false;
      break;
    default:
      Alert.alert(
        Strings.locationService.noPermission,
        Strings.locationService.noPermission,
        [
          {
            text: Strings.locationService.goToSettings,
            onPress: async () => await openSettings(),
          },
          {
            text: Strings.locationService.cancel,
          },
        ],
      );
      hasPermission = false;
      break;
  }

  return hasPermission;
};

export {checkPermission, getPermissionBasedOnPlatform};
