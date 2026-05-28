/* eslint-disable ts/member-ordering */
/**
 * 验证工具类
 */
export class ValidateUtil {
  static _phone = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
  /**
   * 验证是否为手机号码
   * @example
   * ```ts
   * ValidateUtil.isPhone("13800138000"); // true
   * ```
   */
  static isPhone (input: string): boolean {
    return this._phone.test(input.toString());
  }

  static _telephone = /^(((0\d{2,3})-)?((\d{7,8})|(400\d{7})|(800\d{7}))(-(\d{1,4}))?)$/;
  /**
   * 验证是否为固定电话
   * @example
   * ```ts
   * ValidateUtil.isTelephone("010-12345678"); // true
   * ```
   */
  static isTelephone (input: string): boolean {
    return this._telephone.test(input.toString());
  }

  static _IMEI = /^\d{15,17}$/;
  /**
   * 验证是否为移动设备识别码
   * @example
   * ```ts
   * ValidateUtil.isIMEI("490154203237518"); // true
   * ```
   */
  static isIMEI (input: string): boolean {
    return this._IMEI.test(input.toString());
  }

  static _email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;
  /**
   * 验证是否为电子邮箱
   * @example
   * ```ts
   * ValidateUtil.isEmail("dev@example.com"); // true
   * ```
   */
  static isEmail (input: string): boolean {
    return this._email.test(input.toString());
  }

  static _link = /^(https?:\/\/)?(([\w-]+(\.[\w-]+)*\.[a-z]{2,6})|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/\S*)?$/i;
  /**
   * 验证是否为 http(s) 链接
   * @example
   * ```ts
   * ValidateUtil.isHttpLink("https://example.com/path"); // true
   * ```
   */
  static isHttpLink (input: string): boolean {
    return this._link.test(input.toString());
  }

  static _portLink = /^(https?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/i;
  /**
   * 验证是否为端口号链接
   * @example
   * ```ts
   * ValidateUtil.isPortLink("http://example.com:8080"); // true
   * ```
   */
  static isPortLink (input: string): boolean {
    return this._portLink.test(input.toString());
  }

  static _thunderLink = /^thunderx?:\/\/[a-zA-Z\d]+=$/i;
  /**
   * 验证是否为迅雷链接
   * @example
   * ```ts
   * ValidateUtil.isThunderLink("thunder://QUFodHRwOi8vZXhhbXBsZS5jb20vZmlsZQ=="); // true
   * ```
   */
  static isThunderLink (input: string): boolean {
    return this._thunderLink.test(input.toString());
  }

  static _uscc = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
  /**
   * 验证是否为统一社会信用代码
   * @example
   * ```ts
   * ValidateUtil.isUSCC("91350100M000100Y43"); // true
   * ```
   */
  static isUSCC (input: string): boolean {
    return this._uscc.test(input.toString());
  }

  static _usccs = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
  /**
   * 验证是否为统一社会信用代码 - 15位/18位/20位数字/字母
   * @example
   * ```ts
   * ValidateUtil.isUSCCS("91350100M000100Y43"); // true
   * ```
   */
  static isUSCCS (input: string): boolean {
    return this._usccs.test(input.toString());
  }

  static _dirPathWindows = /^[a-z]:\\(?:\w+\\?)*$/i;
  /**
   * 验证是否为 Windows 系统文件夹路径
   * @example
   * ```ts
   * ValidateUtil.isDirPathWindows("C:\\Users\\pawover\\"); // true
   * ```
   */
  static isDirPathWindows (input: string): boolean {
    return this._dirPathWindows.test(input.toString());
  }

  static _filePathWindows = /^[a-z]:\\(?:\w+\\)*\w+\.\w+$/i;
  /**
   * 验证是否为 Windows 系统文件路径
   * @example
   * ```ts
   * ValidateUtil.isFilePathWindows("C:\\Users\\pawover\\a.txt"); // true
   * ```
   */
  static isFilePathWindows (input: string): boolean {
    return this._filePathWindows.test(input.toString());
  }

  static _dirPathLinux = /^\/(?:[^\\/\s]+\/)*$/;
  /**
   * 验证是否为 Linux 系统文件夹路径
   * @example
   * ```ts
   * ValidateUtil.isDirPathLinux("/usr/local/"); // true
   * ```
   */
  static isDirPathLinux (input: string): boolean {
    return this._dirPathLinux.test(input.toString());
  }

  static _filePathLinux = /^(\/$|\/(?:[^\\/\s]+\/)*[^\\/\s]+$)/;
  /**
   * 验证是否为 Linux 系统文件路径
   * @example
   * ```ts
   * ValidateUtil.isFilePathLinux("/usr/local/bin/node"); // true
   * ```
   */
  static isFilePathLinux (input: string): boolean {
    return this._filePathLinux.test(input.toString());
  }

  static _EVCarNumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))\d{4})|(\d{5}[DF]))$/;
  /**
   * 验证是否为新能源车牌号
   * @example
   * ```ts
   * ValidateUtil.isEVCarNumber("粤AD12345"); // true
   * ```
   */
  static isEVCarNumber (input: string): boolean {
    return this._EVCarNumber.test(input.toString());
  }

  static _GVCarNumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;
  /**
   * 验证是否为燃油车车牌号
   * @example
   * ```ts
   * ValidateUtil.isGVCarNumber("粤B12345"); // true
   * ```
   */
  static isGVCarNumber (input: string): boolean {
    return this._GVCarNumber.test(input.toString());
  }

  static _chineseName = /^[一-龢][一·-龢]*$/;
  /**
   * 验证是否为中文姓名
   * @example
   * ```ts
   * ValidateUtil.isChineseName("张三"); // true
   * ```
   */
  static isChineseName (input: string): boolean {
    return this._chineseName.test(input.toString());
  }

  static _chineseId = /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))([\dX])$/i;
  /**
   * 验证是否为中国身份证号
   * @example
   * ```ts
   * ValidateUtil.isChineseID("11010519491231002X"); // true
   * ```
   */
  static isChineseID (input: string): boolean {
    return this._chineseId.test(input.toString());
  }

  static _chineseProvince = /^安徽|澳门|北京|重庆|福建|甘肃|广东|广西|贵州|海南|河北|河南|黑龙江|湖北|湖南|吉林|江苏|江西|辽宁|内蒙古|宁夏|青海|山东|山西|陕西|上海|四川|台湾|天津|西藏|香港|新疆|云南|浙江$/;
  /**
   * 验证是否为中国省份
   * @example
   * ```ts
   * ValidateUtil.isChineseProvince("浙江"); // true
   * ```
   */
  static isChineseProvince (input: string): boolean {
    return this._chineseProvince.test(input.toString());
  }

  static _chineseNation = /^汉族|蒙古族|回族|藏族|维吾尔族|苗族|彝族|壮族|布依族|朝鲜族|满族|侗族|瑶族|白族|土家族|哈尼族|哈萨克族|傣族|黎族|傈僳族|佤族|畲族|高山族|拉祜族|水族|东乡族|纳西族|景颇族|柯尔克孜族|土族|达斡尔族|仫佬族|羌族|布朗族|撒拉族|毛南族|仡佬族|锡伯族|阿昌族|普米族|塔吉克族|怒族|乌孜别克族|俄罗斯族|鄂温克族|德昂族|保安族|裕固族|京族|塔塔尔族|独龙族|鄂伦春族|赫哲族|门巴族|珞巴族|基诺族|其它未识别民族|外国人入中国籍$/;
  /**
   * 验证是否为中华民族
   * @example
   * ```ts
   * ValidateUtil.isChineseNation("汉族"); // true
   * ```
   */
  static isChineseNation (input: string): boolean {
    return this._chineseNation.test(input.toString());
  }

  static _letter = /^[a-z]+$/i;
  /**
   * 验证是否只包含字母
   * @example
   * ```ts
   * ValidateUtil.isLetter("abcDEF"); // true
   * ```
   */
  static isLetter (input: string): boolean {
    return this._letter.test(input.toString());
  }

  static _letterLowercase = /^[a-z]+$/;
  /**
   * 验证是否只包含小写字母
   * @example
   * ```ts
   * ValidateUtil.isLetterLowercase("abc"); // true
   * ```
   */
  static isLetterLowercase (input: string): boolean {
    return this._letterLowercase.test(input.toString());
  }

  static _letterUppercase = /^[A-Z]+$/;
  /**
   * 验证是否只包含大写字母
   * @example
   * ```ts
   * ValidateUtil.isLetterUppercase("ABC"); // true
   * ```
   */
  static isLetterUppercase (input: string): boolean {
    return this._letterUppercase.test(input.toString());
  }

  static _letterOmit = /^[^A-Z]*$/i;
  /**
   * 验证是否不包含字母
   * @example
   * ```ts
   * ValidateUtil.isLetterOmit("123_-"); // true
   * ```
   */
  static isLetterOmit (input: string): boolean {
    return this._letterOmit.test(input.toString());
  }

  static _LetterAndNumber = /^[A-Z0-9]+$/i;
  /**
   * 验证是否为数字和字母组合
   * @example
   * ```ts
   * ValidateUtil.isLetterAndNumber("A1B2"); // true
   * ```
   */
  static isLetterAndNumber (input: string): boolean {
    return this._LetterAndNumber.test(input.toString());
  }

  static _signedFloat = /^[+-]?(\d+(\.\d+)?|\.\d+)$/;
  /**
   * 验证是否为有符号浮点数
   * @example
   * ```ts
   * ValidateUtil.isSignedFloat("-12.34"); // true
   * ```
   */
  static isSignedFloat (input: string): boolean {
    return this._signedFloat.test(input.toString());
  }

  static _unsignedFloat = /^\+?(\d+(\.\d+)?|\.\d+)$/;
  /**
   * 验证是否为无符号浮点数
   * @example
   * ```ts
   * ValidateUtil.isUnsignedFloat("12.34"); // true
   * ```
   */
  static isUnsignedFloat (input: string): boolean {
    return this._unsignedFloat.test(input.toString());
  }

  static _signedInteger = /^[+-]?\d+$/;
  /**
   * 验证是否为有符号整数
   * @example
   * ```ts
   * ValidateUtil.isSignedInteger("-12"); // true
   * ```
   */
  static isSignedInteger (input: string): boolean {
    return this._signedInteger.test(input.toString());
  }

  static _unsignedInteger = /^\+?\d+$/;
  /**
   * 验证是否为无符号整数
   * @example
   * ```ts
   * ValidateUtil.isUnsignedInteger("12"); // true
   * ```
   */
  static isUnsignedInteger (input: string): boolean {
    return this._unsignedInteger.test(input.toString());
  }

  static _spaceInclude = /\s/;
  /**
   * 验证是否包含空格
   * @example
   * ```ts
   * ValidateUtil.isSpaceInclude("a b"); // true
   * ```
   */
  static isSpaceInclude (input: string): boolean {
    return this._spaceInclude.test(input.toString());
  }

  static _spaceStart = /^\s/;
  /**
   * 验证是否以空格开头
   * @example
   * ```ts
   * ValidateUtil.isSpaceStart(" abc"); // true
   * ```
   */
  static isSpaceStart (input: string): boolean {
    return this._spaceStart.test(input.toString());
  }

  static _spaceEnd = /\s$/;
  /**
   * 验证是否以空格结尾
   * @example
   * ```ts
   * ValidateUtil.isSpaceEnd("abc "); // true
   * ```
   */
  static isSpaceEnd (input: string): boolean {
    return this._spaceEnd.test(input.toString());
  }

  /**
   * 验证是否以空格开头或结尾
   * @example
   * ```ts
   * ValidateUtil.isSpaceStartOrEnd(" abc"); // true
   * ```
   */
  static isSpaceStartOrEnd (input: string): boolean {
    return this.isSpaceStart(input) || this.isSpaceEnd(input);
  }
}
