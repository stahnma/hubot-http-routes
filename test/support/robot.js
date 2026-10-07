// Boots a real Hubot with an in-memory adapter that records what the robot
// says, so tests can drive scripts without an external test helper.
const path = require('path');

const root = path.resolve(__dirname, '..', '..');

async function createRobot(scripts, { adapterName = 'TestAdapter' } = {}) {
  const { Robot, Adapter, TextMessage, User } = await import('hubot');

  const messages = [];

  class TestAdapter extends Adapter {
    constructor(robot) {
      super(robot);
      this.name = adapterName;
    }

    async send(envelope, ...strings) {
      strings.forEach(str => messages.push(['hubot', str]));
    }

    async reply(envelope, ...strings) {
      strings.forEach(str => messages.push(['hubot', `@${envelope.user.name} ${str}`]));
    }
  }

  const robot = new Robot({ use: r => new TestAdapter(r) }, true, 'hubot');
  await robot.loadAdapter();
  // Express is only set up (and robot.router assigned) by run().
  await robot.run();

  for (const script of scripts) {
    const full = path.resolve(root, script);
    await robot.loadFile(path.dirname(full), path.basename(full));
  }

  const user = new User('1', { name: 'alice', room: 'room1' });

  return {
    robot,
    messages,
    async say(text) {
      messages.push([user.name, text]);
      await robot.receive(new TextMessage(user, text, `${messages.length}`));
    },
    destroy() {
      robot.shutdown();
    },
  };
}

module.exports = { createRobot };
