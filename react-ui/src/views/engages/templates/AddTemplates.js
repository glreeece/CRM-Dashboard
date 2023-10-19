import PropTypes from 'prop-types';
import React, {useCallback, useState, useEffect, useMemo} from 'react';
import { useHistory } from 'react-router-dom';
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
import {ExpandLess, ExpandMore, AccountCircle, Send, Delete, DeleteOutline, Edit, DomainAdd, TurnLeft, PanToolAlt, Visibility, Inventory, Add, SellOutlined, FolderOutlined, FileDownloadOutlined, Mail} from "@mui/icons-material";
import {
    Box,
    Button,
    ButtonGroup,
    Stack,
    Grid, 
    Typography
} from '@mui/material';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default function AddTemplate() {
  const history = useHistory();
  function goToList() {
    history.push("/engages/templates");
  }
  const [data, setData] = useState({});
    // const [tableData, setTableData] = useState(() => data);
  
  const theme = useTheme();
       

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <MainCard>
                <Button onClick={goToList}>cancel</Button>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
