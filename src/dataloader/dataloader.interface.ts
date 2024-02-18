import { InstallmentDataLoaders } from '../services/installment-data-loader/types/installment.data-loader';
import { CommentDataLoader } from './comment-data-loader/types/comment.data-loader';
import { ContactInfoDataLoader } from './contact-info-data-loader/types/contact-info.data-loader';
import { CustomerDataLoader } from './customer-data-loader/types/customer.data-loader';
import { ProductDataLoader } from './product-data-loader/types/product.data-loader';
import { PurchaseDataLoader } from './purchase-data-loader/types/purchase.data-loader';
import { PurchaseProductDataLoader } from './purchase-product-data-loader/types/purchase-product.data-loader';

export interface IDataloaders {
  customerDataLoaders: CustomerDataLoader;
  contactInfoDataLoaders: ContactInfoDataLoader;
  purchaseDataLoaders: PurchaseDataLoader;
  productDataLoaders: ProductDataLoader;
  purchaseProductDataLoaders: PurchaseProductDataLoader;
  installmentDataLoaders: InstallmentDataLoaders;
  commentDataLoaders: CommentDataLoader;
}
