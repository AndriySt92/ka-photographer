import { TextDecoder, TextEncoder } from 'util';

import '@testing-library/jest-dom';
import 'whatwg-fetch';

Object.assign(global, { TextEncoder, TextDecoder });
