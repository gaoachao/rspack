const { ECompilerType } = require("../..");

class MyPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap("Plugin", compilation => {
			compilation.hooks.processAssets.tap("Plugin", () => {
				let list = compilation.getAssets();
				let map = compilation.assets;

				expect(Object.keys(map)).toHaveLength(list.length);

				list.forEach(a => {
					const b = map[a.name];
					expect(a.source.buffer()).toEqual(b.buffer());
				});
			});
		});
	}
}

module.exports = {
	description: "should get assets with both `getAssets` and `assets`(getter)",
	name: __filename,
	compilerType: ECompilerType.Rspack,
	options(context) {
		return {
			context: context.getSource(),
			entry: "./d",
			plugins: [new MyPlugin()]
		};
	}
};
