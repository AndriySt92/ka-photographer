import { Modal, SessionOrderForm } from '@/components';

interface SessionOrderModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  sessionType?: string;
}

const SessionOrderModal = ({
  isOpen,
  onClose,
  sessionType,
  title = 'Замовити фотосесію',
}: SessionOrderModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <SessionOrderForm sessionType={sessionType} />
    </Modal>
  );
};

export default SessionOrderModal;
