import { mergeTypeDefs } from '@graphql-tools/merge';
import artistType from './artistType.js';
import userType from './userType.js';

const mergedTypeDefs = mergeTypeDefs([artistType, userType]);

export default mergedTypeDefs;