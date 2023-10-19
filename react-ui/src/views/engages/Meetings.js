import PropTypes from 'prop-types';
import React, {useCallback, useState, useEffect, useMemo} from 'react';
// material-ui
import { useTheme } from '@material-ui/styles';
////import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from 'material-react-table';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../store/constant';
import {ExpandLess, ExpandMore, AccountCircle, Send, Delete, DeleteOutline, Edit, DomainAdd, TurnLeft, PanToolAlt, Visibility, Inventory, Add, SellOutlined, FolderOutlined, FileDownloadOutlined, Mail} from "@mui/icons-material";
import {
    Box,
    Button,
    ButtonGroup,
    Stack,
    TextField,
    Grid,
    Typography
} from '@mui/material';

export default function Meetings() {
  
  const [data, setData] = useState({});
  const [manageBoxShow, setManageBoxShow] = useState(false);
  const handleCreateNewRow = (values) => {
    data.push(values);
    setData([...data]);
  };
    // const [tableData, setTableData] = useState(() => data);
  const getData = () => {
        fetch('./../../templates.json',
        {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
            setData([])
        });
    }

    const theme = useTheme();
    
    useEffect( () => {
        getData()
    }, [])
    
  return (
    <Grid container spacing={gridSpacing}>
      {!manageBoxShow && <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard>
                <div style={{ gap: '0.5rem', paddingTop: "50px", paddingBottom:"15px", margin: "auto", textAlign:'center', minHeight:'200px', verticalAlign:'middle'}}>
                    <img
                        srcSet="./../../60d95bdfbe673ce26490..svg"
                        src="./../../60d95bdfbe673ce26490..svg"
                        alt='calendar'
                        loading="lazy"
                    />
                    <Typography fontSize="1rem" fontWeight='bold' color="#6B6B6B" style={{margin: 'auto', paddingBottom: '15px'}}>Simplify scheduling meetings</Typography>
                    <Typography style={{margin: 'auto', paddingBottom: '15px'}}>Set your availability in Apollo and make it simple for people to schedule a meeting with you, no back-and-forth required.</Typography>
                    <Button variant="outlined" size="small" style={{margin: 'auto'}}>Connect Your Calendar</Button>
                    {/* <Button variant="outlined" size="small" style={{margin: 'auto'}} onClick={() => setManageBoxShow(true)}>Connect Your Calendar</Button> */}
                    
                </div>
            </MainCard>
          </Grid>
        </Grid>
        
      </Grid>}
      <ManageCalendarBox
            show={manageBoxShow}
            onClose={() => setManageBoxShow(false)}
        /> 
    </Grid>
  );
}

export const ManageCalendarBox = ({ show, onClose }) => {
    
  const [values, setValues] = useState({});
  const [isvalid, setIsValid] = useState(false);
  
  if(show) {
    return (
          <Grid item xs={8} margin="auto">
            <MainCard>
              <Box>
                 
              </Box>
            </MainCard>
          </Grid>
        
      
    );
  } else {
    return "";
  }

};
