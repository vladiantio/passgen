import { Color } from '@/types/Color';

import ProgressBar from './ProgressBar';
import Tooltip from './Tooltip';

type PasswordScoreProps = {
  score: number;
};

const PasswordScore = ({ score }: PasswordScoreProps) => {
  let color: Color = 'primary';
  switch (score) {
    case 0:
    case 1:
      color = 'danger';
      break;
    case 2:
      color = 'warning';
      break;
    case 3:
      color = 'success';
      break;
  }
  return (
    <Tooltip
      content={<span>Puntaje: <strong>{score} / 4</strong></span>}
      placement="bottom-start"
    >
      <ProgressBar
        min={0}
        max={4}
        value={score}
        color={color}
        aria-label="Puntuación"
      />
    </Tooltip>
  );
};

export default PasswordScore;
