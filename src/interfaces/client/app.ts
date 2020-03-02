import { FunctionComponent } from 'react';

export interface SSRFunctionComponent<P> extends FunctionComponent<P> {
    getInitialProps: Function
}
