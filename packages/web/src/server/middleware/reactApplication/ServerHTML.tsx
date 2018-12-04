/**
 * This module is responsible for generating the HTML page response for
 * the react application middleware.
 */

import React, { Children } from 'react';
import { ServerConfigsBundle } from '../../server';
import { Utils } from '@blueeast/bluerain-cli-core';
// tslint:disable-next-line:no-submodule-imports
import { renderToStaticMarkup } from 'react-dom/server';
import HTML from '../../components/HTML';
import Helmet from 'react-helmet';
import SplashScreen from '../../components/SplashScreen';
import getClientBundleEntryAssets from './getClientBundleEntryAssets';

// PRIVATES
function KeyedComponent({ children }: { children: React.ReactNode }) {
	return Children.only(children);
}

function stylesheetTag(stylesheetFilePath: string) {
	return (
    <link href={stylesheetFilePath} media="screen, projection" rel="stylesheet" type="text/css" />
	);
}

function scriptTag(jsFilePath: string) {
	return <script type="text/javascript" src={jsFilePath} />;
}

// ServerHTML Component
export interface ServerHTMLProperties {
	nonce: string;
	reactAppString?: string;
	styleElement?: any;
}

export type GetServerHTMLType = (configs: ServerConfigsBundle) => React.StatelessComponent<ServerHTMLProperties>;

const getServerHTML: GetServerHTMLType = (configs) => (props) => {

	const ifElse = Utils.ifElse;
	const removeNil = Utils.removeNil;

	// Resolve the assets (js/css) for the client bundle's entry chunk.
	const clientEntryAssets = getClientBundleEntryAssets(configs)();

	const { reactAppString, styleElement } = props;

	const helmet = Helmet.rewind();

// // Creates an inline script definition that is protected by the nonce.
// 	const inlineScript = (body: any) =>
// 	<script nonce={nonce} type="text/javascript" dangerouslySetInnerHTML={{ __html: body }} />;

	const headerElements = removeNil([
		...ifElse(helmet)(() => helmet.meta.toComponent(), []),
		...ifElse(helmet)(() => helmet.title.toComponent(), []),
		...ifElse(helmet)(() => helmet.base.toComponent(), []),
		...ifElse(helmet)(() => helmet.link.toComponent(), []),
		ifElse(clientEntryAssets && clientEntryAssets.css)(() => stylesheetTag(clientEntryAssets.css)),
		...ifElse(helmet)(() => helmet.style.toComponent(), []),
		ifElse(helmet)(() => styleElement),
	]);

	// const devVendorDLL = configs.client.devVendorDLL;

	const bodyElements = removeNil([
	// When we are in development mode our development server will
	// generate a vendor DLL in order to dramatically reduce our
	// compilation times.  Therefore we need to inject the path to the
	// vendor dll bundle below.
	// 	ifElse(
	// 		process.env.BUILD_FLAG_IS_DEV === 'true' && devVendorDLL && devVendorDLL.enabled,
	// )(() =>
	// 	scriptTag(
	// 		`${configs.client.publicPath}/${devVendorDLL && devVendorDLL.name}.js?t=${Date.now()}`,
	// 	),
	// ),
		ifElse(clientEntryAssets && clientEntryAssets.js)(() => scriptTag(clientEntryAssets.js)),
		...ifElse(helmet)(() => helmet.script.toComponent(), []),
	]);

	return (
	<HTML
		htmlAttributes={ifElse(helmet)(() => helmet.htmlAttributes.toComponent(), null)}
		headerElements={headerElements.map((x, idx) =>
			(<KeyedComponent key={idx}>
				{x}
			</KeyedComponent>),
		)}
		bodyElements={bodyElements.map((x, idx) =>
			(<KeyedComponent key={idx}>
				{x}
			</KeyedComponent>),
		)}
		appBodyString={reactAppString || renderToStaticMarkup(<SplashScreen />)}
	/>
	);
};

export default getServerHTML;
