const { expect } = require('chai');
const { createRobot } = require('./support/robot');

const scripts = ['fixtures/register_routes.js', 'src/routes.js'];

describe('http routes (rich formatting)', () => {
  let room;

  beforeEach(async () => {
    room = await createRobot(scripts, { adapterName: 'slack' });
  });

  afterEach(() => {
    room.destroy();
  });

  it('responds with http routes (formatted for slack)', async () => {
    await room.say('hubot http routes');
    expect(room.messages).to.eql([
      ['alice', 'hubot http routes'],
      ['hubot', '```\nGET, POST  /params/:item\nGET        /route```'],
    ]);
  });

});
