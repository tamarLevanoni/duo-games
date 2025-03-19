import { IBorrowing } from '@/app/api/types/borrowingTypes';
import { IGame } from '@/app/api/types/gameTypes';
import { IGL } from '@/app/api/types/glTypes';
import { ILocation } from '@/app/api/types/locationTypes';
import { IUser } from '@/app/api/types/userTypes';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'samples.json');

interface Data {
  users: IUser[];
  games: IGame[];
  locations: ILocation[];
  gls: IGL[];
  borrowings: IBorrowing[];
}

export function readData(): Data {
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export function writeData(data: Data): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}