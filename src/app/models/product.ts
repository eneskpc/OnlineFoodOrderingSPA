import { Shop } from './Shop';
import { ProductItem } from './product-item';

export class Product {
    id: number;
    productName: string;
    description: string;
    isStock: boolean;
    unitPrice: number;
    shopId: number;
    productItems: ProductItem[];
}
