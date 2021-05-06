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
    createdAt: { type: Date },
    updatedAt: { type: Date },
    status: { type: String },
    private_field: { type: Number },
    order_number: { type: String },
    location_id: { type: Number },
    fulfillment_status: { type: String },
    is_deleted: { type: Boolean },
    tags: [String],
  });

  it("/ (GET)", () => {
    const xAdapter = new QueryAdapter({
      model: "Order",
      schema: OrderSchema,
      required_keys: ["shop_id"],
      blacklist: [],
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
        sort: "createdAt_asc",
        is_deleted: false,
      },
      skippedValues: ["", null, undefined],
      custom: {
        keyword: (value) => {
          return {
            $or: [{ order_number: new RegExp(value, "gi") }],
          };
        },
        all: (value) => {
          return { is_deleted: value == "true" ? null : false };
        },
      },
    });

    const query = {
      _id: "5d8d8b6dee26642f1099eb5f",
      shop_id: "100000001",
      updatedAt_from_date: "2019-04-01T03:12:34.123Z",
      updatedAt_to_date: "2019-04-30T04:12:34.123Z",
      "customer.id": "",
      tags: "",
      location_id_in: "1000,2000",
      keyword: "0382989898",
      all: "true",
    };
    const { page, filter, fields, skip, limit, sort } = xAdapter.parse(query);

    const expectedFilter = {
      _id: { $eq: "5d8d8b6dee26642f1099eb5f" },
      shop_id: { $eq: "100000001" },
      updatedAt: {
        $gte: new Date(
          new Date("2019-04-01T03:15:00.000Z").setHours(0, 0, 0, 0)
        ),
        $lte: new Date(
          new Date("2019-04-30T03:15:00.000Z").setHours(23, 59, 59, 999)
        ),
      },
      location_id: { $in: [1000, 2000] },
      $or: [{ order_number: new RegExp("0382989898", "gi") }],
      is_deleted: { $eq: null },
    };

    assert.deepEqual(filter, expectedFilter);
    assert.deepEqual(fields, {});
    assert.equal(page, 1);
    assert.equal(skip, 0);
    assert.equal(limit, 20);
    assert.deepEqual(sort, { createdAt: 1 });
  });
});
