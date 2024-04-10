import { Box, Button, Divider, TextField } from "@mui/material"
import { useState } from "react"

export const App = () => {
  const [showAlert, setShowAlert] = useState(false)
  return (
    <div>
      <Box>
        <Button variant="contained">Adult Medical Code</Button>
        <Button variant="contained">Adult Rapid Response</Button>
        <Button variant="contained">Peds Medical Code</Button>
        <Button variant="contained">Behavioral Assist</Button>
        <Button variant="contained">Stroke Alert</Button>
        <Button variant="contained" onClick={() => setShowAlert(x => !x)}>OTHER - ENTER TEXT</Button>
      </Box>
      <Divider />
      <TextField style={{ display: showAlert ? "block" : "none" }} label="Alert Name" variant="outlined" />
      <TextField label="Location" variant="outlined" />
      <TextField label="Room/Bed" variant="outlined" />
    </div>
  )
}