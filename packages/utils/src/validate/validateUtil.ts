/**
 * 验证工具类
 */
export class ValidateUtil {
  /**
   * 验证是否为手机号码
   */
  static isPhone (input: string): boolean {
    const _phone = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;

    return _phone.test(input.toString());
  }

  /**
   * 验证是否为固定电话
   */
  static isTelephone (input: string): boolean {
    const _telephone = /^(((0\d{2,3})-)?((\d{7,8})|(400\d{7})|(800\d{7}))(-(\d{1,4}))?)$/;

    return _telephone.test(input.toString());
  }

  /**
   * 验证是否为移动设备识别码
   */
  static isIMEI (input: string): boolean {
    const _IMEI = /^\d{15,17}$/;

    return _IMEI.test(input.toString());
  }

  /**
   * 验证是否为电子邮箱
   */
  static isEmail (input: string): boolean {
    const _email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;

    return _email.test(input.toString());
  }

  /**
   * 验证是否为 http(s) 链接
   */
  static isHttpLink (input: string): boolean {
    const _link = /^(https?:\/\/)?(([\w-]+(\.[\w-]+)*\.[a-z]{2,6})|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/\S*)?$/i;

    return _link.test(input.toString());
  }

  /**
   * 验证是否为端口号链接
   */
  static isPortLink (input: string): boolean {
    const _portLink = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/i;

    return _portLink.test(input.toString());
  }

  /**
   * 验证是否为迅雷链接
   */
  static isThunderLink (input: string): boolean {
    const _thunderLink = /^thunderx?:\/\/[a-zA-Z\d]+=$/i;

    return _thunderLink.test(input.toString());
  }

  /**
   * 验证是否为统一社会信用代码
   */
  static isUSCC (input: string): boolean {
    const _uscc = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;

    return _uscc.test(input.toString());
  }

  /**
   * 验证是否为统一社会信用代码 - 15位/18位/20位数字/字母
   */
  static isUSCCS (input: string): boolean {
    const _usccs = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;

    return _usccs.test(input.toString());
  }

  /**
   * 验证是否为 Windows 系统文件夹路径
   */
  static isDirPathWindows (input: string): boolean {
    const _dirPathWindows = /^[a-z]:\\(?:\w+\\?)*$/i;

    return _dirPathWindows.test(input.toString());
  }

  /**
   * 验证是否为 Windows 系统文件路径
   */
  static isFilePathWindows (input: string): boolean {
    const _filePathWindows = /^[a-z]:\\(?:\w+\\)*\w+\.\w+$/i;

    return _filePathWindows.test(input.toString());
  }

  /**
   * 验证是否为 Linux 系统文件夹路径
   */
  static isDirPathLinux (input: string): boolean {
    const _dirPathLinux = /^\/(?:[^\\/\s]+\/)*$/;

    return _dirPathLinux.test(input.toString());
  }

  /**
   * 验证是否为 Linux 系统文件路径
   */
  static isFilePathLinux (input: string): boolean {
    const _filePathLinux = /^(\/$|\/(?:[^\\/\s]+\/)*[^\\/\s]+$)/;

    return _filePathLinux.test(input.toString());
  }

  /**
   * 验证是否为新能源车牌号
   */
  static isEVCarNumber (input: string): boolean {
    const _EVCarNumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))\d{4})|(\d{5}[DF]))$/;

    return _EVCarNumber.test(input.toString());
  }

  /**
   * 验证是否为燃油车车牌号
   */
  static isGVCarNumber (input: string): boolean {
    const _GVCarNumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;

    return _GVCarNumber.test(input.toString());
  }

  /**
   * 验证是否为中文姓名
   */
  static isChineseName (input: string): boolean {
    const _chineseName = /^[一-龢][一·-龢]*$/;

    return _chineseName.test(input.toString());
  }

  /**
   * 验证是否为中国身份证号
   */
  static isChineseID (input: string): boolean {
    const _chineseId = /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))([\dX])$/i;

    return _chineseId.test(input.toString());
  }

  /**
   * 验证是否为中国省份
   */
  static isChineseProvince (input: string): boolean {
    const _chineseProvince = /^安徽|澳门|北京|重庆|福建|甘肃|广东|广西|贵州|海南|河北|河南|黑龙江|湖北|湖南|吉林|江苏|江西|辽宁|内蒙古|宁夏|青海|山东|山西|陕西|上海|四川|台湾|天津|西藏|香港|新疆|云南|浙江$/;

    return _chineseProvince.test(input.toString());
  }

  /**
   * 验证是否为中华民族
   */
  static isChineseNation (input: string): boolean {
    const _chineseNation = /^汉族|蒙古族|回族|藏族|维吾尔族|苗族|彝族|壮族|布依族|朝鲜族|满族|侗族|瑶族|白族|土家族|哈尼族|哈萨克族|傣族|黎族|傈僳族|佤族|畲族|高山族|拉祜族|水族|东乡族|纳西族|景颇族|柯尔克孜族|土族|达斡尔族|仫佬族|羌族|布朗族|撒拉族|毛南族|仡佬族|锡伯族|阿昌族|普米族|塔吉克族|怒族|乌孜别克族|俄罗斯族|鄂温克族|德昂族|保安族|裕固族|京族|塔塔尔族|独龙族|鄂伦春族|赫哲族|门巴族|珞巴族|基诺族|其它未识别民族|外国人入中国籍$/;

    return _chineseNation.test(input.toString());
  }

  /**
   * 验证是否只包含字母
   */
  static isLetter (input: string): boolean {
    const _letter = /^[a-z]+$/i;

    return _letter.test(input.toString());
  }

  /**
   * 验证是否只包含小写字母
   */
  static isLetterLowercase (input: string): boolean {
    const _letterLowercase = /^[a-z]+$/;

    return _letterLowercase.test(input.toString());
  }

  /**
   * 验证是否只包含大写字母
   */
  static isLetterUppercase (input: string): boolean {
    const _letterUppercase = /^[A-Z]+$/;

    return _letterUppercase.test(input.toString());
  }

  /**
   * 验证是否不包含字母
   */
  static isLetterOmit (input: string): boolean {
    const _letterOmit = /^[^A-Z]*$/i;

    return _letterOmit.test(input.toString());
  }

  /**
   * 验证是否为数字和字母组合
   */
  static isLetterAndNumber (input: string): boolean {
    const _LetterAndNumber = /^[A-Z0-9]+$/i;

    return _LetterAndNumber.test(input.toString());
  }

  /**
   * 验证是否为有符号十进制浮点数
   */
  static isSignedFloat (input: string): boolean {
    const _signedFloat = /^[+-]?(\d+(\.\d+)?|\.\d+)$/;

    return _signedFloat.test(input.toString());
  }

  /**
   * 验证是否为无符号十进制浮点数
   */
  static isUnsignedFloat (input: string): boolean {
    const _unsignedFloat = /^\+?(\d+(\.\d+)?|\.\d+)$/;

    return _unsignedFloat.test(input.toString());
  }

  /**
   * 验证是否为有符号十进制整数
   */
  static isSignedInteger (input: string): boolean {
    const _signedInteger = /^[+-]?\d+$/;

    return _signedInteger.test(input.toString());
  }

  /**
   * 验证是否为无符号十进制整数
   */
  static isUnsignedInteger (input: string): boolean {
    const _unsignedInteger = /^\+?\d+$/;

    return _unsignedInteger.test(input.toString());
  }

  /**
   * 验证是否包含空格
   */
  static isSpaceInclude (input: string): boolean {
    const _spaceInclude = /\s/;

    return _spaceInclude.test(input.toString());
  }

  /**
   * 验证是否以空格开头
   */
  static isSpaceStart (input: string): boolean {
    const _spaceStart = /^\s/;

    return _spaceStart.test(input.toString());
  }

  /**
   * 验证是否以空格结尾
   */
  static isSpaceEnd (input: string): boolean {
    const _spaceEnd = /\s$/;

    return _spaceEnd.test(input.toString());
  }

  /**
   * 验证是否以空格开头或结尾
   */
  static isSpaceStartOrEnd (input: string): boolean {
    return this.isSpaceStart(input) || this.isSpaceEnd(input);
  }
}
