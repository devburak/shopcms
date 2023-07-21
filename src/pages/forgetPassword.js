import { useEffect, useState ,useMemo} from 'react';
import { useParams,useLocation,Link} from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box,Grid ,Stack,Typography,useMediaQuery,Tab,Tabs , Divider} from '@mui/material';
import api from '../api';
import GenericAlert from '../components/genericAlert';

// project imports
import {AuthWrapper} from '../layout/wrappers/authCardWrapper';
import AuthCardWrapper from '../layout/wrappers/authCardWrapper';
import ResetCodeForm from '../components/forms/resetcode';
import ResetPassword from '../components/forms/resetpassword';
import AuthFooter from '../layout/footer';

function useQuery() {
    const { search } = useLocation();
  
    return useMemo(() => new URLSearchParams(search), [search]);
  }



const ForgetPassword = () => {
    let query = useQuery();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [initialValues, setInitialValues] = useState({
        email: '',
    });   
    
    const { code='' } = useParams();
    const email = query.get("email")

    const [resetValues , setResetValues] = useState({
        code:'',
        email:'',
        password:'',
        repassword:''
    })
    const [tabValue, setTabValue] = useState(0);

    useEffect(()=>{
        if(email) setInitialValues({email:email})
        if(code !=='' && code)  setTabValue(1)
        setResetValues({code:code,email:email})
    },[email,code])

 

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
      };



    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

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
                children
            )}
          </div>
        );
      }

    const handleSubmit = async (values) => {
        try {
            if (!values?.email || values.email ==='') {
                GenericAlert.warning('Please Check Your E-Mail');
            } else {
                console.log(values.email)
                await api.post(`/api/password/forget`, {email:values.email});
                GenericAlert.success('Your reset code has been sent to your registered e-mail address');
            }
        } catch (error) {
          GenericAlert.error('An error occurred. Please try again.');
        }
      };

    const handleSubmitReset = async (values)=>{
        try {
            if (!values?.email || values.email ==='') {
                GenericAlert.warning('Please Check Your E-Mail');
            } else {
                console.log(values.email)
                await api.post(`/api/password/regenerate`, {email:values.email , resetCode:values.code,newPassword:values.password});
                GenericAlert.success('Your password has been successfully changed you can log in again');
            }
        } catch (err) {
            const {error=""} = err?.response?.data
          GenericAlert.error('An error occurred. Please try again. ' +error );
        }
    }

    return (
        <AuthWrapper>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                <Grid item xs={12}>
                                        <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                                                        Hi, Welcome 
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sx={{ minHeight:200}}>

                                        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb:2 }}>
                                            <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                                                <Tab label="Request Code" {...a11yProps(0)} />
                                                <Tab label="Reset Password" {...a11yProps(1)} />
                                            </Tabs>
                                        </Box>
                                        <CustomTabPanel value={tabValue} index={0}>
                                            <ResetCodeForm initialValues={initialValues} onSubmit={handleSubmit} />
                                        </CustomTabPanel>
                                        <CustomTabPanel value={tabValue} index={1}>
                                            <ResetPassword initialValues={resetValues} onSubmit={handleSubmitReset} />
                                        </CustomTabPanel>


                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography component={Link} to="/login" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                               Login
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper>
    )
}

export default ForgetPassword;