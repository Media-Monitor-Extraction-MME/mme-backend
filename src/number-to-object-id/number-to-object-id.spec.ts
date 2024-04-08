import { numberToObjectId } from './number-to-object-id';
import { ObjectId } from 'mongodb';

describe('NumberToObjectId', () => {
  it('Test Number to ObjectId conversion', () => {
    const objectId_1 = numberToObjectId(1);
    expect(objectId_1).toBeInstanceOf(ObjectId);
    expect(objectId_1.toHexString()).toEqual('000000000000000000000001');

    const objectId_2 = numberToObjectId(2);
    expect(objectId_2).toBeInstanceOf(ObjectId);
    expect(objectId_2.toHexString()).toBe('000000000000000000000002');
  });
});
