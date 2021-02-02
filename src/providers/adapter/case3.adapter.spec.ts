import * as assert from "assert";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
import { QueryAdapter } from ".";

describe("AppController (e2e)", () => {
  const OrderSchema = new Schema({
    shop_id: { type: Number },
    id: { type: Number },
    customer: {
      id: { type: Number },
      name: { type: String },
      phone: { type: String },
    },
    line_items: [
      {
        id: { type: Number },
        barcode: { type: String },
        quantity: { type: Number },
        type: { type: String },
        vendor: { type: String },
        price: { type: Number },
      },
    ],
    total_prices: { type: Number },
    created_at: { type: Date },
    updated_at: { type: Date },
    status: { type: String },
    private_field: { type: Number },
    order_number: { type: String },
    location_id: { type: Number },
    fulfillment_status: { type: String },
    is_deleted: { type: Boolean },
    tags: [String],
  });

  beforeEach(async () => {
    //
  });

  it("/ (GET)", () => {
    const xAdapter = new QueryAdapter({
      model: "Order",
      schema: OrderSchema,
      required_keys: ["shop_id"],
      blacklist: ["private_field"],
      whitelist: ["*"],
      alias: {
        barcode: "line_items.barcode",
      },
      metrics: {
        beforeEach: (it) => {
          if (it.case.args === "line_items.total_price") {
            it.session.field = "line_items.price";
            it.case.args = {
              $multiply: ["$line_items.price", "$line_items.quantity"],
            };
          }
        },
      },
      maxLimit: 1000,
      defaults: {
        page: 1,
        limit: 20,
        sort: "created_at_asc",
        is_deleted: false,
      },
      skippedValues: ["", null, undefined],
      custom: {
        keyword: (value) => {
          return {
            $or: [{ order_number: new RegExp(value, "gi") }],
          };
        },
        keyword2: (value) => {
          return { "customer.phone": new RegExp(value, "gi") };
        },
      },
    });

    const query = {
      _id: "5d8d8b6dee26642f1099eb5f",
      shop_id: "100000001",
      tags: "",
      location_id_in: "1000,2000",
      fields: '-customer',
      page: 2
    };
    const { page, filter, fields, skip, limit, sort } = xAdapter.parse(query);

    const expectedFilter = {
      _id: { $eq: "5d8d8b6dee26642f1099eb5f" },
      shop_id: { $eq: 100000001 },
      location_id: { $in: [1000, 2000] },
      is_deleted: { $eq: false },
    };

    assert.deepEqual(filter, expectedFilter);
    assert.deepEqual(fields, { private_field: 0, customer: 0 });
    assert.equal(page, 2);
    assert.equal(skip, 20);
    assert.equal(limit, 20);
    assert.deepEqual(sort, { created_at: 1 });
  });
});
