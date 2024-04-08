import { ObjectId } from 'mongodb';

export function numberToObjectId(num: number): ObjectId {
  const hexString = num.toString(16).padStart(24, '0');
  return new ObjectId(hexString);
}
