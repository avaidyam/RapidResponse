import { Box, Card, Button, Divider, TextField, Chip } from "@mui/material"
import { useState } from "react"

export const Creator = ({ onAdd, ...props }) => {
  const [showField, setShowField] = useState(false)
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [room, setRoom] = useState("")
  return (
    <Box {...props}>
      <Box>
        <Button variant="contained" onClick={() => setName('Adult Medical Code')}>Adult Medical Code</Button>
        <Button variant="contained" onClick={() => setName('Adult Rapid Response')}>Adult Rapid Response</Button>
        <Button variant="contained" onClick={() => setName('Pediatric Medical Code')}>Pediatric Medical Code</Button>
        <Button variant="contained" onClick={() => setName('Behavioral Assist')}>Behavioral Assist</Button>
        <Button variant="contained" onClick={() => setName('Stroke Alert')}>Stroke Alert</Button>
        <Button variant="contained" onClick={() => setShowField(x => !x)}>OTHER - ENTER TEXT</Button>
      </Box>
      <Divider />
      <TextField disabled={!showField} style={{ display: showField ? "block" : "none" }} label="Alert Name" variant="outlined" value={name} onChange={x => setName(x.target.value)} />
      <TextField label="Location" variant="outlined" value={location} onChange={x => setLocation(x.target.value)} />
      <TextField label="Room/Bed" variant="outlined" value={room} onChange={x => setRoom(x.target.value)} />
      <Button variant="contained" onClick={() => onAdd?.({ name, location, room })}>GO</Button>
    </Box>
  )
}

export const App = () => {
  const [codes, setCodes] = useState([])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Creator onAdd={x => setCodes([...codes, x])} />
      <Box sx={{ display: 'flex', flexDirection: 'column', m: 2, p: 2 }}>
      {codes.map((x, idx) => 
        <Card sx={{ p: 1 }}>
          <Chip label={x.name} />
          <Chip label={x.location} />
          <Chip label={x.room} />
          <Button variant="contained" onClick={() => codes.splice(idx, 1) && setCodes([...codes])}>CANCEL</Button>
        </Card>
      )}
      </Box>
    </Box>
  )
}