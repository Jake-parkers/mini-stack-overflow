module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "testMatch": [
      "**/**/*Test.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    globals: {
        'ts-jest': {
            isolatedModules: true
        }
    }
  }