export type TUser = {
  /**
   * 用户名
   */
  account?: string
  /**
   * 头像
   */
  avatar?: string
  /**
   * 用户id
   */
  id: string
  /**
   * 脱敏手机号，带星号的手机号
   */
  mobile?: string
  /**
   * refreshToken
   */
  // refreshToken: string
  /**
   * token
   */
  token: string
}

// 验证码类型
export type TCodeType =
  | 'login'
  | 'register'
  | 'changeMobile'
  | 'forgetPassword'
  | 'bindMobile'

export type TUserInfo = Omit<TUser, 'token'> & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}

export type TPatient = {
  /**
   * 年龄
   */
  age?: number
  /**
   * 是否设置为默认患者 0不是默认 1是默认患者
   */
  defaultFlag: 0 | 1
  /**
   * 性别 1男 0女
   */
  gender?: 1 | 0
  /**
   * 性别值
   */
  genderValue: string
  id: string
  /**
   * 患者身份证号
   */
  idCard: string
  /**
   * 患者姓名
   */
  name: string
}

export type TPatientList = TPatient[]
