import {getDB} from "../../config/mongodb.js";
import {ObjectId} from  "mongodb";
class ExpenseRepository {
  constructor() {
    this.collectionName =  "expenses"; // name of the collection in mongodb
  }
  // Create a new expense
  async addExpense(expense) {
  //get the database
  const db = getDB();
  await db.collection("this.collectionName").insertOne(expense);
  return expense;
  //
  }
  // Get one expnese by its ID
  async getOne(id) {
    const db = getDB();
    const item= await db.collection("this.collectionName").findOne({_id: new ObjectId(id)});
    return item;
  }
  // Get all expenses
  async getAllExpenses() {
    const db = getDB();
    const Allitems= await db.collection("this.collectionName").find().toArray();
    return Allitems;
  }
  // Add tag to an expense
  async addTagToExpense(id, tag) {
    const db = getDB();
    const item= await db.collection("this.collectionName")
    .updateOne({ _id: new ObjectId(id) }, { $push: { tags: tag } });
    return item;
}
  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    const db = getDB();
    let query = {};

    if (criteria.minAmount || criteria.maxAmount) {
      query.amount = {};

      if (criteria.minAmount) {
        query.amount.$gte = parseFloat(criteria.minAmount);
      }

      if (criteria.maxAmount) {
        query.amount.$lte = parseFloat(criteria.maxAmount);
      }
    }

    if (criteria.isRecurring !== undefined) {
      query.isRecurring = criteria.isRecurring === "true";
    }
const expenses = await db.collection(this.collectionName).find(query).toArray();
    return expenses;
  }
}


export default ExpenseRepository;
