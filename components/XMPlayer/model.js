import { sleep } from '../../packages/player/utils'
const model = {
  namespace: 'GlobalXMPlayer',
  state: {
    isLocked: true,
    isShowPlaylist: false, // 播放列表展示开关
    isShowVolume: false // 音量展示开关
  },
  reducers: {
    refreshInfo(state, { payload }) {
      Object.assign(state, payload)
    },
    /* 展示播放列表 */
    showPlaylist(state) {
      state.isShowPlaylist = true
    },
    hidePlaylist(state) {
      state.isShowPlaylist = false
    },
    /* 展示音量 */
    showVolume(state) {
      state.isShowVolume = true
    },
    hideVolume(state) {
      state.isShowVolume = false
    }
  },
  effects: {
    *toastLock({ payload }, { call, put, select }) {
      let { GlobalXMPlayer }= yield select()
      const $xmplayer = document.getElementsByClassName('xm-player')[0]
      if (!GlobalXMPlayer.isLocked) {
        $xmplayer.style.bottom = 0
        // yield put({ type: 'refreshInfo', payload:{isLocked: true}})
        yield sleep(3000)
        $xmplayer.style.bottom = '-50px'
        // yield put({ type: 'refreshInfo', payload: { isLocked: false } })  
      }
    }
  }
}

export default model
