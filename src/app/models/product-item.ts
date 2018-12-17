import { Product } from './product';
import { ProductItemOption } from './product-item-option';

export class ProductItem {
    id: number;
    itemName: string;
    itemType: string;
    productItemOptions: ProductItemOption[];
    productId: number;

}
