const slugify = require('../../../../src/models/plugins/slugify.plugin');

describe('slugify', () => {
  it('should convert a string to a slug', () => {
    const input = 'Hello World!';
    const expectedOutput = 'hello-world';
    const output = slugify(input);
    expect(output).toEqual(expectedOutput);
  });

  it('should handle special characters', () => {
    const input = 'This is a test with @#$% special characters';
    const expectedOutput = 'this-is-a-test-with-special-characters';
    const output = slugify(input);
    expect(output).toEqual(expectedOutput);
  });

  it('should handle multiple spaces', () => {
    const input = '   Multiple    Spaces   ';
    const expectedOutput = 'multiple-spaces';
    const output = slugify(input);
    expect(output).toEqual(expectedOutput);
  });
});
