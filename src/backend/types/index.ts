import { mergeTypeDefs } from '@graphql-tools/merge';

import artistType from './artistType.js';
import userType from './userType.js';
import followerType from './followerTypeDefs.js';
import artworkType from './artworkType.js';
import reviewType from './reviewType.js';
import commentType from './commentType.js';
import likeType from './likesTypes.js';
import addressType from './addressType.js';

const mergedTypeDefs = mergeTypeDefs([artistType, userType, followerType, artworkType, reviewType, commentType, likeType, addressType]);

export default mergedTypeDefs;