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
  switch (permission) {
    case RequiredPermissions.Camera:
      return DeviceUtils.isIos
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;

    case RequiredPermissions.PhotoLibrary:
      return DeviceUtils.isIos
        ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
  }
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
async function resultUnavailable(): Promise<boolean> {
  return new Promise(resolve => {
    return showAlert(
      Strings.locationService.notAvailable,
      Strings.locationService.notAvailable,
      [
        {
          text: Strings.locationService.cancel,
          onPress: () => resolve(false),
        },
      ],
    );
  });
}

// Called when the Result is RESULTS.BLOCKED
async function resultsBlocked(): Promise<boolean> {
  return new Promise(resolve => {
    showAlert(
      Strings.locationService.blocked,
      Strings.locationService.blockedPermission,
      [
        {
          text: Strings.locationService.goToSettings,
          onPress: async () => {
            await openSettings();
            resolve(true);
          },
        },
        {
          text: Strings.locationService.cancel,
          onPress: () => resolve(false),
        },
      ],
    );
  });
}

// Called when the Result is RESULTS.DENIED
async function resultsDenied(): Promise<boolean> {
  return new Promise(resolve => {
    showAlert(
      Strings.locationService.denied,
      Strings.locationService.deniedDescription,
      [
        {
          text: Strings.locationService.goToSettings,
          onPress: async () => {
            await openSettings();
            resolve(true);
          },
        },
        {
          text: Strings.locationService.cancel,
          onPress: () => resolve(false),
        },
      ],
    );
  });
}

// Called when the Result is returned default.
function defaultCase() {
  return new Promise(resolve => {
    showAlert(
      Strings.locationService.noPermission,
      Strings.locationService.noPermission,
      [
        {
          text: Strings.locationService.goToSettings,
          onPress: async () => {
            await openSettings();
            resolve(true);
          },
        },
        {
          text: Strings.locationService.cancel,
          onPress: () => resolve(false),
        },
      ],
    );
  });
}

const requestPermission = async (permission: RequiredPermissions) => {
  const requestStatus = await request(getPermissionBasedOnPlatform(permission));

  console.log('REQ STATUS :_ ', requestStatus);

  switch (requestStatus) {
    case RESULTS.UNAVAILABLE:
      await resultUnavailable();
      break;
    case RESULTS.DENIED:
      if (permissionDeniedMap[permission]) {
        await resultsDenied();
      }
      permissionDeniedMap[permission] = true;
      break;
    case RESULTS.LIMITED:
    case RESULTS.GRANTED:
      return;
    case RESULTS.BLOCKED:
      await resultsBlocked();
      break;
    default:
      await defaultCase();
      break;
  }
};

const checkPermission = async (permission: RequiredPermissions) => {
  const permissionStatus = await check(
    getPermissionBasedOnPlatform(permission),
  );
  let hasPermission = false;
  console.log('PS :_ ', permissionStatus);

  switch (permissionStatus) {
    case RESULTS.UNAVAILABLE:
      await resultUnavailable();
      break;
    case RESULTS.DENIED:
      await requestPermission(permission);
      break;
    case RESULTS.LIMITED:
    case RESULTS.GRANTED:
      hasPermission = true;
      break;
    case RESULTS.BLOCKED:
      await resultsBlocked();
      break;
    default:
      await defaultCase();
      break;
  }
  console.log('END');

  return hasPermission;
};

export {checkPermission};
