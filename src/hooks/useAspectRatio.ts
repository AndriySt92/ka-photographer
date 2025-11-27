import { useEffect, useState } from 'react';

const useAspectRatio = () => {
  const [aspectRatio, setAspectRatio] = useState(
    typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 16 / 9,
  );

  useEffect(() => {
    const handleResize = () => {
      setAspectRatio(window.innerWidth / window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return aspectRatio;
};

export default useAspectRatio;
