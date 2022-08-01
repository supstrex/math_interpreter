export function lexer(input) {
  let tokens = [],
    c,
    i = 0;
  function isOperator(c) {
    return /[+\-*\/\^%=(),]/.test(c);
  }
  function isDigit(c) {
    return /[0-9]/.test(c);
  }
  function isWhiteSpace(c) {
    return /\s/.test(c);
  }
  function isIdentifier(c) {
    return (
      typeof c === "string" && !isOperator(c) && !isDigit(c) && !isWhiteSpace(c)
    );
  }
  function advance() {
    return (c = input[++i]);
  }
  function addToken(type, value) {
    tokens.push({
      type,
      value,
    });
  }

  while (i < input.length) {
    c = input[i];
    if (isWhiteSpace(c)) {
      advance();
    } else if (isOperator(c)) {
      addToken(c);
      advance();
    } else if (isDigit(c)) {
      let num = c;
      while (isDigit(advance())) {
        num += c;
      }
      if (c === ".") {
        do num += c;
        while (isDigit(advance()));
      }
      num = parseFloat(num);
      if (!isFinite(num)) {
        throw "Number is too large or too small";
      }
      addToken("number", num);
    } else if (isIdentifier(c)) {
      let idn = c;
      while (isIdentifier(advance())) {
        idn += c;
      }
      addToken("identifier", idn);
    } else {
      throw "Unrecognized token.";
    }
  }
  addToken("(end)");
  return tokens;
}

