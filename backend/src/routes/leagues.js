import express from 'express';
import { PrismaClient } from '@prisma/client';
import { auth, adminOnly } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.league.findMany({ skip, take: limit }),
    prisma.league.count()
  ]);

  res.json({ data, page, limit, total, totalPages: Math.ceil(total / limit) });
});

router.post('/', auth, adminOnly, async (req, res) => {
  const { name, description } = req.body;
  const league = await prisma.league.create({ data: { name, description } });
  res.json(league);
});

router.put('/:id', auth, adminOnly, async (req, res) => {
  const { name, description } = req.body;
  const league = await prisma.league.update({
    where: { id: parseInt(req.params.id) },
    data: { name, description }
  });
  res.json(league);
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  await prisma.league.delete({ where: { id: parseInt(req.params.id) } });
  res.json({ message: 'League deleted' });
});

router.get('/:id/standings', async (req, res) => {
  const leagueId = parseInt(req.params.id);
  const league = await prisma.league.findUnique({ where: { id: leagueId } });
  const teams = await prisma.team.findMany({ where: { leagueId } });
  const games = await prisma.game.findMany({
    where: { leagueId, status: 'completed' }
  });

  const standings = teams.map(team => {
    const teamGames = games.filter(g => g.homeTeamId === team.id || g.awayTeamId === team.id);
    let wins = 0, losses = 0, draws = 0;

    teamGames.forEach(g => {
      const isHome = g.homeTeamId === team.id;
      const teamScore = isHome ? g.homeScore : g.awayScore;
      const oppScore = isHome ? g.awayScore : g.homeScore;
      
      if (teamScore > oppScore) wins++;
      else if (teamScore < oppScore) losses++;
      else draws++;
    });

    return {
      teamId: team.id,
      teamName: team.name,
      played: teamGames.length + team.manualPlayed,
      wins: wins + team.manualWins,
      losses: losses + team.manualLosses,
      draws: draws + team.manualDraws,
      points: team.manualPoints
    };
  });

  standings.sort((a, b) => b.points - a.points || b.wins - a.wins);
  res.json(standings);
});

export default router;
