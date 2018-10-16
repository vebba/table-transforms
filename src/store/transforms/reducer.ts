import { Reducer } from 'redux'
import { TransformsState, TransformsActionTypes } from './types'

// Type-safe initialState!
const initialState: TransformsState = {
  data: [],
  errors: undefined,
  loading: false,
  output: [],
  dictionaries: {}
}

const removeProperty = (obj: any, property: string) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (key !== property) {
      return { ...acc, [key]: obj[key] }
    }
    return acc
  }, {})
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<TransformsState> = (state = initialState, action) => {
  switch (action.type) {
    case TransformsActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case TransformsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload, output: action.payload }
    }
    case TransformsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    case TransformsActionTypes.CREATE_TRANSLATION: {
      const { translationId, value, columnId } = action.payload
      return {
        ...state,
        dictionaries: {
          ...state.dictionaries,
          [columnId]: {
            ...state.dictionaries[columnId],
            [translationId]: value
          }
        }
      }
    }
    case TransformsActionTypes.UPDATE_TRANSLATION: {
      const { translationId, value, columnId } = action.payload
      return {
        ...state,
        output: state.output.map((item, index) => {
          if (index !== parseInt(translationId.split('_')[1], 10)) {
            return item
          }
          return {
            ...item,
            [columnId]: value
          }
        })
      }
    }
    case TransformsActionTypes.DELETE_TRANSLATION: {
      const { dictionaryId, translationId } = action.payload
      const { [dictionaryId]: dictionary, ...rest } = state.dictionaries
      const { [translationId]: translation, ...translations } = state.dictionaries[dictionaryId]
      const result = { ...rest, [dictionaryId]: translations }
      if (Object.keys(translations).length !== 0) {
        return {
          ...state,
          dictionaries: result
        }
      }
      return { ...state, dictionaries: removeProperty(state.dictionaries, dictionaryId) }
    }
    case TransformsActionTypes.DELETE_DICTIONARY: {

      const { [action.payload]: removed, ...rest } = state.dictionaries

      return {
        ...state,
        dictionaries: rest
      }
    }
    case TransformsActionTypes.CREATE_DICTIONARY: {
      const translation = state.data.reduce((item, current, index) => {
        item[`translation_${index}`] = {
          columnId: `${action.payload}`,
          dictionaryId: `${state.dictionaries.length}`,
          from: current[action.payload],
          to: current[action.payload]
        }
        return item
      }, {})

      return {
        ...state,
        dictionaries: {
          ...state.dictionaries,
          [action.payload]: !state.dictionaries[action.payload]
            ? translation
            : state.dictionaries[action.payload]
        }
      }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as transformsReducer }
