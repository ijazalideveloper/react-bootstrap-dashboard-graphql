import { useContext } from 'react';
import ToastContext from './context';

function useToast() {
  const context = useContext(ToastContext);

  return { add: context.add };
}

export default useToast;