/* eslint-disable @typescript-eslint/no-explicit-any */
import { Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    if (this?.query?.searchTerm) {
      console.log('Search Term:', this.query.searchTerm);
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: this?.query?.searchTerm, $options: 'i' },
        })),
      });
    }
    return this;
  }

  // filter() {
  //   const queryObj = { ...this.query };
  //   const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  //   excludeFields.forEach((el) => delete queryObj[el]);
  //   console.log('Filtered Query Object:', queryObj);

  //   if (
  //     typeof queryObj.minPrice === 'number' ||
  //     typeof queryObj.maxPrice === 'number'
  //   ) {
  //     queryObj.price = {
  //       ...(typeof queryObj.minPrice === 'number'
  //         ? { $gte: queryObj.minPrice }
  //         : {}),
  //       ...(typeof queryObj.maxPrice === 'number'
  //         ? { $lte: queryObj.maxPrice }
  //         : {}),
  //     };
  //     delete queryObj.minPrice;
  //     delete queryObj.maxPrice;
  //   }

  //   if (
  //     typeof queryObj.minYear === 'number' ||
  //     typeof queryObj.maxYear === 'number'
  //   ) {
  //     queryObj.year = {
  //       ...(typeof queryObj.minYear === 'number'
  //         ? { $gte: queryObj.minYear }
  //         : {}),
  //       ...(typeof queryObj.maxYear === 'number'
  //         ? { $lte: queryObj.maxYear }
  //         : {}),
  //     };
  //     delete queryObj.minYear;
  //     delete queryObj.maxYear;
  //   }

  //   this.modelQuery = this.modelQuery.find(queryObj);

  //   return this;
  // }

  filter() {
    const queryObj: Record<string, any> = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    const filters: Record<string, any> = {};

    // Price filtering
    if (queryObj.minPrice || queryObj.maxPrice) {
      filters.price = {};

      if (queryObj.minPrice) {
        filters.price['$gte'] = Number(queryObj.minPrice);
      }

      if (queryObj.maxPrice) {
        filters.price['$lte'] = Number(queryObj.maxPrice);
      }

      delete queryObj.minPrice;
      delete queryObj.maxPrice;
    }

    // Add remaining filters
    Object.entries(queryObj).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        filters[key] = value;
      }
    });

    this.modelQuery = this.modelQuery.find(filters);
    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const limit = Number(this?.query?.limit) || 12;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit || 0;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);

    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
