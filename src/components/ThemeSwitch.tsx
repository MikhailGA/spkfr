import * as React from 'react';
import { connect } from 'react-redux';
import { iRootState } from '../store';

const css = `
    html { filter: invert(100%); background: #fefefe; }
    * { background-color: inherit }
    img:not([src*=".svg"]), video { filter: invert(100%) }`;

const mapState = (state: iRootState) => ({
  theme: state.theme,
});

type connectedProps = ReturnType<typeof mapState>;

const ThemeSwitch = (props: connectedProps) =>
  <style media={props.theme === 'dark' ? 'screen' : 'none'}>
    {props.theme === 'dark' ? css : ''}
  </style>;
export default connect(mapState)(ThemeSwitch);
