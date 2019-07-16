// components/classic/music/index.js
import {classicBeh} from '../classic-beh'
const BAM =  wx.getBackgroundAudioManager()

Component({

  behaviors:[classicBeh],
  /**
   * 组件的属性列表
   */
  properties: {
    img:String,
    content:String,
    hiddenProperty:Boolean,
    BAMSrc:String,
    BAMTitle:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    playSrc:'./images/player@waitting.png',
    pauseSrc:'./images/player@playing.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function(){
      this.setData({
        playing:!this.data.playing
      })
      if(this.data.playing){
        BAM.title=this.properties.BAMTitle
        BAM.src= this.properties.BAMSrc
      }else{
        BAM.pause()
      }
      
    },

    // 恢复播放状态
    _recoverStatus:function(){
      // 当前是暂停或停止（即没有音乐播放）（此种情况时音乐播放后暂停，切换页面后又切换回来，此时背景音乐src为当前页面歌曲的url，会走下面的if，播放图标会变成暂停，但实际并未播放歌曲z）
      if(BAM.paused){
        this.setData({
          playing:false
        })
        return  //此处写了两个if，此时的情况下，页面只可能满足一个if，所以在前面的if加return，避免两个if都执行（可能会出错）
      }
      if(BAM.src==this.properties.BAMSrc){
        this.setData({
          playing:true
        })
      }
    },

    // 音乐播放总控开关设置
    _monitorSwitch:function(){
      BAM.onPlay(()=>{
        this._recoverStatus()
      })
      BAM.onPause(()=>{
        this._recoverStatus()
      })
      BAM.onStop(()=>{
        this._recoverStatus()
      })
      BAM.onEnded(()=>{
        this._recoverStatus()
      })
    }

  },

  //在组件实例进入页面节点树时执行
  attached:function(){
    this._recoverStatus()
    this._monitorSwitch()
  },

  // 在组件实例被从页面节点树移除时执行
  detached:function(){
    // BAM.stop()
  }

})
