export default function getAnimation(direction, faction, action) {
  let color;
  if (faction === 'player') {
    color = 'blue';
  } else {
    color = 'red';
  }
  return `gunner-${color}-${action}-${direction}-anim`;
}