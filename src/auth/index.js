import {createCredentials, verifyCredentials} from './jwt';
import ProtectionProxy from './protection';

export const protectionProxy = ProtectionProxy(verifyCredentials);

export {
  createCredentials,
};
