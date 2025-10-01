import { tick } from '@/assets/icons';
import { Icon, Typography } from '@/components';

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'checked'> {
  label: string;
  id: string;
}

const Checkbox = ({ label, id, ...props }: CheckboxProps) => {
  return (
    <div className="flex w-full items-center gap-3">
      <input
        id={id}
        className="peer relative h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-sm border-secondary bg-secondary checked:border checked:bg-accent/40 lg:h-6 lg:w-6"
        type="checkbox"
        {...props}
      />
      <Icon
        icon={tick}
        name="checkbox-tick"
        size="h-5 w-5 lg:h-6 lg:w-6"
        className="pointer-events-none absolute opacity-0 transition peer-checked:opacity-100"
      />

      <label htmlFor={id} className="cursor-pointer">
        <Typography parentAs="span" size="base" className="normal-case">
          {label}
        </Typography>
      </label>
    </div>
  );
};

export default Checkbox;
