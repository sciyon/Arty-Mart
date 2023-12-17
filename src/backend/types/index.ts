import { mergeTypeDefs } from '@graphql-tools/merge';
import artistType from './artistType.js';
import userType from './userType.js';
import followerType from './followerTypeDefs.js';
import artworkType from './artworkType.js';
import reviewType from './reviewType.js';

const mergedTypeDefs = mergeTypeDefs([artistType, userType, followerType, artworkType, reviewType]);

export default mergedTypeDefs;