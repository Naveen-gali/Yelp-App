import {Alert, AlertButton, AlertOptions} from 'react-native';
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

const showAlert = (
  title: string,
  description: string,
  buttons?: AlertButton[],
  options?: AlertOptions,
) => {
  return Alert.alert(title, description, buttons, options);
};

let permissionDeniedMap: Record<RequiredPermissions, boolean> = {
  [RequiredPermissions.Camera]: false,
  [RequiredPermissions.PhotoLibrary]: false,
};

const checkPermission = async (permission: RequiredPermissions) => {
  if (permissionDeniedMap[permission]) {
    showAlert(
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
    return false;
  }

  const permissionStatus = await check(
    getPermissionBasedOnPlatform(permission),
  );
  let hasPermission = false;

  switch (permissionStatus) {
    case RESULTS.UNAVAILABLE:
      showAlert(
        Strings.locationService.notAvailable,
        Strings.locationService.notAvailable,
      );
      break;
    case RESULTS.DENIED:
      const requestStatus = await request(
        getPermissionBasedOnPlatform(permission),
      );

      if (requestStatus === RESULTS.GRANTED) {
        hasPermission = true;
      } else {
        if (permissionDeniedMap[permission]) {
          showAlert(
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
        }
        permissionDeniedMap[permission] = true;
      }
      break;

    case RESULTS.LIMITED:
    case RESULTS.GRANTED:
      hasPermission = true;
      break;
    case RESULTS.BLOCKED:
      showAlert(
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
      break;
    default:
      showAlert(
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
      break;
  }
  return hasPermission;
};

export {checkPermission, getPermissionBasedOnPlatform};
