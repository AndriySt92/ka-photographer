import { useNavigate } from 'react-router-dom';

import { arrowLeft } from '@/assets';

import { Button, Icon } from '..';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Button size="iconLg" intent="primary" onClick={handleGoBack}>
      <Icon icon={arrowLeft} name="arrow-left" size="h-8 w-8" />
    </Button>
  );
};

export default GoBackButton;
