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
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
import {ExpandLess, ExpandMore, AccountCircle, Send, Delete, DeleteOutline, Edit, DomainAdd, TurnLeft, PanToolAlt, Visibility, Inventory, SellOutlined, FolderOutlined, FileDownloadOutlined, Mail} from "@mui/icons-material";
import {
    Box,
    Button,
    ButtonGroup,
    Stack,
    Grid, 
    Typography
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MailBoxes from './MailBoxes';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Settings() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [data, setData] = useState({});
    // const [tableData, setTableData] = useState(() => data);
  const getData = () => {
        fetch('./../../emails.json',
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
                id: "to", //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'to',
                header: 'To',
                size: 150,
                
                muiTableHeadCellProps : {
                  align: 'center',
                },
            },
            {
                id: 'template', //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'subject',
                header: 'Template',
                size: 350,
                Cell: (props) => {
                  const { subject, body, owner } = props.row.original;
        
                  return (
                    <Stack direction="row" alignItems="center" spacing={2} fontSize="0.75rem">
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography color="#6B6B6B" fontSize="0.8rem" fontWeight="bold">{subject}</Typography>
                        <Typography fontSize="0.75rem">{body}</Typography>
                        <Typography fontSize="0.75rem">{owner}</Typography>
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
                id: 'status', //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'status',
                header: 'Status',
                size: 100,
                Cell: (props) => {
                  const { delivered, opened, reply, interested } = props.row.original;
        
                  return (
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <ButtonGroup variant="contained" aria-label="outlined button primary group" size="small">
                          <Button disabled={delivered}><Mail/></Button>
                          <Button disabled={opened}><Visibility/></Button>
                          <Button disabled={interested}><PanToolAlt/></Button>
                          <Button disabled={reply}><TurnLeft/></Button>
                        </ButtonGroup>
                        
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
            {
                id: 'from', //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'from',
                header: 'From',
                size: 70,
                Cell: (props) => {
                  const { from } = props.row.original;
        
                  return (
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Stack
                        justifyContent="space-between"
                        alignItems="start"
                        spacing={0.5}
                      >
                        <Typography fontSize="0.75rem" color="#6B6B6B">{from}</Typography>
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
            {
                id: 'createdAt', //id is still required when using accessorFn instead of accessorKey
                accessorKey: 'createdAt',
                header: 'CreatedAt',
                size: 70,
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
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Mailboxes" {...a11yProps(0)} />
                    <Tab label="Schedules" {...a11yProps(1)} />
                    {/* <Tab label="Not opened" {...a11yProps(2)} />
                    <Tab label="Opened" {...a11yProps(3)} />
                    <Tab label="Bounced" {...a11yProps(4)} /> */}
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <MailBoxes/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                
                </CustomTabPanel>
                
              </Box>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
