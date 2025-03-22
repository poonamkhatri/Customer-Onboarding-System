import { Request, Response } from 'express';
import axios from 'axios';
import pool from '../config/database'; 
import dotenv from 'dotenv';

dotenv.config();
// Fetch all customers
export const getAllCustomers = async (req: Request, res: Response) => {
	try {
		const result = await pool.query('SELECT * FROM customers');
		res.json(result.rows);
  	} catch (error) {
    	res.status(500).json({ error: 'Error fetching customers' });
  	}
};

// Create a new customer
export const createCustomer = async (req: Request, res: Response) => {
	const { name, email, phone } = req.body;
	try {
		const result = await pool.query(
		'INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
		[name, email, phone]
		);
    	res.json(result.rows[0]);
  		} catch (error) {
    		res.status(500).json({ error: 'Error adding customer' });
  		}
	};

	// Sync Customers to Zoho CRM
	export const syncCustomers = async (req: Request, res: Response) => {
  	try {
    	// Fetch Customers
    	const result = await pool.query('SELECT * FROM customers');
    	const customers = result.rows;

    	// Zoho CRM API URL
    	const ZOHO_CRM_API_URL = 'https://www.zohoapis.com/crm/v2/Leads';

    	// Zoho Access Token from .env
    	const ACCESS_TOKEN = process.env.ZOHO_REFRESH_TOKEN;
		if (!ACCESS_TOKEN) {
		return res.status(500).json({ error: 'Zoho API Token Missing' });
		}
		// Zoho CRM
    	const leadsData = customers.map((customer) => ({
		Company: customer.name,
		Last_Name: customer.name.split(' ').pop(),
		Email: customer.email,
		Phone: customer.phone,
    	}));

    	// Send Data to Zoho
    	const response = await axios.post(
      		ZOHO_CRM_API_URL,
      		{ data: leadsData },
      		{
				headers: {
				Authorization: `Zoho-oauthtoken ${ACCESS_TOKEN}`,
				'Content-Type': 'application/json',
				},
      		}
    	);

		res.json({
			message: 'Customers synced to Zoho CRM successfully!',
			response: response.data,
		});
  		} catch (error) {
    		res.status(500).json({ error: 'Error syncing data', details: error.message });
  		}
};
