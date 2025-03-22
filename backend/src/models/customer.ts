import { DataTypes, Model } from 'sequelize';
import { QueryResult } from 'pg'
import sequelize from '../config/database';

class Customer extends Model {
	public id!: number;
	public name!: string;
	public email!: string;
	public phone!: string;
}

Customer.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		name: { type: DataTypes.STRING, allowNull: false },
		email: { type: DataTypes.STRING, allowNull: false, unique: true },
		phone: { type: DataTypes.STRING, allowNull: false },
  	},
  	{ sequelize, modelName: 'customer' }
);

export default Customer;
