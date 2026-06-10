export const rewardTiers = [
  {
    id: "cata-tunki",
    pointsRequired: 150,
    title: "Cata Tunki",
    description:
      "Accede a una experiencia guiada para descubrir aromas, notas y perfiles exclusivos.",
  },
  {
    id: "pack-especial",
    pointsRequired: 300,
    title: "Pack Especial",
    description:
      "Canjea tus puntos por una bolsa seleccionada de café Tunki para disfrutar en casa.",
  },
  {
    id: "beneficio-premium",
    pointsRequired: 500,
    title: "Beneficio Premium",
    description:
      "Recibe acceso preferente a lanzamientos, degustaciones y beneficios de temporada.",
  },
];

export function calculatePointsForOrder(total) {
  return Math.max(0, Math.floor(Number(total) || 0));
}

export function getOrderPoints(order) {
  if (typeof order.pointsEarned === "number") {
    return order.pointsEarned;
  }

  return calculatePointsForOrder(order.total);
}

export function getRedemptionPoints(redemptions = []) {
  return redemptions.reduce(
    (points, redemption) => points + (redemption.pointsUsed || 0),
    0
  );
}

export function getUserRewardSummary(orders = [], redemptions = []) {
  const totalPoints = orders.reduce(
    (points, order) => points + getOrderPoints(order),
    0
  );
  const redeemedPoints = getRedemptionPoints(redemptions);
  const availablePoints = Math.max(0, totalPoints - redeemedPoints);
  const unlockedRewards = rewardTiers.filter(
    (reward) => availablePoints >= reward.pointsRequired
  );
  const nextReward =
    rewardTiers.find((reward) => availablePoints < reward.pointsRequired) ||
    rewardTiers[rewardTiers.length - 1];
  const pointsToNext = Math.max(0, nextReward.pointsRequired - availablePoints);
  const progress = nextReward
    ? Math.min(
        100,
        Math.round((availablePoints / nextReward.pointsRequired) * 100)
      )
    : 100;

  return {
    totalPoints,
    redeemedPoints,
    availablePoints,
    unlockedRewards,
    nextReward,
    pointsToNext,
    progress,
  };
}

export function createRewardRedemption(reward, user) {
  return {
    id: `RW-${Date.now()}`,
    code: `TUNKI-${String(Date.now()).slice(-6)}`,
    rewardId: reward.id,
    rewardTitle: reward.title,
    pointsUsed: reward.pointsRequired,
    userId: user.id,
    userEmail: user.email,
    status: "pendiente",
    createdAt: new Date().toISOString(),
  };
}
