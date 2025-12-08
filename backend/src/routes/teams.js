import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const { search } = req.query;
  const where = search ? { name: { contains: search } } : {};
  const teams = await prisma.team.findMany({ where, include: { league: true } });
  res.json(teams);
});

router.get('/:id', async (req, res) => {
  const team = await prisma.team.findUnique({
    where: { id: parseInt(req.params.id) },
    include: {
      league: true,
      players: true,
      homeGames: { include: { awayTeam: true }, orderBy: { scheduledDate: 'desc' }, take: 5 },
      awayGames: { include: { homeTeam: true }, orderBy: { scheduledDate: 'desc' }, take: 5 }
    }
  });
  res.json(team);
});

router.post('/', auth, adminOnly, async (req, res) => {
  const { name, leagueId } = req.body;
  const team = await prisma.team.create({ data: { name, leagueId } });
  res.json(team);
});

router.put('/:id', auth, adminOnly, async (req, res) => {
  const { name, leagueId } = req.body;
  const team = await prisma.team.update({
    where: { id: parseInt(req.params.id) },
    data: { name, leagueId }
  });
  res.json(team);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await prisma.team.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'Team deleted' });
});

router.put('/:id/points', auth, adminOnly, async (req, res) => {
  const { manualPoints } = req.body;
  const team = await prisma.team.update({
    where: { id: parseInt(req.params.id) },
    data: { manualPoints }
  });
  res.json(team);
});

router.put('/:id/stats', auth, adminOnly, async (req, res) => {
  const { played, wins, draws, losses, points } = req.body;
  const team = await prisma.team.findUnique({ where: { id: parseInt(req.params.id) } });
  const data = {};
  if (played !== undefined) data.manualPlayed = team.manualPlayed + played;
  if (wins !== undefined) data.manualWins = team.manualWins + wins;
  if (draws !== undefined) data.manualDraws = team.manualDraws + draws;
  if (losses !== undefined) data.manualLosses = team.manualLosses + losses;
  if (points !== undefined) data.manualPoints = team.manualPoints + points;
  const updated = await prisma.team.update({
    where: { id: parseInt(req.params.id) },
    data
  });
  res.json(updated);
});

export default router;
