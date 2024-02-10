import { ContactInfoDataLoader } from './contact-info-data-loader/types/contact-info.data-loader';
import { CustomerDataLoader } from './customer-data-loader/types/customer.data-loader';

export interface IDataloaders {
  customerDataLoaders: CustomerDataLoader;
  contactInfoDataLoaders: ContactInfoDataLoader;
}
