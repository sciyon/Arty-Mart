import { mergeTypeDefs } from '@graphql-tools/merge';

import userType from './userType.js';
import artworkType from './artworkType.js';
import reviewType from './reviewType.js';
import commentType from './commentType.js';
import likeType from './likesTypes.js';
import transactionType from './transactionType.js';

const mergedTypeDefs = mergeTypeDefs([userType, artworkType, reviewType, commentType, likeType, transactionType]);

export default mergedTypeDefs;