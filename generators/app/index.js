const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option("name", { type: String, required: true });
  }

  install() {
    this.spawnCommand("go", ["mod", "init", this.option.name]);
    this.spawnCommand("go", ["mod", "tidy"]);
  }

  writing() {
    this.log("--> writing");
    this._writingServiceTemplate();
  }

  _writingServiceTemplate() {
    this.fs.copy(
      this.templatePath("service"),
      this.destinationPath(this.option.name)
    );
  }
};
