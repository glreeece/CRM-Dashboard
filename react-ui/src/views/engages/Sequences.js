import PropTypes from 'prop-types';
import React, {useCallback, useState, useEffect, useMemo} from 'react';
// material-ui
import { useTheme } from '@material-ui/styles';
////import MaterialReactTable from 'material-react-table'; //default import deprecated
import { MaterialReactTable } from 'material-react-table';

//Date Picker Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../store/constant';
import {ExpandLess, ExpandMore, AccountCircle, Send, Delete, DeleteOutline, Edit, DomainAdd, Inventory, SellOutlined, FolderOutlined, FileDownloadOutlined} from "@mui/icons-material";
import {
    Box,
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
    List, 
    ListItemButton, 
    ListSubheader, 
    ListItemIcon, 
    ListItemText, 
    Collapse,
    Card, 
    Grid, 
    Typography
} from '@mui/material';


const Sequences = () => {
    const [data, setData] = useState({});
    // const [tableData, setTableData] = useState(() => data);
    const getData = () => {
        fetch('./../../sequences.json',
        {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        )
        .then(function(response){
            console.log(response)
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
            setData(myJson)
        });
    }

    const theme = useTheme();
    
    useEffect( () => {
        getData()
    }, [])
    
    const columns = useMemo(
        () => [
            {
                 //id is still required when using accessorFn instead of accessorKey
                accessorKey: "seqName",
                header: 'Sequence Name',
                size: 200,
                Cell: ({ row }) => (
                  <Box
                      sx={{
                      alignItems: 'center',
                      gap: '1rem',
                      }}
                  >
                      <Typography color="#6B6B6B">{row.original.seqName}</Typography>
                      <Typography>{row.original.company} • {row.original.steps + " steps"} • {row.original.createdAt}</Typography>
                  </Box>
              ),
                // Cell: (props) => {
                //   const { seqName, company, steps, createdAt } = props.row.original;
        
                //   return (
                //     <Stack direction="row" alignItems="center" spacing={2} borderRight='1px dashed rgba(224,224,224,1)'>
                //       <Stack
                //         justifyContent="space-between"
                //         alignItems="start"
                //         spacing={0.5}
                //       >
                        
                //       </Stack>
                //     </Stack>
                //   );
                // },
                muiTableHeadCellProps : {
                  align: 'center',                  
                },
                
            },
            {
                id: 'contacts', //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'contacts',
                header: 'Contacts',
                size: 250,
                Cell: (props) => {
                  const { active, paused, notSent, bounced, spamBlocked, finished } = props.row.original;
        
                  return (
                    <Stack direction="row" alignItems="center" spacing={2} borderRight='1px dashed rgba(224,224,224,1)' fontSize="0.75rem">
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography color="#6B6B6B" fontSize="0.75rem">{active}</Typography>
                        <Typography fontSize="0.75rem">Active</Typography>
                      </Stack>
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography fontSize="0.75rem" color="#6B6B6B">{paused}</Typography>
                        <Typography fontSize="0.75rem">Paused</Typography>
                      </Stack>
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography fontSize="0.75rem" color="#6B6B6B">{notSent}</Typography>
                        <Typography fontSize="0.75rem">Not sent</Typography>
                      </Stack>
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography fontSize="0.75rem" color="#6B6B6B">{bounced}</Typography>
                        <Typography fontSize="0.75rem">Bounced</Typography>
                      </Stack>
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography fontSize="0.75rem" color="#6B6B6B">{spamBlocked}</Typography>
                        <Typography fontSize="0.75rem">Spam blocked</Typography>
                      </Stack>
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography fontSize="0.75rem" color="#6B6B6B">{finished}</Typography>
                        <Typography fontSize="0.75rem">Finished</Typography>
                      </Stack>
                    </Stack>
                  );
                },
                muiTableHeadCellProps : {
                  align: 'center'
                },
                muiTableBodyCellProps : {
                  align: 'center',
                }
            },
            
            
            {
                id: 'email', //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'email',
                header: 'Email',
                size: 250,
                Cell: (props) => {
                  const { scheduled, delivered, open, reply, interested } = props.row.original;
        
                  return (
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography fontSize="0.75rem" color="#6B6B6B">{scheduled}</Typography>
                        <Typography fontSize="0.75rem">Scheduled</Typography>
                      </Stack>
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography fontSize="0.75rem" color="#6B6B6B">{delivered}</Typography>
                        <Typography fontSize="0.75rem">Delivered</Typography>
                      </Stack>
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography fontSize="0.75rem" color="#6B6B6B">{open}</Typography>
                        <Typography fontSize="0.75rem">Open</Typography>
                      </Stack>
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography fontSize="0.75rem" color="#6B6B6B">{reply}</Typography>
                        <Typography fontSize="0.75rem">Reply</Typography>
                      </Stack>
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography fontSize="0.75rem" color="#6B6B6B">{interested}</Typography>
                        <Typography fontSize="0.75rem">Interested</Typography>
                      </Stack>
                    </Stack>
                  );
                },
                muiTableHeadCellProps : {
                  align: 'center'
                },
                muiTableBodyCellProps : {
                  align: 'center'
                }
            },
            
        ],
        [],
    );

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
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
                                enableRowSelection
                                selectAllMode="all"
                                initialState={{ 
                                    showGlobalFilter: true,
                                }}
                                enableGlobalFilter={true}
                                muiSearchTextFieldProps={{
                                    variant: 'outlined',
                                    placeholder: 'Search 100 rows',
                                    label: 'Search',
                                    InputLabelProps: {
                                        shrink: true
                                    }
                                }}
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
                                          <ButtonGroup size="small" variant="outlined" aria-label="outlined button group">
                                              <Button
                                                  // onClick={() => setCreateModalOpen(true)}
                                                  variant="outlined"
                                              >
                                                  <SellOutlined/>
                                              </Button>
                                              <Button
                                                  // disabled={table.getSelectedRowModel().flatRows.length === 0}
                                                  // onClick={() => handleDelete(table)}
                                                  variant="outlined"
                                              >
                                                  <FolderOutlined/>
                                              </Button>
                                              <Button
                                                  // disabled={table.getSelectedRowModel().flatRows.length === 0}
                                                  // onClick={() => handleDelete(table)}
                                                  variant="outlined"
                                              >
                                                  <Inventory/>
                                              </Button>
                                              <Button
                                                  // disabled={table.getSelectedRowModel().flatRows.length === 0}
                                                  // onClick={handleContact}
                                                  variant="outlined"
                                              >
                                                  <FileDownloadOutlined/>
                                              </Button>
                                          </ButtonGroup> 
                                          
                                      </div>
                                  );
                              }}
                                
                            />
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
            
    );
};


export default Sequences;
