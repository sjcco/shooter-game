export default function getSpawnPoint() {
  const spwanPoints = [
    [100, 75],
    [300, 300],
    [573, 123],
    [573, 313],
    [50, 348],
  ];

  return spwanPoints[Math.floor(Math.random() * spwanPoints.length)];
}