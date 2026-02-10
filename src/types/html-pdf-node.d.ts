declare module "html-pdf-node" {
  type HtmlContent = {
    url?: string;
    path?: string;
    content?: string;
  };

  interface PdfOptions {
    format?: string;
    width?: string;
    height?: string;
    margin?: {
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
    };
    printBackground?: boolean;
    preferCSSPageSize?: boolean;
  }

  export function generatePdf(content: HtmlContent, options?: PdfOptions): Promise<Buffer>;
  const _default: { generatePdf: typeof generatePdf };
  export default _default;
}
