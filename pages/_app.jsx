import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/theme';
import { MDXProvider } from '@mdx-js/react'
import Typography from '@material-ui/core/Typography'

const toKebabCase = str => str.replace(/ +?/gi, '-')

const makeId = children => {
  const text = React.Children.toArray(children)[0]
  return toKebabCase(text)
}

const mdComponents = {
  h1: props => <Typography
    variant="h4"
    component="h1"
    {...props}
  />,
  h2: props => <Typography
    variant="h5"
    component="h2"
    {...props}
  />,
  h3: props => <Typography
    variant="h6"
    component="h3"
    id={makeId(props.children)}
    {...props}
  />,
  h4: props => <Typography
    variant="h6"
    component="h4"
    {...props}
  />,
  h5: props => <Typography
    variant="h6"
    component="h5"
    {...props}
  />,
  h6: props => <Typography
    variant="h6"
    component="h6"
    {...props}
  />,
  p: props => <Typography {...props} />
}

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <MDXProvider components={mdComponents}> 
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};