import { z } from "zod";

const _phone = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
/** 手机号码 */
export const phone = z.string().regex(_phone, { error: "手机号码格式错误" });

const _telephone = /0\d{2,3}-\d{7,9}$/;
/** 固定电话 */
export const telephone = z.string().regex(_telephone, { error: "电话号码格式错误" });

const _email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;
/** 电子邮箱 */
export const email = z.string().regex(_email, { error: "电子邮箱格式错误" });

const _chineseName = /^[一-龢][一·-龢]*$/;
/** 中文姓名 */
export const chineseName = z.string().regex(_chineseName, { error: "应为中文姓名" });

/** 手机机身码 */
export const IMEI = z.string().regex(/^\d{15,17}$/, { error: "手机机身码格式错误" });

const _ID = /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))([\dX])$/i;
/** 身份证号 */
export const ID = z.string().regex(_ID, { error: "身份证号格式错误" });

const _link = /^(((ht|f)tps?):\/\/)?(([\w-]+(\.[\w-]+)*\.[a-z]{2,6})|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/\S*)?$/;
/** 链接 */
export const link = z.string().regex(_link, { error: "链接格式错误" });

const _linkPort = /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/;
/** 端口号网址 */
export const linkPort = z.string().regex(_linkPort, { error: "网址格式错误" });

const _USCC_S = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
/** 统一社会信用代码 */
export const USCC_S = z.string().regex(_USCC_S, { error: "统一社会信用代码格式错误" });

const _USCC = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
/** 统一社会信用代码 - 15位/18位/20位数字/字母 */
export const USCC = z.string().regex(_USCC, { error: "统一社会信用代码格式错误" });

const _thunder = /^thunderx?:\/\/[a-zA-Z\d]+=$/;
/** 迅雷链接 */
export const thunder = z.string().regex(_thunder, { error: "迅雷链接格式错误" });

const _dirPathWindows = /^[a-z]:\\(?:\w+\\?)*$/i;
/** windows 文件夹路径 */
export const dirPathWindows = z.string().regex(_dirPathWindows, { error: "路径格式错误" });

const _filePathWindows = /^[a-z]:\\(?:\w+\\)*\w+\.\w+$/i;
/** windows 文件路径 */
export const filePathWindows = z.string().regex(_filePathWindows, { error: "路径格式错误" });

const _dirPathLinux = /^\/(?:[^/]+\/)*$/;
/** linux 文件夹路径 */
export const dirPathLinux = z.string().regex(_dirPathLinux, { error: "路径格式错误" });

const _filePathLinux = /^\/(?:[^/]+\/)*[^/]+$/;
/** linux 文件路径 */
export const filePathLinux = z.string().regex(_filePathLinux, { error: "路径格式错误" });

const _carCodeGreen = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))\d{4})|(\d{5}[DF]))$/;
/** 车牌号 新能源 */
export const carCodeGreen = z.string().regex(_carCodeGreen, { error: "车牌号格式错误" });

const _carCodeNotGreen = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;
/** 车牌号 非新能源 */
export const carCodeNotGreen = z.string().regex(_carCodeNotGreen, { error: "车牌号格式错误" });

const _chinaProvince = /^安徽|澳门|北京|重庆|福建|甘肃|广东|广西|贵州|海南|河北|河南|黑龙江|湖北|湖南|吉林|江苏|江西|辽宁|内蒙古|宁夏|青海|山东|山西|陕西|上海|四川|台湾|天津|西藏|香港|新疆|云南|浙江$/;
/** 中国省份 */
export const chinaProvince = z.string().regex(_chinaProvince, { error: "应为中国省份" });

const _nation = /^汉族|蒙古族|回族|藏族|维吾尔族|苗族|彝族|壮族|布依族|朝鲜族|满族|侗族|瑶族|白族|土家族|哈尼族|哈萨克族|傣族|黎族|傈僳族|佤族|畲族|高山族|拉祜族|水族|东乡族|纳西族|景颇族|柯尔克孜族|土族|达斡尔族|仫佬族|羌族|布朗族|撒拉族|毛南族|仡佬族|锡伯族|阿昌族|普米族|塔吉克族|怒族|乌孜别克族|俄罗斯族|鄂温克族|德昂族|保安族|裕固族|京族|塔塔尔族|独龙族|鄂伦春族|赫哲族|门巴族|珞巴族|基诺族|其它未识别民族|外国人入中国籍$/;
/** 民族 */
export const nation = z.string().regex(_nation, { error: "应为民族" });
