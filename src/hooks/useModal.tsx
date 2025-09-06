import { useCallback, useState } from 'react';

const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  return { closeModal, isOpenModal, openModal };
};

export default useModal;
