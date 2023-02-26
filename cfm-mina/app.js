/*
 * @Descripttion: 
 * @version: 
 * @Author: Pedia.Xu
 * @Date: 2021-08-26 23:49:30
 * @LastEditors: shangXueYun
 * @LastEditTime: 2022-08-17 15:28:03
 */
import HttpService from './utils/http.js'
//app.js
App({
  onLaunch: function () {
    wx.setStorageSync('formPay', false)
    wx.setStorageSync('isClose', true)
    // console.log('onLaunch-----------------------')
    var app = this
    wx.checkSession({
      success: function () {
        // console.info('微信已登录')
        HttpService.checkToken(app)
      },
      fail: function () {
        // console.info('session失效,重新登录......')
        HttpService.login(app)
      }
    })
    this.checkUpdateVersion()
  },
  checkUpdateVersion () {
    //判断微信版本是否 兼容小程序更新机制API的使用
    if (wx.canIUse('getUpdateManager')) {
      //创建 UpdateManager 实例
      const updateManager = wx.getUpdateManager();
      //检测版本更新
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //监听小程序有版本更新事件
          updateManager.onUpdateReady(function () {
            //TODO 新的版本已经下载好，调用 applyUpdate 应用新版本并重启 （ 此处进行了自动更新操作）
            updateManager.applyUpdate();
          })
          updateManager.onUpdateFailed(function () {
            // 新版本下载失败
            wx.showModal({
              title: '已经有新版本',
              content: '请您删除当前小程序，到微信搜索页，重新搜索打开',
            })
          })
        }
      })
    } else {
      //TODO 此时微信版本太低（一般而言版本都是支持的）
      wx.showModal({
        title: '溫馨提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  onShow: function () {
    let formPay = wx.getStorageSync('formPay')
    if (!formPay) {
      wx.setStorageSync('isClose', true)
    }
  },
  onHide: function () {
    //调用上方方法，在程序关闭时按条件跳转相应页面，下次启动时则会跳转指定页面
    let formPay = wx.getStorageSync('formPay')
    if (!formPay) {
      wx.setStorageSync('isClose', true)
    }
  },
  globalData: {}
})