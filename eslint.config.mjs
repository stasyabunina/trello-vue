import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";
import prettierVue from "eslint-plugin-prettier-vue";
import pluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
	...pluginVue.configs["flat/recommended"],
	{
		plugins: {
			jsdoc: jsdoc,
			prettier: prettierVue,
		},
		languageOptions: {
			ecmaVersion: 2021,
			sourceType: "module",
			globals: {
				...globals.browser,
				...globals.es2021,
				Masonry: "readonly",
			},
		},
		rules: {
			// ECMAScript 6
			// http://eslint.org/docs/rules/#ecmascript-6
			// ------------------------------------------
			"no-cond-assign": "error", // eslint:recommended
			"no-irregular-whitespace": "error", // eslint:recommended
			"no-unexpected-multiline": "error", // eslint:recommended
			"jsdoc/require-description": "warn",

			"prettier/prettier": "error",

			"no-console": "error",
			"no-constant-condition": "error",
			"no-control-regex": "error",
			"no-debugger": "error",
			"no-dupe-keys": "error",
			"no-dupe-args": "error",
			"no-duplicate-case": "error",
			"no-empty": "error",
			"no-empty-character-class": "error",
			"no-ex-assign": "error",
			"no-extra-boolean-cast": "error",
			"no-extra-semi": "error",
			"no-func-assign": "error",
			"no-inner-declarations": ["error", "functions"],
			"no-invalid-regexp": "error",
			"no-unsafe-negation": "error",
			"no-obj-calls": "error",
			"no-regex-spaces": "error",
			"no-sparse-arrays": "error",
			"no-unreachable": "error",
			"use-isnan": "error",
			"valid-typeof": "error",

			// Best Practices
			// http://eslint.org/docs/rules/#best-practices
			// --------------------------------------------

			"guard-for-in": "error",
			"max-nested-callbacks": ["error", { max: 3 }],
			"no-caller": "error",
			"no-extend-native": "error",
			"no-extra-bind": "error",
			"no-invalid-this": "error",
			"no-multi-spaces": "error",
			"no-multi-str": "error",
			"no-new-wrappers": "error",
			"no-throw-literal": "error", // eslint:recommended
			"no-with": "error",
			"consistent-return": "error",
			curly: ["error", "all"],
			eqeqeq: "error",
			"no-alert": "error",
			"no-eval": "error",
			"no-fallthrough": "error",
			"no-floating-decimal": "error",
			"no-implied-eval": "error",
			"no-iterator": "error",
			"no-labels": "error",
			"no-lone-blocks": "error",
			"no-global-assign": "error",
			"no-new": "error",
			"no-new-func": "error",
			"no-octal": "error", // default
			"no-octal-escape": "error",
			"no-proto": "error",
			"no-redeclare": "error", // default
			"no-return-assign": "error",
			"no-script-url": "error",
			"no-sequences": "error",
			"no-unused-expressions": "error",
			radix: "error",

			// Variables
			// http://eslint.org/docs/rules/#variables
			// ---------------------------------------
			"no-unused-vars": [
				"error",
				{ args: "after-used", argsIgnorePattern: "^_" },
			], // check that all args are used¬
			"no-delete-var": "error", // eslint:recommended
			"no-label-var": "error",
			"no-shadow": "error",
			"no-shadow-restricted-names": "error",
			"no-undef": "error", // default
			"no-undef-init": "error",
			"no-undefined": "warn",

			// Node.js and CommonJS
			// http://eslint.org/docs/rules/#nodejs-and-commonjs
			// -------------------------------------------------
			"no-process-exit": "error",

			// Stylistic Issues
			// http://eslint.org/docs/rules/#stylistic-issues
			// ----------------------------------------------
			indent: [
				"error",
				2,
				{
					SwitchCase: 1,
					// continuation indent
					VariableDeclarator: 1, // indent is multiplier * indent = 1 * 2
					MemberExpression: 2, // indent is multiplier * indent = 2 * 2
					FunctionDeclaration: { parameters: 2 },
					FunctionExpression: { parameters: 2 },
					CallExpression: { arguments: 2 },
				},
			],
			"block-spacing": ["error", "always"],
			"array-bracket-spacing": ["error", "never"],
			"brace-style": "error",
			camelcase: "error",
			"comma-spacing": "error",
			"comma-style": "error",
			"computed-property-spacing": "error",
			"eol-last": "error",
			"func-call-spacing": "error",
			"key-spacing": "error",
			"keyword-spacing": "error",
			"linebreak-style": "off", // check this in git
			"new-cap": "error",
			"no-array-constructor": "error",
			"no-mixed-spaces-and-tabs": "error", // eslint:recommended
			"no-multiple-empty-lines": ["error", { max: 2 }],
			"no-new-object": "error",
			"no-trailing-spaces": "error",
			"object-curly-spacing": "error",
			"one-var": [
				"error",
				{
					var: "never",
					let: "never",
					const: "never",
				},
			],
			"padded-blocks": ["off", "never"],
			"quote-props": ["error", "consistent"],
			"semi-spacing": "error",
			semi: "error",
			"space-in-parens": ["error", "never"],
			"space-before-blocks": "error",
			"space-before-function-paren": [
				"error",
				{ named: "never", anonymous: "always" },
			],
			"spaced-comment": ["error", "always"],
			"unicode-bom": "warn",
			"new-parens": "error",
			"no-nested-ternary": "error",
			"space-infix-ops": "error",
			"space-unary-ops": ["error", { words: true, nonwords: false }],
			yoda: ["error", "never"],

			"arrow-parens": ["error", "always"],

			// parens are optional but recommended.
			// ESLint doesn't support a *consistent*
			// setting so "always" is used.
			"constructor-super": "error", // eslint:recommended
			"generator-star-spacing": ["error", "after"],
			"no-new-symbol": "error", // eslint:recommended
			"no-this-before-super": "error", // eslint:recommended
			"no-var": "error",
			"prefer-rest-params": "error",
			"prefer-spread": "error",
			"rest-spread-spacing": "error",
			"yield-star-spacing": ["error", "after"],
			"object-shorthand": ["error", "always", { avoidQuotes: true }],

			"comma-dangle": [
				"error",
				{
					arrays: "never",
					objects: "always-multiline",
					imports: "never",
					exports: "never",
					functions: "never",
				},
			],
			"vue/order-in-components": [
				"error",
				{
					order: [
						"name",
						"directives",
						"components",
						"mixins",
						["provide", "inject"],
						"model",
						"props",
						"filters",
						"data",
						"computed",
						"watch",
						"methods",
						"LIFECYCLE_HOOKS",
						"ROUTER_GUARDS",
					],
				},
			],
			"vue/v-for-delimiter-style": ["error", "of"],
			"vue/next-tick-style": ["error", "promise"],
			"vue/require-prop-types": "error",
			"vue/prop-name-casing": ["error", "camelCase"],
			"vue/component-name-in-template-casing": ["error", "PascalCase"],
			"vue/component-definition-name-casing": ["error", "PascalCase"],
			"vue/custom-event-name-casing": ["error", "camelCase"],
			"vue/no-duplicate-attr-inheritance": "error",
			"vue/this-in-template": ["error", "never"],
			"vue/v-on-style": ["error", "shorthand"],
			"vue/no-multi-spaces": "error",
			"vue/padding-line-between-blocks": "error",
			"vue/component-tags-order": [
				"error",
				{
					order: ["template", "script", "style"],
				},
			],
			"vue/v-on-event-hyphenation": ["error", "never"],
			"vue/attribute-hyphenation": ["error", "never"],
			"vue/v-bind-style": "error",
			"vue/v-slot-style": ["error", "shorthand"],
			"vue/no-unused-properties": [
				"error",
				{
					groups: ["props", "data", "computed", "methods", "setup"],
					ignorePublicMembers: true,
				},
			],
			quotes: ["error", "single"],
		},
		ignores: ["./dist/**/*.js"],
	},
	eslintConfigPrettier,
];
