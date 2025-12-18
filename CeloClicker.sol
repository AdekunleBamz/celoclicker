// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CeloClicker
 * @notice On-chain idle clicker game where each click generates points
 * @dev All game state stored on-chain for transparency and leaderboard
 */
contract CeloClicker {
    struct Player {
        uint256 points;
        uint256 clickPower;
        uint256 autoClickerLevel;
        uint256 multiplierLevel;
        uint256 lastClaimTime;
        uint256 totalClicks;
        uint256 gamesPlayed;
    }
    
    mapping(address => Player) public players;
    address[] public playerList;
    mapping(address => bool) public hasPlayed;
    
    uint256 public totalClicks;
    uint256 public totalPlayers;
    uint256 public totalPoints;
    
    // Upgrade costs
    uint256 public constant CLICK_POWER_BASE_COST = 10;
    uint256 public constant AUTOCLICKER_BASE_COST = 50;
    uint256 public constant MULTIPLIER_BASE_COST = 100;
    
    // Upgrade scaling
    uint256 public constant COST_MULTIPLIER = 150; // 1.5x per level (150%)
    uint256 public constant COST_DENOMINATOR = 100;
    
    // Auto-clicker generation
    uint256 public constant AUTOCLICKER_INTERVAL = 5 minutes;
    uint256 public constant AUTOCLICKER_POINTS_PER_LEVEL = 1;
    
    event Clicked(address indexed player, uint256 points, uint256 totalPoints);
    event UpgradePurchased(address indexed player, string upgradeType, uint256 level, uint256 cost);
    event AutoClickerClaimed(address indexed player, uint256 points);
    event NewPlayer(address indexed player);
    
    /**
     * @notice Initialize a new player
     */
    function initPlayer() internal {
        if (!hasPlayed[msg.sender]) {
            hasPlayed[msg.sender] = true;
            playerList.push(msg.sender);
            totalPlayers++;
            players[msg.sender].clickPower = 1;
            players[msg.sender].gamesPlayed = 1;
            players[msg.sender].lastClaimTime = block.timestamp;
            emit NewPlayer(msg.sender);
        }
    }
    
    /**
     * @notice Click to earn points
     */
    function click() external {
        initPlayer();
        
        Player storage player = players[msg.sender];
        
        // Calculate points earned (clickPower * multiplier)
        uint256 basePoints = player.clickPower;
        uint256 multiplier = 1 + player.multiplierLevel;
        uint256 pointsEarned = basePoints * multiplier;
        
        player.points += pointsEarned;
        player.totalClicks++;
        totalClicks++;
        totalPoints += pointsEarned;
        
        emit Clicked(msg.sender, pointsEarned, player.points);
    }
    
    /**
     * @notice Claim auto-clicker rewards
     */
    function claimAutoClicker() external {
        require(hasPlayed[msg.sender], "Not initialized");
        
        Player storage player = players[msg.sender];
        require(player.autoClickerLevel > 0, "No auto-clicker");
        
        uint256 timePassed = block.timestamp - player.lastClaimTime;
        uint256 intervals = timePassed / AUTOCLICKER_INTERVAL;
        
        require(intervals > 0, "Too soon to claim");
        
        // Calculate auto-generated points
        uint256 pointsPerInterval = player.autoClickerLevel * AUTOCLICKER_POINTS_PER_LEVEL;
        uint256 multiplier = 1 + player.multiplierLevel;
        uint256 autoPoints = pointsPerInterval * intervals * multiplier;
        
        player.points += autoPoints;
        player.lastClaimTime = block.timestamp;
        totalPoints += autoPoints;
        
        emit AutoClickerClaimed(msg.sender, autoPoints);
    }
    
    /**
     * @notice Upgrade click power
     */
    function upgradeClickPower() external {
        initPlayer();
        
        Player storage player = players[msg.sender];
        uint256 currentLevel = player.clickPower;
        uint256 cost = calculateUpgradeCost(CLICK_POWER_BASE_COST, currentLevel);
        
        require(player.points >= cost, "Insufficient points");
        
        player.points -= cost;
        player.clickPower++;
        
        emit UpgradePurchased(msg.sender, "ClickPower", player.clickPower, cost);
    }
    
    /**
     * @notice Upgrade auto-clicker
     */
    function upgradeAutoClicker() external {
        initPlayer();
        
        Player storage player = players[msg.sender];
        uint256 currentLevel = player.autoClickerLevel;
        uint256 cost = calculateUpgradeCost(AUTOCLICKER_BASE_COST, currentLevel);
        
        require(player.points >= cost, "Insufficient points");
        
        player.points -= cost;
        player.autoClickerLevel++;
        
        // Set claim time if first auto-clicker
        if (player.autoClickerLevel == 1) {
            player.lastClaimTime = block.timestamp;
        }
        
        emit UpgradePurchased(msg.sender, "AutoClicker", player.autoClickerLevel, cost);
    }
    
    /**
     * @notice Upgrade multiplier
     */
    function upgradeMultiplier() external {
        initPlayer();
        
        Player storage player = players[msg.sender];
        uint256 currentLevel = player.multiplierLevel;
        uint256 cost = calculateUpgradeCost(MULTIPLIER_BASE_COST, currentLevel);
        
        require(player.points >= cost, "Insufficient points");
        
        player.points -= cost;
        player.multiplierLevel++;
        
        emit UpgradePurchased(msg.sender, "Multiplier", player.multiplierLevel, cost);
    }
    
    /**
     * @notice Calculate upgrade cost based on current level
     * @param baseCost Base cost of the upgrade
     * @param currentLevel Current level of the upgrade
     * @return cost Total cost for next level
     */
    function calculateUpgradeCost(uint256 baseCost, uint256 currentLevel) public pure returns (uint256 cost) {
        if (currentLevel == 0) {
            return baseCost;
        }
        
        // Cost = baseCost * (1.5 ^ currentLevel)
        cost = baseCost;
        for (uint256 i = 0; i < currentLevel; i++) {
            cost = (cost * COST_MULTIPLIER) / COST_DENOMINATOR;
        }
    }
    
    /**
     * @notice Get pending auto-clicker rewards
     * @param playerAddress Address of the player
     * @return points Pending points to claim
     */
    function getPendingAutoClicker(address playerAddress) external view returns (uint256 points) {
        Player memory player = players[playerAddress];
        
        if (player.autoClickerLevel == 0) {
            return 0;
        }
        
        uint256 timePassed = block.timestamp - player.lastClaimTime;
        uint256 intervals = timePassed / AUTOCLICKER_INTERVAL;
        
        uint256 pointsPerInterval = player.autoClickerLevel * AUTOCLICKER_POINTS_PER_LEVEL;
        uint256 multiplier = 1 + player.multiplierLevel;
        points = pointsPerInterval * intervals * multiplier;
    }
    
    /**
     * @notice Get player stats
     * @param playerAddress Address of the player
     */
    function getPlayer(address playerAddress) external view returns (
        uint256 points,
        uint256 clickPower,
        uint256 autoClickerLevel,
        uint256 multiplierLevel,
        uint256 totalClicks,
        uint256 gamesPlayed
    ) {
        Player memory player = players[playerAddress];
        return (
            player.points,
            player.clickPower,
            player.autoClickerLevel,
            player.multiplierLevel,
            player.totalClicks,
            player.gamesPlayed
        );
    }
    
    /**
     * @notice Get upgrade costs for a player
     * @param playerAddress Address of the player
     */
    function getUpgradeCosts(address playerAddress) external view returns (
        uint256 clickPowerCost,
        uint256 autoClickerCost,
        uint256 multiplierCost
    ) {
        Player memory player = players[playerAddress];
        clickPowerCost = calculateUpgradeCost(CLICK_POWER_BASE_COST, player.clickPower);
        autoClickerCost = calculateUpgradeCost(AUTOCLICKER_BASE_COST, player.autoClickerLevel);
        multiplierCost = calculateUpgradeCost(MULTIPLIER_BASE_COST, player.multiplierLevel);
    }
    
    /**
     * @notice Get leaderboard (top 10 players by points)
     */
    function getLeaderboard() external view returns (
        address[10] memory addresses,
        uint256[10] memory points
    ) {
        uint256 len = playerList.length < 10 ? playerList.length : 10;
        
        // Simple bubble sort for top 10
        address[] memory tempAddresses = new address[](playerList.length);
        uint256[] memory tempPoints = new uint256[](playerList.length);
        
        for (uint256 i = 0; i < playerList.length; i++) {
            tempAddresses[i] = playerList[i];
            tempPoints[i] = players[playerList[i]].points;
        }
        
        // Bubble sort
        for (uint256 i = 0; i < len; i++) {
            for (uint256 j = i + 1; j < playerList.length; j++) {
                if (tempPoints[j] > tempPoints[i]) {
                    // Swap points
                    uint256 tempPoint = tempPoints[i];
                    tempPoints[i] = tempPoints[j];
                    tempPoints[j] = tempPoint;
                    
                    // Swap addresses
                    address tempAddr = tempAddresses[i];
                    tempAddresses[i] = tempAddresses[j];
                    tempAddresses[j] = tempAddr;
                }
            }
        }
        
        // Return top 10
        for (uint256 i = 0; i < len; i++) {
            addresses[i] = tempAddresses[i];
            points[i] = tempPoints[i];
        }
    }
    
    /**
     * @notice Get total stats
     */
    function getGlobalStats() external view returns (
        uint256 _totalClicks,
        uint256 _totalPlayers,
        uint256 _totalPoints
    ) {
        return (totalClicks, totalPlayers, totalPoints);
    }
    
    /**
     * @notice Reset player progress (for testing)
     */
    function resetPlayer() external {
        require(hasPlayed[msg.sender], "Not initialized");
        
        Player storage player = players[msg.sender];
        player.points = 0;
        player.clickPower = 1;
        player.autoClickerLevel = 0;
        player.multiplierLevel = 0;
        player.lastClaimTime = block.timestamp;
        player.totalClicks = 0;
        player.gamesPlayed++;
    }
}
