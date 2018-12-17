import { User } from './user';
import { District } from './district';

export class Address {
    id: number;
    title: string;
    fullAddress: string;
    telephone: string;
    user: User;
    district: District;
}
