class DemoController {
  constructor() {}

  async demo (ctx) {
    ctx.body = {
      msg: "demo message"
    }
  }
}

export default new DemoController()