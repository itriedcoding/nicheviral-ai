/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as adminHelpers from "../adminHelpers.js";
import type * as advancedAIModels from "../advancedAIModels.js";
import type * as advancedAIModels2 from "../advancedAIModels2.js";
import type * as aiGeneration from "../aiGeneration.js";
import type * as aiModels from "../aiModels.js";
import type * as auth from "../auth.js";
import type * as auth_emailOtp from "../auth/emailOtp.js";
import type * as billing from "../billing.js";
import type * as checkOTPCodes from "../checkOTPCodes.js";
import type * as debugAuth from "../debugAuth.js";
import type * as extendedAIModels from "../extendedAIModels.js";
import type * as fastGeneration from "../fastGeneration.js";
import type * as http from "../http.js";
import type * as initAdmin from "../initAdmin.js";
import type * as modelCoordinator from "../modelCoordinator.js";
import type * as neuraAIModel from "../neuraAIModel.js";
import type * as passwordAuth from "../passwordAuth.js";
import type * as paymentProcessor from "../paymentProcessor.js";
import type * as premiumAI from "../premiumAI.js";
import type * as realAIGeneration from "../realAIGeneration.js";
import type * as realVideoGeneration from "../realVideoGeneration.js";
import type * as seedData from "../seedData.js";
import type * as selfHostedAI from "../selfHostedAI.js";
import type * as simpleAuth from "../simpleAuth.js";
import type * as simpleAuthMutations from "../simpleAuthMutations.js";
import type * as testResend from "../testResend.js";
import type * as unifiedAIModel from "../unifiedAIModel.js";
import type * as users from "../users.js";
import type * as videos from "../videos.js";
import type * as youtube from "../youtube.js";
import type * as youtubeQueries from "../youtubeQueries.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  adminHelpers: typeof adminHelpers;
  advancedAIModels: typeof advancedAIModels;
  advancedAIModels2: typeof advancedAIModels2;
  aiGeneration: typeof aiGeneration;
  aiModels: typeof aiModels;
  auth: typeof auth;
  "auth/emailOtp": typeof auth_emailOtp;
  billing: typeof billing;
  checkOTPCodes: typeof checkOTPCodes;
  debugAuth: typeof debugAuth;
  extendedAIModels: typeof extendedAIModels;
  fastGeneration: typeof fastGeneration;
  http: typeof http;
  initAdmin: typeof initAdmin;
  modelCoordinator: typeof modelCoordinator;
  neuraAIModel: typeof neuraAIModel;
  passwordAuth: typeof passwordAuth;
  paymentProcessor: typeof paymentProcessor;
  premiumAI: typeof premiumAI;
  realAIGeneration: typeof realAIGeneration;
  realVideoGeneration: typeof realVideoGeneration;
  seedData: typeof seedData;
  selfHostedAI: typeof selfHostedAI;
  simpleAuth: typeof simpleAuth;
  simpleAuthMutations: typeof simpleAuthMutations;
  testResend: typeof testResend;
  unifiedAIModel: typeof unifiedAIModel;
  users: typeof users;
  videos: typeof videos;
  youtube: typeof youtube;
  youtubeQueries: typeof youtubeQueries;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
