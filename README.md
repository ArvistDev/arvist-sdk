# @arvist/sdk

A React UI component library for the **Arvist** platform — similar to MUI but rendering raw HTML elements with inline styles and no external CSS dependencies.

## Features

- **Zero external CSS dependencies** — all styling is done with inline styles
- **Tree-shakeable** — import only what you need
- **TypeScript-first** — every component is fully typed
- **Themeable** — customise the full design system via `ThemeProvider`
- **Primitive components** — Box, Stack, Grid, Typography, Button, TextField, Select, …
- **Arvist-specific components** — PalletCard, QualityBadge, DetectionResult, EventFeed, CameraView, …

---

## Installation

```bash
npm install @arvist/sdk
# React is a peer dependency
npm install react react-dom
```

---

## Quick start

```tsx
import React from 'react';
import {
  ThemeProvider,
  Stack,
  Typography,
  Button,
  PalletCard,
} from '@arvist/sdk';

export default function App() {
  return (
    <ThemeProvider>
      <Stack spacing={3} style={{ padding: 24 }}>
        <Typography variant="h4">Arvist Dashboard</Typography>

        <PalletCard
          palletId="PLT-001234"
          status="PASS"
          scannedAt={new Date()}
          products={[
            { name: 'Widget A', quantity: 15, confidence: 0.95 },
            { name: 'Widget B', quantity: 10, confidence: 0.89 },
          ]}
          onViewDetails={(id) => console.log('View', id)}
        />

        <Button variant="contained" color="primary">
          Scan New Pallet
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
```

---

## Theme

Wrap your app with `ThemeProvider`. Pass a custom theme to override defaults.

```tsx
import { ThemeProvider, defaultTheme } from '@arvist/sdk';
import type { Theme } from '@arvist/sdk';

const myTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: {
      ...defaultTheme.colors.primary,
      500: '#0057b8',
    },
  },
};

<ThemeProvider theme={myTheme}>
  {/* your app */}
</ThemeProvider>
```

Access theme values inside components with `useTheme()`:

```tsx
import { useTheme } from '@arvist/sdk';

function MyComponent() {
  const theme = useTheme();
  return <div style={{ color: theme.colors.primary[500] }}>Hello</div>;
}
```

---

## Primitive components

### Layout

| Component | Description |
|-----------|-------------|
| `Box` | A flexible `div` with shorthand CSS props |
| `Stack` | Flexbox row/column with gap and optional dividers |
| `Grid` | CSS grid container |

```tsx
<Box display="flex" gap="16px" padding="24px">
  <Stack direction="row" spacing={2} alignItems="center">
    <div>Item 1</div>
    <div>Item 2</div>
  </Stack>
</Box>

<Grid container columns={12} spacing={2}>
  <div style={{ gridColumn: 'span 4' }}>col 4</div>
  <div style={{ gridColumn: 'span 8' }}>col 8</div>
</Grid>
```

### Typography

```tsx
<Typography variant="h1">Heading 1</Typography>
<Typography variant="body1" color="rgba(0,0,0,0.6)">
  Body text with secondary colour
</Typography>
<Typography variant="code" component="pre">const x = 42;</Typography>
```

Variants: `display`, `h1`–`h6`, `subtitle1`, `subtitle2`, `body1`, `body2`, `caption`, `overline`, `code`

### Button

```tsx
<Button variant="contained" color="primary" size="md" startIcon={<span>➕</span>}>
  Add Item
</Button>

<Button variant="outlined" color="error" loading>
  Deleting…
</Button>
```

Props: `variant` (`contained` | `outlined` | `text`), `color`, `size` (`sm` | `md` | `lg`), `fullWidth`, `loading`, `startIcon`, `endIcon`

### IconButton

```tsx
<IconButton size="sm" onClick={() => {}}>✕</IconButton>
```

### TextField

```tsx
<TextField
  label="Search"
  placeholder="Type to search…"
  fullWidth
  startAdornment={<span>🔍</span>}
/>

<TextField
  label="Notes"
  multiline
  rows={4}
  error
  helperText="This field is required"
/>
```

### Select

```tsx
<Select
  label="Status"
  options={[
    { value: 'all', label: 'All' },
    { value: 'pass', label: 'Pass' },
    { value: 'fail', label: 'Fail' },
  ]}
  fullWidth
/>
```

### Checkbox & Switch

```tsx
<Checkbox label="Enable notifications" color="primary" />
<Switch label="Dark mode" checked={dark} onChange={(e) => setDark(e.target.checked)} />
```

### Chip & Badge

```tsx
<Chip label="Processed" color="success" />
<Chip label="Tag" variant="outlined" onDelete={() => {}} />

<Badge content={5} color="error">
  <IconButton>🔔</IconButton>
</Badge>
```

### Avatar & Divider

```tsx
<Avatar src="/user.jpg" alt="Alice" size="md" />
<Avatar color="primary">AB</Avatar>

<Divider />
<Divider>or</Divider>
```

### Card

```tsx
<Card elevation={2}>
  <CardHeader
    cardTitle="Pallet Analysis"
    subheader="2 minutes ago"
    avatar={<Avatar>P</Avatar>}
    action={<IconButton>⋯</IconButton>}
  />
  <CardContent>
    <Typography variant="body2">Analysis complete with no anomalies.</Typography>
  </CardContent>
  <CardActions>
    <Button variant="text">Cancel</Button>
    <Button variant="contained">Confirm</Button>
  </CardActions>
</Card>
```

### Alert

```tsx
<Alert severity="success" title="Analysis complete" onClose={() => {}}>
  The pallet was scanned successfully.
</Alert>

<Alert severity="error" variant="filled">
  Connection to MQTT broker lost.
</Alert>
```

### Progress

```tsx
<CircularProgress color="primary" />
<CircularProgress variant="determinate" value={75} />

<LinearProgress />
<LinearProgress variant="determinate" value={60} color="success" />
```

### Table

```tsx
<Table>
  <TableHead>
    <TableRow>
      <TableCell component="th">Pallet ID</TableCell>
      <TableCell component="th">Status</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow hover>
      <TableCell>PLT-001</TableCell>
      <TableCell><QualityBadge status="PASS" /></TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### List

```tsx
<List>
  <ListItem button divider secondaryAction={<IconButton>›</IconButton>}>
    <ListItemText primary="Event 1" secondary="2 mins ago" />
  </ListItem>
</List>
```

### Tabs

```tsx
const [tab, setTab] = React.useState('overview');

<Tabs value={tab} onChange={setTab} color="primary">
  <Tab value="overview" label="Overview" />
  <Tab value="detections" label="Detections" />
  <Tab value="events" label="Events" />
</Tabs>

<TabPanel value="overview">…</TabPanel>
<TabPanel value="detections">…</TabPanel>
```

### Dialog

```tsx
<Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
  <DialogTitle onClose={() => setOpen(false)}>Confirm Action</DialogTitle>
  <DialogContent>
    <Typography variant="body1">Are you sure?</Typography>
  </DialogContent>
  <DialogActions>
    <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="contained" color="error">Delete</Button>
  </DialogActions>
</Dialog>
```

### Tooltip

```tsx
<Tooltip title="Click to scan a new pallet" placement="top">
  <Button variant="contained">Scan</Button>
</Tooltip>
```

---

## Arvist-specific components

### QualityBadge

Renders a styled pass/fail status pill.

```tsx
<QualityBadge status="PASS" />
<QualityBadge status="FAIL" size="lg" />
<QualityBadge status="PROCESSING" showIcon={false} />
```

Statuses: `PASS` | `FAIL` | `PENDING` | `PROCESSING` | `ERROR`

### PalletCard

Full pallet summary card with thumbnail, products, and action buttons.

```tsx
<PalletCard
  palletId="PLT-98765"
  status="FAIL"
  scannedAt={new Date()}
  cameraId="CAM-01"
  modelVersion="2.4.1"
  anomaliesDetected={2}
  products={[
    { name: 'Widget A', quantity: 12, confidence: 0.91 },
  ]}
  onViewDetails={(id) => navigate(`/pallets/${id}`)}
  onReprocess={(id) => reprocess(id)}
/>
```

### DetectionResult

Displays ML model detections with confidence bars.

```tsx
<DetectionResult
  detections={[
    { label: 'Widget A', confidence: 0.95, subLabel: 'SKU-001', attributes: { damaged: false } },
    { label: 'Widget B', confidence: 0.72 },
  ]}
  modelVersion="2.4.1"
  inferenceTimeMs={142}
/>
```

### MetricCard

A KPI card with optional trend indicator.

```tsx
<MetricCard
  title="Pallets Scanned Today"
  value={1_247}
  icon="📦"
  color="primary"
  trend={{ value: 12.5, label: 'vs. yesterday' }}
/>

<MetricCard title="Pass Rate" value="97.3" unit="%" icon="✓" color="success" />
```

### PluginStatusCard

Shows plugin connection status, uptime, and MQTT info.

```tsx
<PluginStatusCard
  pluginId="quality-vision-v2"
  name="Quality Vision"
  version="2.1.0"
  status="connected"
  mqttBroker="mqtt-east.arvistcloud.net"
  eventsProcessed={8_412}
  uptime={86400}
  lastEvent={new Date()}
  onReconnect={() => reconnect()}
/>
```

Statuses: `connected` | `disconnected` | `connecting` | `error`

### CameraView

Camera feed display with live indicator, offline state, and labels.

```tsx
<CameraView
  src="https://example.com/cam01/snapshot.jpg"
  cameraId="CAM-01"
  label="Intake conveyor"
  live
  onSnapshot={() => takeSnapshot()}
/>

<CameraView offline cameraId="CAM-03" label="Exit gate" />
```

### AnnotatedImage

Renders an image with bounding box overlays drawn on a canvas.

```tsx
<AnnotatedImage
  src="/pallet-scan.jpg"
  boundingBoxes={[
    { x: 120, y: 80, width: 200, height: 150, label: 'Widget A', confidence: 0.95 },
    { x: 340, y: 60, width: 180, height: 130, label: 'Widget B', confidence: 0.72, color: '#e91e63' },
  ]}
  containerStyle={{ width: '100%' }}
/>
```

### EventFeed

Auto-scrolling MQTT event log.

```tsx
<EventFeed
  events={events}
  maxHeight={400}
  autoScroll
  onEventClick={(evt) => console.log(evt.payload)}
/>
```

Each event: `{ id, topic, timestamp, severity?, summary?, payload? }`  
Severities: `info` | `warning` | `error` | `success`

---

## License

MIT © ArvistDev
