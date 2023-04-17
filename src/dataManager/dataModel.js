/**
 * Object destructuring of user data arrays from data.js
 * @typedef {Object} UserDataArrays
 * @property {Array} USER_MAIN_DATA - Main user data array
 * @property {Array} USER_ACTIVITY - User activity array
 * @property {Array} USER_AVERAGE_SESSIONS - User average sessions array
 * @property {Array} USER_PERFORMANCE - User performance array
 */

 import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from "./data.js";
 const mainUserData = USER_MAIN_DATA;
 const userActivity = USER_ACTIVITY;
 const userAverageSessions = USER_AVERAGE_SESSIONS;
 const userPerformance = USER_PERFORMANCE;
 console.log (mainUserData);
 
 class UserModel {
   constructor(data) {
     this.id = data.id;
     this.firstName = data.userInfos.firstName;
     this.lastName = data.userInfos.lastName;
     this.age = data.userInfos.age;
     this.todayScore = data.todayScore;
     this.calorieCount = data.keyData.calorieCount;
     this.proteinCount = data.keyData.proteinCount;
     this.carbohydrateCount = data.keyData.carbohydrateCount;
     this.lipidCount = data.keyData.lipidCount;
   }
 }
 
 class UserActivityModel {
   constructor(data) {
     this.userId = data.userId;
     this.sessions = data.sessions;
   }
 }
 
 class UserAverageSessionsModel {
   constructor(data) {
     this.userId = data.userId;
     this.sessions = data.sessions;
   }
 }
 
 class UserPerformanceModel {
   constructor(data) {
     this.userId = data.userId;
     this.kind = data.kind;
   }
 }
 
 /**
  * Exporting the User Models
  * @typedef {Object} UserModels
  * @property {UserModel} UserModel - User Model class
  * @property {UserActivityModel} UserActivityModel - User Activity Model class
  * @property {UserAverageSessionsModel} UserAverageSessionsModel - User Average Sessions Model class
  * @property {UserPerformanceModel} UserPerformanceModel - User Performance Model class
  */
 export default {
   UserModel,
   UserActivityModel,
   UserAverageSessionsModel,
   UserPerformanceModel
 };
 