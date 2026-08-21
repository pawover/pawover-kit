[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / MimeUtil

# Class: MimeUtil

Defined in: [mime/mimeUtil.ts:6](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/mime/mimeUtil.ts#L6)

MIME 工具类

## Constructors

### Constructor

> **new MimeUtil**(): `MimeUtil`

#### Returns

`MimeUtil`

## Properties

### FILE\_MIME

> `readonly` `static` **FILE\_MIME**: `object`

Defined in: [mime/mimeUtil.ts:11](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/mime/mimeUtil.ts#L11)

文件类型 MIME 常量
- 每个类型对应具体的文件扩展名

#### AAC

> `readonly` **AAC**: `"audio/aac"` = `"audio/aac"`

AAC 音频（.aac）

#### APNG

> `readonly` **APNG**: `"image/apng"` = `"image/apng"`

APNG 动态图像（.apng）

#### AVI

> `readonly` **AVI**: `"video/x-msvideo"` = `"video/x-msvideo"`

AVI 视频（.avi）

#### AVIF

> `readonly` **AVIF**: `"image/avif"` = `"image/avif"`

AVIF 图像/高效压缩（.avif）

#### AZW

> `readonly` **AZW**: `"application/vnd.amazon.ebook"` = `"application/vnd.amazon.ebook"`

Kindle 电子书（.azw）

#### BMP

> `readonly` **BMP**: `"image/bmp"` = `"image/bmp"`

Windows 位图（.bmp）

#### BZIP

> `readonly` **BZIP**: `"application/x-bzip"` = `"application/x-bzip"`

BZip 归档（.bz）

#### BZIP2

> `readonly` **BZIP2**: `"application/x-bzip2"` = `"application/x-bzip2"`

BZip2 归档（.bz2）

#### C

> `readonly` **C**: `"text/x-c"` = `"text/x-c"`

C 语言源文件（.c）

#### CALENDAR

> `readonly` **CALENDAR**: `"text/calendar"` = `"text/calendar"`

iCalendar 日历格式（.ics）

#### CPP

> `readonly` **CPP**: `"text/x-c++"` = `"text/x-c++"`

C++ 源文件（.cpp/.cc/.cxx）

#### CSHARP

> `readonly` **CSHARP**: `"text/x-csharp"` = `"text/x-csharp"`

C# 源文件（.cs）

#### CSS

> `readonly` **CSS**: `"text/css"` = `"text/css"`

层叠样式表文件（.css）

#### CSV

> `readonly` **CSV**: `"text/csv"` = `"text/csv"`

逗号分隔值文件/表格数据（.csv）

#### DOC

> `readonly` **DOC**: `"application/msword"` = `"application/msword"`

Word 97-2003 文档（.doc）

#### DOCM

> `readonly` **DOCM**: `"application/vnd.ms-word.document.macroEnabled.12"` = `"application/vnd.ms-word.document.macroEnabled.12"`

Word 启用宏文档（.docm）

#### DOCX

> `readonly` **DOCX**: `"application/vnd.openxmlformats-officedocument.wordprocessingml.document"` = `"application/vnd.openxmlformats-officedocument.wordprocessingml.document"`

Word 2007+ 文档（.docx）

#### EOT

> `readonly` **EOT**: `"application/vnd.ms-fontobject"` = `"application/vnd.ms-fontobject"`

MS 嵌入式 OpenType 字体（.eot）

#### EPUB

> `readonly` **EPUB**: `"application/epub+zip"` = `"application/epub+zip"`

EPUB 电子书（.epub）

#### FLAC

> `readonly` **FLAC**: `"audio/flac"` = `"audio/flac"`

FLAC 无损音频（.flac）

#### GIF

> `readonly` **GIF**: `"image/gif"` = `"image/gif"`

GIF 图像/支持动画（.gif）

#### GO

> `readonly` **GO**: `"text/x-go"` = `"text/x-go"`

Go 源文件（.go）

#### GZIP

> `readonly` **GZIP**: `"application/gzip"` = `"application/gzip"`

GZIP 压缩文件（.gz）

#### HEIC

> `readonly` **HEIC**: `"image/heic"` = `"image/heic"`

HEIC 图像/高效编码（.heic）

#### HEIF

> `readonly` **HEIF**: `"image/heif"` = `"image/heif"`

HEIF 图像/高效编码（.heif）

#### HTML

> `readonly` **HTML**: `"text/html"` = `"text/html"`

超文本标记语言文档（.html/.htm）

#### ICO

> `readonly` **ICO**: `"image/vnd.microsoft.icon"` = `"image/vnd.microsoft.icon"`

图标文件格式（.ico）

#### ICO\_LEGACY

> `readonly` **ICO\_LEGACY**: `"image/x-icon"` = `"image/x-icon"`

图标文件格式/兼容值（.ico）

#### ISO9660\_IMAGE

> `readonly` **ISO9660\_IMAGE**: `"application/x-iso9660-image"` = `"application/x-iso9660-image"`

ISO 光盘镜像（.iso）

#### JAR

> `readonly` **JAR**: `"application/java-archive"` = `"application/java-archive"`

Java 归档文件（.jar）

#### JAVA

> `readonly` **JAVA**: `"text/x-java"` = `"text/x-java"`

Java 源文件（.java）

#### JPEG

> `readonly` **JPEG**: `"image/jpeg"` = `"image/jpeg"`

JPEG 图像（.jpg/.jpeg）

#### JPG

> `readonly` **JPG**: `"image/jpeg"` = `"image/jpeg"`

JPG 图像（JPEG 别名，.jpg）

#### JS

> `readonly` **JS**: `"text/javascript"` = `"text/javascript"`

JavaScript 文件（.js）

#### JSON

> `readonly` **JSON**: `"application/json"` = `"application/json"`

JSON 数据格式（.json）

#### LD\_JSON

> `readonly` **LD\_JSON**: `"application/ld+json"` = `"application/ld+json"`

JSON-LD 格式（.jsonld）

#### MANIFEST

> `readonly` **MANIFEST**: `"application/manifest+json"` = `"application/manifest+json"`

Web App Manifest（.webmanifest）

#### MARKDOWN

> `readonly` **MARKDOWN**: `"text/markdown"` = `"text/markdown"`

Markdown 格式文档（.md/.markdown）

#### MIDI

> `readonly` **MIDI**: `"audio/midi"` = `"audio/midi"`

MIDI 音乐文件（.mid/.midi）

#### MKA

> `readonly` **MKA**: `"audio/x-matroska"` = `"audio/x-matroska"`

Matroska 音频（.mka）

#### MKV

> `readonly` **MKV**: `"video/x-matroska"` = `"video/x-matroska"`

Matroska 视频（.mkv）

#### MP3

> `readonly` **MP3**: `"audio/mpeg"` = `"audio/mpeg"`

MP3 音频（.mp3）

#### MP4

> `readonly` **MP4**: `"video/mp4"` = `"video/mp4"`

MP4 视频（.mp4）

#### MPEG

> `readonly` **MPEG**: `"video/mpeg"` = `"video/mpeg"`

MPEG 视频（.mpeg/.mpg）

#### ODP

> `readonly` **ODP**: `"application/vnd.oasis.opendocument.presentation"` = `"application/vnd.oasis.opendocument.presentation"`

OpenDocument 演示文稿（.odp）

#### ODS

> `readonly` **ODS**: `"application/vnd.oasis.opendocument.spreadsheet"` = `"application/vnd.oasis.opendocument.spreadsheet"`

OpenDocument 表格文档（.ods）

#### ODT

> `readonly` **ODT**: `"application/vnd.oasis.opendocument.text"` = `"application/vnd.oasis.opendocument.text"`

OpenDocument 文本文档（.odt）

#### OGG\_AUDIO

> `readonly` **OGG\_AUDIO**: `"audio/ogg"` = `"audio/ogg"`

OGG 音频（.oga）

#### OGG\_VIDEO

> `readonly` **OGG\_VIDEO**: `"video/ogg"` = `"video/ogg"`

OGG 视频（.ogv）

#### OPUS

> `readonly` **OPUS**: `"audio/opus"` = `"audio/opus"`

Opus 音频（.opus）

#### OTF

> `readonly` **OTF**: `"font/otf"` = `"font/otf"`

OpenType 字体（.otf）

#### PDF

> `readonly` **PDF**: `"application/pdf"` = `"application/pdf"`

PDF 文档（.pdf）

#### PHP

> `readonly` **PHP**: `"text/x-php"` = `"text/x-php"`

PHP 文件（.php）

#### PNG

> `readonly` **PNG**: `"image/png"` = `"image/png"`

PNG 图像/无损压缩，支持透明（.png）

#### PPT

> `readonly` **PPT**: `"application/vnd.ms-powerpoint"` = `"application/vnd.ms-powerpoint"`

PowerPoint 97-2003 演示文稿（.ppt）

#### PPTX

> `readonly` **PPTX**: `"application/vnd.openxmlformats-officedocument.presentationml.presentation"` = `"application/vnd.openxmlformats-officedocument.presentationml.presentation"`

PowerPoint 2007+ 演示文稿（.pptx）

#### PSD

> `readonly` **PSD**: `"image/vnd.adobe.photoshop"` = `"image/vnd.adobe.photoshop"`

Adobe Photoshop 文件（.psd）

#### PY

> `readonly` **PY**: `"text/x-python"` = `"text/x-python"`

Python 文件（.py）

#### QUICKTIME

> `readonly` **QUICKTIME**: `"video/quicktime"` = `"video/quicktime"`

QuickTime 视频（.mov）

#### RAR

> `readonly` **RAR**: `"application/vnd.rar"` = `"application/vnd.rar"`

RAR 压缩文件（.rar）

#### REAL\_AUDIO

> `readonly` **REAL\_AUDIO**: `"audio/x-pn-realaudio"` = `"audio/x-pn-realaudio"`

RealAudio 音频（.ra/.ram）

#### RTF

> `readonly` **RTF**: `"application/rtf"` = `"application/rtf"`

富文本格式文档（.rtf）

#### RUBY

> `readonly` **RUBY**: `"text/x-ruby"` = `"text/x-ruby"`

Ruby 文件（.rb）

#### RUST

> `readonly` **RUST**: `"text/x-rust"` = `"text/x-rust"`

Rust 源文件（.rs）

#### SEVEN\_Z

> `readonly` **SEVEN\_Z**: `"application/x-7z-compressed"` = `"application/x-7z-compressed"`

7-Zip 压缩文件（.7z）

#### SH

> `readonly` **SH**: `"text/x-sh"` = `"text/x-sh"`

Shell 脚本 (.sh)

#### SQL

> `readonly` **SQL**: `"application/sql"` = `"application/sql"`

SQL 脚本（.sql）

#### SQL\_LEGACY

> `readonly` **SQL\_LEGACY**: `"text/x-sql"` = `"text/x-sql"`

SQL 脚本/兼容值

#### SVG

> `readonly` **SVG**: `"image/svg+xml"` = `"image/svg+xml"`

SVG 向量图形（.svg）

#### SWIFT

> `readonly` **SWIFT**: `"text/x-swift"` = `"text/x-swift"`

Swift 源文件（.swift）

#### TAR

> `readonly` **TAR**: `"application/x-tar"` = `"application/x-tar"`

TAR 归档文件（.tar）

#### TEXT

> `readonly` **TEXT**: `"text/plain"` = `"text/plain"`

普通文本文件（.txt）

#### THREE\_GPP

> `readonly` **THREE\_GPP**: `"video/3gpp"` = `"video/3gpp"`

3GPP 视频（.3gp）

#### THREE\_GPP2

> `readonly` **THREE\_GPP2**: `"video/3gpp2"` = `"video/3gpp2"`

3GPP2 视频（.3g2）

#### TIFF

> `readonly` **TIFF**: `"image/tiff"` = `"image/tiff"`

TIFF 图像（.tif/.tiff）

#### TOML

> `readonly` **TOML**: `"application/toml"` = `"application/toml"`

TOML 文档（.toml）

#### TOML\_LEGACY

> `readonly` **TOML\_LEGACY**: `"text/x-toml"` = `"text/x-toml"`

TOML 文档/兼容值

#### TS

> `readonly` **TS**: `"text/typescript"` = `"text/typescript"`

TypeScript 文件（.ts）

#### TSV

> `readonly` **TSV**: `"text/tab-separated-values"` = `"text/tab-separated-values"`

制表符分隔值文件（.tsv）

#### TTF

> `readonly` **TTF**: `"font/ttf"` = `"font/ttf"`

TrueType 字体（.ttf）

#### WASM

> `readonly` **WASM**: `"application/wasm"` = `"application/wasm"`

WebAssembly 二进制指令格式（.wasm）

#### WAV

> `readonly` **WAV**: `"audio/wav"` = `"audio/wav"`

WAV 音频（.wav）

#### WEBM

> `readonly` **WEBM**: `"video/webm"` = `"video/webm"`

WebM 视频（.webm）

#### WEBM\_AUDIO

> `readonly` **WEBM\_AUDIO**: `"audio/webm"` = `"audio/webm"`

WebM 音频（.weba）

#### WEBP

> `readonly` **WEBP**: `"image/webp"` = `"image/webp"`

WebP 图像/高效压缩（.webp）

#### WOFF

> `readonly` **WOFF**: `"font/woff"` = `"font/woff"`

WOFF 字体（.woff）

#### WOFF2

> `readonly` **WOFF2**: `"font/woff2"` = `"font/woff2"`

WOFF2 字体（.woff2）

#### XHTML

> `readonly` **XHTML**: `"application/xhtml+xml"` = `"application/xhtml+xml"`

XHTML 文档（.xhtml/.xht）

#### XLS

> `readonly` **XLS**: `"application/vnd.ms-excel"` = `"application/vnd.ms-excel"`

Excel 97-2003 工作簿（.xls）

#### XLSM

> `readonly` **XLSM**: `"application/vnd.ms-excel.sheet.macroEnabled.12"` = `"application/vnd.ms-excel.sheet.macroEnabled.12"`

启用宏的Excel工作簿（.xlsm）

#### XLSX

> `readonly` **XLSX**: `"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"` = `"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"`

Excel 2007+ 工作簿（.xlsx）

#### XLTX

> `readonly` **XLTX**: `"application/vnd.openxmlformats-officedocument.spreadsheetml.template"` = `"application/vnd.openxmlformats-officedocument.spreadsheetml.template"`

Excel模板文件（.xltx）

#### XML

> `readonly` **XML**: `"application/xml"` = `"application/xml"`

XML 文档（.xml）

#### XML\_LEGACY

> `readonly` **XML\_LEGACY**: `"text/xml"` = `"text/xml"`

XML 文档/兼容值

#### XPS

> `readonly` **XPS**: `"application/vnd.ms-xpsdocument"` = `"application/vnd.ms-xpsdocument"`

Microsoft XPS 文档（.xps）

#### XZ

> `readonly` **XZ**: `"application/x-xz"` = `"application/x-xz"`

XZ 压缩文件（.xz）

#### YAML

> `readonly` **YAML**: `"application/yaml"` = `"application/yaml"`

YAML 文档（.yaml/.yml）

#### YAML\_LEGACY

> `readonly` **YAML\_LEGACY**: `"text/vnd.yaml"` = `"text/vnd.yaml"`

YAML 文档/兼容值

#### ZIP

> `readonly` **ZIP**: `"application/zip"` = `"application/zip"`

ZIP 压缩文件（.zip）

#### ZSTD

> `readonly` **ZSTD**: `"application/zstd"` = `"application/zstd"`

Zstandard 压缩文件（.zst）

***

### PROTOCOL\_MIME

> `readonly` `static` **PROTOCOL\_MIME**: `object`

Defined in: [mime/mimeUtil.ts:218](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/mime/mimeUtil.ts#L218)

协议/内容类型 MIME 常量
- 用于 HTTP 请求/响应内容协商，无对应文件扩展名

#### EVENT\_STREAM

> `readonly` **EVENT\_STREAM**: `"text/event-stream"` = `"text/event-stream"`

Server-Sent Events 数据流

#### FORM\_DATA

> `readonly` **FORM\_DATA**: `"multipart/form-data"` = `"multipart/form-data"`

multipart 表单

#### FORM\_URLENCODED

> `readonly` **FORM\_URLENCODED**: `"application/x-www-form-urlencoded"` = `"application/x-www-form-urlencoded"`

URL 编码表单

#### JSON\_PATCH

> `readonly` **JSON\_PATCH**: `"application/json-patch+json"` = `"application/json-patch+json"`

JSON Patch（RFC 6902）

#### MERGE\_PATCH\_JSON

> `readonly` **MERGE\_PATCH\_JSON**: `"application/merge-patch+json"` = `"application/merge-patch+json"`

JSON Merge Patch（RFC 7386）

#### OCTET\_STREAM

> `readonly` **OCTET\_STREAM**: `"application/octet-stream"` = `"application/octet-stream"`

通用二进制数据流

#### PROBLEM\_JSON

> `readonly` **PROBLEM\_JSON**: `"application/problem+json"` = `"application/problem+json"`

问题详情 JSON（RFC 9457）

## Methods

### fromExtension()

> `static` **fromExtension**(`extension`): readonly \[`string`, `string`\] \| `undefined`

Defined in: [mime/mimeUtil.ts:251](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/mime/mimeUtil.ts#L251)

根据文件后缀名获取对应的标准 MIME 类型（含历史兼容值）
- 支持带 `.` 或不带 `.` 的后缀名，不区分大小写
- 元组第一项始终为 IANA 官方标准 MIME，后续项为历史兼容值
- 仅查询文件类型 MIME，不包含无后缀对应的协议类型

#### Parameters

##### extension

`string`

文件后缀名（如 `".png"` / `"png"` / `".PNG"`）

#### Returns

readonly \[`string`, `string`\] \| `undefined`

标准 MIME + 兼容值的元组；如无匹配则返回 `undefined`

#### Example

```ts
MimeUtil.fromExtension(".png");  // ["image/png"]
MimeUtil.fromExtension("ico");   // ["image/vnd.microsoft.icon", "image/x-icon"]
MimeUtil.fromExtension(".xml");  // ["application/xml", "text/xml"]
MimeUtil.fromExtension(".xyz");  // undefined
```

***

### toExtension()

> `static` **toExtension**(`mime`): readonly \[`string`, `string`\] \| `undefined`

Defined in: [mime/mimeUtil.ts:274](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/mime/mimeUtil.ts#L274)

根据 MIME 类型获取对应的文件后缀名列表
- 一个 MIME 类型可能对应多个后缀名（如 `text/html` → `.html` / `.htm`）
- 兼容值和标准值映射到相同的后缀（如 `image/x-icon` 和 `image/vnd.microsoft.icon` 均返回 `[".ico"]`）
- 仅查询文件类型 MIME，协议类型无对应后缀

#### Parameters

##### mime

`string`

MIME 类型字符串（如 `"image/png"` / `"IMAGE/PNG"`）

#### Returns

readonly \[`string`, `string`\] \| `undefined`

文件后缀名列表；如无匹配则返回 `undefined`

#### Example

```ts
MimeUtil.toExtension("IMAGE/PNG");                    // [".png"]
MimeUtil.toExtension("text/html");                    // [".html", ".htm"]
MimeUtil.toExtension("image/jpeg");                   // [".jpg", ".jpeg"]
MimeUtil.toExtension("application/octet-stream");     // undefined
```
