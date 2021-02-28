import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: 400,
    margin: "auto"
  },
}));

const GalacticList = React.memo(props => {
  const classes = useStyles();

  console.log(props.items)
  return (
    <Box>
      <Paper className={classes.paper}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
           Added Characters
        </Typography>
        <List>
        {props.items && props.items.map(item => (

            <ListItem key={item.id}>
              <ListItemText
                primary={`Name: ${item.character.name}`}
                secondary={`Birth Year: ${item.character.birthYear}`}
              />
              <ListItemText
                primary={`Gender: ${item.character.gender}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={props.onRemoveItem.bind(this, item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}

        </List>
      </Paper>
    </Box>
  );
});

export default GalacticList;
