import { action } from 'typesafe-actions'
import { TransformsActionTypes, Transform } from './types'

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchRequest = () => action(TransformsActionTypes.FETCH_REQUEST)

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchSuccess = (data: Transform[]) => action(TransformsActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(TransformsActionTypes.FETCH_ERROR, message)

export const createDictionary = (id: string) => action(TransformsActionTypes.CREATE_DICTIONARY, id)
export const deleteDictionary = (id: string) => action(TransformsActionTypes.DELETE_DICTIONARY, id)
export const deleteTranslation = (translationId: string, dictionaryId: string) =>
  action(TransformsActionTypes.DELETE_TRANSLATION, { translationId, dictionaryId })
export const updateTranslation = (value: string, translationId: string, columnId: string) =>
  action(TransformsActionTypes.UPDATE_TRANSLATION, { value, translationId, columnId })
export const createTranslation = (value: string, translationId: string, columnId: string) =>
  action(TransformsActionTypes.CREATE_TRANSLATION, { value, translationId, columnId })
