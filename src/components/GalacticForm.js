import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Loading from '../UI/Loading';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'inline-flex'
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: 1200,
    margin: "auto"
  },
}));


const GalacticForm = props => {
    const classes = useStyles();
    const [ enteredName, setEnteredName ] = useState('');
    const [ enteredBirthYeear, setEnteredBirthYeear ] = useState('');
    const [ enteredGender, setEnteredGender ] = useState('');

    const submitHandler = event => {
        event.preventDefault();
        props.onAddCharacter({
            name: enteredName, 
            birthYear: enteredBirthYeear,
            gender: enteredGender,
        });
      };
    
  return (
    <div>
      <Paper className={classes.paper}>
        <form className={classes.root} onSubmit={submitHandler}>
            <TextField
                required
                id="name"
                label="Name"
                variant="outlined"
                value={enteredName}
                onChange={event => {
                    setEnteredName(event.target.value);
                }}
            />
            <TextField
                required
                id="birth_year"
                label="Birth Year"
                variant="outlined"
                value={enteredBirthYeear}
                
                onChange={event => {
                    setEnteredBirthYeear(event.target.value);
                }}
            />
            <TextField
                required
                id="gender"
                label="Gender"
                variant="outlined"
                value={enteredGender}
                onChange={event => {
                    setEnteredGender(event.target.value);
                }}                
              />
            <Box style={{ display: "block"}}>
                <Button type="submit" color="primary" variant="contained" size="small">
                    Add
                </Button>
            </Box>
            {props.loading && <Loading />}

        </form>
      </Paper>
    </div>
  );
};

export default GalacticForm;
