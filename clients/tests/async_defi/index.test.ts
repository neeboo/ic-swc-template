import { hasOwnProperty } from '@/settings/utils';
import { actor, actorFactory, StoreActor } from './config';

describe('test me operator', () => {
  const users: Array<StoreActor> = [];
  beforeAll(async () => {
    for (let i = 0; i < 10; i += 1) {
      const newActor = await actorFactory(i);
      users.push(newActor);
    }
  });

  test('greeting', async () => {
    const backend = await actor;
    const resp = await backend.greeting('js');
    expect(resp).toContain('hello back from rust:');
  });
});
