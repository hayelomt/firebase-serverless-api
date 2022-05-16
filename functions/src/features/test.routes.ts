import { Router } from 'express';

const testRoutes = Router();

testRoutes.get('/', async (req, res) => {
  res.json({ data: 'data' });
});

export default testRoutes;
