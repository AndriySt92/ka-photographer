import type SessionOption from './SessionOption';

interface ServiceItem {
  title: string;
  img: string;
  path: string;
  description: string;
  value: SessionOption['value'];
  icon: string;
}

export default ServiceItem;
