const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('name', { type: String, required: true });
  }

  install() {
    const directory = this.destinationRoot(this.options.name);
    this.spawnCommandSync('cd', [directory]);
    this.spawnCommandSync('go', ['mod', 'init', this.options.name]);
    this.spawnCommandSync('go', ['mod', 'tidy']);
  }

  writing() {
    this._writingServiceTemplate();
  }

  _writingServiceTemplate() {
    this.fs.copy(
      this.templatePath('service'),
      this.destinationPath(this.options.name)
    );
  }
};
