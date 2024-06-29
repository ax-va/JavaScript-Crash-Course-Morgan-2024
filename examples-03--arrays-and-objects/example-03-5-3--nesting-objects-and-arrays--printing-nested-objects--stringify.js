let nested = {
    name: "Outer",
    content: {
        name: "Middle",
        content: {
            name: "Inner",
            content: "Whoa…"
        }
    }
};

JSON.stringify(nested);
// '{"name":"Outer","content":{"name":"Middle","content":{"name":"Inner","content":"Whoa…"}}}'

nestedJSON = JSON.stringify(nested, null, 2);
// '{\n  "name": "Outer",\n  "content": {\n    "name": "Middle",\n    "content": {\n      "name": "Inner",\n      "content": "Whoa…"\n    }\n  }\n}'

console.log(nestedJSON)
/*
{
  "name": "Outer",
  "content": {
    "name": "Middle",
    "content": {
      "name": "Inner",
      "content": "Whoa…"
    }
  }
}
 */