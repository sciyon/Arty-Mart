import { mergeTypeDefs } from '@graphql-tools/merge';
import artistType from './artistType.js';
import userType from './userType.js';
import followerType from './followerTypeDefs.js';
import artworkType from './artworkType.js';

const mergedTypeDefs = mergeTypeDefs([artistType, userType, followerType, artworkType]);

export default mergedTypeDefs;