class TaskControll {
  constructor(options) {
    this.maxTaskNum = 5;
    this.curTask = null;
    this.curTaskList = [];
    this.willTaskList = [];
    this.errorTaskList = [];
    Object.assign(this, options);
  }

  add(task) {
    this.willTaskList.push(task);
    this.run();
  }

  run() {
    while (
      this.willTaskList.length &&
      this.curTaskList.length < this.maxTaskNum
    ) {
      let task = this.willTaskList[0];
      this.willTaskList.shift();
      this.curTaskList.push(task);
      task.run(
        (...args) => {
          this.done(task, ...args);
        },
        () => {
          this.error(task);
        }
      );
    }
  }

  done(task) {
    setTimeout(() => {
      task.success && task.success();
      this.curTaskList.splice(
        this.curTaskList.findIndex(item => item === task),
        1
      );
      this.run();
    }, 1000);
  }

  error(task) {
    this.errorTaskList.push(
      ...this.curTaskList.splice(
        this.curTaskList.findIndex(item => item === task),
        1
      )
    );
    this.run();
  }
}

exports.TaskControll = TaskControll;
