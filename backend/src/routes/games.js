import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const { teamId, leagueId, status, page = 1, limit = 10 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  
  const where = {};
  if (leagueId) where.leagueId = parseInt(leagueId);
  if (teamId) where.OR = [{ homeTeamId: parseInt(teamId) }, { awayTeamId: parseInt(teamId) }];
  if (status) where.status = status;

  const [data, total] = await Promise.all([
    prisma.game.findMany({
      where,
      skip,
      take: parseInt(limit),
      include: { homeTeam: true, awayTeam: true, league: true },
      orderBy: { scheduledDate: 'asc' }
    }),
    prisma.game.count({ where })
  ]);

  res.json({ data, page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) });
});

router.post('/', auth, adminOnly, async (req, res) => {
  const { leagueId, homeTeamId, awayTeamId, venue, scheduledDate, status } = req.body;
  const lastGame = await prisma.game.findFirst({
    where: { leagueId },
    orderBy: { matchNumber: 'desc' }
  });
  const matchNumber = lastGame ? lastGame.matchNumber + 1 : 1;
  const game = await prisma.game.create({
    data: { leagueId, homeTeamId, awayTeamId, venue, matchNumber, scheduledDate: new Date(scheduledDate), status: status || 'upcoming' }
  });
  res.json(game);
});

router.put('/:id/score', auth, async (req, res) => {
  const { homeScore, awayScore } = req.body;
  const game = await prisma.game.update({
    where: { id: parseInt(req.params.id) },
    data: { homeScore, awayScore, status: 'completed' }
  });
  res.json(game);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await prisma.game.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'Game deleted' });
});

export default router;
