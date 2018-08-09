import React from 'react';

export interface HTMLProperties {
	htmlAttributes?: object,
	headerElements?: React.ReactNode,
	bodyElements?: React.ReactNode,
	appBodyString?: string,
}

/**
 * The is the HTML shell for our React Application.
 */
const HTML = (props: HTMLProperties) => {
	const {
		htmlAttributes = null,
		headerElements = null,
		bodyElements = null,
		appBodyString = ''
	} = props;

	return (
    <html {...htmlAttributes}>
      <head>{headerElements}</head>
      <body>
        <div
          id="app"
          className="app-container"
          dangerouslySetInnerHTML={{ __html: appBodyString }}
        />
        {bodyElements}
      </body>
    </html>
	);
};

// HTML.defaultProps = {
// 	htmlAttributes: null,
// 	headerElements: null,
// 	bodyElements: null,
// 	appBodyString: '',
// };

// EXPORT

export default HTML;
