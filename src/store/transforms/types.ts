import { Dictionary } from './types';
// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /transforms
// https://docs.opendota.com/#tag/transforms%2Fpaths%2F~1transforms%2Fget
export interface Transform extends ApiResponse {
  id: number
  name: string
  color: string
  price: string
}
export interface Translation {
  id: number
  from: string
  to: string
}

export interface Dictionary {
  id: string
  name: string
  translations: Translation
}

export interface NormalizedObjects<T> {
  byId: {[id: string]: T}
  allIds: string[]
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

// Use `const enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export const enum TransformsActionTypes {
  FETCH_REQUEST = '@@transform/FETCH_REQUEST',
  FETCH_SUCCESS = '@@transform/FETCH_SUCCESS',
  FETCH_ERROR = '@@transform/FETCH_ERROR',
  SELECT_HERO = '@@transform/SELECT_HERO',
  SELECTED = '@@transform/SELECTED',
  CREATE_DICTIONARY = '@@transform/CREATE_DICTIONARY',
  DELETE_DICTIONARY = '@@transform/DELETE_DICTIONARY',
  DELETE_TRANSLATION = '@@transform/DELETE_TRANSLATION',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface TransformsState {
  readonly loading: boolean
  readonly data: Transform[]
  readonly output: Transform[]
  readonly dictionaries: any
  readonly errors?: string
}
