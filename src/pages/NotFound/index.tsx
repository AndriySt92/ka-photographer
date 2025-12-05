import { Link } from 'react-router-dom';

import { search } from '@/assets';
import { Button, Icon, Typography } from '@/components';
import { ROUTES } from '@/config';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="space-y-sm container">
        {/* Title & Description */}
        <div className="flex flex-col items-center gap-5">
          <Icon name="not-found" icon={search} size="size-28 lg:size-40" className="mb-3" />

          <Typography parentAs="h1" size="6xl">
            404 Сторінку не знайдено
          </Typography>

          <Typography parentAs="p">
            На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.
          </Typography>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to={ROUTES.HOME}>
            <Button size="textSm">Повернутися на головну</Button>
          </Link>

          <Link to={ROUTES.CONTACTS}>
            <Button size="textSm">Зв'язатися з нами</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
