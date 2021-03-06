import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  deepOrange400, deepOrange500, deepOrange600,
  blue300,
  grey300,
  orange500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#F4511E',
    primary2Color: deepOrange600,
    primary3Color: grey300,
    accent1Color: blue300,
    accent2Color: '#FF8224',
    accent3Color: grey300,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: deepOrange500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
});

export default muiTheme;
