import express from 'express';
import { ProductRepository } from '../../data-source';
import { Product } from './entity';
import { passportProtection } from '../auth/auth';

const router = express.Router();

router.use('/products', passportProtection);

// Route to get all products with optional filtering
router.get('/products', async (req, res) => {
  try {
    const { name, dataCategory } = req.query;

    // Build query options
    const options: {
      name?: string;
      dataCategory?: string;
    } = {};
    if (name) {
      options.name = '' + name;
    }
    if (dataCategory) {
      options.dataCategory = '' + dataCategory;
    }

    const products = await ProductRepository.find({
      where: options,
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching products.' });
  }
});

// Route to get a product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const product = await ProductRepository.findOne({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the product.' });
  }
});

// Route to create a new product
router.post('/products', async (req, res) => {
  try {
    const { dataCategory, recordCount, fields, name } = req.body;

    if (!dataCategory || !recordCount || !fields || !name) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const newProduct = new Product();
    newProduct.dataCategory = dataCategory;
    newProduct.recordCount = recordCount;
    newProduct.fields = fields;
    newProduct.name = name;

    const savedProduct = await ProductRepository.save(newProduct);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json('An error occurred while creating the product.');
  }
});

export default router;
