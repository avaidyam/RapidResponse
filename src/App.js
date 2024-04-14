import { Grid, Typography, Button, TextField, Chip, Card } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocalStorage } from "@uidotdev/usehooks"

//
const TextToSpeech = (x, cancel) => {
  const str = `${cancel ? 'CANCEL' : ''} ${x.name} at ${x.location} in room ${x.room.split("").join(" ")}`
  global.speechSynthesis.speak(new SpeechSynthesisUtterance(`ALERT. ${str}. REPEAT ALERT. ${str}. OVER.`))
  return true
}

export const Creator = ({ onAdd, ...props }) => {
  const [showField, setShowField] = useState(false)
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [room, setRoom] = useState("")
  return (
    <Grid container spacing={2} {...props}>
      <Grid item xs={6}>
        <Button fullWidth sx={{ aspectRatio: 3/1, fontSize: 72, lineHeight: 1 }} variant="contained" color="error" onClick={() => setName('Adult Medical Code')}>Adult Medical Code</Button>
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth sx={{ aspectRatio: 3/1, fontSize: 72, lineHeight: 1 }} variant="contained" color="error" onClick={() => setName('Pediatric Medical Code')}>Pediatric Medical Code</Button>
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth sx={{ aspectRatio: 3/1, fontSize: 72, lineHeight: 1 }} variant="contained" color="warning" onClick={() => setName('Adult Rapid Response')}>Rapid Response</Button>
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth sx={{ aspectRatio: 3/1, fontSize: 72, lineHeight: 1 }} variant="contained" color="warning" onClick={() => setName('Stroke Alert')}>Stroke Alert</Button>
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth sx={{ aspectRatio: 3/1, fontSize: 72, lineHeight: 1 }} variant="contained" color="secondary" onClick={() => setName('Behavioral Assist')}>Behavioral Assist</Button>
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth sx={{ aspectRatio: 3/1, fontSize: 72, lineHeight: 1 }} variant="contained" color="info" onClick={() => setShowField(x => !x)}>Other...</Button>
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth disabled={!showField} style={{ display: showField ? "block" : "none" }} label="Alert Name" variant="filled" value={name} onChange={x => setName(x.target.value)} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Location" variant="filled" value={location} onChange={x => setLocation(x.target.value)} />
      </Grid>
      <Grid item xs={6}>
        <TextField fullWidth label="Room/Bed" variant="filled" value={room} onChange={x => setRoom(x.target.value)} />
      </Grid>
      <Grid item xs={12}>
        <Button fullWidth sx={{ fontSize: 36, lineHeight: 1 }} variant="outlined" onClick={() => onAdd?.({ date: Date.now(), name, location, room })}>Send Alert</Button>
      </Grid>
    </Grid>
  )
}

export const List = ({ items, onDelete, ...props }) => {
  return (
    <Grid container spacing={2} {...props}>
      {items.map((x, idx) => 
        <Grid item xs={12} key={idx}>
          <Card >
            <Grid container spacing={2} padding={2} direction="row" justifyContent="space-around" alignItems="center">
              <Grid item>
                <Chip label={new Date(x.date).toLocaleTimeString() ?? "???"} />
              </Grid>
              <Grid item>
                <Chip label={x.name} />
              </Grid>
              <Grid item>
                <Chip label={x.location} />
              </Grid>
              <Grid item>
                <Chip label={x.room} />
              </Grid>
              <Grid item>
                <Button variant="outlined" color="error" onClick={() => onDelete(x, idx)}>CANCEL</Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export const App = ({ ...props }) => {
  const [alerts, setAlerts] = useLocalStorage("alert-list", [])
  useEffect(() => {
    // diff here ...
  }, [alerts])
  return (
    <Grid container padding={1} spacing={2} {...props}> 
      <Grid item xs={12} md={9}>
        <Creator onAdd={x => TextToSpeech(x) && setAlerts([...alerts, x])} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h3">Active Alerts</Typography>
        <List items={alerts} onDelete={(x, idx) => TextToSpeech(x, 1) && alerts.splice(idx, 1) && setAlerts([...alerts])}></List>
      </Grid>
    </Grid>
  )
}