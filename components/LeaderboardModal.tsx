import { memo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from './LoadingSpinner';
import { EmptyState } from './EmptyState';
import { formatAddress, formatNumber, isZeroAddress } from '@/lib/utils';
import { LeaderboardTuple } from '@/lib/types';

/** Returns the display label for a leaderboard rank index. */
export function getLeaderboardRankLabel(index: number): string {
  if (index === 0) return '🥇'
  if (index === 1) return '🥈'
  if (index === 2) return '🥉'
  return `#${index + 1}`
}

/** Returns true when an address belongs to the current player. */
export function isCurrentLeaderboardPlayer(address: string, playerAddress?: string): boolean {
  if (!address || !playerAddress) return false
  return address.toLowerCase() === playerAddress.toLowerCase()
}

/** Returns true when there is at least one non-zero leaderboard address. */
export function hasLeaderboardEntries(addresses: string[]): boolean {
  return addresses.some((addr) => addr && !isZeroAddress(addr))
}

/** Returns the row class string for leaderboard entries. */
export function getLeaderboardRowClass(isCurrentPlayer: boolean): string {
  return isCurrentPlayer
    ? 'bg-purple-500/30 border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
    : 'bg-black/20 hover:bg-black/30'
}

/** Props for the LeaderboardModal component. */
export interface LeaderboardModalProps {
  /** Whether the modal is visible. */
  isOpen: boolean;
  /** Function to close the modal. */
  onClose: () => void;
  /** Leaderboard data tuple. */
  leaderboardData: LeaderboardTuple | undefined;
  /** Loading state for the leaderboard. */
  isLoading: boolean;
  /** Current player address. */
  playerAddress: string | undefined;
  /** Additional CSS classes for the modal content. */
  className?: string;
}

/**
 * Modal component for displaying the game leaderboard.
 */
export const LeaderboardModal = memo(function LeaderboardModal({
  isOpen,
  onClose,
  leaderboardData,
  isLoading,
  playerAddress,
  className = '',
}: LeaderboardModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            id="leaderboard-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="leaderboard-title"
            className={`glass-game rounded-2xl p-6 max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto ${className}`.trim()}
          >
            <h2 id="leaderboard-title" className="text-3xl font-bold text-purple-400 mb-6 pixel-font text-center">
              LEADERBOARD
            </h2>

            <div className="space-y-2">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
                </div>
              ) : !leaderboardData ? (
                <EmptyState title="No Leaderboard Data" description="Be the first to play!" icon="🏆" />
              ) : (
                (() => {
                  const [addresses, pointsList] = leaderboardData;
                  const hasEntries = hasLeaderboardEntries(addresses);

                  if (!hasEntries) {
                    return <EmptyState title="No Players Yet" description="Be the first to join the leaderboard!" icon="🎮" />;
                  }

                  return addresses.map((addr, idx) => {
                    const pts = pointsList[idx];
                    if (!addr || isZeroAddress(addr)) return null;

                    const isCurrentPlayer = isCurrentLeaderboardPlayer(addr, playerAddress);

                    return (
                      <div
                        key={`${addr}-${idx}`}
                        className={`flex justify-between items-center p-4 rounded-lg transition-colors ${
                          getLeaderboardRowClass(isCurrentPlayer)
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`text-2xl font-bold ${
                              idx === 0 ? 'text-celo-gold' : 
                              idx === 1 ? 'text-gray-300' : 
                              idx === 2 ? 'text-orange-400' : 
                              'text-gray-500'
                            }`}
                          >
                            {getLeaderboardRankLabel(idx)}
                          </div>
                          <div>
                            <div className={`font-mono text-sm ${isCurrentPlayer ? 'text-white font-bold' : 'text-gray-400'}`}>
                              {formatAddress(addr)}
                              {isCurrentPlayer && <span className="ml-2 text-[10px] bg-purple-500 text-white px-1.5 py-0.5 rounded-full">YOU</span>}
                            </div>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-celo-green">{formatNumber(pts)}</div>
                      </div>
                    );
                  });
                })()
              )}
            </div>

            <button
              onClick={onClose}
              type="button"
              autoFocus
              className="focus-ring-game w-full mt-6 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-purple-500/20"
            >
              CLOSE
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

LeaderboardModal.displayName = 'LeaderboardModal';
