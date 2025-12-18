'use client'

import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion, AnimatePresence } from 'framer-motion'
import { formatNumber, formatAddress } from '@/lib/utils'
import { GAME_CONFIG } from '@/lib/constants'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { EmptyState } from '@/components/EmptyState'
import { StatCard } from '@/components/StatCard'
import { UpgradeCard } from '@/components/UpgradeCard'
import { ContractWarning } from '@/components/ContractWarning'
import { useContractConfig } from '@/hooks/useContractConfig'

interface FloatingNumber {
  id: number
  value: string
  x: number
  y: number
}

export default function Home() {
  const { address, isConnected } = useAccount()
  const [floatingNumbers, setFloatingNumbers] = useState<FloatingNumber[]>([])
  const [clickCount, setClickCount] = useState(0)
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  const { address: contractAddress, abi: celoClickerABI, isValid: isContractValid } = useContractConfig()

  // Read player stats
  const { data: playerData, refetch: refetchPlayer, error: playerError, isLoading: isLoadingPlayer } = useReadContract({
    address: contractAddress,
    abi: celoClickerABI,
    functionName: 'getPlayer',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && isContractValid,
      refetchInterval: GAME_CONFIG.REFETCH_INTERVALS.PLAYER_STATS,
    },
  })

  const [points, clickPower, autoClickerLevel, multiplierLevel, totalClicks, gamesPlayed] = 
    playerData as [bigint, bigint, bigint, bigint, bigint, bigint] || [0n, 0n, 0n, 0n, 0n, 0n]

  // Read upgrade costs
  const { data: upgradeCosts, isLoading: isLoadingCosts } = useReadContract({
    address: contractAddress,
    abi: celoClickerABI,
    functionName: 'getUpgradeCosts',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && isContractValid,
    },
  })

  const [clickPowerCost, autoClickerCost, multiplierCost] = 
    upgradeCosts as [bigint, bigint, bigint] || [0n, 0n, 0n]

  // Read pending auto-clicker
  const { data: pendingAuto } = useReadContract({
    address: contractAddress,
    abi: celoClickerABI,
    functionName: 'getPendingAutoClicker',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address && autoClickerLevel > 0n,
      refetchInterval: GAME_CONFIG.REFETCH_INTERVALS.PENDING_AUTO,
    },
  })

  // Read leaderboard
  const { data: leaderboardData } = useReadContract({
    address: contractAddress,
    abi: celoClickerABI,
    functionName: 'getLeaderboard',
    query: {
      refetchInterval: GAME_CONFIG.REFETCH_INTERVALS.LEADERBOARD,
    },
  })

  const { writeContract, data: hash, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // Click handler
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isConnected) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const earnedPoints = Number(clickPower) * (1 + Number(multiplierLevel))
    const floatingId = Date.now()

    setFloatingNumbers(prev => [
      ...prev,
      { id: floatingId, value: `+${earnedPoints}`, x, y }
    ])

    setClickCount(prev => prev + 1)

    // Send click transaction
    writeContract({
      address: contractAddress,
      abi: celoClickerABI,
      functionName: 'click',
    })

    // Remove floating number after animation
    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(num => num.id !== floatingId))
    }, GAME_CONFIG.ANIMATION_DURATION.FLOATING_NUMBER)
  }

  const handleUpgrade = (type: 'clickPower' | 'autoClicker' | 'multiplier') => {
    writeContract({
      address: contractAddress,
      abi: celoClickerABI,
      functionName: type === 'clickPower' ? 'upgradeClickPower' : 
                     type === 'autoClicker' ? 'upgradeAutoClicker' : 
                     'upgradeMultiplier',
    })
  }

  const handleClaimAuto = () => {
    writeContract({
      address: contractAddress,
      abi: celoClickerABI,
      functionName: 'claimAutoClicker',
    })
  }

  useEffect(() => {
    if (isSuccess) {
      refetchPlayer()
    }
  }, [isSuccess, refetchPlayer])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="w-full max-w-6xl relative z-20">
        <ContractWarning />
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-pulse-glow pixel-font">
            CELOCLICKER
          </h1>
          <p className="text-gray-400 text-sm">Click • Upgrade • Dominate</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stats */}
          <div className="glass-game rounded-2xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-purple-400 mb-4 pixel-font">STATS</h2>
            
            {isLoadingPlayer && (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            )}
            
            {!isLoadingPlayer && (
            <div className="space-y-3">
              <StatCard 
                label="POINTS" 
                value={formatNumber(points)} 
                valueColor="text-celo-gold"
                icon="⭐"
              />
              <StatCard 
                label="CLICK POWER" 
                value={Number(clickPower)} 
                valueColor="text-purple-400"
                icon="⚡"
              />
              <StatCard 
                label="MULTIPLIER" 
                value={`${1 + Number(multiplierLevel)}x`} 
                valueColor="text-pink-400"
                icon="✨"
              />
              <StatCard 
                label="AUTO-CLICKER" 
                value={`Level ${Number(autoClickerLevel)}`} 
                valueColor="text-indigo-400"
                icon="🤖"
              />
              <StatCard 
                label="TOTAL CLICKS" 
                value={formatNumber(totalClicks)} 
                valueColor="text-green-400"
                icon="👆"
              />
            </div>
            )}

            {autoClickerLevel > 0n && pendingAuto && Number(pendingAuto) > 0 && (
              <button
                onClick={handleClaimAuto}
                disabled={isPending || isConfirming}
                type="button"
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold hover:scale-105 transition-transform glow-purple disabled:opacity-50 cursor-pointer relative z-10"
              >
                Claim {Number(pendingAuto)} Auto Points
              </button>
            )}
          </div>

          {/* Center Column - Click Button */}
          <div className="glass-game rounded-2xl p-6 flex flex-col items-center justify-center relative">
            {!isConnected ? (
              <div className="text-center">
                <p className="text-gray-400 mb-6 pixel-font text-sm">CONNECT TO START</p>
                <ConnectButton.Custom>
                  {({ openConnectModal }) => (
                    <button
                      onClick={openConnectModal}
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl font-bold hover:scale-105 transition-transform glow-purple"
                    >
                      Connect Wallet
                    </button>
                  )}
                </ConnectButton.Custom>
              </div>
            ) : (
              <>
                <motion.button
                  onClick={handleClick}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  disabled={isPending || isConfirming}
                  className="w-64 h-64 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-full flex items-center justify-center text-8xl font-bold glow-purple hover:glow-gold transition-all duration-300 disabled:opacity-50 relative overflow-hidden cursor-pointer z-30"
                >
                  <span className="relative z-10 animate-pulse pixel-font">★</span>
                  
                  {/* Floating numbers */}
                  <AnimatePresence>
                    {floatingNumbers.map((num) => (
                      <motion.div
                        key={num.id}
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={{ opacity: 0, y: -100, scale: 1.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute text-celo-gold font-bold text-2xl pixel-font pointer-events-none"
                        style={{ left: num.x, top: num.y }}
                      >
                        {num.value}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.button>

                <p className="mt-6 text-gray-400 pixel-font text-xs">
                  {isPending ? 'CONFIRMING...' : isConfirming ? 'PROCESSING...' : 'CLICK THE STAR!'}
                </p>

                <div className="mt-4 text-center">
                  <div className="text-2xl font-bold text-celo-green">{clickCount}</div>
                  <div className="text-xs text-gray-500">Session Clicks</div>
                </div>
              </>
            )}
          </div>

          {/* Right Column - Upgrades */}
          <div className="glass-game rounded-2xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-purple-400 mb-4 pixel-font">UPGRADES</h2>

            <div className="space-y-3">
              <UpgradeCard
                title="Click Power"
                currentLevel={Number(clickPower)}
                cost={clickPowerCost}
                points={points}
                color="text-purple-400"
                onUpgrade={() => handleUpgrade('clickPower')}
                disabled={isPending || isConfirming}
                isLoading={isPending || isConfirming}
              />
              <UpgradeCard
                title="Auto-Clicker"
                currentLevel={`Level ${Number(autoClickerLevel)}`}
                cost={autoClickerCost}
                points={points}
                color="text-indigo-400"
                onUpgrade={() => handleUpgrade('autoClicker')}
                disabled={isPending || isConfirming}
                isLoading={isPending || isConfirming}
              />
              <UpgradeCard
                title="Multiplier"
                currentLevel={`${1 + Number(multiplierLevel)}x`}
                cost={multiplierCost}
                points={points}
                color="text-pink-400"
                onUpgrade={() => handleUpgrade('multiplier')}
                disabled={isPending || isConfirming}
                isLoading={isPending || isConfirming}
              />
            </div>

            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              type="button"
              className="w-full py-3 bg-gradient-to-r from-celo-green to-celo-gold rounded-lg font-bold hover:scale-105 transition-transform glow-green mt-4 cursor-pointer relative z-10"
            >
              {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
            </button>
          </div>
        </div>

        {/* Leaderboard Modal */}
        <AnimatePresence>
          {showLeaderboard && leaderboardData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setShowLeaderboard(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-game rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              >
                <h2 className="text-3xl font-bold text-purple-400 mb-6 pixel-font text-center">LEADERBOARD</h2>
                
                <div className="space-y-2">
                  {(() => {
                    if (!leaderboardData) {
                      return <EmptyState title="No Leaderboard Data" description="Be the first to play!" icon="🏆" />
                    }
                    const [addresses, pointsList] = leaderboardData as unknown as [`0x${string}`[], bigint[]]
                    const hasEntries = addresses.some(addr => addr && addr !== '0x0000000000000000000000000000000000000000')
                    
                    if (!hasEntries) {
                      return <EmptyState title="No Players Yet" description="Be the first to join the leaderboard!" icon="🎮" />
                    }
                    
                    return addresses.map((addr, idx) => {
                    const pts = pointsList[idx]
                    
                    if (!addr || addr === '0x0000000000000000000000000000000000000000') return null

                    return (
                      <div
                          key={`${addr}-${idx}`}
                        className={`flex justify-between items-center p-4 rounded-lg ${
                          addr === address ? 'bg-purple-500/30 border-2 border-purple-400' : 'bg-black/20'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`text-2xl font-bold ${
                            idx === 0 ? 'text-celo-gold' : 
                            idx === 1 ? 'text-gray-300' : 
                            idx === 2 ? 'text-orange-400' : 
                            'text-gray-500'
                          }`}>
                            #{idx + 1}
                          </div>
                          <div>
                            <div className="font-mono text-sm text-gray-400">
                              {formatAddress(addr)}
                            </div>
                            </div>
                          </div>
                        <div className="text-xl font-bold text-celo-green">
                            {formatNumber(pts)}
                        </div>
                      </div>
                    )
                    })
                  })()}
                </div>

                <button
                  onClick={() => setShowLeaderboard(false)}
                  className="w-full mt-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-bold transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
