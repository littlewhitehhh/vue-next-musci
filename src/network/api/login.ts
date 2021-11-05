import MyAxios from '@/network/index'

type LoginByPhonetype = {
  phone: string
  password: string
  countrycode?: any
  md5_password?: any
  captcha?: any
}
//1、使用手机号码登录
export function LoginByPhone(params: LoginByPhonetype): any {
  return MyAxios.get({
    url: '/login/cellphone',
    params: params
  })
}

//2、使用二维码登录
interface getQrKeyType {
  timerstamp: any
}
//2.1、 获取二维码key
export function getQrKey(params: getQrKeyType): any {
  return MyAxios.get({
    url: '/login/qr/key',
    params: params
  })
}

interface qrType {
  key: string
  timerstamp: any
  qrimg?: boolean
}
//2.2、根据二维码key获取二维码
export function getQr(params: qrType): any {
  return MyAxios.get({
    url: '/login/qr/create',
    params: params
  })
}
interface qrCheckType {
  key: string
  timerStamp: any
}
//2.3、 二维码状态查询
export function qrCheck(params: qrCheckType): any {
  return MyAxios.get({
    url: '/login/qr/check',
    params: params
  })
}

//退出登录
export function logoutAccount(): any {
  return MyAxios.get({
    url: '/logout'
  })
}

interface getPlayListType {
  uid: number
  limit?: number
  offset?: number
}

//根据id 获取账号详情信息
export function getPlayList(params: getPlayListType): any {
  return MyAxios.get({
    url: '/user/playlist',
    params: params
  })
}
