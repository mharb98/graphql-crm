import { Type } from '@nestjs/common';
import { Info, Parent, ResolveField, Resolver } from '@nestjs/graphql';

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  return date.toLocaleDateString(undefined, options);
};

export function BaseResolver<T extends Type<unknown>>(classRef: T): any {
  @Resolver(() => classRef, { isAbstract: true })
  abstract class BaseResolverHost {
    @ResolveField()
    createdAt(@Parent() parent: any) {
      return formatDate(parent.createdAt);
    }

    @ResolveField()
    updatedAt(@Parent() parent: any) {
      return formatDate(parent.updatedAt);
    }
  }
  return BaseResolverHost;
}
