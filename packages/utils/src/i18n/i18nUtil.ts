import { StringUtil } from "../string";
import { TypeUtil } from "../type";
import type { ToBaseLanguage, ToFullLocale, ToLocaleDisplayNameOptions } from "./index.type";

/**
 * 国际化（i18n）工具类
 * - 统一处理 BCP 47 语言标签（如 `"en"` / `"en-US"`）的规范化、拆分与展示名称查询
 * - `LOCALE_ENUM` 与 `PRIMARY_LANGUAGE_ENUM` 提供完整的 Locale / 主要代表语言枚举
 */
export class I18nUtil {
  /**
   * 全部国家/地区的完整 Locale 枚举（BCP 47 格式）
   * - 键为 ISO 3166-1 alpha-2 国家/地区代码（共 248 项，南极洲 AQ 无常驻人口及官方语言故不收录），值为该国家/地区的地区收录语言的完整 Locale（`语言-地区` 规范形式）
   * - 按联合国 M.49 地理区域分组，组内按国家/地区代码字母序排列
   * - 用于 `Intl` API 的本地化格式化，其值覆盖 `PRIMARY_LANGUAGE_ENUM` 的映射范围
   *
   * @example
   * ```ts
   * import { I18nUtil } from "@pawover/kit/utils";
   *
   * I18nUtil.LOCALE_ENUM.US; // "en-US"
   * I18nUtil.LOCALE_ENUM.CN; // "zh-CN"
   *
   * // 结合 Intl.NumberFormat 使用
   * new Intl.NumberFormat(I18nUtil.LOCALE_ENUM.US).format(1234.56); // "1,234.56"
   * ```
   */
  static readonly LOCALE_ENUM = {
    // ========== 美洲（Americas） ==========
    /** 英语（安提瓜和巴布达） */
    AG: "en-AG",
    /** 英语（安圭拉） */
    AI: "en-AI",
    /** 西班牙语（阿根廷） */
    AR: "es-AR",
    /** 荷兰语（阿鲁巴） */
    AW: "nl-AW",
    /** 英语（巴巴多斯） */
    BB: "en-BB",
    /** 法语（圣巴泰勒米） */
    BL: "fr-BL",
    /** 英语（百慕大） */
    BM: "en-BM",
    /** 西班牙语（玻利维亚） */
    BO: "es-BO",
    /** 荷兰语（荷属加勒比区） */
    BQ: "nl-BQ",
    /** 葡萄牙语（巴西） */
    BR: "pt-BR",
    /** 英语（巴哈马） */
    BS: "en-BS",
    /** 英语（伯利兹） */
    BZ: "en-BZ",
    /** 英语（加拿大） */
    CA: "en-CA",
    /** 西班牙语（智利） */
    CL: "es-CL",
    /** 西班牙语（哥伦比亚） */
    CO: "es-CO",
    /** 西班牙语（哥斯达黎加） */
    CR: "es-CR",
    /** 西班牙语（古巴） */
    CU: "es-CU",
    /** 荷兰语（库拉索） */
    CW: "nl-CW",
    /** 英语（多米尼克） */
    DM: "en-DM",
    /** 西班牙语（多米尼加） */
    DO: "es-DO",
    /** 西班牙语（厄瓜多尔） */
    EC: "es-EC",
    /** 英语（福克兰群岛） */
    FK: "en-FK",
    /** 英语（格林纳达） */
    GD: "en-GD",
    /** 法语（法属圭亚那） */
    GF: "fr-GF",
    /** 格陵兰语（格陵兰） */
    GL: "kl-GL",
    /** 法语（瓜德罗普） */
    GP: "fr-GP",
    /** 英语（南乔治亚和南桑威奇群岛） */
    GS: "en-GS",
    /** 西班牙语（危地马拉） */
    GT: "es-GT",
    /** 英语（圭亚那） */
    GY: "en-GY",
    /** 西班牙语（洪都拉斯） */
    HN: "es-HN",
    /** 法语（海地） */
    HT: "fr-HT",
    /** 英语（牙买加） */
    JM: "en-JM",
    /** 英语（圣基茨和尼维斯） */
    KN: "en-KN",
    /** 英语（开曼群岛） */
    KY: "en-KY",
    /** 英语（圣卢西亚） */
    LC: "en-LC",
    /** 法语（法属圣马丁） */
    MF: "fr-MF",
    /** 法语（马提尼克） */
    MQ: "fr-MQ",
    /** 英语（蒙特塞拉特） */
    MS: "en-MS",
    /** 西班牙语（墨西哥） */
    MX: "es-MX",
    /** 西班牙语（尼加拉瓜） */
    NI: "es-NI",
    /** 西班牙语（巴拿马） */
    PA: "es-PA",
    /** 西班牙语（秘鲁） */
    PE: "es-PE",
    /** 法语（圣皮埃尔和密克隆） */
    PM: "fr-PM",
    /** 西班牙语（波多黎各） */
    PR: "es-PR",
    /** 西班牙语（巴拉圭） */
    PY: "es-PY",
    /** 荷兰语（苏里南） */
    SR: "nl-SR",
    /** 西班牙语（萨尔瓦多） */
    SV: "es-SV",
    /** 荷兰语（荷属圣马丁） */
    SX: "nl-SX",
    /** 英语（特克斯和凯科斯群岛） */
    TC: "en-TC",
    /** 英语（特立尼达和多巴哥） */
    TT: "en-TT",
    /** 英语（美国） */
    US: "en-US",
    /** 西班牙语（乌拉圭） */
    UY: "es-UY",
    /** 英语（圣文森特和格林纳丁斯） */
    VC: "en-VC",
    /** 西班牙语（委内瑞拉） */
    VE: "es-VE",
    /** 英语（英属维尔京群岛） */
    VG: "en-VG",
    /** 英语（美属维尔京群岛） */
    VI: "en-VI",

    // ========== 亚洲（Asia） ==========
    /** 阿拉伯语（阿联酋） */
    AE: "ar-AE",
    /** 波斯语（阿富汗） */
    AF: "fa-AF",
    /** 亚美尼亚语（亚美尼亚） */
    AM: "hy-AM",
    /** 阿塞拜疆语（阿塞拜疆） */
    AZ: "az-AZ",
    /** 孟加拉语（孟加拉国） */
    BD: "bn-BD",
    /** 阿拉伯语（巴林） */
    BH: "ar-BH",
    /** 马来语（文莱） */
    BN: "ms-BN",
    /** 宗卡语（不丹） */
    BT: "dz-BT",
    /** 简体中文（中国） */
    CN: "zh-CN",
    /** 希腊语（塞浦路斯） */
    CY: "el-CY",
    /** 格鲁吉亚语（格鲁吉亚） */
    GE: "ka-GE",
    /** 繁体中文（中国香港） */
    HK: "zh-HK",
    /** 印度尼西亚语（印度尼西亚） */
    ID: "id-ID",
    /** 希伯来语（以色列） */
    IL: "he-IL",
    /** 印地语（印度） */
    IN: "hi-IN",
    /** 英语（英属印度洋领地） */
    IO: "en-IO",
    /** 阿拉伯语（伊拉克） */
    IQ: "ar-IQ",
    /** 波斯语（伊朗） */
    IR: "fa-IR",
    /** 阿拉伯语（约旦） */
    JO: "ar-JO",
    /** 日语（日本） */
    JP: "ja-JP",
    /** 吉尔吉斯语（吉尔吉斯斯坦） */
    KG: "ky-KG",
    /** 高棉语（柬埔寨） */
    KH: "km-KH",
    /** 朝鲜语（朝鲜） */
    KP: "ko-KP",
    /** 韩语（韩国） */
    KR: "ko-KR",
    /** 阿拉伯语（科威特） */
    KW: "ar-KW",
    /** 哈萨克语（哈萨克斯坦） */
    KZ: "kk-KZ",
    /** 老挝语（老挝） */
    LA: "lo-LA",
    /** 阿拉伯语（黎巴嫩） */
    LB: "ar-LB",
    /** 僧伽罗语（斯里兰卡） */
    LK: "si-LK",
    /** 缅甸语（缅甸） */
    MM: "my-MM",
    /** 蒙古语（蒙古） */
    MN: "mn-MN",
    /** 繁体中文（中国澳门） */
    MO: "zh-MO",
    /** 迪维希语（马尔代夫） */
    MV: "dv-MV",
    /** 马来语（马来西亚） */
    MY: "ms-MY",
    /** 尼泊尔语（尼泊尔） */
    NP: "ne-NP",
    /** 阿拉伯语（阿曼） */
    OM: "ar-OM",
    /** 英语（菲律宾） */
    PH: "en-PH",
    /** 乌尔都语（巴基斯坦） */
    PK: "ur-PK",
    /** 阿拉伯语（巴勒斯坦） */
    PS: "ar-PS",
    /** 阿拉伯语（卡塔尔） */
    QA: "ar-QA",
    /** 阿拉伯语（沙特阿拉伯） */
    SA: "ar-SA",
    /** 英语（新加坡） */
    SG: "en-SG",
    /** 阿拉伯语（叙利亚） */
    SY: "ar-SY",
    /** 泰语（泰国） */
    TH: "th-TH",
    /** 塔吉克语（塔吉克斯坦） */
    TJ: "tg-TJ",
    /** 葡萄牙语（东帝汶） */
    TL: "pt-TL",
    /** 土库曼语（土库曼斯坦） */
    TM: "tk-TM",
    /** 土耳其语（土耳其） */
    TR: "tr-TR",
    /** 繁体中文（中国台湾地区） */
    TW: "zh-TW",
    /** 乌兹别克语（乌兹别克斯坦） */
    UZ: "uz-UZ",
    /** 越南语（越南） */
    VN: "vi-VN",
    /** 阿拉伯语（也门） */
    YE: "ar-YE",

    // ========== 欧洲（Europe） ==========
    /** 加泰罗尼亚语（安道尔） */
    AD: "ca-AD",
    /** 阿尔巴尼亚语（阿尔巴尼亚） */
    AL: "sq-AL",
    /** 德语（奥地利） */
    AT: "de-AT",
    /** 瑞典语（奥兰群岛） */
    AX: "sv-AX",
    /** 波斯尼亚语（波黑） */
    BA: "bs-BA",
    /** 荷兰语（比利时） */
    BE: "nl-BE",
    /** 保加利亚语（保加利亚） */
    BG: "bg-BG",
    /** 白俄罗斯语（白俄罗斯） */
    BY: "be-BY",
    /** 德语（瑞士） */
    CH: "de-CH",
    /** 捷克语（捷克） */
    CZ: "cs-CZ",
    /** 德语（德国） */
    DE: "de-DE",
    /** 丹麦语（丹麦） */
    DK: "da-DK",
    /** 爱沙尼亚语（爱沙尼亚） */
    EE: "et-EE",
    /** 西班牙语（西班牙） */
    ES: "es-ES",
    /** 芬兰语（芬兰） */
    FI: "fi-FI",
    /** 法罗语（法罗群岛） */
    FO: "fo-FO",
    /** 法语（法国） */
    FR: "fr-FR",
    /** 英语（英国） */
    GB: "en-GB",
    /** 英语（根西岛） */
    GG: "en-GG",
    /** 英语（直布罗陀） */
    GI: "en-GI",
    /** 希腊语（希腊） */
    GR: "el-GR",
    /** 克罗地亚语（克罗地亚） */
    HR: "hr-HR",
    /** 匈牙利语（匈牙利） */
    HU: "hu-HU",
    /** 英语（爱尔兰） */
    IE: "en-IE",
    /** 英语（马恩岛） */
    IM: "en-IM",
    /** 冰岛语（冰岛） */
    IS: "is-IS",
    /** 意大利语（意大利） */
    IT: "it-IT",
    /** 英语（泽西岛） */
    JE: "en-JE",
    /** 德语（列支敦士登） */
    LI: "de-LI",
    /** 立陶宛语（立陶宛） */
    LT: "lt-LT",
    /** 法语（卢森堡） */
    LU: "fr-LU",
    /** 拉脱维亚语（拉脱维亚） */
    LV: "lv-LV",
    /** 法语（摩纳哥） */
    MC: "fr-MC",
    /** 罗马尼亚语（摩尔多瓦） */
    MD: "ro-MD",
    /** 塞尔维亚语（黑山） */
    ME: "sr-ME",
    /** 马其顿语（北马其顿） */
    MK: "mk-MK",
    /** 马耳他语（马耳他） */
    MT: "mt-MT",
    /** 荷兰语（荷兰） */
    NL: "nl-NL",
    /** 挪威语（挪威） */
    NO: "no-NO",
    /** 波兰语（波兰） */
    PL: "pl-PL",
    /** 葡萄牙语（葡萄牙） */
    PT: "pt-PT",
    /** 罗马尼亚语（罗马尼亚） */
    RO: "ro-RO",
    /** 俄语（俄罗斯） */
    RU: "ru-RU",
    /** 塞尔维亚语（塞尔维亚） */
    RS: "sr-RS",
    /** 瑞典语（瑞典） */
    SE: "sv-SE",
    /** 斯洛文尼亚语（斯洛文尼亚） */
    SI: "sl-SI",
    /** 挪威语（斯瓦尔巴和扬马延） */
    SJ: "no-SJ",
    /** 斯洛伐克语（斯洛伐克） */
    SK: "sk-SK",
    /** 意大利语（圣马力诺） */
    SM: "it-SM",
    /** 乌克兰语（乌克兰） */
    UA: "uk-UA",
    /** 意大利语（梵蒂冈） */
    VA: "it-VA",

    // ========== 非洲（Africa） ==========
    /** 葡萄牙语（安哥拉） */
    AO: "pt-AO",
    /** 法语（布基纳法索） */
    BF: "fr-BF",
    /** 法语（布隆迪） */
    BI: "fr-BI",
    /** 法语（贝宁） */
    BJ: "fr-BJ",
    /** 英语（博茨瓦纳） */
    BW: "en-BW",
    /** 法语（刚果民主共和国） */
    CD: "fr-CD",
    /** 法语（中非共和国） */
    CF: "fr-CF",
    /** 法语（刚果共和国） */
    CG: "fr-CG",
    /** 法语（科特迪瓦） */
    CI: "fr-CI",
    /** 法语（喀麦隆） */
    CM: "fr-CM",
    /** 葡萄牙语（佛得角） */
    CV: "pt-CV",
    /** 法语（吉布提） */
    DJ: "fr-DJ",
    /** 阿拉伯语（阿尔及利亚） */
    DZ: "ar-DZ",
    /** 阿拉伯语（埃及） */
    EG: "ar-EG",
    /** 阿拉伯语（西撒哈拉） */
    EH: "ar-EH",
    /** 提格里尼亚语（厄立特里亚） */
    ER: "ti-ER",
    /** 阿姆哈拉语（埃塞俄比亚） */
    ET: "am-ET",
    /** 法语（加蓬） */
    GA: "fr-GA",
    /** 英语（加纳） */
    GH: "en-GH",
    /** 英语（冈比亚） */
    GM: "en-GM",
    /** 法语（几内亚） */
    GN: "fr-GN",
    /** 西班牙语（赤道几内亚） */
    GQ: "es-GQ",
    /** 葡萄牙语（几内亚比绍） */
    GW: "pt-GW",
    /** 英语（肯尼亚） */
    KE: "en-KE",
    /** 阿拉伯语（科摩罗） */
    KM: "ar-KM",
    /** 英语（利比里亚） */
    LR: "en-LR",
    /** 英语（莱索托） */
    LS: "en-LS",
    /** 阿拉伯语（利比亚） */
    LY: "ar-LY",
    /** 阿拉伯语（摩洛哥） */
    MA: "ar-MA",
    /** 马达加斯加语（马达加斯加） */
    MG: "mg-MG",
    /** 法语（马里） */
    ML: "fr-ML",
    /** 阿拉伯语（毛里塔尼亚） */
    MR: "ar-MR",
    /** 英语（毛里求斯） */
    MU: "en-MU",
    /** 英语（马拉维） */
    MW: "en-MW",
    /** 葡萄牙语（莫桑比克） */
    MZ: "pt-MZ",
    /** 英语（纳米比亚） */
    NA: "en-NA",
    /** 法语（尼日尔） */
    NE: "fr-NE",
    /** 英语（尼日利亚） */
    NG: "en-NG",
    /** 法语（留尼汪） */
    RE: "fr-RE",
    /** 基尼亚卢旺达语（卢旺达） */
    RW: "rw-RW",
    /** 法语（塞舌尔） */
    SC: "fr-SC",
    /** 阿拉伯语（苏丹） */
    SD: "ar-SD",
    /** 英语（圣赫勒拿） */
    SH: "en-SH",
    /** 英语（塞拉利昂） */
    SL: "en-SL",
    /** 法语（塞内加尔） */
    SN: "fr-SN",
    /** 索马里语（索马里） */
    SO: "so-SO",
    /** 英语（南苏丹） */
    SS: "en-SS",
    /** 葡萄牙语（圣多美和普林西比） */
    ST: "pt-ST",
    /** 英语（斯威士兰） */
    SZ: "en-SZ",
    /** 法语（乍得） */
    TD: "fr-TD",
    /** 法语（多哥） */
    TG: "fr-TG",
    /** 阿拉伯语（突尼斯） */
    TN: "ar-TN",
    /** 斯瓦希里语（坦桑尼亚） */
    TZ: "sw-TZ",
    /** 英语（乌干达） */
    UG: "en-UG",
    /** 法语（马约特） */
    YT: "fr-YT",
    /** 英语（南非） */
    ZA: "en-ZA",
    /** 英语（赞比亚） */
    ZM: "en-ZM",
    /** 英语（津巴布韦） */
    ZW: "en-ZW",

    // ========== 大洋洲（Oceania） ==========
    /** 英语（美属萨摩亚） */
    AS: "en-AS",
    /** 英语（澳大利亚） */
    AU: "en-AU",
    /** 英语（科科斯群岛） */
    CC: "en-CC",
    /** 英语（库克群岛） */
    CK: "en-CK",
    /** 英语（圣诞岛） */
    CX: "en-CX",
    /** 英语（斐济） */
    FJ: "en-FJ",
    /** 英语（密克罗尼西亚联邦） */
    FM: "en-FM",
    /** 英语（关岛） */
    GU: "en-GU",
    /** 英语（赫德岛和麦克唐纳群岛） */
    HM: "en-HM",
    /** 英语（基里巴斯） */
    KI: "en-KI",
    /** 英语（马绍尔群岛） */
    MH: "en-MH",
    /** 英语（北马里亚纳群岛） */
    MP: "en-MP",
    /** 法语（新喀里多尼亚） */
    NC: "fr-NC",
    /** 英语（诺福克岛） */
    NF: "en-NF",
    /** 英语（瑙鲁） */
    NR: "en-NR",
    /** 英语（纽埃） */
    NU: "en-NU",
    /** 英语（新西兰） */
    NZ: "en-NZ",
    /** 法语（法属波利尼西亚） */
    PF: "fr-PF",
    /** 英语（巴布亚新几内亚） */
    PG: "en-PG",
    /** 英语（皮特凯恩群岛） */
    PN: "en-PN",
    /** 英语（帕劳） */
    PW: "en-PW",
    /** 英语（所罗门群岛） */
    SB: "en-SB",
    /** 英语（托克劳） */
    TK: "en-TK",
    /** 汤加语（汤加） */
    TO: "to-TO",
    /** 英语（图瓦卢） */
    TV: "en-TV",
    /** 英语（美国本土外小岛屿） */
    UM: "en-UM",
    /** 比斯拉马语（瓦努阿图） */
    VU: "bi-VU",
    /** 法语（瓦利斯和富图纳） */
    WF: "fr-WF",
    /** 萨摩亚语（萨摩亚） */
    WS: "sm-WS",

    // ========== 南极洲（Antarctica） ==========
    /** 挪威语（布韦岛） */
    BV: "no-BV",
    /** 法语（法属南部领地） */
    TF: "fr-TF",
  } as const;

  /**
   * 主要代表语言枚举：语言子标签（小写）→ 代表地区的完整 Locale（BCP 47 格式）
   * - 覆盖 `LOCALE_ENUM` 出现的全部 74 种语言，值为各语言的代表国家/地区完整 Locale
   * - 作为 `toFullLocale` 的规范化映射源：输入语言子标签时按此表映射（大小写不敏感）
   * - 键为 ISO 639-1 语言代码（唯一例外：比斯拉马语 `bi` 无 639-1 码，采用 ISO 639-2/3）
   *
   * @example
   * ```ts
   * import { I18nUtil } from "@pawover/kit/utils";
   *
   * I18nUtil.PRIMARY_LANGUAGE_ENUM.en; // "en-US"
   * I18nUtil.PRIMARY_LANGUAGE_ENUM.zh; // "zh-CN"
   * I18nUtil.PRIMARY_LANGUAGE_ENUM.ti; // "ti-ER"
   *
   * // 结合 Intl.DateTimeFormat 使用
   * new Intl.DateTimeFormat(I18nUtil.PRIMARY_LANGUAGE_ENUM.de).format(new Date());
   * ```
   */
  static readonly PRIMARY_LANGUAGE_ENUM = {
    /** 阿姆哈拉语（埃塞俄比亚） */
    am: "am-ET",
    /** 阿拉伯语（沙特阿拉伯） */
    ar: "ar-SA",
    /** 阿塞拜疆语（阿塞拜疆） */
    az: "az-AZ",
    /** 白俄罗斯语（白俄罗斯） */
    be: "be-BY",
    /** 保加利亚语（保加利亚） */
    bg: "bg-BG",
    /** 比斯拉马语（瓦努阿图） */
    bi: "bi-VU",
    /** 孟加拉语（孟加拉国） */
    bn: "bn-BD",
    /** 波斯尼亚语（波黑） */
    bs: "bs-BA",
    /** 加泰罗尼亚语（西班牙） */
    ca: "ca-ES",
    /** 捷克语（捷克） */
    cs: "cs-CZ",
    /** 丹麦语（丹麦） */
    da: "da-DK",
    /** 德语（德国） */
    de: "de-DE",
    /** 迪维希语（马尔代夫） */
    dv: "dv-MV",
    /** 宗卡语（不丹） */
    dz: "dz-BT",
    /** 希腊语（希腊） */
    el: "el-GR",
    /** 英语（美国） */
    en: "en-US",
    /** 西班牙语（西班牙） */
    es: "es-ES",
    /** 爱沙尼亚语（爱沙尼亚） */
    et: "et-EE",
    /** 波斯语（伊朗） */
    fa: "fa-IR",
    /** 芬兰语（芬兰） */
    fi: "fi-FI",
    /** 法罗语（法罗群岛） */
    fo: "fo-FO",
    /** 法语（法国） */
    fr: "fr-FR",
    /** 希伯来语（以色列） */
    he: "he-IL",
    /** 印地语（印度） */
    hi: "hi-IN",
    /** 克罗地亚语（克罗地亚） */
    hr: "hr-HR",
    /** 匈牙利语（匈牙利） */
    hu: "hu-HU",
    /** 亚美尼亚语（亚美尼亚） */
    hy: "hy-AM",
    /** 印度尼西亚语（印度尼西亚） */
    id: "id-ID",
    /** 冰岛语（冰岛） */
    is: "is-IS",
    /** 意大利语（意大利） */
    it: "it-IT",
    /** 日语（日本） */
    ja: "ja-JP",
    /** 格鲁吉亚语（格鲁吉亚） */
    ka: "ka-GE",
    /** 哈萨克语（哈萨克斯坦） */
    kk: "kk-KZ",
    /** 格陵兰语（格陵兰） */
    kl: "kl-GL",
    /** 高棉语（柬埔寨） */
    km: "km-KH",
    /** 韩语（韩国） */
    ko: "ko-KR",
    /** 吉尔吉斯语（吉尔吉斯斯坦） */
    ky: "ky-KG",
    /** 老挝语（老挝） */
    lo: "lo-LA",
    /** 立陶宛语（立陶宛） */
    lt: "lt-LT",
    /** 拉脱维亚语（拉脱维亚） */
    lv: "lv-LV",
    /** 马达加斯加语（马达加斯加） */
    mg: "mg-MG",
    /** 马其顿语（北马其顿） */
    mk: "mk-MK",
    /** 蒙古语（蒙古） */
    mn: "mn-MN",
    /** 马来语（马来西亚） */
    ms: "ms-MY",
    /** 马耳他语（马耳他） */
    mt: "mt-MT",
    /** 缅甸语（缅甸） */
    my: "my-MM",
    /** 尼泊尔语（尼泊尔） */
    ne: "ne-NP",
    /** 荷兰语（荷兰） */
    nl: "nl-NL",
    /** 挪威语（挪威） */
    no: "no-NO",
    /** 波兰语（波兰） */
    pl: "pl-PL",
    /** 葡萄牙语（巴西） */
    pt: "pt-BR",
    /** 罗马尼亚语（罗马尼亚） */
    ro: "ro-RO",
    /** 俄语（俄罗斯） */
    ru: "ru-RU",
    /** 基尼亚卢旺达语（卢旺达） */
    rw: "rw-RW",
    /** 僧伽罗语（斯里兰卡） */
    si: "si-LK",
    /** 斯洛伐克语（斯洛伐克） */
    sk: "sk-SK",
    /** 斯洛文尼亚语（斯洛文尼亚） */
    sl: "sl-SI",
    /** 萨摩亚语（萨摩亚） */
    sm: "sm-WS",
    /** 索马里语（索马里） */
    so: "so-SO",
    /** 阿尔巴尼亚语（阿尔巴尼亚） */
    sq: "sq-AL",
    /** 塞尔维亚语（塞尔维亚） */
    sr: "sr-RS",
    /** 瑞典语（瑞典） */
    sv: "sv-SE",
    /** 斯瓦希里语（坦桑尼亚） */
    sw: "sw-TZ",
    /** 塔吉克语（塔吉克斯坦） */
    tg: "tg-TJ",
    /** 泰语（泰国） */
    th: "th-TH",
    /** 提格里尼亚语（厄立特里亚） */
    ti: "ti-ER",
    /** 土库曼语（土库曼斯坦） */
    tk: "tk-TM",
    /** 汤加语（汤加） */
    to: "to-TO",
    /** 土耳其语（土耳其） */
    tr: "tr-TR",
    /** 乌克兰语（乌克兰） */
    uk: "uk-UA",
    /** 乌尔都语（巴基斯坦） */
    ur: "ur-PK",
    /** 乌兹别克语（乌兹别克斯坦） */
    uz: "uz-UZ",
    /** 越南语（越南） */
    vi: "vi-VN",
    /** 简体中文（中国） */
    zh: "zh-CN",
  } as const;

  /** 语言子标签（小写）→ 完整 Locale 的运行时查找表（`PRIMARY_LANGUAGE_ENUM` 字面量结构转宽类型索引） */
  private static readonly BASE_TO_FULL: Readonly<Record<string, string>> = I18nUtil.PRIMARY_LANGUAGE_ENUM;

  /**
   * 规范化为完整 Locale（语言 + 地区，BCP 47）
* - 输入为语言子标签（如 `"en"`、`"zh"`）时，按 `PRIMARY_LANGUAGE_ENUM` 映射为对应语言的代表国家/地区完整 Locale（如 `"en-US"`、`"zh-CN"`），查找对大小写不敏感
 * - 输入已包含地区子标签（含 `-`）时原样返回，不做大小写重写
 * - 未匹配的语言子标签：提供 `fallback` 时返回 `fallback`，否则原样返回
 * - 非法输入（`null` / `undefined` / 空白字符串）：提供 `fallback` 时返回 `fallback`，否则原样返回
 *
 * @param locale 语言标签，可为完整 Locale（如 `"en-US"`）或语言子标签（如 `"en"`）
   * @param fallback 未匹配或非法输入时的回退值，缺省时原样返回输入
   * @returns 规范化的完整 Locale，或 `fallback`，或原输入
   * @example
   * ```ts
   * import { I18nUtil } from "@pawover/kit/utils";
   *
   * // 重载 1: 无 fallback → 字面量类型映射
   * I18nUtil.toFullLocale("en"); // "en-US" (类型为 "en-US")
   * I18nUtil.toFullLocale("zh"); // "zh-CN" (类型为 "zh-CN")
   * I18nUtil.toFullLocale("en-US"); // "en-US" (已含地区后缀，原样返回)
   * I18nUtil.toFullLocale("EN"); // "en-US" (查找对大小写不敏感)
   * I18nUtil.toFullLocale("xx"); // "xx" (未匹配，原样返回)
   * I18nUtil.toFullLocale("en-us"); // "en-us" (已含地区后缀，不做大小写重写)
   *
   * // 重载 2: 提供 fallback → 未匹配或非法输入时回退
   * I18nUtil.toFullLocale("xx", "en-US"); // "en-US"
   * I18nUtil.toFullLocale(null, "en-US"); // "en-US"
   * I18nUtil.toFullLocale("en", "zh-CN"); // "en-US" (命中映射时忽略 fallback)
   *
   * // 重载 3: 可空输入无 fallback → 原样返回
   * I18nUtil.toFullLocale(null); // null
   * I18nUtil.toFullLocale(undefined); // undefined
   * ```
   */
  static toFullLocale<const T extends string> (locale: T, fallback?: undefined): ToFullLocale<T>;
  static toFullLocale (locale: string | null | undefined, fallback: string): string;
  static toFullLocale (locale: string | null | undefined, fallback?: string | undefined): string | null | undefined;
  static toFullLocale (locale: string | null | undefined, fallback?: string | undefined): string | null | undefined {
    if (!TypeUtil.isString(locale, true)) {
      return fallback !== undefined ? fallback : locale;
    }

    if (locale.includes("-")) {
      return locale;
    }

    const full = I18nUtil.BASE_TO_FULL[locale.toLowerCase()];

    return full ?? (fallback !== undefined ? fallback : locale);
  }

  /**
   * 获取展示名称（本地化名称，基于 `Intl.DisplayNames`，名称数据来自 CLDR）
   * - 输入形态决定缺省名称类型：2 字母大写 = 国家/地区代码（`CountryCode`）→ 地区名（如 `"US"` → `"美国"`）；其余（语言子标签 / 完整 Locale）→ 语言名（如 `"en"` → `"英语"`、`"en-US"` → 含语言与地区的名称，如「美国英语」）
   * - 展示语言缺省跟随运行环境（不传 `language` 时使用 `Intl.DisplayNames` 默认 locale），也可显式指定
   * - 未匹配输入（如 `"xx"`）：提供 `fallback` 时返回 `fallback`，否则原样返回输入
   * - 非法输入（`null` / `undefined` / 空白字符串）：提供 `fallback` 时返回 `fallback`，否则原样返回
   *
   * @param input 国家/地区代码（如 `"US"`）、语言子标签（如 `"en"`）或完整 Locale（如 `"en-US"`）
   * @param options 选项：展示语言 / 名称类型 / 回退值
   * @returns 本地化展示名称，或 `fallback`，或原输入
   * @example
   * ```ts
   * import { I18nUtil } from "@pawover/kit/utils";
   *
   * // 重载 1: 无选项 → 名称类型按输入形态推断，展示语言跟随运行环境
   * I18nUtil.toLocaleDisplayName("US"); // 运行环境为中文时 → "美国"
   * I18nUtil.toLocaleDisplayName("en"); // 运行环境为中文时 → "英语"
* I18nUtil.toLocaleDisplayName("en-US"); // 运行环境为中文时 → 含语言与地区的名称（如 "美国英语" / "英语（美国）"）
 *
 * // 重载 2: 提供选项
 * I18nUtil.toLocaleDisplayName("US", { language: "en" }); // "United States"
 * I18nUtil.toLocaleDisplayName("US", { language: "zh", type: "region" }); // "美国"
 * I18nUtil.toLocaleDisplayName("en", { type: "region" }); // "en" (未匹配，原样返回)
 * I18nUtil.toLocaleDisplayName("123", { fallback: "未知" }); // "未知"
   *
   * // 重载 3: 可空输入无 fallback → 原样返回
   * I18nUtil.toLocaleDisplayName(null); // null
   * I18nUtil.toLocaleDisplayName(undefined); // undefined
   * ```
   */
  static toLocaleDisplayName (input: string, options?: ToLocaleDisplayNameOptions): string;
  static toLocaleDisplayName (input: string | null | undefined, options?: ToLocaleDisplayNameOptions): string | null | undefined;
  static toLocaleDisplayName (input: string | null | undefined, options?: ToLocaleDisplayNameOptions): string | null | undefined {
    if (!TypeUtil.isString(input, true)) {
      return options?.fallback !== undefined ? options.fallback : input;
    }

    const type = options?.type ?? (/^[A-Z]{2}$/.test(input) ? "region" : "language");

    let name: string | undefined;
    try {
      name = new Intl.DisplayNames(options?.language, { type }).of(input);
    } catch {
      name = undefined;
    }

    return name ?? (options?.fallback !== undefined ? options.fallback : input);
  }

  /**
   * 提取语言子标签（去掉地区子标签）
   * - 按 `-` 切分并取首段：`"en-US"` → `"en"`，`"en"` → `"en"`
   * - 保留原始大小写，不做重写
   * - 非法输入（`null` / `undefined` / 空白字符串）：提供 `fallback` 时返回 `fallback`，否则原样返回
   *
   * @param locale 语言标签，可为完整 Locale（如 `"en-US"`）或语言子标签（如 `"en"`）
   * @param fallback 非法输入时的回退值，缺省时原样返回输入
   * @returns 语言子标签，或 `fallback`，或原输入
   * @example
   * ```ts
   * import { I18nUtil } from "@pawover/kit/utils";
   *
   * // 重载 1: 无 fallback → 字面量类型映射
   * I18nUtil.toBaseLanguage("en-US"); // "en" (类型为 "en")
   * I18nUtil.toBaseLanguage("en"); // "en" (类型为 "en")
   * I18nUtil.toBaseLanguage("zh-CN"); // "zh" (类型为 "zh")
   * I18nUtil.toBaseLanguage("EN-US"); // "EN" (保留原始大小写)
   * I18nUtil.toBaseLanguage("xx"); // "xx" (无地区后缀，原样返回)
   * I18nUtil.toBaseLanguage("xx-YY"); // "xx"
   *
   * // 重载 2: 提供 fallback → 非法输入时回退
   * I18nUtil.toBaseLanguage(null, "en"); // "en"
   * I18nUtil.toBaseLanguage("", "en"); // "en"
   * I18nUtil.toBaseLanguage("en-US", "zh"); // "en" (合法输入忽略 fallback)
   *
   * // 重载 3: 可空输入无 fallback → 原样返回
   * I18nUtil.toBaseLanguage(null); // null
   * I18nUtil.toBaseLanguage(undefined); // undefined
   * ```
   */
  static toBaseLanguage<const T extends string> (locale: T, fallback?: undefined): ToBaseLanguage<T>;
  static toBaseLanguage (locale: string | null | undefined, fallback: string): string;
  static toBaseLanguage (locale: string | null | undefined, fallback?: string | undefined): string | null | undefined;
  static toBaseLanguage (locale: string | null | undefined, fallback?: string | undefined): string | null | undefined {
    if (!TypeUtil.isString(locale, true)) {
      return fallback !== undefined ? fallback : locale;
    }

    const [base] = StringUtil.split(locale, "-");

    return base!;
  }
}