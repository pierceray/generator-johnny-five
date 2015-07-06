module.exports = {
  files: [
    'Gruntfile.js',
    'grunt/**/*.js',
    'generators/**/*.js',
    //blacklist
    '!**/node_modules/**',
    '!**/templates/**'
  ],
  options: {
    js: {
      braceStyle: "collapse",
      breakChainedMethods: false,
      e4x: false,
      evalCode: false,
      indentChar: " ",
      indentLevel: 0,
      indentSize: 2,
      indentWithTabs: false,
      jslintHappy: false,
      keepArrayIndentation: false,
      keepFunctionIndentation: false,
      maxPreserveNewlines: 10,
      preserveNewlines: true,
      spaceBeforeConditional: true,
      spaceInParen: false,
      unescapeStrings: false,
      wrapLineLength: 0
    }
  }
}
