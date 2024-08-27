import { Color } from '@/types/Color';

import ProgressBar from './ProgressBar';
import Tooltip from './Tooltip';

type PasswordScoreProps = {
  score: number;
};

const PasswordScore = ({ score }: PasswordScoreProps) => {
  let color: Color = 'primary';
  let description = 'Muy imposible de adivinar';

  if (score == 0) {
    color = 'danger';
    description = 'Demasiado fácil de adivinar';
  } else if (score == 1) {
    color = 'danger';
    description = 'Muy fácil de adivinar';
  } else if (score == 2) {
    color = 'warning';
    description = 'Algo fácil de adivinar';
  } else if (score == 3) {
    color = 'success';
    description = 'Imposible de adivinar de forma segura';
  }

  return (
    <Tooltip
      content={<div><p>Puntaje: <strong>{score} / 4</strong></p><p>{description}</p></div>}
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
