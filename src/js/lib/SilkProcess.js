class SilkProcess {
  constructor(mainProcess, options, subProcesses) {
    this.mainProcess = mainProcess;
    this.options = options;
    this.subProcesses = subProcesses;
  }

  appendProcess(subProcess) {
    this.subProcesses.push(subProcess);
  }

  insertProcess(subProcess, index) {
    this.subProcesses.splice(index, 0, subProcess);
  }

  removeProcess(subProcess) {
    let index = this.children.indexOf(subProcess);
    if (index > -1) {
      this.subProcesses.splice(index, 1);
      return;
    }
    this.subProcesses.forEach(function(p) {
      let index = p.subProcesses.indexOf(childElement);
      if (index > -1) {
        p.subProcesses.splice(index, 1);
        return;
      }
      return p.removeChild(childElement);
    });
  }

}
