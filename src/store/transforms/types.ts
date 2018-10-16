import { Dictionary } from './types';

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

export interface Dictionary extends Array<Dictionary> {
  id: string
  name: string
  translations: Translation
}

export interface NormalizedObjects<T> {
  byId: {[id: string]: T}
  allIds: string[]
}

export type ApiResponse = Record<string, any>

export const enum TransformsActionTypes {
  FETCH_REQUEST = '@@transform/FETCH_REQUEST',
  FETCH_SUCCESS = '@@transform/FETCH_SUCCESS',
  FETCH_ERROR = '@@transform/FETCH_ERROR',
  SELECT_HERO = '@@transform/SELECT_HERO',
  SELECTED = '@@transform/SELECTED',
  CREATE_DICTIONARY = '@@transform/CREATE_DICTIONARY',
  DELETE_DICTIONARY = '@@transform/DELETE_DICTIONARY',
  DELETE_TRANSLATION = '@@transform/DELETE_TRANSLATION',
  UPDATE_TRANSLATION = '@@transform/UPDATE_TRANSLATION',
  CREATE_TRANSLATION = '@@transform/CREATE_TRANSLATION',
}


export interface TransformsState {
  readonly loading: boolean
  readonly data: Transform[]
  readonly output: Transform[]
  readonly dictionaries: any
  readonly errors?: string
}
