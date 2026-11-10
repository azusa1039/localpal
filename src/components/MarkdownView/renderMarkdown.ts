import {Marked, type Tokens} from 'marked';

const parser = new Marked({
  extensions: [
    {
      name: 'localpalItalicParagraph',
      level: 'block',
      renderer(token) {
        return `<p class="standalone-italic">${this.parser.parseInline(
          (token as Tokens.Paragraph).tokens,
        )}</p>\n`;
      },
    },
  ],
});

/** Only complete, top-level paragraphs whose entire content is emphasis.
 * Inline emphasis, lists, quotes, headings and fenced code keep their styles.
 * Parsing tokens (rather than HTML or raw-text regexes) also preserves links.
 */
export const renderMarkdown = (markdown: string): string => {
  const tokens = parser.lexer(markdown);
  tokens.forEach((token, index) => {
    if (token.type !== 'paragraph' || !token.tokens) {
      return;
    }
    const content = token.tokens.filter(
      child => child.type !== 'text' || child.text.trim() !== '',
    );
    if (content.length === 1 && content[0].type === 'em') {
      tokens[index] = {...token, type: 'localpalItalicParagraph'};
    }
  });
  return parser.parser(tokens);
};
