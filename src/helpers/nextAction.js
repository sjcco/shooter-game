export default function nextAction() {
  const actions = [
    'jump',
    'left',
    'right',
    'left-jump',
    'right-jump',
    'left',
    'right',
    'nothing',
  ];
  return actions[Math.floor(Math.random() * actions.length)];
}