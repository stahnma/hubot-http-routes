const { expect } = require('chai');
const { createRobot } = require('./support/robot');

const scripts = ['fixtures/register_routes.js', 'src/routes.js'];

describe('http routes', () => {
  let room;

  beforeEach(async () => {
    room = await createRobot(scripts);
  });

  afterEach(() => {
    room.destroy();
  });

  it('responds with http routes', async () => {
    await room.say('hubot http routes');
    expect(room.messages).to.eql([
      ['alice', 'hubot http routes'],
      ['hubot', 'GET, POST  /params/:item\nGET        /route'],
    ]);
  });

});
