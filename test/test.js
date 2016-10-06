var chai = require('chai');
var assert = chai.assert;
let path  = require('path');
let Registry = require('vscode-textmate').Registry;
let registry = new Registry();
registry.loadGrammarFromPathSync('./html.json');
let grammar = registry.grammarForScopeName('au.html');

function tokenizeLine(line) {
  return grammar.tokenizeLine(line, undefined);
}

function getTokenOnCharRange(
  lineToken,
  startIndex,
  endIndex) {

  let tokens = lineToken.tokens.filter(token => token.startIndex === startIndex && token.endIndex === endIndex);
  return tokens.length === 1 ? tokens[0] : null;
}

function hasScope(scopes, scope) {
  let foundScopes = scopes.filter(s => s === scope);
  return foundScopes.length === 1;
}



describe('bindable', function() {

  it('token', function() {

    // arrange
    let scope = 'bindable.attribute.html.au';

    // act
    let lineToken = tokenizeLine('<template bindable="greeting,name">');

    // assert
    let token = getTokenOnCharRange(lineToken, 10, 18);
    assert.equal(hasScope(token.scopes, scope), true);
  });
});
