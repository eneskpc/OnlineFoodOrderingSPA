import { User } from './user';
import { District } from './district';
import { PaymentMethod } from './payment-method';

export class Shop {
    id: number;
    shopName: string;
    seoLink: string;
    users: User[];
    districts: District[];
    paymentMethods: PaymentMethod[];
}
