/**
 * 标准 MIME 类型常量，用于文件类型标识和 HTTP Content-Type 头部
 * 基于 IANA 注册标准和浏览器兼容性验证
 */
export const MIME = {
  /** 普通文本文件 */
  TEXT: "text/plain",
  /** 超文本标记语言文档 */
  HTML: "text/html",
  /** 层叠样式表文件 */
  CSS: "text/css",
  /** 逗号分隔值文件（表格数据） */
  CSV: "text/csv",
  /** 制表符分隔值文件 */
  TSV: "text/tab-separated-values",
  /** XML 文档 */
  XML: "text/xml",
  /** XHTML 文档（XML 严格格式的 HTML） */
  XHTML: "application/xhtml+xml",
  /** JavaScript 脚本文件（标准推荐） */
  JS: "text/javascript",
  /** Markdown 格式文档 */
  MARKDOWN: "text/markdown",
  /** 富文本格式文档（.rtf） */
  RTF: "application/rtf",
  /** iCalendar 日历格式（.ics） */
  CALENDAR: "text/calendar",
  /** JPEG 图像（.jpg/.jpeg） */
  JPEG: "image/jpeg",
  /** PNG 图像（无损压缩，支持透明） */
  PNG: "image/png",
  /** GIF 图像（支持动画） */
  GIF: "image/gif",
  /** Windows 位图（.bmp） */
  BMP: "image/bmp",
  /** SVG 向量图形（.svg） */
  SVG: "image/svg+xml",
  /** APNG 动态图像（.apng） */
  APNG: "image/apng",
  /** AVIF 图像（高效压缩） */
  AVIF: "image/avif",
  /** 图标文件格式（.ico） */
  ICO: "image/vnd.microsoft.icon",
  /** WebP 图像（高效压缩） */
  WEBP: "image/webp",
  /** MP3 音频（.mp3） */
  MP3: "audio/mpeg",
  /** AAC 音频（.aac） */
  AAC: "audio/aac",
  /** MIDI 音乐文件（.mid/.midi） */
  MIDI: "audio/midi",
  /** OGG 音频（.oga） */
  OGG_AUDIO: "audio/ogg",
  /** Opus 音频（.opus） */
  OPUS: "audio/opus",
  /** WAV 音频（.wav） */
  WAV: "audio/wav",
  /** RealAudio 音频（.ra/.ram） */
  REAL_AUDIO: "audio/x-pn-realaudio",
  /** MP4 视频（.mp4） */
  MP4: "video/mp4",
  /** MPEG 视频（.mpeg/.mpg） */
  MPEG: "video/mpeg",
  /** OGG 视频（.ogv） */
  OGG_VIDEO: "video/ogg",
  /** AVI 视频（.avi） */
  AVI: "video/x-msvideo",
  /** 3GPP 视频（.3gp） */
  THREE_GPP: "video/3gpp",
  /** 3GPP2 视频（.3g2） */
  THREE_GPP2: "video/3gpp2",
  /** WebM 视频（.webm） */
  WEBM: "video/webm",
  /** PDF 文档 */
  PDF: "application/pdf",
  /** Word 97-2003 文档（.doc） */
  DOC: "application/msword",
  /** Word 2007+ 文档（.docx） */
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  /** Excel 2007+ 工作簿（.xlsx） */
  XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  /** 启用宏的Excel工作簿（.xlsm） */
  XLSM: "application/vnd.ms-excel.sheet.macroEnabled.12",
  /** Excel模板文件（.xltx） */
  XLTX: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  /** PowerPoint 2007+ 演示文稿（.pptx） */
  PPTX: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  /** PowerPoint 97-2003 演示文稿（.ppt） */
  PPT: "application/vnd.ms-powerpoint",
  /** OpenDocument 文本文档（.odt） */
  ODT: "application/vnd.oasis.opendocument.text",
  /** OpenDocument 表格文档（.ods） */
  ODS: "application/vnd.oasis.opendocument.spreadsheet",
  /** OpenDocument 演示文稿（.odp） */
  ODP: "application/vnd.oasis.opendocument.presentation",
  /** EPUB 电子书（.epub） */
  EPUB: "application/epub+zip",
  /** Kindle 电子书（.azw） */
  AZW: "application/vnd.amazon.ebook",
  /** ZIP 压缩文件（.zip） */
  ZIP: "application/zip",
  /** GZIP 压缩文件（.gz） */
  GZIP: "application/gzip",
  /** GZIP 压缩文件（旧格式） */
  X_GZIP: "application/x-gzip",
  /** TAR 归档文件（.tar） */
  TAR: "application/x-tar",
  /** BZip 归档（.bz） */
  BZIP: "application/x-bzip",
  /** BZip2 归档（.bz2） */
  BZIP2: "application/x-bzip2",
  /** 7-Zip 压缩文件（.7z） */
  SEVEN_Z: "application/x-7z-compressed",
  /** 通用二进制数据（默认类型） */
  OCTET_STREAM: "application/octet-stream",
  /** JSON 数据格式（.json） */
  JSON: "application/json",
  /** JSON-LD 格式（.jsonld） */
  LD_JSON: "application/ld+json",
  /** Java 归档文件（.jar） */
  JAR: "application/java-archive",
  /** MS 嵌入式 OpenType 字体（.eot） */
  EOT: "application/vnd.ms-fontobject",
  /** OpenType 字体（.otf） */
  OTF: "font/otf",
  /** Excel 97-2003 工作簿（.xls） */
  XLS: "application/vnd.ms-excel",
  /** Microsoft XPS 文档（.xps） */
  XPS: "application/vnd.ms-xpsdocument",
  /** Word 启用宏文档（.docm） */
  DOCM: "application/vnd.ms-word.document.macroEnabled.12",
} as const;
