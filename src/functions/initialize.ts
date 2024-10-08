// Initialize Library

import {
  arePackageNamesMatching,
  checkPermission,
  throwError,
} from '@utils/helper';
import { isBoolean } from 'lodash';
import configStore from 'store/config-store';

export enum ENV {
  DEV = 'DEV',
  PROD = 'PROD',
}

export interface WellthIQInitializeProps {
  key: string;
  env: ENV;
  whitelist?: Array<string>;
  appConfig?: {
    appIcon?: string;
    inviteMessage?: string;
    inviteExpire?: boolean;
    permissionId?: string;
  };
}

export default function Initialize(props: WellthIQInitializeProps) {
  const { key = '', env = ENV.DEV, whitelist = [], appConfig } = props;
  const {
    appIcon = '',
    inviteExpire = true,
    inviteMessage = '',
    permissionId = '',
  } = appConfig || {};
  //   step:1 Check Errors
  checkError(props);

  // Update Values of config
  configStore.API_KEY = key;
  configStore.ENV = env;
  configStore.WHITELIST = whitelist;
  configStore.LOGO = appIcon;
  configStore.PERMISSION_ID = permissionId;
  configStore.INVITE_EXPIRE = inviteExpire;
  configStore.INVITE_MESSAGE = inviteMessage;

  console.info('WellthIQ App Initialized with ' + JSON.stringify(props));
}

//check Errors
function checkError(props: WellthIQInitializeProps) {
  const { key, env, whitelist, appConfig } = props;

  if (!key) {
    throwError('API KEY is required to Initialize');
  }

  if (env && !Object.getOwnPropertyNames(ENV).includes(env)) {
    throwError('env Should be PROD || DEV');
  }

  if (whitelist && arePackageNamesMatching(whitelist)) {
    throwError('env Should be PROD || DEV');
  }

  if (appConfig && appConfig?.appIcon) {
    try {
      new URL(appConfig?.appIcon);
    } catch {
      throwError('Pass a valid URL for image ICON');
    }
  }

  if (
    appConfig &&
    appConfig?.inviteExpire &&
    !isBoolean(appConfig?.inviteExpire)
  ) {
    throwError('Pass a valid URL for image ICON');
  }

  if (
    appConfig &&
    appConfig?.permissionId &&
    !checkPermission(appConfig.permissionId)
  ) {
    throwError('Permission Id are not allowed, Please check on your dashboard');
  }
}
