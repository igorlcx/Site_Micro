/**
 * @file page.tsx
 * @description Dashboard - bento grid with stats, welcome message, score chart
 * @dependencies framer-motion, recharts, usePlayerData, useQCMHistory
 */
'use client';
import { motion } from 'framer-motion';
import { usePlayerData } from '@/hooks/usePlayerData';
import { useQCMHistory } from '@/hooks/useQCMHistory';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { WELCOME_MESSAGES } from '@/lib/constants';
import { randomFrom } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { BookOpen, Layers, HelpCircle, Dumbbell, Flame, Trophy, TrendingUp, Star } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

const containerVariants = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}

function StatCard({ icon, label, value, sub, color }: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      className="rounded-xl p-5 border flex flex-col gap-3"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${color}20`, color }}
        >
          {icon}
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
          {value}
        </p>
        {sub && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{sub}</p>}
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { playerData, updateStreak } = usePlayerData();
  const { history, getAvgScore } = useQCMHistory();
  const { progress } = useFlashcardProgress();
  const [welcomeMsg] = useState(() => randomFrom(WELCOME_MESSAGES));

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const chartData = useMemo(() => {
    return history.slice(-8).map((s, i) => ({
      session: `S${i + 1}`,
      score: Math.round((s.score / s.total) * 100),
    }));
  }, [history]);

  const avgScore = getAvgScore(5);

  const quickLinks = [
    { href: '/qcm', label: 'Lancer un QCM', icon: <HelpCircle size={18} />, color: 'var(--accent-orange)' },
    { href: '/flashcards', label: 'Réviser des flashcards', icon: <Layers size={18} />, color: 'var(--accent-purple)' },
    { href: '/exercices', label: 'Faire un exercice', icon: <Dumbbell size={18} />, color: 'var(--accent-green)' },
    { href: '/cours', label: 'Ouvrir le cours', icon: <BookOpen size={18} />, color: 'var(--accent-blue)' },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="px-6 py-6 max-w-[1200px] mx-auto"
    >
      {/* Welcome */}
      <motion.div
        variants={itemVariants}
        className="mb-6 p-6 rounded-2xl border"
        style={{ background: 'linear-gradient(135deg, var(--bg-card) 0%, #1a1a2e 100%)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
              Ahoy, {playerData.nom} ! 🏴‍☠️
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>{welcomeMsg}</p>
          </div>
          {playerData.streak > 0 && (
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border"
              style={{ borderColor: 'var(--accent-orange)', color: 'var(--accent-orange)', background: 'rgba(249,115,22,0.1)' }}
            >
              <Flame size={14} />
              <span className="text-sm font-semibold">{playerData.streak} jour{playerData.streak > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <StatCard
          icon={<Trophy size={16} />}
          label="Pièces d'or"
          value={playerData.pieces}
          sub="total accumulé"
          color="var(--accent-gold)"
        />
        <StatCard
          icon={<Star size={16} />}
          label="Flashcards maîtrisées"
          value={progress.mastered.length}
          sub="sur 200 total"
          color="var(--accent-purple)"
        />
        <StatCard
          icon={<HelpCircle size={16} />}
          label="QCM complétés"
          value={playerData.stats.qcm_total}
          sub="sessions de révision"
          color="var(--accent-orange)"
        />
        <StatCard
          icon={<TrendingUp size={16} />}
          label="Score moyen"
          value={avgScore > 0 ? `${avgScore}%` : '—'}
          sub="5 dernières sessions"
          color="var(--accent-green)"
        />
      </motion.div>

      {/* Chart + Quick links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Score chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 rounded-xl p-5 border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
        >
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
            Évolution du score QCM
          </h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={chartData}>
                <XAxis dataKey="session" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip
                  contentStyle={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border-default)', borderRadius: 8, color: 'var(--text-primary)' }}
                  formatter={(v) => [`${v}%`, 'Score']}
                />
                <Line type="monotone" dataKey="score" stroke="var(--accent-blue)" strokeWidth={2} dot={{ fill: 'var(--accent-blue)', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-40 flex items-center justify-center text-sm" style={{ color: 'var(--text-muted)' }}>
              Lance ton premier QCM pour voir tes stats ici !
            </div>
          )}
        </motion.div>

        {/* Quick links */}
        <motion.div
          variants={itemVariants}
          className="rounded-xl p-5 border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
        >
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>
            Accès rapide
          </h3>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors"
                  style={{ borderColor: 'var(--border-subtle)', color: link.color }}
                >
                  {link.icon}
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {link.label}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Exercices progress */}
      <motion.div
        variants={itemVariants}
        className="rounded-xl p-5 border"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Exercices complétés
          </h3>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {playerData.stats.exercices_completes.length} / 16
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(playerData.stats.exercices_completes.length / 16) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--accent-green), #34d399)' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
