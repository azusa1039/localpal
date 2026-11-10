import {renderMarkdown} from '../renderMarkdown';

describe('standalone italic Markdown paragraphs', () => {
  it.each([
    '*quiet narration*',
    '_quiet narration_',
    '*first line\nsecond line*',
  ])('marks a whole emphasized paragraph: %s', source => {
    expect(renderMarkdown(source)).toContain(
      '<p class="standalone-italic"><em>',
    );
  });

  it.each([
    'Normal *inline* text',
    '**bold**',
    '*italic* and *another italic*',
    '# *heading*',
    '> *quotation*',
    '- *list item*',
    '```text\n*code*\n```',
    '\\*literal asterisks\\*',
    '*an unfinished stream',
  ])('does not recolor other Markdown: %s', source => {
    expect(renderMarkdown(source)).not.toContain('class="standalone-italic"');
  });

  it('preserves surrounding blocks, nested inline formatting and reference links', () => {
    const source =
      '# Heading\n\nNormal *inline*.\n\n*Quiet **bold** [link][ref].*\n\n| A | B |\n| - | - |\n| x | y |\n\n[ref]: https://example.com';
    const result = renderMarkdown(source);
    expect(result).toContain('<h1>Heading</h1>');
    expect(result).toContain('<p>Normal <em>inline</em>.</p>');
    expect(result).toContain(
      '<p class="standalone-italic"><em>Quiet <strong>bold</strong> <a href="https://example.com">link</a>.</em></p>',
    );
    expect(result).toContain('<table>');
    expect(source).toContain('[ref]: https://example.com');
  });

  it('re-evaluates the current stream without retaining earlier paragraph styles', () => {
    expect(renderMarkdown('*quiet')).not.toContain('standalone-italic');
    expect(renderMarkdown('*quiet*')).toContain('standalone-italic');
    expect(renderMarkdown('*quiet* continues')).not.toContain(
      'standalone-italic',
    );
  });
});
