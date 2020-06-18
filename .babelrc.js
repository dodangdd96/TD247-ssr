const env = require('./env-config');

module.exports = {
	"presets": ["next/babel"],
	"plugins": [
		['transform-define', env],
	  ["@babel/plugin-proposal-optional-chaining"],
	  [
			"wrap-in-js",
		{
		  "extensions": ["css$", "scss$"]
		}
	  ],
	  [	"@babel/plugin-proposal-decorators", { "legacy": true }	],
	  [
			"module-resolver",
			{
				"root": ["."]
			}
	  ],
	  ["lodash"],
	  [
			"import",
		{
		  "libraryName": "antd"
		}
	  ]
	],
	"ignore": []
}