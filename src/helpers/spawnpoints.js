export default function getSpawnPoint() {
  const spwanPoints = [
    [100, 100],
    [300, 300],
  ];

  return spwanPoints[Math.floor(Math.random() * spwanPoints.length)];
}