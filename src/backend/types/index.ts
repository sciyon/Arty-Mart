import { mergeTypeDefs } from '@graphql-tools/merge';
import artistType from './artistType.js';
import userType from './userType.js';
import followerType from './followerTypeDefs.js';

const mergedTypeDefs = mergeTypeDefs([artistType, userType, followerType]);

export default mergedTypeDefs;