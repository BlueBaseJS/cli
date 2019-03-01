import { HTML } from '../../../server/components';
import React from 'react';
// tslint:disable-next-line:no-submodule-imports
import { renderToStaticMarkup } from 'react-dom/server';

export default () => `<!DOCTYPE html>${renderToStaticMarkup(<HTML />)}`;