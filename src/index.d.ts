declare module '@hybeck/react-native-wellthiq' {
  export enum ENV {
    DEV = 'DEV',
    PROD = 'PROD',
  }

  export interface WellthIQInitializeProps {
    key: string;
    env?: ENV;
    whitelist?: Array<string>;
    appConfig?: {
      appIcon?: string;
      inviteMessage?: string;
      inviteExpire?: boolean;
      permissionId?: string;
    };
  }

  export function Initialize(props: WellthIQInitializeProps): void;
}
