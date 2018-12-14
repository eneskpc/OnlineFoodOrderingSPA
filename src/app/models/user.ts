import { Authority } from './authority';

export class User {
    id: number;
    userName: string;
    firstName: string;
    lastname: string;
    authorities: Authority[];
    enabled: boolean;
}
