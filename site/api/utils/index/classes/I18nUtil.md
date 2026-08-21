[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / I18nUtil

# Class: I18nUtil

Defined in: [i18n/i18nUtil.ts:10](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/i18n/i18nUtil.ts#L10)

国际化（i18n）工具类
- 统一处理 BCP 47 语言标签（如 `"en"` / `"en-US"`）的规范化、拆分与展示名称查询
- `LOCALE_ENUM` 与 `PRIMARY_LANGUAGE_ENUM` 提供完整的 Locale / 主要代表语言枚举

## Constructors

### Constructor

> **new I18nUtil**(): `I18nUtil`

#### Returns

`I18nUtil`

## Properties

### LOCALE\_ENUM

> `readonly` `static` **LOCALE\_ENUM**: `object`

Defined in: [i18n/i18nUtil.ts:28](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/i18n/i18nUtil.ts#L28)

全部国家/地区的完整 Locale 枚举（BCP 47 格式）
- 键为 ISO 3166-1 alpha-2 国家/地区代码（共 248 项，南极洲 AQ 无常驻人口及官方语言故不收录），值为该国家/地区的地区收录语言的完整 Locale（`语言-地区` 规范形式）
- 按联合国 M.49 地理区域分组，组内按国家/地区代码字母序排列
- 用于 `Intl` API 的本地化格式化，其值覆盖 `PRIMARY_LANGUAGE_ENUM` 的映射范围

#### AD

> `readonly` **AD**: `"ca-AD"` = `"ca-AD"`

加泰罗尼亚语（安道尔）

#### AE

> `readonly` **AE**: `"ar-AE"` = `"ar-AE"`

阿拉伯语（阿联酋）

#### AF

> `readonly` **AF**: `"fa-AF"` = `"fa-AF"`

波斯语（阿富汗）

#### AG

> `readonly` **AG**: `"en-AG"` = `"en-AG"`

英语（安提瓜和巴布达）

#### AI

> `readonly` **AI**: `"en-AI"` = `"en-AI"`

英语（安圭拉）

#### AL

> `readonly` **AL**: `"sq-AL"` = `"sq-AL"`

阿尔巴尼亚语（阿尔巴尼亚）

#### AM

> `readonly` **AM**: `"hy-AM"` = `"hy-AM"`

亚美尼亚语（亚美尼亚）

#### AO

> `readonly` **AO**: `"pt-AO"` = `"pt-AO"`

葡萄牙语（安哥拉）

#### AR

> `readonly` **AR**: `"es-AR"` = `"es-AR"`

西班牙语（阿根廷）

#### AS

> `readonly` **AS**: `"en-AS"` = `"en-AS"`

英语（美属萨摩亚）

#### AT

> `readonly` **AT**: `"de-AT"` = `"de-AT"`

德语（奥地利）

#### AU

> `readonly` **AU**: `"en-AU"` = `"en-AU"`

英语（澳大利亚）

#### AW

> `readonly` **AW**: `"nl-AW"` = `"nl-AW"`

荷兰语（阿鲁巴）

#### AX

> `readonly` **AX**: `"sv-AX"` = `"sv-AX"`

瑞典语（奥兰群岛）

#### AZ

> `readonly` **AZ**: `"az-AZ"` = `"az-AZ"`

阿塞拜疆语（阿塞拜疆）

#### BA

> `readonly` **BA**: `"bs-BA"` = `"bs-BA"`

波斯尼亚语（波黑）

#### BB

> `readonly` **BB**: `"en-BB"` = `"en-BB"`

英语（巴巴多斯）

#### BD

> `readonly` **BD**: `"bn-BD"` = `"bn-BD"`

孟加拉语（孟加拉国）

#### BE

> `readonly` **BE**: `"nl-BE"` = `"nl-BE"`

荷兰语（比利时）

#### BF

> `readonly` **BF**: `"fr-BF"` = `"fr-BF"`

法语（布基纳法索）

#### BG

> `readonly` **BG**: `"bg-BG"` = `"bg-BG"`

保加利亚语（保加利亚）

#### BH

> `readonly` **BH**: `"ar-BH"` = `"ar-BH"`

阿拉伯语（巴林）

#### BI

> `readonly` **BI**: `"fr-BI"` = `"fr-BI"`

法语（布隆迪）

#### BJ

> `readonly` **BJ**: `"fr-BJ"` = `"fr-BJ"`

法语（贝宁）

#### BL

> `readonly` **BL**: `"fr-BL"` = `"fr-BL"`

法语（圣巴泰勒米）

#### BM

> `readonly` **BM**: `"en-BM"` = `"en-BM"`

英语（百慕大）

#### BN

> `readonly` **BN**: `"ms-BN"` = `"ms-BN"`

马来语（文莱）

#### BO

> `readonly` **BO**: `"es-BO"` = `"es-BO"`

西班牙语（玻利维亚）

#### BQ

> `readonly` **BQ**: `"nl-BQ"` = `"nl-BQ"`

荷兰语（荷属加勒比区）

#### BR

> `readonly` **BR**: `"pt-BR"` = `"pt-BR"`

葡萄牙语（巴西）

#### BS

> `readonly` **BS**: `"en-BS"` = `"en-BS"`

英语（巴哈马）

#### BT

> `readonly` **BT**: `"dz-BT"` = `"dz-BT"`

宗卡语（不丹）

#### BV

> `readonly` **BV**: `"no-BV"` = `"no-BV"`

挪威语（布韦岛）

#### BW

> `readonly` **BW**: `"en-BW"` = `"en-BW"`

英语（博茨瓦纳）

#### BY

> `readonly` **BY**: `"be-BY"` = `"be-BY"`

白俄罗斯语（白俄罗斯）

#### BZ

> `readonly` **BZ**: `"en-BZ"` = `"en-BZ"`

英语（伯利兹）

#### CA

> `readonly` **CA**: `"en-CA"` = `"en-CA"`

英语（加拿大）

#### CC

> `readonly` **CC**: `"en-CC"` = `"en-CC"`

英语（科科斯群岛）

#### CD

> `readonly` **CD**: `"fr-CD"` = `"fr-CD"`

法语（刚果民主共和国）

#### CF

> `readonly` **CF**: `"fr-CF"` = `"fr-CF"`

法语（中非共和国）

#### CG

> `readonly` **CG**: `"fr-CG"` = `"fr-CG"`

法语（刚果共和国）

#### CH

> `readonly` **CH**: `"de-CH"` = `"de-CH"`

德语（瑞士）

#### CI

> `readonly` **CI**: `"fr-CI"` = `"fr-CI"`

法语（科特迪瓦）

#### CK

> `readonly` **CK**: `"en-CK"` = `"en-CK"`

英语（库克群岛）

#### CL

> `readonly` **CL**: `"es-CL"` = `"es-CL"`

西班牙语（智利）

#### CM

> `readonly` **CM**: `"fr-CM"` = `"fr-CM"`

法语（喀麦隆）

#### CN

> `readonly` **CN**: `"zh-CN"` = `"zh-CN"`

简体中文（中国）

#### CO

> `readonly` **CO**: `"es-CO"` = `"es-CO"`

西班牙语（哥伦比亚）

#### CR

> `readonly` **CR**: `"es-CR"` = `"es-CR"`

西班牙语（哥斯达黎加）

#### CU

> `readonly` **CU**: `"es-CU"` = `"es-CU"`

西班牙语（古巴）

#### CV

> `readonly` **CV**: `"pt-CV"` = `"pt-CV"`

葡萄牙语（佛得角）

#### CW

> `readonly` **CW**: `"nl-CW"` = `"nl-CW"`

荷兰语（库拉索）

#### CX

> `readonly` **CX**: `"en-CX"` = `"en-CX"`

英语（圣诞岛）

#### CY

> `readonly` **CY**: `"el-CY"` = `"el-CY"`

希腊语（塞浦路斯）

#### CZ

> `readonly` **CZ**: `"cs-CZ"` = `"cs-CZ"`

捷克语（捷克）

#### DE

> `readonly` **DE**: `"de-DE"` = `"de-DE"`

德语（德国）

#### DJ

> `readonly` **DJ**: `"fr-DJ"` = `"fr-DJ"`

法语（吉布提）

#### DK

> `readonly` **DK**: `"da-DK"` = `"da-DK"`

丹麦语（丹麦）

#### DM

> `readonly` **DM**: `"en-DM"` = `"en-DM"`

英语（多米尼克）

#### DO

> `readonly` **DO**: `"es-DO"` = `"es-DO"`

西班牙语（多米尼加）

#### DZ

> `readonly` **DZ**: `"ar-DZ"` = `"ar-DZ"`

阿拉伯语（阿尔及利亚）

#### EC

> `readonly` **EC**: `"es-EC"` = `"es-EC"`

西班牙语（厄瓜多尔）

#### EE

> `readonly` **EE**: `"et-EE"` = `"et-EE"`

爱沙尼亚语（爱沙尼亚）

#### EG

> `readonly` **EG**: `"ar-EG"` = `"ar-EG"`

阿拉伯语（埃及）

#### EH

> `readonly` **EH**: `"ar-EH"` = `"ar-EH"`

阿拉伯语（西撒哈拉）

#### ER

> `readonly` **ER**: `"ti-ER"` = `"ti-ER"`

提格里尼亚语（厄立特里亚）

#### ES

> `readonly` **ES**: `"es-ES"` = `"es-ES"`

西班牙语（西班牙）

#### ET

> `readonly` **ET**: `"am-ET"` = `"am-ET"`

阿姆哈拉语（埃塞俄比亚）

#### FI

> `readonly` **FI**: `"fi-FI"` = `"fi-FI"`

芬兰语（芬兰）

#### FJ

> `readonly` **FJ**: `"en-FJ"` = `"en-FJ"`

英语（斐济）

#### FK

> `readonly` **FK**: `"en-FK"` = `"en-FK"`

英语（福克兰群岛）

#### FM

> `readonly` **FM**: `"en-FM"` = `"en-FM"`

英语（密克罗尼西亚联邦）

#### FO

> `readonly` **FO**: `"fo-FO"` = `"fo-FO"`

法罗语（法罗群岛）

#### FR

> `readonly` **FR**: `"fr-FR"` = `"fr-FR"`

法语（法国）

#### GA

> `readonly` **GA**: `"fr-GA"` = `"fr-GA"`

法语（加蓬）

#### GB

> `readonly` **GB**: `"en-GB"` = `"en-GB"`

英语（英国）

#### GD

> `readonly` **GD**: `"en-GD"` = `"en-GD"`

英语（格林纳达）

#### GE

> `readonly` **GE**: `"ka-GE"` = `"ka-GE"`

格鲁吉亚语（格鲁吉亚）

#### GF

> `readonly` **GF**: `"fr-GF"` = `"fr-GF"`

法语（法属圭亚那）

#### GG

> `readonly` **GG**: `"en-GG"` = `"en-GG"`

英语（根西岛）

#### GH

> `readonly` **GH**: `"en-GH"` = `"en-GH"`

英语（加纳）

#### GI

> `readonly` **GI**: `"en-GI"` = `"en-GI"`

英语（直布罗陀）

#### GL

> `readonly` **GL**: `"kl-GL"` = `"kl-GL"`

格陵兰语（格陵兰）

#### GM

> `readonly` **GM**: `"en-GM"` = `"en-GM"`

英语（冈比亚）

#### GN

> `readonly` **GN**: `"fr-GN"` = `"fr-GN"`

法语（几内亚）

#### GP

> `readonly` **GP**: `"fr-GP"` = `"fr-GP"`

法语（瓜德罗普）

#### GQ

> `readonly` **GQ**: `"es-GQ"` = `"es-GQ"`

西班牙语（赤道几内亚）

#### GR

> `readonly` **GR**: `"el-GR"` = `"el-GR"`

希腊语（希腊）

#### GS

> `readonly` **GS**: `"en-GS"` = `"en-GS"`

英语（南乔治亚和南桑威奇群岛）

#### GT

> `readonly` **GT**: `"es-GT"` = `"es-GT"`

西班牙语（危地马拉）

#### GU

> `readonly` **GU**: `"en-GU"` = `"en-GU"`

英语（关岛）

#### GW

> `readonly` **GW**: `"pt-GW"` = `"pt-GW"`

葡萄牙语（几内亚比绍）

#### GY

> `readonly` **GY**: `"en-GY"` = `"en-GY"`

英语（圭亚那）

#### HK

> `readonly` **HK**: `"zh-HK"` = `"zh-HK"`

繁体中文（中国香港）

#### HM

> `readonly` **HM**: `"en-HM"` = `"en-HM"`

英语（赫德岛和麦克唐纳群岛）

#### HN

> `readonly` **HN**: `"es-HN"` = `"es-HN"`

西班牙语（洪都拉斯）

#### HR

> `readonly` **HR**: `"hr-HR"` = `"hr-HR"`

克罗地亚语（克罗地亚）

#### HT

> `readonly` **HT**: `"fr-HT"` = `"fr-HT"`

法语（海地）

#### HU

> `readonly` **HU**: `"hu-HU"` = `"hu-HU"`

匈牙利语（匈牙利）

#### ID

> `readonly` **ID**: `"id-ID"` = `"id-ID"`

印度尼西亚语（印度尼西亚）

#### IE

> `readonly` **IE**: `"en-IE"` = `"en-IE"`

英语（爱尔兰）

#### IL

> `readonly` **IL**: `"he-IL"` = `"he-IL"`

希伯来语（以色列）

#### IM

> `readonly` **IM**: `"en-IM"` = `"en-IM"`

英语（马恩岛）

#### IN

> `readonly` **IN**: `"hi-IN"` = `"hi-IN"`

印地语（印度）

#### IO

> `readonly` **IO**: `"en-IO"` = `"en-IO"`

英语（英属印度洋领地）

#### IQ

> `readonly` **IQ**: `"ar-IQ"` = `"ar-IQ"`

阿拉伯语（伊拉克）

#### IR

> `readonly` **IR**: `"fa-IR"` = `"fa-IR"`

波斯语（伊朗）

#### IS

> `readonly` **IS**: `"is-IS"` = `"is-IS"`

冰岛语（冰岛）

#### IT

> `readonly` **IT**: `"it-IT"` = `"it-IT"`

意大利语（意大利）

#### JE

> `readonly` **JE**: `"en-JE"` = `"en-JE"`

英语（泽西岛）

#### JM

> `readonly` **JM**: `"en-JM"` = `"en-JM"`

英语（牙买加）

#### JO

> `readonly` **JO**: `"ar-JO"` = `"ar-JO"`

阿拉伯语（约旦）

#### JP

> `readonly` **JP**: `"ja-JP"` = `"ja-JP"`

日语（日本）

#### KE

> `readonly` **KE**: `"en-KE"` = `"en-KE"`

英语（肯尼亚）

#### KG

> `readonly` **KG**: `"ky-KG"` = `"ky-KG"`

吉尔吉斯语（吉尔吉斯斯坦）

#### KH

> `readonly` **KH**: `"km-KH"` = `"km-KH"`

高棉语（柬埔寨）

#### KI

> `readonly` **KI**: `"en-KI"` = `"en-KI"`

英语（基里巴斯）

#### KM

> `readonly` **KM**: `"ar-KM"` = `"ar-KM"`

阿拉伯语（科摩罗）

#### KN

> `readonly` **KN**: `"en-KN"` = `"en-KN"`

英语（圣基茨和尼维斯）

#### KP

> `readonly` **KP**: `"ko-KP"` = `"ko-KP"`

朝鲜语（朝鲜）

#### KR

> `readonly` **KR**: `"ko-KR"` = `"ko-KR"`

韩语（韩国）

#### KW

> `readonly` **KW**: `"ar-KW"` = `"ar-KW"`

阿拉伯语（科威特）

#### KY

> `readonly` **KY**: `"en-KY"` = `"en-KY"`

英语（开曼群岛）

#### KZ

> `readonly` **KZ**: `"kk-KZ"` = `"kk-KZ"`

哈萨克语（哈萨克斯坦）

#### LA

> `readonly` **LA**: `"lo-LA"` = `"lo-LA"`

老挝语（老挝）

#### LB

> `readonly` **LB**: `"ar-LB"` = `"ar-LB"`

阿拉伯语（黎巴嫩）

#### LC

> `readonly` **LC**: `"en-LC"` = `"en-LC"`

英语（圣卢西亚）

#### LI

> `readonly` **LI**: `"de-LI"` = `"de-LI"`

德语（列支敦士登）

#### LK

> `readonly` **LK**: `"si-LK"` = `"si-LK"`

僧伽罗语（斯里兰卡）

#### LR

> `readonly` **LR**: `"en-LR"` = `"en-LR"`

英语（利比里亚）

#### LS

> `readonly` **LS**: `"en-LS"` = `"en-LS"`

英语（莱索托）

#### LT

> `readonly` **LT**: `"lt-LT"` = `"lt-LT"`

立陶宛语（立陶宛）

#### LU

> `readonly` **LU**: `"fr-LU"` = `"fr-LU"`

法语（卢森堡）

#### LV

> `readonly` **LV**: `"lv-LV"` = `"lv-LV"`

拉脱维亚语（拉脱维亚）

#### LY

> `readonly` **LY**: `"ar-LY"` = `"ar-LY"`

阿拉伯语（利比亚）

#### MA

> `readonly` **MA**: `"ar-MA"` = `"ar-MA"`

阿拉伯语（摩洛哥）

#### MC

> `readonly` **MC**: `"fr-MC"` = `"fr-MC"`

法语（摩纳哥）

#### MD

> `readonly` **MD**: `"ro-MD"` = `"ro-MD"`

罗马尼亚语（摩尔多瓦）

#### ME

> `readonly` **ME**: `"sr-ME"` = `"sr-ME"`

塞尔维亚语（黑山）

#### MF

> `readonly` **MF**: `"fr-MF"` = `"fr-MF"`

法语（法属圣马丁）

#### MG

> `readonly` **MG**: `"mg-MG"` = `"mg-MG"`

马达加斯加语（马达加斯加）

#### MH

> `readonly` **MH**: `"en-MH"` = `"en-MH"`

英语（马绍尔群岛）

#### MK

> `readonly` **MK**: `"mk-MK"` = `"mk-MK"`

马其顿语（北马其顿）

#### ML

> `readonly` **ML**: `"fr-ML"` = `"fr-ML"`

法语（马里）

#### MM

> `readonly` **MM**: `"my-MM"` = `"my-MM"`

缅甸语（缅甸）

#### MN

> `readonly` **MN**: `"mn-MN"` = `"mn-MN"`

蒙古语（蒙古）

#### MO

> `readonly` **MO**: `"zh-MO"` = `"zh-MO"`

繁体中文（中国澳门）

#### MP

> `readonly` **MP**: `"en-MP"` = `"en-MP"`

英语（北马里亚纳群岛）

#### MQ

> `readonly` **MQ**: `"fr-MQ"` = `"fr-MQ"`

法语（马提尼克）

#### MR

> `readonly` **MR**: `"ar-MR"` = `"ar-MR"`

阿拉伯语（毛里塔尼亚）

#### MS

> `readonly` **MS**: `"en-MS"` = `"en-MS"`

英语（蒙特塞拉特）

#### MT

> `readonly` **MT**: `"mt-MT"` = `"mt-MT"`

马耳他语（马耳他）

#### MU

> `readonly` **MU**: `"en-MU"` = `"en-MU"`

英语（毛里求斯）

#### MV

> `readonly` **MV**: `"dv-MV"` = `"dv-MV"`

迪维希语（马尔代夫）

#### MW

> `readonly` **MW**: `"en-MW"` = `"en-MW"`

英语（马拉维）

#### MX

> `readonly` **MX**: `"es-MX"` = `"es-MX"`

西班牙语（墨西哥）

#### MY

> `readonly` **MY**: `"ms-MY"` = `"ms-MY"`

马来语（马来西亚）

#### MZ

> `readonly` **MZ**: `"pt-MZ"` = `"pt-MZ"`

葡萄牙语（莫桑比克）

#### NA

> `readonly` **NA**: `"en-NA"` = `"en-NA"`

英语（纳米比亚）

#### NC

> `readonly` **NC**: `"fr-NC"` = `"fr-NC"`

法语（新喀里多尼亚）

#### NE

> `readonly` **NE**: `"fr-NE"` = `"fr-NE"`

法语（尼日尔）

#### NF

> `readonly` **NF**: `"en-NF"` = `"en-NF"`

英语（诺福克岛）

#### NG

> `readonly` **NG**: `"en-NG"` = `"en-NG"`

英语（尼日利亚）

#### NI

> `readonly` **NI**: `"es-NI"` = `"es-NI"`

西班牙语（尼加拉瓜）

#### NL

> `readonly` **NL**: `"nl-NL"` = `"nl-NL"`

荷兰语（荷兰）

#### NO

> `readonly` **NO**: `"no-NO"` = `"no-NO"`

挪威语（挪威）

#### NP

> `readonly` **NP**: `"ne-NP"` = `"ne-NP"`

尼泊尔语（尼泊尔）

#### NR

> `readonly` **NR**: `"en-NR"` = `"en-NR"`

英语（瑙鲁）

#### NU

> `readonly` **NU**: `"en-NU"` = `"en-NU"`

英语（纽埃）

#### NZ

> `readonly` **NZ**: `"en-NZ"` = `"en-NZ"`

英语（新西兰）

#### OM

> `readonly` **OM**: `"ar-OM"` = `"ar-OM"`

阿拉伯语（阿曼）

#### PA

> `readonly` **PA**: `"es-PA"` = `"es-PA"`

西班牙语（巴拿马）

#### PE

> `readonly` **PE**: `"es-PE"` = `"es-PE"`

西班牙语（秘鲁）

#### PF

> `readonly` **PF**: `"fr-PF"` = `"fr-PF"`

法语（法属波利尼西亚）

#### PG

> `readonly` **PG**: `"en-PG"` = `"en-PG"`

英语（巴布亚新几内亚）

#### PH

> `readonly` **PH**: `"en-PH"` = `"en-PH"`

英语（菲律宾）

#### PK

> `readonly` **PK**: `"ur-PK"` = `"ur-PK"`

乌尔都语（巴基斯坦）

#### PL

> `readonly` **PL**: `"pl-PL"` = `"pl-PL"`

波兰语（波兰）

#### PM

> `readonly` **PM**: `"fr-PM"` = `"fr-PM"`

法语（圣皮埃尔和密克隆）

#### PN

> `readonly` **PN**: `"en-PN"` = `"en-PN"`

英语（皮特凯恩群岛）

#### PR

> `readonly` **PR**: `"es-PR"` = `"es-PR"`

西班牙语（波多黎各）

#### PS

> `readonly` **PS**: `"ar-PS"` = `"ar-PS"`

阿拉伯语（巴勒斯坦）

#### PT

> `readonly` **PT**: `"pt-PT"` = `"pt-PT"`

葡萄牙语（葡萄牙）

#### PW

> `readonly` **PW**: `"en-PW"` = `"en-PW"`

英语（帕劳）

#### PY

> `readonly` **PY**: `"es-PY"` = `"es-PY"`

西班牙语（巴拉圭）

#### QA

> `readonly` **QA**: `"ar-QA"` = `"ar-QA"`

阿拉伯语（卡塔尔）

#### RE

> `readonly` **RE**: `"fr-RE"` = `"fr-RE"`

法语（留尼汪）

#### RO

> `readonly` **RO**: `"ro-RO"` = `"ro-RO"`

罗马尼亚语（罗马尼亚）

#### RS

> `readonly` **RS**: `"sr-RS"` = `"sr-RS"`

塞尔维亚语（塞尔维亚）

#### RU

> `readonly` **RU**: `"ru-RU"` = `"ru-RU"`

俄语（俄罗斯）

#### RW

> `readonly` **RW**: `"rw-RW"` = `"rw-RW"`

基尼亚卢旺达语（卢旺达）

#### SA

> `readonly` **SA**: `"ar-SA"` = `"ar-SA"`

阿拉伯语（沙特阿拉伯）

#### SB

> `readonly` **SB**: `"en-SB"` = `"en-SB"`

英语（所罗门群岛）

#### SC

> `readonly` **SC**: `"fr-SC"` = `"fr-SC"`

法语（塞舌尔）

#### SD

> `readonly` **SD**: `"ar-SD"` = `"ar-SD"`

阿拉伯语（苏丹）

#### SE

> `readonly` **SE**: `"sv-SE"` = `"sv-SE"`

瑞典语（瑞典）

#### SG

> `readonly` **SG**: `"en-SG"` = `"en-SG"`

英语（新加坡）

#### SH

> `readonly` **SH**: `"en-SH"` = `"en-SH"`

英语（圣赫勒拿）

#### SI

> `readonly` **SI**: `"sl-SI"` = `"sl-SI"`

斯洛文尼亚语（斯洛文尼亚）

#### SJ

> `readonly` **SJ**: `"no-SJ"` = `"no-SJ"`

挪威语（斯瓦尔巴和扬马延）

#### SK

> `readonly` **SK**: `"sk-SK"` = `"sk-SK"`

斯洛伐克语（斯洛伐克）

#### SL

> `readonly` **SL**: `"en-SL"` = `"en-SL"`

英语（塞拉利昂）

#### SM

> `readonly` **SM**: `"it-SM"` = `"it-SM"`

意大利语（圣马力诺）

#### SN

> `readonly` **SN**: `"fr-SN"` = `"fr-SN"`

法语（塞内加尔）

#### SO

> `readonly` **SO**: `"so-SO"` = `"so-SO"`

索马里语（索马里）

#### SR

> `readonly` **SR**: `"nl-SR"` = `"nl-SR"`

荷兰语（苏里南）

#### SS

> `readonly` **SS**: `"en-SS"` = `"en-SS"`

英语（南苏丹）

#### ST

> `readonly` **ST**: `"pt-ST"` = `"pt-ST"`

葡萄牙语（圣多美和普林西比）

#### SV

> `readonly` **SV**: `"es-SV"` = `"es-SV"`

西班牙语（萨尔瓦多）

#### SX

> `readonly` **SX**: `"nl-SX"` = `"nl-SX"`

荷兰语（荷属圣马丁）

#### SY

> `readonly` **SY**: `"ar-SY"` = `"ar-SY"`

阿拉伯语（叙利亚）

#### SZ

> `readonly` **SZ**: `"en-SZ"` = `"en-SZ"`

英语（斯威士兰）

#### TC

> `readonly` **TC**: `"en-TC"` = `"en-TC"`

英语（特克斯和凯科斯群岛）

#### TD

> `readonly` **TD**: `"fr-TD"` = `"fr-TD"`

法语（乍得）

#### TF

> `readonly` **TF**: `"fr-TF"` = `"fr-TF"`

法语（法属南部领地）

#### TG

> `readonly` **TG**: `"fr-TG"` = `"fr-TG"`

法语（多哥）

#### TH

> `readonly` **TH**: `"th-TH"` = `"th-TH"`

泰语（泰国）

#### TJ

> `readonly` **TJ**: `"tg-TJ"` = `"tg-TJ"`

塔吉克语（塔吉克斯坦）

#### TK

> `readonly` **TK**: `"en-TK"` = `"en-TK"`

英语（托克劳）

#### TL

> `readonly` **TL**: `"pt-TL"` = `"pt-TL"`

葡萄牙语（东帝汶）

#### TM

> `readonly` **TM**: `"tk-TM"` = `"tk-TM"`

土库曼语（土库曼斯坦）

#### TN

> `readonly` **TN**: `"ar-TN"` = `"ar-TN"`

阿拉伯语（突尼斯）

#### TO

> `readonly` **TO**: `"to-TO"` = `"to-TO"`

汤加语（汤加）

#### TR

> `readonly` **TR**: `"tr-TR"` = `"tr-TR"`

土耳其语（土耳其）

#### TT

> `readonly` **TT**: `"en-TT"` = `"en-TT"`

英语（特立尼达和多巴哥）

#### TV

> `readonly` **TV**: `"en-TV"` = `"en-TV"`

英语（图瓦卢）

#### TW

> `readonly` **TW**: `"zh-TW"` = `"zh-TW"`

繁体中文（中国台湾地区）

#### TZ

> `readonly` **TZ**: `"sw-TZ"` = `"sw-TZ"`

斯瓦希里语（坦桑尼亚）

#### UA

> `readonly` **UA**: `"uk-UA"` = `"uk-UA"`

乌克兰语（乌克兰）

#### UG

> `readonly` **UG**: `"en-UG"` = `"en-UG"`

英语（乌干达）

#### UM

> `readonly` **UM**: `"en-UM"` = `"en-UM"`

英语（美国本土外小岛屿）

#### US

> `readonly` **US**: `"en-US"` = `"en-US"`

英语（美国）

#### UY

> `readonly` **UY**: `"es-UY"` = `"es-UY"`

西班牙语（乌拉圭）

#### UZ

> `readonly` **UZ**: `"uz-UZ"` = `"uz-UZ"`

乌兹别克语（乌兹别克斯坦）

#### VA

> `readonly` **VA**: `"it-VA"` = `"it-VA"`

意大利语（梵蒂冈）

#### VC

> `readonly` **VC**: `"en-VC"` = `"en-VC"`

英语（圣文森特和格林纳丁斯）

#### VE

> `readonly` **VE**: `"es-VE"` = `"es-VE"`

西班牙语（委内瑞拉）

#### VG

> `readonly` **VG**: `"en-VG"` = `"en-VG"`

英语（英属维尔京群岛）

#### VI

> `readonly` **VI**: `"en-VI"` = `"en-VI"`

英语（美属维尔京群岛）

#### VN

> `readonly` **VN**: `"vi-VN"` = `"vi-VN"`

越南语（越南）

#### VU

> `readonly` **VU**: `"bi-VU"` = `"bi-VU"`

比斯拉马语（瓦努阿图）

#### WF

> `readonly` **WF**: `"fr-WF"` = `"fr-WF"`

法语（瓦利斯和富图纳）

#### WS

> `readonly` **WS**: `"sm-WS"` = `"sm-WS"`

萨摩亚语（萨摩亚）

#### YE

> `readonly` **YE**: `"ar-YE"` = `"ar-YE"`

阿拉伯语（也门）

#### YT

> `readonly` **YT**: `"fr-YT"` = `"fr-YT"`

法语（马约特）

#### ZA

> `readonly` **ZA**: `"en-ZA"` = `"en-ZA"`

英语（南非）

#### ZM

> `readonly` **ZM**: `"en-ZM"` = `"en-ZM"`

英语（赞比亚）

#### ZW

> `readonly` **ZW**: `"en-ZW"` = `"en-ZW"`

英语（津巴布韦）

#### Example

```ts
import { I18nUtil } from "@pawover/kit/utils";

I18nUtil.LOCALE_ENUM.US; // "en-US"
I18nUtil.LOCALE_ENUM.CN; // "zh-CN"

// 结合 Intl.NumberFormat 使用
new Intl.NumberFormat(I18nUtil.LOCALE_ENUM.US).format(1234.56); // "1,234.56"
```

***

### PRIMARY\_LANGUAGE\_ENUM

> `readonly` `static` **PRIMARY\_LANGUAGE\_ENUM**: `object`

Defined in: [i18n/i18nUtil.ts:556](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/i18n/i18nUtil.ts#L556)

主要代表语言枚举：语言子标签（小写）→ 代表地区的完整 Locale（BCP 47 格式）
- 覆盖 `LOCALE_ENUM` 出现的全部 74 种语言，值为各语言的代表国家/地区完整 Locale
- 作为 `toFullLocale` 的规范化映射源：输入语言子标签时按此表映射（大小写不敏感）
- 键为 ISO 639-1 语言代码（唯一例外：比斯拉马语 `bi` 无 639-1 码，采用 ISO 639-2/3）

#### am

> `readonly` **am**: `"am-ET"` = `"am-ET"`

阿姆哈拉语（埃塞俄比亚）

#### ar

> `readonly` **ar**: `"ar-SA"` = `"ar-SA"`

阿拉伯语（沙特阿拉伯）

#### az

> `readonly` **az**: `"az-AZ"` = `"az-AZ"`

阿塞拜疆语（阿塞拜疆）

#### be

> `readonly` **be**: `"be-BY"` = `"be-BY"`

白俄罗斯语（白俄罗斯）

#### bg

> `readonly` **bg**: `"bg-BG"` = `"bg-BG"`

保加利亚语（保加利亚）

#### bi

> `readonly` **bi**: `"bi-VU"` = `"bi-VU"`

比斯拉马语（瓦努阿图）

#### bn

> `readonly` **bn**: `"bn-BD"` = `"bn-BD"`

孟加拉语（孟加拉国）

#### bs

> `readonly` **bs**: `"bs-BA"` = `"bs-BA"`

波斯尼亚语（波黑）

#### ca

> `readonly` **ca**: `"ca-ES"` = `"ca-ES"`

加泰罗尼亚语（西班牙）

#### cs

> `readonly` **cs**: `"cs-CZ"` = `"cs-CZ"`

捷克语（捷克）

#### da

> `readonly` **da**: `"da-DK"` = `"da-DK"`

丹麦语（丹麦）

#### de

> `readonly` **de**: `"de-DE"` = `"de-DE"`

德语（德国）

#### dv

> `readonly` **dv**: `"dv-MV"` = `"dv-MV"`

迪维希语（马尔代夫）

#### dz

> `readonly` **dz**: `"dz-BT"` = `"dz-BT"`

宗卡语（不丹）

#### el

> `readonly` **el**: `"el-GR"` = `"el-GR"`

希腊语（希腊）

#### en

> `readonly` **en**: `"en-US"` = `"en-US"`

英语（美国）

#### es

> `readonly` **es**: `"es-ES"` = `"es-ES"`

西班牙语（西班牙）

#### et

> `readonly` **et**: `"et-EE"` = `"et-EE"`

爱沙尼亚语（爱沙尼亚）

#### fa

> `readonly` **fa**: `"fa-IR"` = `"fa-IR"`

波斯语（伊朗）

#### fi

> `readonly` **fi**: `"fi-FI"` = `"fi-FI"`

芬兰语（芬兰）

#### fo

> `readonly` **fo**: `"fo-FO"` = `"fo-FO"`

法罗语（法罗群岛）

#### fr

> `readonly` **fr**: `"fr-FR"` = `"fr-FR"`

法语（法国）

#### he

> `readonly` **he**: `"he-IL"` = `"he-IL"`

希伯来语（以色列）

#### hi

> `readonly` **hi**: `"hi-IN"` = `"hi-IN"`

印地语（印度）

#### hr

> `readonly` **hr**: `"hr-HR"` = `"hr-HR"`

克罗地亚语（克罗地亚）

#### hu

> `readonly` **hu**: `"hu-HU"` = `"hu-HU"`

匈牙利语（匈牙利）

#### hy

> `readonly` **hy**: `"hy-AM"` = `"hy-AM"`

亚美尼亚语（亚美尼亚）

#### id

> `readonly` **id**: `"id-ID"` = `"id-ID"`

印度尼西亚语（印度尼西亚）

#### is

> `readonly` **is**: `"is-IS"` = `"is-IS"`

冰岛语（冰岛）

#### it

> `readonly` **it**: `"it-IT"` = `"it-IT"`

意大利语（意大利）

#### ja

> `readonly` **ja**: `"ja-JP"` = `"ja-JP"`

日语（日本）

#### ka

> `readonly` **ka**: `"ka-GE"` = `"ka-GE"`

格鲁吉亚语（格鲁吉亚）

#### kk

> `readonly` **kk**: `"kk-KZ"` = `"kk-KZ"`

哈萨克语（哈萨克斯坦）

#### kl

> `readonly` **kl**: `"kl-GL"` = `"kl-GL"`

格陵兰语（格陵兰）

#### km

> `readonly` **km**: `"km-KH"` = `"km-KH"`

高棉语（柬埔寨）

#### ko

> `readonly` **ko**: `"ko-KR"` = `"ko-KR"`

韩语（韩国）

#### ky

> `readonly` **ky**: `"ky-KG"` = `"ky-KG"`

吉尔吉斯语（吉尔吉斯斯坦）

#### lo

> `readonly` **lo**: `"lo-LA"` = `"lo-LA"`

老挝语（老挝）

#### lt

> `readonly` **lt**: `"lt-LT"` = `"lt-LT"`

立陶宛语（立陶宛）

#### lv

> `readonly` **lv**: `"lv-LV"` = `"lv-LV"`

拉脱维亚语（拉脱维亚）

#### mg

> `readonly` **mg**: `"mg-MG"` = `"mg-MG"`

马达加斯加语（马达加斯加）

#### mk

> `readonly` **mk**: `"mk-MK"` = `"mk-MK"`

马其顿语（北马其顿）

#### mn

> `readonly` **mn**: `"mn-MN"` = `"mn-MN"`

蒙古语（蒙古）

#### ms

> `readonly` **ms**: `"ms-MY"` = `"ms-MY"`

马来语（马来西亚）

#### mt

> `readonly` **mt**: `"mt-MT"` = `"mt-MT"`

马耳他语（马耳他）

#### my

> `readonly` **my**: `"my-MM"` = `"my-MM"`

缅甸语（缅甸）

#### ne

> `readonly` **ne**: `"ne-NP"` = `"ne-NP"`

尼泊尔语（尼泊尔）

#### nl

> `readonly` **nl**: `"nl-NL"` = `"nl-NL"`

荷兰语（荷兰）

#### no

> `readonly` **no**: `"no-NO"` = `"no-NO"`

挪威语（挪威）

#### pl

> `readonly` **pl**: `"pl-PL"` = `"pl-PL"`

波兰语（波兰）

#### pt

> `readonly` **pt**: `"pt-BR"` = `"pt-BR"`

葡萄牙语（巴西）

#### ro

> `readonly` **ro**: `"ro-RO"` = `"ro-RO"`

罗马尼亚语（罗马尼亚）

#### ru

> `readonly` **ru**: `"ru-RU"` = `"ru-RU"`

俄语（俄罗斯）

#### rw

> `readonly` **rw**: `"rw-RW"` = `"rw-RW"`

基尼亚卢旺达语（卢旺达）

#### si

> `readonly` **si**: `"si-LK"` = `"si-LK"`

僧伽罗语（斯里兰卡）

#### sk

> `readonly` **sk**: `"sk-SK"` = `"sk-SK"`

斯洛伐克语（斯洛伐克）

#### sl

> `readonly` **sl**: `"sl-SI"` = `"sl-SI"`

斯洛文尼亚语（斯洛文尼亚）

#### sm

> `readonly` **sm**: `"sm-WS"` = `"sm-WS"`

萨摩亚语（萨摩亚）

#### so

> `readonly` **so**: `"so-SO"` = `"so-SO"`

索马里语（索马里）

#### sq

> `readonly` **sq**: `"sq-AL"` = `"sq-AL"`

阿尔巴尼亚语（阿尔巴尼亚）

#### sr

> `readonly` **sr**: `"sr-RS"` = `"sr-RS"`

塞尔维亚语（塞尔维亚）

#### sv

> `readonly` **sv**: `"sv-SE"` = `"sv-SE"`

瑞典语（瑞典）

#### sw

> `readonly` **sw**: `"sw-TZ"` = `"sw-TZ"`

斯瓦希里语（坦桑尼亚）

#### tg

> `readonly` **tg**: `"tg-TJ"` = `"tg-TJ"`

塔吉克语（塔吉克斯坦）

#### th

> `readonly` **th**: `"th-TH"` = `"th-TH"`

泰语（泰国）

#### ti

> `readonly` **ti**: `"ti-ER"` = `"ti-ER"`

提格里尼亚语（厄立特里亚）

#### tk

> `readonly` **tk**: `"tk-TM"` = `"tk-TM"`

土库曼语（土库曼斯坦）

#### to

> `readonly` **to**: `"to-TO"` = `"to-TO"`

汤加语（汤加）

#### tr

> `readonly` **tr**: `"tr-TR"` = `"tr-TR"`

土耳其语（土耳其）

#### uk

> `readonly` **uk**: `"uk-UA"` = `"uk-UA"`

乌克兰语（乌克兰）

#### ur

> `readonly` **ur**: `"ur-PK"` = `"ur-PK"`

乌尔都语（巴基斯坦）

#### uz

> `readonly` **uz**: `"uz-UZ"` = `"uz-UZ"`

乌兹别克语（乌兹别克斯坦）

#### vi

> `readonly` **vi**: `"vi-VN"` = `"vi-VN"`

越南语（越南）

#### zh

> `readonly` **zh**: `"zh-CN"` = `"zh-CN"`

简体中文（中国）

#### Example

```ts
import { I18nUtil } from "@pawover/kit/utils";

I18nUtil.PRIMARY_LANGUAGE_ENUM.en; // "en-US"
I18nUtil.PRIMARY_LANGUAGE_ENUM.zh; // "zh-CN"
I18nUtil.PRIMARY_LANGUAGE_ENUM.ti; // "ti-ER"

// 结合 Intl.DateTimeFormat 使用
new Intl.DateTimeFormat(I18nUtil.PRIMARY_LANGUAGE_ENUM.de).format(new Date());
```

## Methods

### toBaseLanguage()

#### Call Signature

> `static` **toBaseLanguage**\<`T`\>(`locale`, `fallback?`): [`ToBaseLanguage`](../type-aliases/ToBaseLanguage.md)\<`T`\>

Defined in: [i18n/i18nUtil.ts:839](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/i18n/i18nUtil.ts#L839)

提取语言子标签（去掉地区子标签）
- 按 `-` 切分并取首段：`"en-US"` → `"en"`，`"en"` → `"en"`
- 保留原始大小写，不做重写
- 非法输入（`null` / `undefined` / 空白字符串）：提供 `fallback` 时返回 `fallback`，否则原样返回

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### locale

`T`

语言标签，可为完整 Locale（如 `"en-US"`）或语言子标签（如 `"en"`）

###### fallback?

`undefined`

非法输入时的回退值，缺省时原样返回输入

##### Returns

[`ToBaseLanguage`](../type-aliases/ToBaseLanguage.md)\<`T`\>

语言子标签，或 `fallback`，或原输入

##### Example

```ts
import { I18nUtil } from "@pawover/kit/utils";

// 重载 1: 无 fallback → 字面量类型映射
I18nUtil.toBaseLanguage("en-US"); // "en" (类型为 "en")
I18nUtil.toBaseLanguage("en"); // "en" (类型为 "en")
I18nUtil.toBaseLanguage("zh-CN"); // "zh" (类型为 "zh")
I18nUtil.toBaseLanguage("EN-US"); // "EN" (保留原始大小写)
I18nUtil.toBaseLanguage("xx"); // "xx" (无地区后缀，原样返回)
I18nUtil.toBaseLanguage("xx-YY"); // "xx"

// 重载 2: 提供 fallback → 非法输入时回退
I18nUtil.toBaseLanguage(null, "en"); // "en"
I18nUtil.toBaseLanguage("", "en"); // "en"
I18nUtil.toBaseLanguage("en-US", "zh"); // "en" (合法输入忽略 fallback)

// 重载 3: 可空输入无 fallback → 原样返回
I18nUtil.toBaseLanguage(null); // null
I18nUtil.toBaseLanguage(undefined); // undefined
```

#### Call Signature

> `static` **toBaseLanguage**(`locale`, `fallback`): `string`

Defined in: [i18n/i18nUtil.ts:840](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/i18n/i18nUtil.ts#L840)

提取语言子标签（去掉地区子标签）
- 按 `-` 切分并取首段：`"en-US"` → `"en"`，`"en"` → `"en"`
- 保留原始大小写，不做重写
- 非法输入（`null` / `undefined` / 空白字符串）：提供 `fallback` 时返回 `fallback`，否则原样返回

##### Parameters

###### locale

`string` \| `null` \| `undefined`

语言标签，可为完整 Locale（如 `"en-US"`）或语言子标签（如 `"en"`）

###### fallback

`string`

非法输入时的回退值，缺省时原样返回输入

##### Returns

`string`

语言子标签，或 `fallback`，或原输入

##### Example

```ts
import { I18nUtil } from "@pawover/kit/utils";

// 重载 1: 无 fallback → 字面量类型映射
I18nUtil.toBaseLanguage("en-US"); // "en" (类型为 "en")
I18nUtil.toBaseLanguage("en"); // "en" (类型为 "en")
I18nUtil.toBaseLanguage("zh-CN"); // "zh" (类型为 "zh")
I18nUtil.toBaseLanguage("EN-US"); // "EN" (保留原始大小写)
I18nUtil.toBaseLanguage("xx"); // "xx" (无地区后缀，原样返回)
I18nUtil.toBaseLanguage("xx-YY"); // "xx"

// 重载 2: 提供 fallback → 非法输入时回退
I18nUtil.toBaseLanguage(null, "en"); // "en"
I18nUtil.toBaseLanguage("", "en"); // "en"
I18nUtil.toBaseLanguage("en-US", "zh"); // "en" (合法输入忽略 fallback)

// 重载 3: 可空输入无 fallback → 原样返回
I18nUtil.toBaseLanguage(null); // null
I18nUtil.toBaseLanguage(undefined); // undefined
```

#### Call Signature

> `static` **toBaseLanguage**(`locale`, `fallback?`): `string` \| `null` \| `undefined`

Defined in: [i18n/i18nUtil.ts:841](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/i18n/i18nUtil.ts#L841)

提取语言子标签（去掉地区子标签）
- 按 `-` 切分并取首段：`"en-US"` → `"en"`，`"en"` → `"en"`
- 保留原始大小写，不做重写
- 非法输入（`null` / `undefined` / 空白字符串）：提供 `fallback` 时返回 `fallback`，否则原样返回

##### Parameters

###### locale

`string` \| `null` \| `undefined`

语言标签，可为完整 Locale（如 `"en-US"`）或语言子标签（如 `"en"`）

###### fallback?

`string`

非法输入时的回退值，缺省时原样返回输入

##### Returns

`string` \| `null` \| `undefined`

语言子标签，或 `fallback`，或原输入

##### Example

```ts
import { I18nUtil } from "@pawover/kit/utils";

// 重载 1: 无 fallback → 字面量类型映射
I18nUtil.toBaseLanguage("en-US"); // "en" (类型为 "en")
I18nUtil.toBaseLanguage("en"); // "en" (类型为 "en")
I18nUtil.toBaseLanguage("zh-CN"); // "zh" (类型为 "zh")
I18nUtil.toBaseLanguage("EN-US"); // "EN" (保留原始大小写)
I18nUtil.toBaseLanguage("xx"); // "xx" (无地区后缀，原样返回)
I18nUtil.toBaseLanguage("xx-YY"); // "xx"

// 重载 2: 提供 fallback → 非法输入时回退
I18nUtil.toBaseLanguage(null, "en"); // "en"
I18nUtil.toBaseLanguage("", "en"); // "en"
I18nUtil.toBaseLanguage("en-US", "zh"); // "en" (合法输入忽略 fallback)

// 重载 3: 可空输入无 fallback → 原样返回
I18nUtil.toBaseLanguage(null); // null
I18nUtil.toBaseLanguage(undefined); // undefined
```

***

### toFullLocale()

#### Call Signature

> `static` **toFullLocale**\<`T`\>(`locale`, `fallback?`): [`ToFullLocale`](../type-aliases/ToFullLocale.md)\<`T`\>

Defined in: [i18n/i18nUtil.ts:742](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/i18n/i18nUtil.ts#L742)

规范化为完整 Locale（语言 + 地区，BCP 47）
- 输入为语言子标签（如 `"en"`、`"zh"`）时，按 `PRIMARY_LANGUAGE_ENUM` 映射为对应语言的代表国家/地区完整 Locale（如 `"en-US"`、`"zh-CN"`），查找对大小写不敏感
- 输入已包含地区子标签（含 `-`）时原样返回，不做大小写重写
- 未匹配的语言子标签：提供 `fallback` 时返回 `fallback`，否则原样返回
- 非法输入（`null` / `undefined` / 空白字符串）：提供 `fallback` 时返回 `fallback`，否则原样返回

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### locale

`T`

语言标签，可为完整 Locale（如 `"en-US"`）或语言子标签（如 `"en"`）

###### fallback?

`undefined`

未匹配或非法输入时的回退值，缺省时原样返回输入

##### Returns

[`ToFullLocale`](../type-aliases/ToFullLocale.md)\<`T`\>

规范化的完整 Locale，或 `fallback`，或原输入

##### Example

```ts
import { I18nUtil } from "@pawover/kit/utils";

// 重载 1: 无 fallback → 字面量类型映射
I18nUtil.toFullLocale("en"); // "en-US" (类型为 "en-US")
I18nUtil.toFullLocale("zh"); // "zh-CN" (类型为 "zh-CN")
I18nUtil.toFullLocale("en-US"); // "en-US" (已含地区后缀，原样返回)
I18nUtil.toFullLocale("EN"); // "en-US" (查找对大小写不敏感)
I18nUtil.toFullLocale("xx"); // "xx" (未匹配，原样返回)
I18nUtil.toFullLocale("en-us"); // "en-us" (已含地区后缀，不做大小写重写)

// 重载 2: 提供 fallback → 未匹配或非法输入时回退
I18nUtil.toFullLocale("xx", "en-US"); // "en-US"
I18nUtil.toFullLocale(null, "en-US"); // "en-US"
I18nUtil.toFullLocale("en", "zh-CN"); // "en-US" (命中映射时忽略 fallback)

// 重载 3: 可空输入无 fallback → 原样返回
I18nUtil.toFullLocale(null); // null
I18nUtil.toFullLocale(undefined); // undefined
```

#### Call Signature

> `static` **toFullLocale**(`locale`, `fallback`): `string`

Defined in: [i18n/i18nUtil.ts:743](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/i18n/i18nUtil.ts#L743)

规范化为完整 Locale（语言 + 地区，BCP 47）
- 输入为语言子标签（如 `"en"`、`"zh"`）时，按 `PRIMARY_LANGUAGE_ENUM` 映射为对应语言的代表国家/地区完整 Locale（如 `"en-US"`、`"zh-CN"`），查找对大小写不敏感
- 输入已包含地区子标签（含 `-`）时原样返回，不做大小写重写
- 未匹配的语言子标签：提供 `fallback` 时返回 `fallback`，否则原样返回
- 非法输入（`null` / `undefined` / 空白字符串）：提供 `fallback` 时返回 `fallback`，否则原样返回

##### Parameters

###### locale

`string` \| `null` \| `undefined`

语言标签，可为完整 Locale（如 `"en-US"`）或语言子标签（如 `"en"`）

###### fallback

`string`

未匹配或非法输入时的回退值，缺省时原样返回输入

##### Returns

`string`

规范化的完整 Locale，或 `fallback`，或原输入

##### Example

```ts
import { I18nUtil } from "@pawover/kit/utils";

// 重载 1: 无 fallback → 字面量类型映射
I18nUtil.toFullLocale("en"); // "en-US" (类型为 "en-US")
I18nUtil.toFullLocale("zh"); // "zh-CN" (类型为 "zh-CN")
I18nUtil.toFullLocale("en-US"); // "en-US" (已含地区后缀，原样返回)
I18nUtil.toFullLocale("EN"); // "en-US" (查找对大小写不敏感)
I18nUtil.toFullLocale("xx"); // "xx" (未匹配，原样返回)
I18nUtil.toFullLocale("en-us"); // "en-us" (已含地区后缀，不做大小写重写)

// 重载 2: 提供 fallback → 未匹配或非法输入时回退
I18nUtil.toFullLocale("xx", "en-US"); // "en-US"
I18nUtil.toFullLocale(null, "en-US"); // "en-US"
I18nUtil.toFullLocale("en", "zh-CN"); // "en-US" (命中映射时忽略 fallback)

// 重载 3: 可空输入无 fallback → 原样返回
I18nUtil.toFullLocale(null); // null
I18nUtil.toFullLocale(undefined); // undefined
```

#### Call Signature

> `static` **toFullLocale**(`locale`, `fallback?`): `string` \| `null` \| `undefined`

Defined in: [i18n/i18nUtil.ts:744](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/i18n/i18nUtil.ts#L744)

规范化为完整 Locale（语言 + 地区，BCP 47）
- 输入为语言子标签（如 `"en"`、`"zh"`）时，按 `PRIMARY_LANGUAGE_ENUM` 映射为对应语言的代表国家/地区完整 Locale（如 `"en-US"`、`"zh-CN"`），查找对大小写不敏感
- 输入已包含地区子标签（含 `-`）时原样返回，不做大小写重写
- 未匹配的语言子标签：提供 `fallback` 时返回 `fallback`，否则原样返回
- 非法输入（`null` / `undefined` / 空白字符串）：提供 `fallback` 时返回 `fallback`，否则原样返回

##### Parameters

###### locale

`string` \| `null` \| `undefined`

语言标签，可为完整 Locale（如 `"en-US"`）或语言子标签（如 `"en"`）

###### fallback?

`string`

未匹配或非法输入时的回退值，缺省时原样返回输入

##### Returns

`string` \| `null` \| `undefined`

规范化的完整 Locale，或 `fallback`，或原输入

##### Example

```ts
import { I18nUtil } from "@pawover/kit/utils";

// 重载 1: 无 fallback → 字面量类型映射
I18nUtil.toFullLocale("en"); // "en-US" (类型为 "en-US")
I18nUtil.toFullLocale("zh"); // "zh-CN" (类型为 "zh-CN")
I18nUtil.toFullLocale("en-US"); // "en-US" (已含地区后缀，原样返回)
I18nUtil.toFullLocale("EN"); // "en-US" (查找对大小写不敏感)
I18nUtil.toFullLocale("xx"); // "xx" (未匹配，原样返回)
I18nUtil.toFullLocale("en-us"); // "en-us" (已含地区后缀，不做大小写重写)

// 重载 2: 提供 fallback → 未匹配或非法输入时回退
I18nUtil.toFullLocale("xx", "en-US"); // "en-US"
I18nUtil.toFullLocale(null, "en-US"); // "en-US"
I18nUtil.toFullLocale("en", "zh-CN"); // "en-US" (命中映射时忽略 fallback)

// 重载 3: 可空输入无 fallback → 原样返回
I18nUtil.toFullLocale(null); // null
I18nUtil.toFullLocale(undefined); // undefined
```

***

### toLocaleDisplayName()

#### Call Signature

> `static` **toLocaleDisplayName**(`input`, `options?`): `string`

Defined in: [i18n/i18nUtil.ts:789](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/i18n/i18nUtil.ts#L789)

获取展示名称（本地化名称，基于 `Intl.DisplayNames`，名称数据来自 CLDR）
- 输入形态决定缺省名称类型：2 字母大写 = 国家/地区代码（`CountryCode`）→ 地区名（如 `"US"` → `"美国"`）；其余（语言子标签 / 完整 Locale）→ 语言名（如 `"en"` → `"英语"`、`"en-US"` → 含语言与地区的名称，如「美国英语」）
- 展示语言缺省跟随运行环境（不传 `language` 时使用 `Intl.DisplayNames` 默认 locale），也可显式指定
- 未匹配输入（如 `"xx"`）：提供 `fallback` 时返回 `fallback`，否则原样返回输入
- 非法输入（`null` / `undefined` / 空白字符串）：提供 `fallback` 时返回 `fallback`，否则原样返回

##### Parameters

###### input

`string`

国家/地区代码（如 `"US"`）、语言子标签（如 `"en"`）或完整 Locale（如 `"en-US"`）

###### options?

[`ToLocaleDisplayNameOptions`](../interfaces/ToLocaleDisplayNameOptions.md)

选项：展示语言 / 名称类型 / 回退值

##### Returns

`string`

本地化展示名称，或 `fallback`，或原输入

##### Example

```ts
import { I18nUtil } from "@pawover/kit/utils";

// 重载 1: 无选项 → 名称类型按输入形态推断，展示语言跟随运行环境
I18nUtil.toLocaleDisplayName("US"); // 运行环境为中文时 → "美国"
I18nUtil.toLocaleDisplayName("en"); // 运行环境为中文时 → "英语"
I18nUtil.toLocaleDisplayName("en-US"); // 运行环境为中文时 → 含语言与地区的名称（如 "美国英语" / "英语（美国）"）

// 重载 2: 提供选项
I18nUtil.toLocaleDisplayName("US", { language: "en" }); // "United States"
I18nUtil.toLocaleDisplayName("US", { language: "zh", type: "region" }); // "美国"
I18nUtil.toLocaleDisplayName("en", { type: "region" }); // "en" (未匹配，原样返回)
I18nUtil.toLocaleDisplayName("123", { fallback: "未知" }); // "未知"

// 重载 3: 可空输入无 fallback → 原样返回
I18nUtil.toLocaleDisplayName(null); // null
I18nUtil.toLocaleDisplayName(undefined); // undefined
```

#### Call Signature

> `static` **toLocaleDisplayName**(`input`, `options?`): `string` \| `null` \| `undefined`

Defined in: [i18n/i18nUtil.ts:790](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/i18n/i18nUtil.ts#L790)

获取展示名称（本地化名称，基于 `Intl.DisplayNames`，名称数据来自 CLDR）
- 输入形态决定缺省名称类型：2 字母大写 = 国家/地区代码（`CountryCode`）→ 地区名（如 `"US"` → `"美国"`）；其余（语言子标签 / 完整 Locale）→ 语言名（如 `"en"` → `"英语"`、`"en-US"` → 含语言与地区的名称，如「美国英语」）
- 展示语言缺省跟随运行环境（不传 `language` 时使用 `Intl.DisplayNames` 默认 locale），也可显式指定
- 未匹配输入（如 `"xx"`）：提供 `fallback` 时返回 `fallback`，否则原样返回输入
- 非法输入（`null` / `undefined` / 空白字符串）：提供 `fallback` 时返回 `fallback`，否则原样返回

##### Parameters

###### input

`string` \| `null` \| `undefined`

国家/地区代码（如 `"US"`）、语言子标签（如 `"en"`）或完整 Locale（如 `"en-US"`）

###### options?

[`ToLocaleDisplayNameOptions`](../interfaces/ToLocaleDisplayNameOptions.md)

选项：展示语言 / 名称类型 / 回退值

##### Returns

`string` \| `null` \| `undefined`

本地化展示名称，或 `fallback`，或原输入

##### Example

```ts
import { I18nUtil } from "@pawover/kit/utils";

// 重载 1: 无选项 → 名称类型按输入形态推断，展示语言跟随运行环境
I18nUtil.toLocaleDisplayName("US"); // 运行环境为中文时 → "美国"
I18nUtil.toLocaleDisplayName("en"); // 运行环境为中文时 → "英语"
I18nUtil.toLocaleDisplayName("en-US"); // 运行环境为中文时 → 含语言与地区的名称（如 "美国英语" / "英语（美国）"）

// 重载 2: 提供选项
I18nUtil.toLocaleDisplayName("US", { language: "en" }); // "United States"
I18nUtil.toLocaleDisplayName("US", { language: "zh", type: "region" }); // "美国"
I18nUtil.toLocaleDisplayName("en", { type: "region" }); // "en" (未匹配，原样返回)
I18nUtil.toLocaleDisplayName("123", { fallback: "未知" }); // "未知"

// 重载 3: 可空输入无 fallback → 原样返回
I18nUtil.toLocaleDisplayName(null); // null
I18nUtil.toLocaleDisplayName(undefined); // undefined
```
