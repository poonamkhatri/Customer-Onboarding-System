import { Request, Response } from 'express';
import Customer from '../models/customer';

class CustomerController {
	static async createCustomer(req: Request, res: Response) {
		try {
			const { name, email, phone } = req.body;
			const customer = await Customer.create({ name, email, phone });
			res.status(201).json(customer);
		} catch (error) {
      		res.status(500).json({ error: 'Error creating customer' });
    	}
  	}

  	static async getAllCustomers(req: Request, res: Response) {
		try {
				const customers = await Customer.findAll();
				res.json(customers);
			} 	catch (error) {
					res.status(500).json({ error: 'Error retrieving customers' });
				}
		}

  		static async getCustomerById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const customer = await Customer.findByPk(id);
			if (!customer) return res.status(404).json({ error: 'Customer not found' });
			res.json(customer);
			} catch (error) {
				res.status(500).json({ error: 'Error retrieving customer' });
			}
  		}

  		static async syncCustomers(req: Request, res: Response) {
			try {
				res.json({ message: 'Customer data synced to external API' });
			} catch (error) {
				res.status(500).json({ error: 'Sync failed' });
			}
  		}
}

export default CustomerController;
