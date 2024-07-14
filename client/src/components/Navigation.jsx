import React from 'react'
import { ethers } from 'ethers';
import logo from '../assets/logo.svg';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

const Navigation = ({state,account,setAccount}) => {
    const [name, setName] = useState('')
    const [cost, setCost] = useState('')
    const {contract} = state
    
    const connectWallet=async()=>{
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        const account = ethers.getAddress([accounts[0]]);
        setAccount(account)

    }
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const tokens = (n) => {
    return ethers.parseUnits(n.toString(), 'ether')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tx = await contract.list(name,tokens(cost))
    await tx.wait()
    console.log(tx)
    handleClose()

  }

  return (
    <div>
        <nav>
      <div className='nav__brand'>
        <img src={logo} alt="Logo" />
        <h1>ETH Daddy</h1>

        <ul className='nav__links'>
          <li><a href="/">Domain Names</a></li>
          <li><a href="/">Websites & Hosting</a></li>
          <li><a href="/">Commerce</a></li>
          <li><a href="/">Email & Marketing</a></li>
          {
            account == "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" ? (<div><Button variant="outlined" onClick={handleClickOpen}>
                New Domain
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}

              >
                <form onSubmit={handleSubmit}>
                <DialogTitle>Enlist New Domain</DialogTitle>
                <DialogContent>
                  
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Domain Name"
                    type="name"
                    fullWidth
                    variant="standard"
                    onChange={(e)=>setName(e.target.value)}
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="cost"
                    name="cost"
                    label="Price of Domain"
                    type="number"
                    fullWidth
                    variant="standard"
                    onChange={(e)=>setCost(e.target.value)}
                    
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Enlist</Button>
                </DialogActions>
                </form>
              </Dialog></div>):("")
          }
        </ul>
      </div>

      {account ? (
        <button
          type="button"
          className='nav__connect'
        >
          {account.slice(0, 6) + '...' + account.slice(38, 42)}
        </button>
      ) : (
        <button
          type="button"
          className='nav__connect'
          onClick={connectWallet}
        >
          Connect
        </button>
      )}
    </nav>
      
    </div>
  )
}

export default Navigation
