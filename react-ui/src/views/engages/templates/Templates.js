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

export default function Template() {
  
  const [data, setData] = useState({});
  const [createBoxShow, setCreateBoxShow] = useState(false);
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
                id: "name", //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'name',
                header: 'Name',
                size: 120,
                
                muiTableHeadCellProps : {
                  align: 'center',
                },
            },
            {
                id: 'template', //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'template',
                header: 'Template',
                size: 420,
                Cell: (props) => {
                  const { subject, body} = props.row.original;
        
                  return (
                    <Stack direction="row" alignItems="center" spacing={2} fontSize="0.75rem" borderRight='1px dashed rgba(224,224,224,1)' paddingRight="10px">
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography color="#6B6B6B" fontSize="0.8rem" fontWeight="bold">{subject}</Typography>
                        <Typography fontSize="0.75rem">{body}</Typography>
                      </Stack>
                    </Stack>
                  );
                },
                muiTableHeadCellProps : {
                  align: 'center'
                },
                
            },
            {
                id: 'diagnostics', //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'diagnostics',
                header: 'Diagnostics',
                size: 270,
                Cell: (props) => {
                  const { delivered, optout, reply, interested } = props.row.original;
        
                  return (
                    <Stack direction="row" alignItems="center" spacing={2}>
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
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography fontSize="0.75rem" color="#6B6B6B">{optout}</Typography>
                        <Typography fontSize="0.75rem">Opt out</Typography>
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
            // {
            //     id: 'status', //id is still required when using accessorFn instead of accessorKey
            //     accessorKey: 'status',
            //     header: 'Status',
            //     size: 60,
            //     muiTableHeadCellProps : {
            //       align: 'center'
            //     },
            //     muiTableBodyCellProps : {
            //       align: 'center',
            //       fontSize:"0.75rem"
            //     }
            // },
            {
                id: 'owner', //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'owner',
                header: 'Owner',
                size: 40,
                muiTableHeadCellProps : {
                  align: 'center'
                },
                muiTableBodyCellProps : {
                  align: 'center',
                  fontSize:"10px"
                }
            },
            {
              id: 'createdAt', //id is still required when using accessorFn instead of accessorKey
              accessorKey: 'createdAt',
              header: 'CreatedAt',
              size: 40,
              muiTableHeadCellProps : {
                align: 'center'
              },
              muiTableBodyCellProps : {
                align: 'center',
                fontSize:"10px"
              }
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
                            <ButtonGroup variant="outlined" size="small" aria-label="outlined button group">
                                <Button
                                    onClick={() => setCreateBoxShow(true)}
                                    variant="outlined"
                                >
                                    <Add/>
                                </Button>
                                <Button
                                    // onClick={() => setCreateBoxShow(true)}
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
        
      </Grid>}
      <CreateNewTemplateBox
            columns={columns}
            show={createBoxShow}
            onClose={() => setCreateBoxShow(false)}
            onSubmit={handleCreateNewRow}
        /> 
    </Grid>
  );
}

export const CreateNewTemplateBox = ({ show, onClose, onSubmit }) => {
    
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
                  Create New Contact
                  <form onSubmit={(e) => e.preventDefault()} style={{paddingTop: "20px"}}>
                      <Stack 
                        sx={{
                            gap: '1.5rem',
                            paddingBottom: '1rem'
                        }}
                      >
                        <TextField 
                            sx={{
                              width: "100%"
                            }}
                            key="name"
                            label="Name:"
                            name="name"
                            error={isvalid}
                            helperText={isvalid ? `Name is required.` : "" }
                            onChange={(e) => {
                                setValues({ ...values, [e.target.name]: e.target.value })
                            }
                            }
                        />
                      </Stack>
                      <Stack 
                        sx={{
                            gap: '1.5rem',
                            paddingBottom: '1rem'
                        }}>
                        <TextField 
                            sx={{
                              width: "100%"
                            }}
                            key="owner"
                            label="Owner:"
                            name="owner"
                            onChange={(e) => {
                                setValues({ ...values, [e.target.name]: e.target.value })
                            }
                            }
                        />
                      </Stack>
                      <Stack 
                        sx={{
                            gap: '1.5rem',
                            paddingBottom: '1rem'
                        }}>
                        <TextField 
                            sx={{
                              width: "100%"
                            }}
                            key="subject"
                            label="Subject:"
                            name="subject"
                            onChange={(e) => {
                                setValues({ ...values, [e.target.name]: e.target.value })
                            }
                            }
                        />
                      </Stack>
                      <Stack 
                        sx={{
                            gap: '1.5rem',
                            paddingBottom: '1rem'
                        }}>
                        <TextField 
                            sx={{
                              width: "100%"
                            }}
                            key="body"
                            label="Body:"
                            name="body"
                            multiline
                            rows={4}
                            onChange={(e) => {
                                setValues({ ...values, [e.target.name]: e.target.value })
                            }
                            }
                        />
                      </Stack>
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
                            Create
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
