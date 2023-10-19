import PropTypes from 'prop-types';
import React, {useCallback, useState, useEffect, useMemo} from 'react';
// material-ui
import { useTheme } from '@material-ui/styles';
////import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from 'material-react-table';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
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

export default function MailBoxes() {
  
  const [data, setData] = useState({});
  const [createBoxShow, setLinkNewMailbox] = useState(false);
  const handleLinkNewMailbox = (values) => {
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
    
    const columns = useMemo(
        () => [
            {
                id: "mailbox", //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'mailbox',
                header: 'Mailbox',
                size: 250,
            },
            {
                id: 'dailyLimit', //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'dailyLimit',
                header: 'Daily limit',
                size: 120,
                
            },
            {
                id: 'hourlyLimit', //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'hourlyLimit',
                header: 'Hourly limit',
                size: 70,
            },
            {
                id: 'lastSynced', //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'lastSynced',
                header: 'Last synced',
                size: 70,
               
            },
            
        ],
        [],
    );

  return (
    <Grid container spacing={gridSpacing}>
      {!createBoxShow && <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard>
              <MaterialReactTable
                  displayColumnDefOptions={{
                      'mrt-row-actions': {
                          muiTableHeadCellProps: {
                          align: 'center',
                          },
                          size: 120,
                      },
                  }}
                  columns={columns}
                  data={data}
                  enableGlobalFilter={false}
                  positionToolbarAlertBanner="top"
                  enableDensityToggle={false}
                  enableFullScreenToggle={false}
                  enableHiding={false}
                  enableColumnFilters={false}
                  enableColumnActions={false}
                  renderTopToolbarCustomActions={({ table }) => {
              
                    const handleContact = () => {
                        table.getSelectedRowModel().flatRows.map((row) => {
                            alert('contact ' + row.getValue('name'));
                        });
                    };

                    return (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Button size='small'
                                    onClick={() => setLinkNewMailbox(true)}
                                    variant="outlined"
                                >
                                    Link mailbox
                                </Button>
                            
                        </div>
                    );
                }}
                  
              />
               
            </MainCard>
          </Grid>
        </Grid>
        
      </Grid>}
      <LinkNewMailBox
            columns={columns}
            show={createBoxShow}
            onClose={() => setLinkNewMailbox(false)}
            onSubmit={handleLinkNewMailbox}
        /> 
    </Grid>
  );
}

export const LinkNewMailBox = ({ show, onClose, onSubmit }) => {
    
  const [values, setValues] = useState({});
  const [isvalid, setIsValid] = useState(false);

  const handleSubmit = () => {
      //put your validation logic here
      
      let validated = true;
     
      if(values["name"] == "" || values["name"] == undefined) {
          validated = false;
          setIsValid(true)
      }

      if(validated) {
          onSubmit(values);
          setValues({});
          setIsValid(false)
          onClose();
      }
      
  };
  if(show) {
    return (
          <Grid item xs={8} margin="auto">
            <MainCard>
              <Box>
                  Link New Mailbox
                  <form onSubmit={(e) => e.preventDefault()} style={{paddingTop: "20px"}}>
                     
                      <div style={{ display: 'flex', gap: '0.5rem', float: "right", paddingTop: "10px", paddingBottom:"15px" }}>
                          <Button onClick={(e) => {
                                setValues({});
                                setIsValid(false)
                                onClose();
                            }
                        }>Cancel
                        </Button>
                        <Button color="secondary" onClick={() => {
                                // setValues({ ...values, [e.target.name]: e.target.value })
                                handleSubmit();
                            }
                        } variant="contained">
                            Link
                        </Button>
                      </div>
                      
                  </form>
                  
                      
              </Box>
            </MainCard>
          </Grid>
        
      
    );
  } else {
    return "";
  }

};
