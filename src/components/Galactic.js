import React, { useState, useCallback } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import GalacticForm from './GalacticForm';
import GalacticList from './GalacticList';
import Loading from "../UI/Loading";

import { getFromLocalStorage, saveToLocalStorage } from '../helpers/localStorageHelper';
const MAX = 10;

const Galactic = () => {
    const [galacticChar, setGalacticChar] = useState(getFromLocalStorage('galacticChar') || []);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const addCharacterHandler = character => {
        setError('');
        setIsLoading(true);
        console.log(galacticChar.length);
        if ( galacticChar.length < MAX) {

            
            let latestChar = null
            if (galacticChar.length === 1) {
                latestChar = galacticChar[0]
            }
            else if (galacticChar.length > 1) {
                
                const charsSortedById = galacticChar.sort((a, b) => a.id > b.id)
                latestChar = charsSortedById[0]
            }

            if (galacticChar.some(item => item.character.name === character.name)) {
                setError('The character already exists');
            } else {
                const newChar = [
                    {
                        id: latestChar ? latestChar.id + 1 : 0,
                        character,
                    },
                    ...galacticChar,
                    ]
                    setGalacticChar(newChar)
        
                    saveToLocalStorage('galacticChar', newChar)
                
            }
    

        } else {
            setError(`The characters limit of ${MAX} is reached. Please remove one to add a new one.`)
        }
        setIsLoading(false);

      };
      
      const removeCharacterHandler = useCallback(id => {
        setError('');
        setIsLoading(true);

        const newChar = galacticChar.filter(galacticC => galacticC.id !== id)

        setGalacticChar(newChar)
    
        saveToLocalStorage('galacticChar', newChar)
        setIsLoading(false);

      }, [galacticChar])

    return (
        <Container maxWidth="md">
            {isLoading && <Loading />}
            <Box>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    My Galactic League
                </Typography>   
            </Box>
            <Box>
                <GalacticForm onAddCharacter={addCharacterHandler}/>
            </Box>
            <Box>
                <Typography color="error" align="center">
                    {error && error }
                </Typography>
                {galacticChar.length ? <GalacticList items={galacticChar} onRemoveItem={removeCharacterHandler} /> : null}
            </Box>
     </Container>
    )
};

export default Galactic;