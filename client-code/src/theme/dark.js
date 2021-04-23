import { createMuiTheme } from "@material-ui/core"

import * as color from "@material-ui/core/colors"

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: color.pink,
    secondary: color.cyan,
  },
})

export default theme
