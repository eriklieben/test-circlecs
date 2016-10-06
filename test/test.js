var chai = require('chai');
var assert = chai.assert;
var path  = require('path');
var Registry = require('vscode-textmate').Registry;
var registry = new Registry();
registry.loadGrammarFromPathSync('./html.json');
var grammar = registry.grammarForScopeName('au.html');

function tokenizeLine(line) {
  return grammar.tokenizeLine(line, undefined);
}

function getTokenOnCharRange(
  lineToken,
  startIndex,
  endIndex) {

  var tokens = lineToken.tokens.filter(token => token.startIndex === startIndex && token.endIndex === endIndex);
  return tokens.length === 1 ? tokens[0] : null;
}

function hasScope(scopes, scope) {
  var foundScopes = scopes.filter(s => s === scope);
  return foundScopes.length === 1;
}



describe('bindable', function() {

  it('token', function() {

    // arrange
    var scope = 'bindable.attribute.html.au';

    // act
    var lineToken = tokenizeLine('<template bindable="greeting,name">');

    // assert
    var token = getTokenOnCharRange(lineToken, 10, 18);
    assert.equal(hasScope(token.scopes, scope), true);
  });
});
