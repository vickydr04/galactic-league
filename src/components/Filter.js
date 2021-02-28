import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { DataGrid } from "@material-ui/data-grid";

import { API_PEOPLE } from '../api/endpoints';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Loading from "../UI/Loading";

const Filter = () => {
    const baseURL = `${API_PEOPLE}?page=`;
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = React.useState(0);
    const [reqURL, setReqURL] = useState(`${baseURL}${page+1}`);
    const [columns] = useState([
        { field: "id", hide: true },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "speciesName", headerName: "Species", flex: 1 },
        { field: "homeworldName", headerName: "Homeworld", flex: 1 },
        { field: "starshipsName", headerName: "Starships", flex: 1 }
    ]);

    const [perPage] = useState(10);
    
    useEffect(() => {
        setIsLoading(true)
        axios.get(`${reqURL}`)
        .then(response => {
            console.log(response.data)
            const people = response.data.results;
            

            const peopPromise = []
            const starshipsPromise = []
            const speciesPromise = []

            for (let i = 0; i < people.length; i++) {
                const person = people[i];

        
                peopPromise.push(axios.get(person.homeworld));
                
                const starship = person.starships.map(starship => {
                    return axios.get(starship);
                })

                const species = person.species.map(spc => {
                    return axios.get(spc);
                })
                
                starshipsPromise.push(Promise.all(starship));
                speciesPromise.push(Promise.all(species));

            }

            const planetsParse = Promise.all(peopPromise).then(responsePlanet => {
                for (let i = 0; i < responsePlanet.length; i++) {
                    people[i].homeworldName = responsePlanet[i].data.name;
                }
            });

            const starshipsParse = Promise.all(starshipsPromise).then(responseStarships => {
                for (let i = 0; i < responseStarships.length; i++) {
                
                    people[i].starshipsName = [];
                    for (let j = 0; j < responseStarships[i].length; j++) {
                        people[i].starshipsName.push(responseStarships[i][j].data.name);
                    }
                }
            });

            const speciesParse = Promise.all(speciesPromise).then(responseSpecies => {
                for (let i = 0; i < responseSpecies.length; i++) {
                    
                    people[i].speciesName = [];
                    
                    if (!responseSpecies[i].length) {
                        people[i].speciesName.push('Human');
                    }

                    for (let j = 0; j < responseSpecies[i].length; j++) {
                        
                        people[i].speciesName.push(responseSpecies[i][j].data.name);
                    }
                }
            });
            Promise.all([planetsParse, starshipsParse, speciesParse]).then(res => {
                setData(people);
            })


            setIsLoading(false);

            setTotalRows(response.data.count)

        })
    },[perPage, page, reqURL]);

    const pageChangeHandler = useCallback((params) => {
        setPage(params.page);
        setReqURL(`${baseURL}${params.page+1}`)
    }, [baseURL])
      
    return (
        <Container maxWidth="md">
            <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                    Galactic League
                </Typography>
            </Box>
            <Box style={{ height: 600, width: '100%' }}>
                <div style={{ display: 'flex', height: '600px' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid 
                            rows={data} 
                            columns={columns} 
                            onPageChange={pageChangeHandler}
                            page={page} 
                            pageSize={perPage}
                            getRowId={(row) => row.url}
                            pagination
                            paginationMode="server"
                            rowCount={totalRows}
                            maxColumns={4}
                        />
                    </div>

                </div>
                {isLoading && <Loading />}

             </Box>
         </Container>
    )
}

export default Filter;