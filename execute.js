import { lexer } from "./lexer.js";
import { parse } from "./parser.js";
import { evaluate } from "./evaluator.js";

function execute(input) {
  try {
    let tokens = lexer(input);
    let parseTree = parse(tokens);
    let output = evaluate(parseTree);
    return output;
  } catch (e) {
    return e;
  }
}

//execute code like a Matematical expression.
//exp: 1 + 2 * 500;
//you can use identifiers as well 
//num = 1 + 2 * 500 * 5 + 10 num + 3
console.log(execute("(12 % 7) * (3 + 2)"));
