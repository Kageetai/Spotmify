/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOGIN = 'spotmify/App/LOGIN';
export const LOGIN_ERROR = 'spotmify/App/LOGIN_ERROR';
export const GET_TOKENS = 'spotmify/App/GET_TOKENS';
export const SET_TOKENS = 'spotmify/App/SET_TOKENS';
export const DELETE_TOKENS = 'spotmify/App/DELETE_TOKENS';
export const LOAD_USER = 'spotmify/App/LOAD_USER';
export const LOAD_USER_SUCCESS = 'spotmify/App/LOAD_USER_SUCCESS';
export const LOAD_USER_ERROR = 'spotmify/App/LOAD_USER_ERROR';
export const LOAD_LIBRARY = 'spotmify/App/LOAD_LIBRARY';
export const LOAD_LIBRARY_SUCCESS = 'spotmify/App/LOAD_LIBRARY_SUCCESS';
export const LOAD_LIBRARY_ERROR = 'spotmify/App/LOAD_LIBRARY_ERROR';
export const DEFAULT_LOCALE = 'en';
