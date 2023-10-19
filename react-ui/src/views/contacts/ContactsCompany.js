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
import {ExpandLess, ExpandMore, AccountCircle, Send, Delete, DeleteOutline, Edit, DomainAdd} from "@mui/icons-material";
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


const ContactsCompany = () => {
    const [data, setData] = useState([]);
    // const [tableData, setTableData] = useState(() => data);
    const getData = () => {
        fetch('./../../company.json',
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
    
    const [createModalOpen, setCreateModalOpen] = useState(false);
    
    const [validationErrors, setValidationErrors] = useState({});

    const handleCreateNewRow = (values) => {
        data.push(values);
        setData([...data]);
    };

    const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
        console.log(validationErrors)
        if (!Object.keys(validationErrors).length) {
            data[row.index] = values;
            //send/receive api updates here, then refetch or update local table data for re-render
            setData([...data]);
            exitEditingMode(); //required to exit editing mode and close modal
        }
    };

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };

    const handleDelete = useCallback(
        (table) => {
            // console.log(row)
            // if (
            //     !window.confirm(`Are you sure you want to delete ${row.getValue('name')}`)
            // ) {
            //     return;
            // }
            table.getSelectedRowModel().flatRows.map((row) => {
                console.log(row, row.getIsSelected());
                
                data.splice(row.original, 1);
                
            });
            console.log(data)
            //send api delete request here, then refetch or update local table data for re-render
            table.toggleAllRowsSelected(false);
            setData([...data]);
        },
        [data],
    );

    const getCommonEditTextFieldProps = useCallback(
        (cell) => {
            console.log(cell.id, cell.column.id)
            return {
                error: !!validationErrors[cell.id],
                helperText: validationErrors[cell.id],
                onBlur: (event) => {
                    const isValid =
                        cell.column.id === 'email'
                        ? validateEmail(event.target.value)
                        : cell.column.id === 'age'
                        ? validateAge(+event.target.value)
                        : validateRequired(event.target.value);
                    if (!isValid) {
                        //set validation error for cell if invalid
                        setValidationErrors({
                            ...validationErrors,
                            [cell.id]: `${cell.column.columnDef.header} is required`,
                        });
                    } else {
                        //remove validation error for cell if valid
                        delete validationErrors[cell.id];
                        setValidationErrors({
                            ...validationErrors,
                        });
                    }
                },
            };
        },
        [validationErrors],
    );
    const columns = useMemo(
        () => [
            {
                id: 'company', //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'company',
                header: 'Company',
                size: 250,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                }),
                
            },
            {
                accessorKey: 'employees',
                filterFn: 'between',
                header: 'Employees',
                size: 200,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                    type: 'number'
                })
            },
            {
                accessorKey: 'industry',
                header: 'Industry',
                size: 200,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                })
            },
            {
                accessorKey: 'keywords',
                header: 'Keywords',
                size: 200,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                })
            },
            {
                accessorKey: 'companyLocation',
                header: 'Company Location',
                size: 200,
                muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
                    ...getCommonEditTextFieldProps(cell),
                })
            },
        ],
        [getCommonEditTextFieldProps],
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
                                enableColumnFilterModes
                                enableColumnOrdering
                                enableGrouping
                                enablePinning
                                enableRowSelection
                                selectAllMode="all"
                                initialState={{ 
                                    showColumnFilters: true, 
                                    showGlobalFilter: true,
                                }}
                                muiSearchTextFieldProps={{
                                    variant: 'outlined',
                                    placeholder: 'Search 100 rows',
                                    label: 'Search',
                                    InputLabelProps: {
                                        shrink: true
                                    }
                                }}
                                positionToolbarAlertBanner="top"
                                editingMode="modal" //default                                
                                // enableEditing
                                onEditingRowSave={handleSaveRowEdits}
                                onEditingRowCancel={handleCancelRowEdits}
                                muiTableBodyRowProps={({ row, table }) => ({
                                    onClick: () => table.setEditingRow(row) 
                                })}
                                renderTopToolbarCustomActions={({ table }) => {
                            
                                    const handleContact = () => {
                                        table.getSelectedRowModel().flatRows.map((row) => {
                                            alert('contact ' + row.getValue('name'));
                                        });
                                    };

                                    return (
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
                                                <Button
                                                    onClick={() => setCreateModalOpen(true)}
                                                    variant="outlined"
                                                >
                                                    <DomainAdd/>
                                                </Button>
                                                <Button
                                                    disabled={table.getSelectedRowModel().flatRows.length === 0}
                                                    onClick={() => handleDelete(table)}
                                                    variant="outlined"
                                                >
                                                    <DeleteOutline/>
                                                </Button>
                                                <Button
                                                    disabled={table.getSelectedRowModel().flatRows.length === 0}
                                                    onClick={handleContact}
                                                    variant="outlined"
                                                >
                                                    <Send/>
                                                </Button>
                                            </ButtonGroup> 
                                            
                                        </div>
                                    );
                                }}
                            />
                            <CreateNewContactModal
                                columns={columns}
                                open={createModalOpen}
                                onClose={() => setCreateModalOpen(false)}
                                onSubmit={handleCreateNewRow}
                            />
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
            
    );
};

export const CreateNewContactModal = ({ open, columns, onClose, onSubmit }) => {
    
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {}),
    );

    const [validations, setValidations] = useState(() => 
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? false] = false;
            return acc;
        }, {}),
    );
    
    
   
    const handleSubmit = () => {
        //put your validation logic here
        
        let validated = true;
       
        for (let x in columns) {
            
            if(values[columns[x].accessorKey] == "") {
                validated = false;
                validations[columns[x].accessorKey] = true
                setValidations({ ...validations })
            }else {
                continue;
            }
            console.log(validations, x, columns[x].accessorKey)
        }

        if(validated) {
            onSubmit(values);
            setValues(() =>
                columns.reduce((acc, column) => {
                    acc[column.accessorKey ?? ''] = '';
                    return acc;
                }, {}),
            );
            setValidations(() =>
                columns.reduce((acc, column) => {
                    acc[column.accessorKey ?? false] = false;
                    return acc;
                }, {}),
            );
            onClose();
        }
        
    };
  
    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Create New Contact</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()} style={{paddingTop: "20px"}}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >
                        {columns.map((column) => (
                            <TextField
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                error={validations[column.accessorKey]}
                                helperText={validations[column.accessorKey] ? `${column.header} is required.` : "" }
                                
                                onChange={(e) => {
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                    if(e.target.value == "") {
                                        setValidations({...validations, [e.target.name]: true})
                                    }else{
                                        setValidations({...validations, [e.target.name]: false})
                                    }
                                }
                                    
                                }
                            />
                        ))}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={(e) => {
                        setValues(() =>
                            columns.reduce((acc, column) => {
                                acc[column.accessorKey ?? ''] = '';
                                return acc;
                            }, {}),
                        );
                        setValidations(() =>
                            columns.reduce((acc, column) => {
                                acc[column.accessorKey ?? false] = false;
                                return acc;
                            }, {}),
                        );
                        onClose();
                    }
                }>Cancel</Button>
                <Button color="secondary" onClick={() => {
                        // setValues({ ...values, [e.target.name]: e.target.value })
                        handleSubmit();
                    }
                } variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};
  
const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
    !!email.length &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
const validateAge = (age) => age >= 18 && age <= 80;

export default ContactsCompany;
