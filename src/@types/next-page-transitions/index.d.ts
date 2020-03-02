import { ClassicComponent, FunctionComponent, Component, ComponentState } from 'react';

export interface INextPageTrans {
  tag?: string;
  loadingComponent?: ClassicComponent | FunctionComponent | null;
  loadingCallbackName?: string;
  loadingDelay?: number;
  monkeyPatchScrolling?: boolean;
  skipInitialTransition?: boolean;
  timeout?: number;
  classNames?: string;
}

declare module 'next-page-transitions' {
  export class PageTransition extends Component<INextPageTrans, ComponentState> {}
}
