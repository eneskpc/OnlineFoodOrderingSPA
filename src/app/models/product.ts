import { ProductItem } from './product-item';
import { Shop } from './Shop';

export class Product {
    id: number;
    productName: string;
    description: string;
    isStock: boolean;
    unitPrice: number;
    shop: Shop;
    productItems: ProductItem[];
}
