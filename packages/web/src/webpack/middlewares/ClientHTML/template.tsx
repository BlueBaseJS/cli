import { HTML } from '../../../server/components';
// tslint:disable-next-line:no-submodule-imports
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';

export default () => `<!DOCTYPE html>${renderToStaticMarkup(<HTML />)}`;