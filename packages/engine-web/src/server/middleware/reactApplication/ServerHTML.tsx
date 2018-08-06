/**
 * This module is responsible for generating the HTML page response for
 * the react application middleware.
 */

import React, { Children } from 'react';
import { Utils } from '@blueeast/bluerain-cli-core';
import HTML from '../../../components/HTML';
import getClientBundleEntryAssets from './getClientBundleEntryAssets';
import { PlatformConfigs } from '../../../engine';
// import serialize from 'serialize-javascript';

// import ClientConfig from '../../../config/components/ClientConfig';

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
	// asyncComponentsState?: object;
	helmet?: any;
	nonce: string;
	reactAppString?: string;
}

export type GetServerHTMLType = (configs: PlatformConfigs) => React.StatelessComponent<ServerHTMLProperties>;

const getServerHTML: GetServerHTMLType = (configs) => (props) => {

	const ifElse = Utils.ifElse;
	const removeNil = Utils.removeNil;

	// Resolve the assets (js/css) for the client bundle's entry chunk.
	const clientEntryAssets = getClientBundleEntryAssets(configs)();

	const { helmet, reactAppString } = props;

// Creates an inline script definition that is protected by the nonce.
	// const inlineScript = (body: any) =>
	// <script nonce={nonce} type="text/javascript" dangerouslySetInnerHTML={{ __html: body }} />;

	const headerElements = removeNil([
		...ifElse(helmet)(() => helmet.meta.toComponent(), []),
		...ifElse(helmet)(() => helmet.title.toComponent(), []),
		...ifElse(helmet)(() => helmet.base.toComponent(), []),
		...ifElse(helmet)(() => helmet.link.toComponent(), []),
		ifElse(clientEntryAssets && clientEntryAssets.css)(() => stylesheetTag(clientEntryAssets.css)),
		...ifElse(helmet)(() => helmet.style.toComponent(), []),
	]);

	const bodyElements = removeNil([
	// Binds the client configuration object to the window object so
	// that we can safely expose some configuration values to the
	// client bundle that gets executed in the browser.
		// tslint:disable-next-line:jsx-key
		// <ClientConfig nonce={nonce} />,
	// Bind our async components state so the client knows which ones
	// to initialise so that the checksum matches the server response.
	// @see https://github.com/ctrlplusb/react-async-component
	// 	ifElse(asyncComponentsState)(() =>
	// 	inlineScript(
	// 		`window.__ASYNC_COMPONENTS_REHYDRATE_STATE__=${serialize(asyncComponentsState)};`,
	// 	),
	// ),


	// // Enable the polyfill io script?
	// // This can't be configured within a react-helmet component as we
	// // may need the polyfill's before our client JS gets parsed.
	// 	ifElse(config('polyfillIO.enabled'))(() =>
	// 	scriptTag(`${config('polyfillIO.url')}?features=${config('polyfillIO.features').join(',')}`),
	// ),


	// When we are in development mode our development server will
	// generate a vendor DLL in order to dramatically reduce our
	// compilation times.  Therefore we need to inject the path to the
	// vendor dll bundle below.
		ifElse(
			process.env.BUILD_FLAG_IS_DEV === 'true' && configs.bundles.client.devVendorDLL.enabled,
	)(() =>
		scriptTag(
			`${configs.bundles.client.webPath}${configs.bundles.client.devVendorDLL.name}.js?t=${Date.now()}`,
		),
	),
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
		appBodyString={reactAppString}
	/>
	);
};


// EXPORT

export default getServerHTML;
