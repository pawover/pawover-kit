/**
 * MIME 工具类
 */
export class MimeUtil {
  /**
   * 文件类型 MIME 常量
   * - 每个类型对应具体的文件扩展名
   */
  static readonly FILE_MIME = {
    /** 普通文本文件（.txt） */
    TEXT: "text/plain",
    /** 超文本标记语言文档（.html/.htm） */
    HTML: "text/html",
    /** 层叠样式表文件（.css） */
    CSS: "text/css",
    /** 逗号分隔值文件/表格数据（.csv） */
    CSV: "text/csv",
    /** 制表符分隔值文件（.tsv） */
    TSV: "text/tab-separated-values",
    /** XML 文档（.xml） */
    XML: "application/xml",
    /** XML 文档/兼容值 */
    XML_TEXT: "text/xml",
    /** XHTML 文档（.xhtml/.xht） */
    XHTML: "application/xhtml+xml",
    /** JavaScript 文件（.js） */
    JS: "text/javascript",
    /** TypeScript 文件（.ts） */
    TS: "text/typescript",
    /** Python 文件（.py） */
    PY: "text/x-python",
    /** Shell 脚本 (.sh) */
    SH: "text/x-sh",
    /** C 语言源文件（.c） */
    C: "text/x-c",
    /** C++ 源文件（.cpp/.cc/.cxx） */
    CPP: "text/x-c++",
    /** C# 源文件（.cs） */
    CSHARP: "text/x-csharp",
    /** Java 源文件（.java） */
    JAVA: "text/x-java",
    /** Go 源文件（.go） */
    GO: "text/x-go",
    /** Rust 源文件（.rs） */
    RUST: "text/x-rust",
    /** PHP 文件（.php） */
    PHP: "text/x-php",
    /** Ruby 文件（.rb） */
    RUBY: "text/x-ruby",
    /** Swift 源文件（.swift） */
    SWIFT: "text/x-swift",
    /** YAML 文档（.yaml/.yml） */
    YAML: "application/yaml",
    /** YAML 文档/兼容值 */
    YAML_TEXT: "text/vnd.yaml",
    /** TOML 文档（.toml） */
    TOML: "application/toml",
    /** TOML 文档/兼容值 */
    TOML_TEXT: "text/x-toml",
    /** SQL 脚本（.sql） */
    SQL: "application/sql",
    /** SQL 脚本/兼容值 */
    SQL_TEXT: "text/x-sql",
    /** Markdown 格式文档（.md/.markdown） */
    MARKDOWN: "text/markdown",
    /** 富文本格式文档（.rtf） */
    RTF: "application/rtf",
    /** iCalendar 日历格式（.ics） */
    CALENDAR: "text/calendar",
    /** JPEG 图像（.jpg/.jpeg） */
    JPEG: "image/jpeg",
    /** JPG 图像（JPEG 别名，.jpg） */
    JPG: "image/jpeg",
    /** PNG 图像/无损压缩，支持透明（.png） */
    PNG: "image/png",
    /** GIF 图像/支持动画（.gif） */
    GIF: "image/gif",
    /** Windows 位图（.bmp） */
    BMP: "image/bmp",
    /** SVG 向量图形（.svg） */
    SVG: "image/svg+xml",
    /** APNG 动态图像（.apng） */
    APNG: "image/apng",
    /** AVIF 图像/高效压缩（.avif） */
    AVIF: "image/avif",
    /** 图标文件格式（.ico） */
    ICO: "image/vnd.microsoft.icon",
    /** WebP 图像/高效压缩（.webp） */
    WEBP: "image/webp",
    /** TIFF 图像（.tif/.tiff） */
    TIFF: "image/tiff",
    /** HEIC 图像/高效编码（.heic） */
    HEIC: "image/heic",
    /** HEIF 图像/高效编码（.heif） */
    HEIF: "image/heif",
    /** Adobe Photoshop 文件（.psd） */
    PSD: "image/vnd.adobe.photoshop",
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
    /** FLAC 无损音频（.flac） */
    FLAC: "audio/flac",
    /** WAV 音频（.wav） */
    WAV: "audio/wav",
    /** WebM 音频（.weba） */
    WEBM_AUDIO: "audio/webm",
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
    /** QuickTime 视频（.mov） */
    QUICKTIME: "video/quicktime",
    /** PDF 文档（.pdf） */
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
    /** TAR 归档文件（.tar） */
    TAR: "application/x-tar",
    /** BZip 归档（.bz） */
    BZIP: "application/x-bzip",
    /** BZip2 归档（.bz2） */
    BZIP2: "application/x-bzip2",
    /** 7-Zip 压缩文件（.7z） */
    SEVEN_Z: "application/x-7z-compressed",
    /** RAR 压缩文件（.rar） */
    RAR: "application/vnd.rar",
    /** XZ 压缩文件（.xz） */
    XZ: "application/x-xz",
    /** Zstandard 压缩文件（.zst） */
    ZSTD: "application/zstd",
    /** ISO 光盘镜像（.iso） */
    ISO9660_IMAGE: "application/x-iso9660-image",
    /** JSON 数据格式（.json） */
    JSON: "application/json",
    /** JSON-LD 格式（.jsonld） */
    LD_JSON: "application/ld+json",
    /** Web App Manifest（.webmanifest） */
    MANIFEST: "application/manifest+json",
    /** Java 归档文件（.jar） */
    JAR: "application/java-archive",
    /** WebAssembly 二进制指令格式（.wasm） */
    WASM: "application/wasm",
    /** MS 嵌入式 OpenType 字体（.eot） */
    EOT: "application/vnd.ms-fontobject",
    /** OpenType 字体（.otf） */
    OTF: "font/otf",
    /** WOFF 字体（.woff） */
    WOFF: "font/woff",
    /** WOFF2 字体（.woff2） */
    WOFF2: "font/woff2",
    /** TrueType 字体（.ttf） */
    TTF: "font/ttf",
    /** Excel 97-2003 工作簿（.xls） */
    XLS: "application/vnd.ms-excel",
    /** Microsoft XPS 文档（.xps） */
    XPS: "application/vnd.ms-xpsdocument",
    /** Word 启用宏文档（.docm） */
    DOCM: "application/vnd.ms-word.document.macroEnabled.12",
  } as const;

  /**
   * 协议/内容类型 MIME 常量
   * - 用于 HTTP 请求/响应内容协商，无对应文件扩展名
   */
  static readonly PROTOCOL_MIME = {
    /** 通用二进制数据流 */
    OCTET_STREAM: "application/octet-stream",
    /** URL 编码表单 */
    FORM_URLENCODED: "application/x-www-form-urlencoded",
    /** multipart 表单 */
    FORM_DATA: "multipart/form-data",
    /** Server-Sent Events 数据流 */
    EVENT_STREAM: "text/event-stream",
    /** 问题详情 JSON（RFC 9457） */
    PROBLEM_JSON: "application/problem+json",
    /** JSON Patch（RFC 6902） */
    JSON_PATCH: "application/json-patch+json",
    /** JSON Merge Patch（RFC 7386） */
    MERGE_PATCH_JSON: "application/merge-patch+json",
  } as const;
}
