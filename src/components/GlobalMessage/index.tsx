import { message as antdMessage, App } from 'antd';

import type { MessageInstance } from 'antd/es/message/interface';
let globalMessage: MessageInstance = antdMessage;
export const GlobalMessage = () => {
  const staticFunctions = App.useApp();

  globalMessage = staticFunctions.message;
  return null;
};

export { globalMessage };
