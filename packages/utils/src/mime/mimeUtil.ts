import { StringUtil } from "../string";

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
    XML_LEGACY: "text/xml",
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
    YAML_LEGACY: "text/vnd.yaml",
    /** TOML 文档（.toml） */
    TOML: "application/toml",
    /** TOML 文档/兼容值 */
    TOML_LEGACY: "text/x-toml",
    /** SQL 脚本（.sql） */
    SQL: "application/sql",
    /** SQL 脚本/兼容值 */
    SQL_LEGACY: "text/x-sql",
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
    /** 图标文件格式/兼容值（.ico） */
    ICO_LEGACY: "image/x-icon",
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
    /** Matroska 视频（.mkv） */
    MKV: "video/x-matroska",
    /** Matroska 音频（.mka） */
    MKA: "audio/x-matroska",
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

  /**
   * 根据文件后缀名获取对应的标准 MIME 类型（含历史兼容值）
   * - 支持带 `.` 或不带 `.` 的后缀名，不区分大小写
   * - 元组第一项始终为 IANA 官方标准 MIME，后续项为历史兼容值
   * - 仅查询文件类型 MIME，不包含无后缀对应的协议类型
   *
   * @param extension 文件后缀名（如 `".png"` / `"png"` / `".PNG"`）
   * @returns 标准 MIME + 兼容值的元组；如无匹配则返回 `undefined`
   * @example
   * ```ts
   * MimeUtil.fromExtension(".png");  // ["image/png"]
   * MimeUtil.fromExtension("ico");   // ["image/vnd.microsoft.icon", "image/x-icon"]
   * MimeUtil.fromExtension(".xml");  // ["application/xml", "text/xml"]
   * MimeUtil.fromExtension(".xyz");  // undefined
   * ```
   */
  static fromExtension (extension: string): readonly [string, ...string[]] | undefined {
    const ext = StringUtil.cast(extension).toLowerCase();
    const key = ext.startsWith(".") ? ext : `.${ext}`;

    return EXT_TO_MIME[key];
  }

  /**
   * 根据 MIME 类型获取对应的文件后缀名列表
   * - 一个 MIME 类型可能对应多个后缀名（如 `text/html` → `.html` / `.htm`）
   * - 兼容值和标准值映射到相同的后缀（如 `image/x-icon` 和 `image/vnd.microsoft.icon` 均返回 `[".ico"]`）
   * - 仅查询文件类型 MIME，协议类型无对应后缀
   *
   * @param mime MIME 类型字符串（如 `"image/png"` / `"IMAGE/PNG"`）
   * @returns 文件后缀名列表；如无匹配则返回 `undefined`
   * @example
   * ```ts
   * MimeUtil.toExtension("IMAGE/PNG");                    // [".png"]
   * MimeUtil.toExtension("text/html");                    // [".html", ".htm"]
   * MimeUtil.toExtension("image/jpeg");                   // [".jpg", ".jpeg"]
   * MimeUtil.toExtension("application/octet-stream");     // undefined
   * ```
   */
  static toExtension (mime: string): readonly [string, ...string[]] | undefined {
    const m = StringUtil.cast(mime).toLowerCase();

    return MIME_TO_EXT.get(m);
  }
}

const EXT_TO_MIME: Record<string, readonly [string, ...string[]]> = {
  ".txt": [MimeUtil.FILE_MIME.TEXT],
  ".html": [MimeUtil.FILE_MIME.HTML],
  ".htm": [MimeUtil.FILE_MIME.HTML],
  ".css": [MimeUtil.FILE_MIME.CSS],
  ".csv": [MimeUtil.FILE_MIME.CSV],
  ".tsv": [MimeUtil.FILE_MIME.TSV],
  ".xml": [MimeUtil.FILE_MIME.XML, MimeUtil.FILE_MIME.XML_LEGACY],
  ".xhtml": [MimeUtil.FILE_MIME.XHTML],
  ".xht": [MimeUtil.FILE_MIME.XHTML],
  ".js": [MimeUtil.FILE_MIME.JS],
  ".ts": [MimeUtil.FILE_MIME.TS],
  ".py": [MimeUtil.FILE_MIME.PY],
  ".sh": [MimeUtil.FILE_MIME.SH],
  ".c": [MimeUtil.FILE_MIME.C],
  ".cpp": [MimeUtil.FILE_MIME.CPP],
  ".cc": [MimeUtil.FILE_MIME.CPP],
  ".cxx": [MimeUtil.FILE_MIME.CPP],
  ".cs": [MimeUtil.FILE_MIME.CSHARP],
  ".java": [MimeUtil.FILE_MIME.JAVA],
  ".go": [MimeUtil.FILE_MIME.GO],
  ".rs": [MimeUtil.FILE_MIME.RUST],
  ".php": [MimeUtil.FILE_MIME.PHP],
  ".rb": [MimeUtil.FILE_MIME.RUBY],
  ".swift": [MimeUtil.FILE_MIME.SWIFT],
  ".yaml": [MimeUtil.FILE_MIME.YAML, MimeUtil.FILE_MIME.YAML_LEGACY],
  ".yml": [MimeUtil.FILE_MIME.YAML, MimeUtil.FILE_MIME.YAML_LEGACY],
  ".toml": [MimeUtil.FILE_MIME.TOML, MimeUtil.FILE_MIME.TOML_LEGACY],
  ".sql": [MimeUtil.FILE_MIME.SQL, MimeUtil.FILE_MIME.SQL_LEGACY],
  ".md": [MimeUtil.FILE_MIME.MARKDOWN],
  ".markdown": [MimeUtil.FILE_MIME.MARKDOWN],
  ".rtf": [MimeUtil.FILE_MIME.RTF],
  ".ics": [MimeUtil.FILE_MIME.CALENDAR],
  ".jpg": [MimeUtil.FILE_MIME.JPEG],
  ".jpeg": [MimeUtil.FILE_MIME.JPEG],
  ".png": [MimeUtil.FILE_MIME.PNG],
  ".gif": [MimeUtil.FILE_MIME.GIF],
  ".bmp": [MimeUtil.FILE_MIME.BMP],
  ".svg": [MimeUtil.FILE_MIME.SVG],
  ".apng": [MimeUtil.FILE_MIME.APNG],
  ".avif": [MimeUtil.FILE_MIME.AVIF],
  ".ico": [MimeUtil.FILE_MIME.ICO, MimeUtil.FILE_MIME.ICO_LEGACY],
  ".webp": [MimeUtil.FILE_MIME.WEBP],
  ".tif": [MimeUtil.FILE_MIME.TIFF],
  ".tiff": [MimeUtil.FILE_MIME.TIFF],
  ".heic": [MimeUtil.FILE_MIME.HEIC],
  ".heif": [MimeUtil.FILE_MIME.HEIF],
  ".psd": [MimeUtil.FILE_MIME.PSD],
  ".mp3": [MimeUtil.FILE_MIME.MP3],
  ".aac": [MimeUtil.FILE_MIME.AAC],
  ".mid": [MimeUtil.FILE_MIME.MIDI],
  ".midi": [MimeUtil.FILE_MIME.MIDI],
  ".oga": [MimeUtil.FILE_MIME.OGG_AUDIO],
  ".opus": [MimeUtil.FILE_MIME.OPUS],
  ".flac": [MimeUtil.FILE_MIME.FLAC],
  ".wav": [MimeUtil.FILE_MIME.WAV],
  ".weba": [MimeUtil.FILE_MIME.WEBM_AUDIO],
  ".ra": [MimeUtil.FILE_MIME.REAL_AUDIO],
  ".ram": [MimeUtil.FILE_MIME.REAL_AUDIO],
  ".mp4": [MimeUtil.FILE_MIME.MP4],
  ".mpeg": [MimeUtil.FILE_MIME.MPEG],
  ".mpg": [MimeUtil.FILE_MIME.MPEG],
  ".ogv": [MimeUtil.FILE_MIME.OGG_VIDEO],
  ".avi": [MimeUtil.FILE_MIME.AVI],
  ".3gp": [MimeUtil.FILE_MIME.THREE_GPP],
  ".3g2": [MimeUtil.FILE_MIME.THREE_GPP2],
  ".webm": [MimeUtil.FILE_MIME.WEBM],
  ".mkv": [MimeUtil.FILE_MIME.MKV],
  ".mka": [MimeUtil.FILE_MIME.MKA],
  ".mov": [MimeUtil.FILE_MIME.QUICKTIME],
  ".pdf": [MimeUtil.FILE_MIME.PDF],
  ".doc": [MimeUtil.FILE_MIME.DOC],
  ".docx": [MimeUtil.FILE_MIME.DOCX],
  ".xlsx": [MimeUtil.FILE_MIME.XLSX],
  ".xlsm": [MimeUtil.FILE_MIME.XLSM],
  ".xltx": [MimeUtil.FILE_MIME.XLTX],
  ".pptx": [MimeUtil.FILE_MIME.PPTX],
  ".ppt": [MimeUtil.FILE_MIME.PPT],
  ".odt": [MimeUtil.FILE_MIME.ODT],
  ".ods": [MimeUtil.FILE_MIME.ODS],
  ".odp": [MimeUtil.FILE_MIME.ODP],
  ".epub": [MimeUtil.FILE_MIME.EPUB],
  ".azw": [MimeUtil.FILE_MIME.AZW],
  ".zip": [MimeUtil.FILE_MIME.ZIP],
  ".gz": [MimeUtil.FILE_MIME.GZIP],
  ".tar": [MimeUtil.FILE_MIME.TAR],
  ".bz": [MimeUtil.FILE_MIME.BZIP],
  ".bz2": [MimeUtil.FILE_MIME.BZIP2],
  ".7z": [MimeUtil.FILE_MIME.SEVEN_Z],
  ".rar": [MimeUtil.FILE_MIME.RAR],
  ".xz": [MimeUtil.FILE_MIME.XZ],
  ".zst": [MimeUtil.FILE_MIME.ZSTD],
  ".iso": [MimeUtil.FILE_MIME.ISO9660_IMAGE],
  ".json": [MimeUtil.FILE_MIME.JSON],
  ".jsonld": [MimeUtil.FILE_MIME.LD_JSON],
  ".webmanifest": [MimeUtil.FILE_MIME.MANIFEST],
  ".jar": [MimeUtil.FILE_MIME.JAR],
  ".wasm": [MimeUtil.FILE_MIME.WASM],
  ".eot": [MimeUtil.FILE_MIME.EOT],
  ".otf": [MimeUtil.FILE_MIME.OTF],
  ".woff": [MimeUtil.FILE_MIME.WOFF],
  ".woff2": [MimeUtil.FILE_MIME.WOFF2],
  ".ttf": [MimeUtil.FILE_MIME.TTF],
  ".xls": [MimeUtil.FILE_MIME.XLS],
  ".xps": [MimeUtil.FILE_MIME.XPS],
  ".docm": [MimeUtil.FILE_MIME.DOCM],
};

const MIME_TO_EXT: ReadonlyMap<string, readonly [string, ...string[]]> = (() => {
  const map = new Map<string, [string, ...string[]]>();

  for (const [ext, mimes] of Object.entries(EXT_TO_MIME)) {
    for (const mime of mimes) {
      const exts = map.get(mime);

      if (exts) {
        if (!exts.includes(ext)) {
          exts.push(ext);
        }
      } else {
        map.set(mime, [ext]);
      }
    }
  }

  return map;
})();
