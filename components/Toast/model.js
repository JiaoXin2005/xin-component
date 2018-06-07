import Award from 'award'
const model = {
  namespace: 'Toast',
  state: {
    visible: false,
    message: ''
  },
  reducers: {
    refresh (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    show (state, {payload: { message }}) {
      return {
        ...state,
        message,
        visible: true
      }
    },
    hide (state, { payload }) {
      return {
        ...state,
        visible: false
      }
    },
  }
}

export default model
