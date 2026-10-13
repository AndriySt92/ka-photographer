import axios from 'axios';

const getCloudinaryErrorMessage = (error: unknown, fileName: string): string => {
  if (axios.isAxiosError(error)) {
    const cloudinaryError = error.response?.data?.error?.message;
    if (cloudinaryError) {
      return `Не вдалося завантажити ${fileName}": ${cloudinaryError}`;
    }

    switch (error.code) {
      case 'ECONNABORTED':
        return `Час очікування завантаження для "${fileName}" вичерпано — можливо файл занадто великий або з'єднання повільне`;
      case 'NETWORK_ERROR':
        return `Помилка мережі під час завантаження "${fileName}" — перевірте підключення до інтернету`;
      default:
        return `Не вдалося завантажити "${fileName}": ${error.message}`;
    }
  }

  if (error instanceof Error) {
    return `Не вдалося завантажити "${fileName}": ${error.message}`;
  }

  return `Не вдалося завантажити "${fileName}": сталася невідома помилка`;
};

export default getCloudinaryErrorMessage;
