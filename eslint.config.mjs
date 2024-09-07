import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import stylistic from "@stylistic/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import jest from "eslint-plugin-jest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["lib"],
}, ...fixupConfigRules(compat.extends(
    "standard",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:json/recommended-legacy",
    "plugin:jest/recommended",
)), {
    plugins: {
        "@stylistic": stylistic,
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            describe: "readonly",
            test: "readonly",
            jest: "readonly",
            expect: "readonly",
            fetch: "readonly",
            navigator: "readonly",
            __DEV__: "readonly",
            XMLHttpRequest: "readonly",
            FormData: "readonly",
            React$Element: "readonly",
            requestAnimationFrame: "readonly",
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "react/react-in-jsx-scope": 0,
        "@stylistic/no-explicit-any": "off",
        "react/no-unknown-property": 0,

        indent: ["error", 2, {
            SwitchCase: 1,
            VariableDeclarator: "first",
            ignoredNodes: ["TemplateLiteral"],
        }],

        "template-curly-spacing": "off",
        "linebreak-style": ["off", "unix"],
        quotes: ["error", "single"],
        "jsx-quotes": ["error", "prefer-single"],
        "@stylistic/semi": ["error", "never"],

        "@stylistic/member-delimiter-style": ["error", {
            multiline: {
                delimiter: "none",
                requireLast: true,
            },

            singleline: {
                delimiter: "comma",
                requireLast: false,
            },
        }],

        "comma-dangle": ["error", {
            arrays: "always-multiline",
            objects: "always-multiline",
            imports: "always-multiline",
            exports: "never",
            functions: "never",
        }],

        "arrow-parens": ["error", "as-needed"],
        "no-func-assign": "off",
        "no-class-assign": "off",
        "no-useless-escape": "off",
        curly: [2, "multi", "consistent"],
        "react/prop-types": "off",
        "react/display-name": "off",

        "react-hooks/exhaustive-deps": ["warn", {
            additionalHooks: "(useAnimatedStyle|useSharedValue|useAnimatedGestureHandler|useAnimatedScrollHandler|useAnimatedProps|useDerivedValue|useAnimatedRef|useAnimatedReact|useAnimatedReaction)",
        }],

        "no-unused-vars": ["error"],

        "brace-style": ["error", "1tbs", {
            allowSingleLine: false,
        }],

        "nonblock-statement-body-position": ["error", "below"],
        "@stylistic/jsx-closing-bracket-location": ["error", "line-aligned"],
        "no-unreachable": "error",
    },
}, {
    files: ["**/.eslintrc.{js,cjs}"],

    languageOptions: {
        globals: {
            ...globals.node,
        },

        ecmaVersion: 5,
        sourceType: "commonjs",

        parserOptions: {
            project: "./tsconfig.json",
        },
    },
}, {
    files: ["tests/**/*"],

    plugins: {
        jest: fixupPluginRules(jest),
    },

    languageOptions: {
        globals: {
            ...jest.environments.globals.globals,
        },
    },
}];