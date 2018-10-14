import { Reducer } from 'redux'
import { TransformsState, TransformsActionTypes } from './types'

// Type-safe initialState!
const initialState: TransformsState = {
  data: [],
  errors: undefined,
  loading: false,
  output: [],
  dictionaries: []
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
      return { ...state, loading: false, data: action.payload }
    }
    case TransformsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    case TransformsActionTypes.DELETE_TRANSLATION: {
      const { dictionaryId, translationId } = action.payload
      return {
        ...state,
        dictionaries: state.dictionaries.map((dictionary, index) => {
          if (index !== parseInt(dictionaryId, 10)) {
            return dictionary
          }
          return removeProperty(dictionary, translationId)
        })
      }
    }
    case TransformsActionTypes.CREATE_DICTIONARY: {
      const translation = state.data.reduce((item, current, index) => {
        item[`translation_${index}`] = {
          dictionaryId: `${state.dictionaries.length}`,
          from: current[action.payload],
          to: current[action.payload]
        }
        return item
      }, {})
      return {
        ...state,
        dictionaries: [...state.dictionaries, translation]
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
