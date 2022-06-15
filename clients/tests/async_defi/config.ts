import { ActorSubclass } from '@dfinity/agent';
import { idlFactory } from '@idls/async_defi.idl';
import { _SERVICE } from '@idls/async_defi';
import { getActor } from '@/settings/agent';
import { identity } from '@/settings/identity';
import { getCanisterId } from '@/settings/utils';
import { Ed25519KeyIdentity } from '@dfinity/identity';

const canisterId = getCanisterId('async_defi')!;
const actor = getActor<_SERVICE>(identity, idlFactory, canisterId);

export type storeService = _SERVICE;
export type StoreActor = ActorSubclass<_SERVICE>;

export { actor, canisterId, idlFactory, actorFactory };

async function actorFactory(index: number): Promise<ActorSubclass<_SERVICE>> {
  const arr = new Array(31);
  const arr2 = arr.fill(0, 0, 30).concat(index);
  const id = Ed25519KeyIdentity.generate(new Uint8Array(arr2));
  const userActor = await getActor<_SERVICE>(id, idlFactory, canisterId);
  return userActor;
}
