const MODULE = "common/types/react";

module.exports = {
  meta: {
    type: "problem",
    docs: {
      url: "https://changelog.com/posts/the-react-reactnode-type-is-a-black-hole",
      description: `Enforces never using React.ReactNode as the typing is wrong.`,
      category: "react",
      recommended: true,
    },
    fixable: "code",
    messages: {
      noUse: `React.ReactNode is considered unsafe. Use StrictReactNode from \`${MODULE}\` instead.`,
    },
  },
  create({ report }) {
    let alreadyImported = false;

    return {
      ImportDeclaration(node) {
        if (
          node.source.value === MODULE &&
          node.specifiers.find(
            (specifier) => specifier.imported.name === "StrictReactNode"
          )
        ) {
          alreadyImported = true;
        }
      },
      TSTypeReference(node) {
        if (
          (node.typeName.type === "TSQualifiedName" &&
            node.typeName.left.name === "React" &&
            node.typeName.right.name === "ReactNode") ||
          (node.typeName.type === "Identifier" &&
            node.typeName.name === "ReactNode")
        ) {
          report({
            node,
            messageId: "noUse",
            fix: (fixer) => {
              const fixers = [fixer.replaceText(node, "StrictReactNode")];

              if (!alreadyImported) {
                fixers.push(
                  fixer.insertTextBeforeRange(
                    [0, 0],
                    `import { StrictReactNode } from "${MODULE}";\n`
                  )
                );
                alreadyImported = true;
              }

              return fixers;
            },
          });
        }
      },
    };
  },
};
