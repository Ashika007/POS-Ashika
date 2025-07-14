const createHttpError = require('http-errors');
const Order = require('../models/orderModel');
const { default: mongoose } = require('mongoose');

const addOrder = async (req, res, next) => {
  try {
    // Calculate bill
    const items = req.body.items || [];
    const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
    const taxRate = 5.25;
    const tax = (total * taxRate) / 100;
    const totalWithTax = total + tax;

    const order = new Order({
      ...req.body,
      bills: {
        total,
        tax,
        totalWithTax,
      },
    });
    await order.save();
    res
      .status(201)
      .json({ success: true, message: 'Order created!', data: order });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(404, 'Invalid id!');
      return next(error);
    }

    const order = await Order.findById(id);
    if (!order) {
      const error = createHttpError(404, 'Order not found!');
      return next(error);
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('table');
    res.status(200).json({ data: orders });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = createHttpError(404, 'Invalid id!');
      return next(error);
    }
    // Find the existing order
    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      const error = createHttpError(404, 'Order not found!');
      return next(error);
    }
    // Merge customerDetails if present
    let updateData = { ...req.body };
    if (updateData.customerDetails) {
      updateData.customerDetails = {
        ...existingOrder.customerDetails,
        ...updateData.customerDetails
      };
    }
    // Calculate bill if items are present
    if (updateData.items) {
      const items = updateData.items;
      const total = items.reduce((sum, item) => sum + (item.price || 0), 0);
      const taxRate = 5.25;
      const tax = (total * taxRate) / 100;
      const totalWithTax = total + tax;
      updateData.bills = { total, tax, totalWithTax };
    }
    const order = await Order.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!order) {
      const error = createHttpError(404, 'Order not found!');
      return next(error);
    }
    res
      .status(200)
      .json({ success: true, message: 'Order updated', data: order });
  } catch (error) {
    next(error);
  }
};

module.exports = { addOrder, getOrderById, getOrders, updateOrder };
