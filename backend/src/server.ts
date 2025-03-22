import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import customerRoutes from './routes/customers';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/customers', customerRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
