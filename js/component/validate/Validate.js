/**
 * Created by pain.xie on 2018/3/16.
 * 正则校验类
 */

export const regs = {
  'title': {
    'reg': /.*\S+.*$/,
    'errorMessage': '请输入标题'
  },
  'username': {
    'reg': /^\S+$/,
    'errorMessage': '请输入用户名'
  },
  'password': {
    'reg': /^\S+$/,
    'errorMessage': '请输入密码'
  },
  'mobile': {
    'reg': /^1[3|4|5|7|8][0-9]\d{8}$/,
    'errorMessage': '请输入正确的手机号码'
  },
  'invite_code': {
    'reg': /^1[3|4|5|7|8][0-9]\d{8}$/,
    'errorMessage': '请输入正确邀请码'
  },
  'otp6': {
    'reg': /^\d{6}$/,
    'errorMessage': '错误的验证码'
  },
  'knowLengthOtp': {
    'reg': /^\S+$/,
    'errorMessage': '错误的验证码'
  },
  'name': {
    'reg': /^[\u4e00-\u9fa5]([\u4e00-\u9fa5]{0,24}\u00b7{0,1}[\u4e00-\u9fa5]{1,24})+$/,
    'errorMessage': '请输入正确的姓名'
  },
  'cnid': {
    'reg': /^(\d|x|X){18}$/,
    'errorMessage': '请输入正确的身份证号码'
  },
  'marriage': {
    'reg': /^\S+$/,
    'errorMessage': '请选择婚姻状况'
  },
  'company': {
    'reg': /^[^@#\$%\^&\*]{2,50}$/,
    'errorMessage': '请输入正确的公司名称'
  },
  'telephone': {
    'reg': /^(?:010|02\d|0[3-9]\d{2})\d{7,8}(?:\-\d{1,4})?$/,
    'errorMessage': '请输入正确单位电话'
  },
  'address': {
    'reg': /^[^@#\$%\^&\*]{2,50}$/,
    'errorMessage': '请输入正确的地址'
  },
  'area': {
    'reg': /^\S+$/,
    'errorMessage': '请输入住址'
  },
  'positions': {
    'reg': /^\S+$/,
    'errorMessage': '请输入职业'
  },
  'industries': {
    'reg': /^\S+$/,
    'errorMessage': '请输入行业'
  },
  'qq': {
    'reg': /^\d{5,20}$/,
    'errorMessage': '请输入正确QQ号码'
  },
  'education': {
    'reg': /^\S+$/,
    'errorMessage': '请选择学历'
  },
  'degrees': {
    'reg': /^\S+$/,
    'errorMessage': '请选择学历'
  },
  'enter_year': {
    'reg': /^\S+$/,
    'errorMessage': '请选择入学年份'
  },
  'relation': {
    'reg': /^\S+$/,
    'errorMessage': '请选择关系'
  },
  'emergencyLiaison': {
    'reg': /^\S+$/,
    'errorMessage': '请选择紧急联系人'
  },
  'school': {
    'reg': /^\S+$/,
    'errorMessage': '请输入学校名称'
  },
  'year': {
    'reg': /^\S+$/,
    'errorMessage': '请选择年份'
  },
  'month': {
    'reg': /^\S+$/,
    'errorMessage': '请选择月份'
  },
  'province': {
    'reg': /^\S+$/,
    'errorMessage': '请选择省份'
  },
  'city': {
    'reg': /^\S+$/,
    'errorMessage': '请选择城市'
  },
  'district': {
    'reg': /^\S+$/,
    'errorMessage': '请选择区域'
  },
  'bankCard': {
    'reg': /^(\d{16}|\d{19})$/,
    'errorMessage': '请输入正确的银行卡号'
  },
  'bankList': {
    'reg': /^\S+$/,
    'errorMessage': '请选择银行'
  },
  'role': {
    'reg': /^\S+$/,
    'errorMessage': '请选择职业'
  },
  'alipayName': {
    'reg': /^\S+$/,
    'errorMessage': '请输入支付宝帐号'
  },
  'alipayPwd': {
    'reg': /^\S+$/,
    'errorMessage': '请输入支付宝密码'
  },
  'captcha': {
    'reg': /^\S+$/,
    'errorMessage': '请输入验证码'
  },
  'street': {
    'reg': /^[^@#\$%\^&\*]{5,50}$/,
    'errorMessage': '详细地址必须大于5个字符'
  },
  'tenor': {
    'reg': /^\S+$/,
    'errorMessage': '请选择借款期限'
  },
  'company_name': {
    'reg': /[\u4e00-\u9fa5A-Za-z0-9 ]{2,24}/,
    'errorMessage': '您输入的信息必须大于2个字符'
  },
  'company_telephone': {
    // 'reg': /^(\(\d{3,4}\)|\d{3,4})(|-)?\d{7,8}$/,
    'reg': /([0-9]|\\+|\\-|\\*|#)*/,
    'errorMessage': '请输入正确的单位电话, 例如0755-88783293'
  },
  'salary_type': {
    'reg': /^\S+$/,
    'errorMessage': '请选择工资发放形式'
  },
  'house_type': {
    'reg': /^\S+$/,
    'errorMessage': '请选择房产付款形式'
  },
  'car_type': {
    'reg': /^\S+$/,
    'errorMessage': '请选择车辆付款形式'
  },

};

export class Validate {
  static validate(name, value) {
    let validateResult = {result: true, errorMessage: ""};
    let reg = global.validaterRegs[name] || regs[name];
    if (reg) {
      let result = null !== value && undefined !== value && value !== '' && reg['reg'].test(value);
      let errorMessage = reg['errorMessage'];
      validateResult = {result: result, errorMessage: errorMessage};
    }
    return validateResult;
  }
}