interface ApiResponse<T = unknown> {
  status: 'error' | 'success';
  message: string;
  data?: T;
}

export default ApiResponse;
