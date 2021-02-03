const _ = require("lodash");
const mongoose = require("mongoose");

class QueryAdapter {
  constructor(config) {
    this.config = config;
    this.model = config.model;
    this.schema = config.schema;
    this.Model = mongoose.model(config.model, config.schema);
    this.required_keys = config.required_keys;
    this.blacklist = config.blacklist;
    this.whitelist = config.whitelist;
    this.alias = config.alias;
    this.maxLimit = config.maxLimit;
    this.defaults = config.defaults;
    this.custom = config.custom;
    this.skippedValues = config.skippedValues;
    this.custom = config.custom;
  }

  parse(query) {
    this.query = _.cloneDeep(query);
    return this._parse();
  }

  _parse() {
    const query = _.cloneDeep(this.query);
    let { limit, page, skip, filter, sort } = this.parseQuery(query);
    const fields = this.formatFields();
    sort = this.formatSort(sort);
    filter = this.skipValues(filter);
    filter = this.formatKeyword(filter);
    filter = this.formatFilters(filter);

    return { filter, fields, page, skip, limit, sort };
  }

  formatKeyword(filter) {
    for (const key in filter) {
      if (this.custom[key]) {
        const format = this.custom[key](filter[key]);
        delete filter[key];
        filter = _.merge(filter, format);
      }
    }
    return filter;
  }

  skipValues(filter) {
    for (const key in filter) {
      if (this.skippedValues.includes(filter[key])) {
        delete filter[key];
      }
    }
    return filter;
  }

  formatFilters(input) {
    let obj = input;
    let result = {};
    for (const key in obj) {
      const format = this.formatFilter(key, obj[key]);
      result = _.merge(result, format);
    }
    return result;
  }

  formatFilter(key, value) {
    const operators = [
      NeOperator,
      InOperator,
      LikeOperator,
      EqOperator,
      GteOperator,
      LteOperator,
      FromDateOperator,
      ToDateOperator,
      OrOperator,
      AndOperator,
    ];
    for (const Operator of operators) {
      const op = new Operator();
      if (op.match(key)) {
        return op.do(key, value);
      }
    }

    const op = new EqOperator({ noCut: true });
    return op.do(key, value);
  }

  format(value, cast) {
    return cast ? cast(value) : value;
  }

  formatSort(defaultSort) {
    const result = {};
    const sort = this.query.sort
      ? this.query.sort.split(",")
      : defaultSort.split(",");
    for (const s of sort) {
      if (s.endsWith("_asc")) {
        result[s.substring(0, s.length - 4)] = 1;
      }
      if (s.endsWith("_desc")) {
        result[s.substring(0, s.length - 5)] = -1;
      }
    }
    return result;
  }

  formatFields() {
    const result = {};
    for (const bl of this.blacklist) {
      result[bl] = 0;
    }
    if (this.query.fields) {
      const query_fields = this.query.fields.split(",");
      for (const query_field of query_fields) {
        if (query_field.startsWith("-")) {
          result[query_field.slice(1)] = 0;
        }
      }
    }

    return result;
  }

  parseQuery(
    body,
    option = { writeLog: true, maxLimit: this.maxLimit },
    defaults = this.defaults
  ) {
    let { page = 1, limit = 20, sort, fields, ...filter } = {
      ...defaults,
      ...body,
    };
    page = Number(page);
    limit = Math.min(Number(limit), option.maxLimit);
    const skip = (page - 1) * limit;

    return { limit, page, skip, filter, sort, fields };
  }
}

class Operator {
  constructor() {
    this.postFix = "";
  }

  match(field) {
    return field.endsWith(this.postFix);
  }

  do(field, value) {
    return { [field]: value };
  }
}

class EqOperator extends Operator {
  constructor(config = {}) {
    super(config);
    this.postFix = "_eq";
    this.cut = 3;
    this.noCut = config.noCut;
  }

  match(field) {
    return field.endsWith(this.postFix);
  }

  format(field) {
    if (this.noCut) {
      return field;
    }
    return field.substring(0, field.length - this.cut);
  }

  do(field, value) {
    return { [this.format(field)]: { $eq: value } };
  }
}
class LikeOperator extends Operator {
  constructor() {
    super();
    this.postFix = "_like";
    this.cut = 5;
  }

  match(field) {
    return field.endsWith(this.postFix);
  }

  do(field, value) {
    return {
      [field.substring(0, field.length - this.cut)]: {
        $regex: new RegExp(value, "gi"),
      },
    };
  }
}
class InOperator extends Operator {
  constructor() {
    super();
    this.postFix = "_in";
    this.cut = 3;
  }

  match(field) {
    return field.endsWith(this.postFix);
  }

  do(field, value) {
    value = typeof value == "string" ? value.split(",") : value;
    return { [field.substring(0, field.length - this.cut)]: { $in: value } };
  }
}

class NeOperator extends Operator {
  constructor(config) {
    super(config);
    this.postFix = "_ne";
    this.cut = 3;
  }

  match(field) {
    return field.endsWith(this.postFix);
  }

  do(field, value) {
    return { [field.substring(0, field.length - this.cut)]: { $ne: value } };
  }
}

class GteOperator extends Operator {
  constructor() {
    super();
    this.postFix = "_gte";
    this.cut = 4;
  }

  match(field) {
    return field.endsWith(this.postFix);
  }

  do(field, value) {
    return {
      [field.substring(0, field.length - this.cut)]: { $gte: new Date(value) },
    };
  }
}

class LteOperator extends Operator {
  constructor() {
    super();
    this.postFix = "_lte";
    this.cut = 4;
  }

  match(field) {
    return field.endsWith(this.postFix);
  }

  do(field, value) {
    return {
      [field.substring(0, field.length - this.cut)]: { $lte: new Date(value) },
    };
  }
}

class FromDateOperator extends Operator {
  constructor() {
    super();
    this.postFix = "_from_date";
    this.cut = 10;
  }

  match(field) {
    return field.endsWith(this.postFix);
  }

  do(field, value) {
    return {
      [field.substring(0, field.length - this.cut)]: {
        $gte: new Date(new Date(value).setHours(0, 0, 0, 0)),
      },
    };
  }
}

class ToDateOperator extends Operator {
  constructor() {
    super();
    this.postFix = "_to_date";
    this.cut = 8;
  }

  match(field) {
    return field.endsWith(this.postFix);
  }

  do(field, value) {
    return {
      [field.substring(0, field.length - this.cut)]: {
        $lte: new Date(new Date(value).setHours(23, 59, 59, 999)),
      },
    };
  }
}
class OrOperator extends Operator {
  constructor() {
    super();
    this.postFix = "$or";
  }

  match(field) {
    return field == this.postFix;
  }

  do(field, value) {
    return {
      [field]: value,
    };
  }
}
class AndOperator extends Operator {
  constructor() {
    super();
    this.postFix = "$and";
  }

  match(field) {
    return field == this.postFix;
  }

  do(field, value) {
    return {
      [field]: value,
    };
  }
}
module.exports = { QueryAdapter };
