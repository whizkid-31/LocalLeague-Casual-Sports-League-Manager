import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const players = await prisma.player.findMany({ include: { team: true } });
  res.json(players);
});

router.get('/:id', async (req, res) => {
  const player = await prisma.player.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { team: true }
  });
  res.json(player);
});

router.post('/', auth, adminOnly, async (req, res) => {
  const { name, position, teamId } = req.body;
  const player = await prisma.player.create({ data: { name, position, teamId } });
  res.json(player);
});

router.put('/:id', auth, adminOnly, async (req, res) => {
  const { name, position, teamId } = req.body;
  const player = await prisma.player.update({
    where: { id: parseInt(req.params.id) },
    data: { name, position, teamId }
  });
  res.json(player);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await prisma.player.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'Player deleted' });
});

export default router;
