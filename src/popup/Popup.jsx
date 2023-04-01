import React from 'react'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Tooltip } from 'primereact/tooltip'
import logo from '../assets/logo.png'
import './Popup.css'

const Popup = () => {
  const [value, setValue] = React.useState('')

  return (
    <Card
      className="border position-relative"
      // style={{ background: 'var(--primary-color)' }}
    >
      <div className="flex flex-column m-3 gap-4">
        <div className="flex flex-row justify-content-center gap-2" style={{ background: '' }}>
          <img src={logo} alt="logo" className="logo" style={{ width: '64px', height: '64px' }} />
          <h2>RizzFi</h2>
        </div>
        <div className="flex flex-row justify-content-center gap-3">
          <Button
            icon="pi pi-play"
            aria-label="Filter"
            tooltip="Play"
            tooltipOptions={{ position: 'left' }}
          />
          <Button
            icon="pi pi-replay"
            aria-label="Filter"
            tooltip="Shuffle"
            tooltipOptions={{ position: 'right' }}
          />
        </div>
        <div className="flex flex-row align-items-center gap-2">
          <h2>Genre</h2>
          <span className="p-float-label">
            <InputText id="genre" value={value} onChange={(e) => setValue(e.target.value)} />
            <label htmlFor="genre">Genre</label>
          </span>
          <Button
            icon="pi pi-check"
            aria-label="Filter"
            tooltip="Yep"
            tooltipOptions={{ position: 'top' }}
          />
        </div>
      </div>
    </Card>
  )
}

export default Popup
