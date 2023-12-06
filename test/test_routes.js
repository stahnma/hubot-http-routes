const { expect } = require('chai');
const Helper = require('hubot-test-helper');
// Note to self, order of import here really matters
const helper = new Helper(['../fixtures/register_routes.js', '../src/routes.js' ]);

describe('http routes', () => {
  let room;

  beforeEach(() => {
    room = helper.createRoom();
  });

  afterEach(() => {
    room.destroy();
  });

  it('responds with http routes', () => {
    return room.user.say('alice', 'hubot http routes')
      .then(() => {
        expect(room.messages).to.eql([
          ['alice', 'hubot http routes'],
          ['hubot', 'GET, POST  /params/:item\nGET        /route'],
        ]);
      });
  });

});

