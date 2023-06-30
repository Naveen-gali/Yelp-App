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
async function showPermissionUnavailableAlert(): Promise<boolean> {
  return new Promise(resolve => {
    return showAlert(
      Strings.permissionService.notAvailable,
      Strings.permissionService.notAvailable,
      [
        {
          text: Strings.permissionService.cancel,
          onPress: () => resolve(false),
        },
      ],
    );
  });
}

// Called when the Result is RESULTS.BLOCKED
async function showPermissionBlockedAlert(): Promise<boolean> {
  return new Promise(resolve => {
    showAlert(
      Strings.permissionService.blocked,
      Strings.permissionService.blockedPermission,
      [
        {
          text: Strings.permissionService.goToSettings,
          onPress: () => openSettings(),
        },
        {
          text: Strings.permissionService.cancel,
          onPress: () => resolve(false),
        },
      ],
    );
  });
}

// Called when the Result is RESULTS.DENIED
async function showPermissionDeniedAlert(): Promise<boolean> {
  return new Promise(resolve => {
    showAlert(
      Strings.permissionService.denied,
      Strings.permissionService.deniedDescription,
      [
        {
          text: Strings.permissionService.goToSettings,
          onPress: () => openSettings(),
        },
        {
          text: Strings.permissionService.cancel,
          onPress: () => resolve(false),
        },
      ],
    );
  });
}

// Called when the Result is returned default.
function showNoPermissionAlert() {
  return new Promise(resolve => {
    showAlert(
      Strings.permissionService.noPermission,
      Strings.permissionService.noPermission,
      [
        {
          text: Strings.permissionService.goToSettings,
          onPress: () => openSettings(),
        },
        {
          text: Strings.permissionService.cancel,
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
      await showPermissionUnavailableAlert();
      break;
    case RESULTS.DENIED:
      if (permissionDeniedMap[permission]) {
        await showPermissionDeniedAlert();
      }
      permissionDeniedMap[permission] = true;
      break;
    case RESULTS.LIMITED:
    case RESULTS.GRANTED:
      break;
    case RESULTS.BLOCKED:
      await showPermissionBlockedAlert();
      break;
    default:
      await showNoPermissionAlert();
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
      await showPermissionUnavailableAlert();
      break;
    case RESULTS.DENIED:
      await requestPermission(permission);
      break;
    case RESULTS.LIMITED:
    case RESULTS.GRANTED:
      hasPermission = true;
      break;
    case RESULTS.BLOCKED:
      await showPermissionBlockedAlert();
      break;
    default:
      await showNoPermissionAlert();
      break;
  }
  console.log('END');

  return hasPermission;
};

export {checkPermission};
