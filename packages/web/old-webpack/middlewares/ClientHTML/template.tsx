import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { HTML } from '../../../../../server/components';

export default () => `<!DOCTYPE html>${renderToStaticMarkup(<HTML />)}`;