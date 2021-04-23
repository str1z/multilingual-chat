import { createMuiTheme } from "@material-ui/core"

import * as color from "@material-ui/core/colors"

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: color.pink,
    secondary: color.cyan,
  },
})

export default theme
