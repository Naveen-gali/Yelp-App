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

// Called when the Result is RESULTS.UNAVAILABLE
function resultUnavailable(): void {
  return showAlert(
    Strings.locationService.notAvailable,
    Strings.locationService.notAvailable,
  );
}

// Called when the Result is RESULTS.BLOCKED
function resultsBlocked() {
  return showAlert(
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
}

// Called when the Result is RESULTS.DENIED
function resultsDenied() {
  return showAlert(
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

// Called when the Result is returned default.
function defaultCase() {
  return showAlert(
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
}

const checkPermission = async (permission: RequiredPermissions) => {
  const permissionStatus = await check(
    getPermissionBasedOnPlatform(permission),
  );
  let hasPermission = false;

  switch (permissionStatus) {
    case RESULTS.UNAVAILABLE:
      resultUnavailable();
      break;
    case RESULTS.DENIED:
      const requestStatus = await request(
        getPermissionBasedOnPlatform(permission),
      );

      if (requestStatus === RESULTS.GRANTED) {
        hasPermission = true;
      } else {
        if (permissionDeniedMap[permission]) {
          resultsDenied();
        } else {
          permissionDeniedMap[permission] = true;
        }
      }
      break;
    case RESULTS.LIMITED:
    case RESULTS.GRANTED:
      hasPermission = true;
      break;
    case RESULTS.BLOCKED:
      resultsBlocked();
      break;
    default:
      defaultCase();
      break;
  }
  return hasPermission;
};

export {checkPermission};
