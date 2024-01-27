import ExpenseRepository from "./expense.repository.js";
import ExpenseModel from "./expense.model.js";
export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();}
  // Create new expense
  add = async (req, res) => {
    const { title, amount, date, isRecurring, tags } = req.body;
    const expenseToCreate = new ExpenseModel(title,amount,date,isRecurring,tags);
    try {
      await this.expenseRepository.addExpense(expenseToCreate);
      res.status(201).send(expenseToCreate);
    } catch (err) {
      res.status(500).send("Error creating expense.");
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    const { id } = req.params.id;
    const item = await this.expenseRepository.getOne(id);
    if (!item) {
      res.status(200).send("Item not found.");
    } else {
      res.status(200).send(item);
    }
  };
  // Get all expenses
  getAll = async (req, res) => {
   const Allitems = await this.expenseRepository.getAllExpenses();
   res.status(200).send(Allitems);
  };
  // Add a tag to an expense
  addTag = async (req, res) => {
    const { id } = req.params.id;
    const { tag } = req.body;

    const Tag = await this.expenseRepository.addTagToExpense(id,tag);
    res.status(200).send(Tag);
  };

  // Filter expenses based on given criteria
  filter = async (req, res) => {
   const filter_items = await this.expenseRepository.filterExpenses(req.query);
   res.status(200).send(filter_items);
  };
}